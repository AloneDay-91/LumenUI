"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

type TourStep = {
  /** CSS selector of the element to point at. Without one, the card is centered. */
  target?: string
  title: React.ReactNode
  description?: React.ReactNode
}

type Rect = { top: number; left: number; width: number; height: number }

const PADDING = 6
const CARD_WIDTH = 288
const GAP = 12

function measure(selector?: string): Rect | null {
  if (!selector) return null
  const element = document.querySelector(selector)
  if (!element) return null
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top - PADDING,
    left: rect.left - PADDING,
    width: rect.width + PADDING * 2,
    height: rect.height + PADDING * 2,
  }
}

/**
 * Walks the reader through a page: dims everything but the current target
 * and sets a card beside it. The card is a modal dialog; focus moves into it,
 * Escape ends the tour, and focus goes back where it was.
 */
function Tour({
  steps,
  open,
  onOpenChange,
  step: stepProp,
  onStepChange,
  onFinish,
  labels = {},
}: {
  steps: TourStep[]
  open: boolean
  onOpenChange: (open: boolean) => void
  step?: number
  onStepChange?: (step: number) => void
  onFinish?: () => void
  labels?: {
    next?: string
    back?: string
    finish?: string
    skip?: string
    progress?: (step: number, total: number) => string
  }
}) {
  const [uncontrolledStep, setUncontrolledStep] = React.useState(0)
  const index = stepProp ?? uncontrolledStep
  const current = steps[index]
  const [rect, setRect] = React.useState<Rect | null>(null)
  const cardRef = React.useRef<HTMLDivElement>(null)
  const returnFocus = React.useRef<Element | null>(null)
  const titleId = React.useId()
  const descriptionId = React.useId()

  function setStep(next: number) {
    if (stepProp === undefined) setUncontrolledStep(next)
    onStepChange?.(next)
  }

  function close() {
    onOpenChange(false)
    setStep(0)
  }

  // Remember the trigger, and give focus back when the tour ends.
  React.useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement
    return () => {
      ;(returnFocus.current as HTMLElement | null)?.focus?.()
    }
  }, [open])

  // Scroll the target into view, then follow it on scroll and resize.
  React.useLayoutEffect(() => {
    if (!open || !current) return
    const element = current.target ? document.querySelector(current.target) : null
    element?.scrollIntoView({ block: "center", behavior: "smooth" })
    const update = () => setRect(measure(current.target))
    update()
    const settle = setTimeout(update, 350)
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)
    return () => {
      clearTimeout(settle)
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    }
  }, [open, current])

  React.useEffect(() => {
    if (open) cardRef.current?.focus()
  }, [open, index])

  if (!open || !current || typeof document === "undefined") return null

  const last = index === steps.length - 1
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  let cardStyle: React.CSSProperties
  if (rect) {
    const below = rect.top + rect.height + GAP
    const fitsBelow = below + 180 < viewportHeight
    const left = Math.min(
      Math.max(16, rect.left + rect.width / 2 - CARD_WIDTH / 2),
      viewportWidth - CARD_WIDTH - 16
    )
    cardStyle = fitsBelow
      ? { top: below, left }
      : { top: Math.max(16, rect.top - GAP), left, transform: "translateY(-100%)" }
  } else {
    cardStyle = { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  }

  return createPortal(
    <div data-slot="tour" className="fixed inset-0 z-[110]">
      {/* The dim layer: a huge shadow around the cut-out, so the target stays clickable-looking and sharp. */}
      {rect ? (
        <div
          aria-hidden
          className="pointer-events-none fixed rounded-2xl transition-all duration-300 ease-out"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            boxShadow: "0 0 0 9999px rgb(0 0 0 / 0.45)",
          }}
        />
      ) : (
        <div aria-hidden className="fixed inset-0 bg-black/45" />
      )}
      {/* Clicks outside the card do nothing, so a stray click does not end the tour. */}
      <div aria-hidden className="fixed inset-0" />

      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={current.description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault()
            close()
          }
          // Keep Tab inside the card.
          if (event.key === "Tab" && cardRef.current) {
            const focusable = cardRef.current.querySelectorAll<HTMLElement>("button")
            const first = focusable[0]
            const lastButton = focusable[focusable.length - 1]
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault()
              lastButton.focus()
            } else if (!event.shiftKey && document.activeElement === lastButton) {
              event.preventDefault()
              first.focus()
            }
          }
        }}
        data-slot="tour-card"
        className="fixed flex w-72 flex-col gap-3 rounded-[min(var(--radius-4xl),24px)] bg-popover p-4 text-popover-foreground shadow-lg ring-1 ring-foreground/5 outline-none transition-[top,left] duration-300 ease-out dark:ring-foreground/10"
        style={cardStyle}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="m-0 font-mono text-[11px] text-muted-foreground tabular-nums">
              {labels.progress?.(index + 1, steps.length) ?? `${index + 1} of ${steps.length}`}
            </p>
            <h2 id={titleId} className="m-0 text-sm font-medium">
              {current.title}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={labels.skip ?? "Skip tour"}
            onClick={close}
            className="-me-1 text-muted-foreground"
          >
            <XIcon />
          </Button>
        </div>
        {current.description ? (
          <p id={descriptionId} className="m-0 text-xs leading-5 text-muted-foreground">
            {current.description}
          </p>
        ) : null}
        <div className="flex items-center gap-2">
          <span aria-hidden className="flex flex-1 gap-1">
            {steps.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all",
                  i === index ? "w-4 bg-foreground" : "w-1 bg-foreground/20"
                )}
              />
            ))}
          </span>
          {index > 0 ? (
            <Button variant="ghost" size="sm" onClick={() => setStep(index - 1)}>
              {labels.back ?? "Back"}
            </Button>
          ) : null}
          <Button
            size="sm"
            onClick={() => {
              if (last) {
                onFinish?.()
                close()
              } else {
                setStep(index + 1)
              }
            }}
          >
            {last ? (labels.finish ?? "Done") : (labels.next ?? "Next")}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export { Tour }
export type { TourStep }
