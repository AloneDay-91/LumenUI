"use client"

import * as React from "react"
import { ArrowDownIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

/** How close to the bottom still counts as "at the bottom", in px. */
const THRESHOLD = 48

/**
 * A scroll area that stays pinned to the bottom while content grows, as long
 * as the reader is there. Scroll up to read and it lets go; a button brings
 * them back to the latest message.
 */
function MessageScroller({
  className,
  children,
  label = "Scroll to latest",
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const pinned = React.useRef(true)
  const [atBottom, setAtBottom] = React.useState(true)

  const scrollToBottom = React.useCallback((behavior: ScrollBehavior = "auto") => {
    const viewport = viewportRef.current
    if (!viewport) return
    viewport.scrollTo({ top: viewport.scrollHeight, behavior })
  }, [])

  // New content: follow it only if the reader was at the bottom.
  React.useLayoutEffect(() => {
    const content = contentRef.current
    if (!content) return
    const observer = new ResizeObserver(() => {
      if (pinned.current) scrollToBottom()
    })
    observer.observe(content)
    scrollToBottom()
    return () => observer.disconnect()
  }, [scrollToBottom])

  return (
    <div data-slot="message-scroller" className={cn("relative min-h-0", className)} {...props}>
      <div
        ref={viewportRef}
        data-slot="message-scroller-viewport"
        tabIndex={0}
        onScroll={(event) => {
          const viewport = event.currentTarget
          const distance = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight
          pinned.current = distance <= THRESHOLD
          setAtBottom(pinned.current)
        }}
        className="size-full scroll-fade overflow-y-auto overscroll-contain outline-none focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:ring-inset"
      >
        <div ref={contentRef}>{children}</div>
      </div>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label={label}
        tabIndex={atBottom ? -1 : 0}
        aria-hidden={atBottom || undefined}
        onClick={() => {
          pinned.current = true
          scrollToBottom("smooth")
        }}
        className={cn(
          "absolute bottom-3 left-1/2 -translate-x-1/2 bg-background shadow-sm transition-[opacity,translate] duration-200",
          atBottom ? "pointer-events-none translate-y-2 opacity-0" : "opacity-100"
        )}
      >
        <ArrowDownIcon />
      </Button>
    </div>
  )
}

export { MessageScroller }
