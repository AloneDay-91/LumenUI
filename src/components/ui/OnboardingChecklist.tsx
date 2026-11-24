"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Progress } from "@/components/ui/Progress"
import { cn } from "@/lib/utils"

type ChecklistStep = {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  /** The step's call to action: a Button, a Link. Shown on the open step. */
  action?: React.ReactNode
  /** A plain name for announcements when title is a node. */
  label?: string
}

/**
 * The first things to do in a product, with a progress bar. One step is open
 * at a time, done steps are struck through, and the whole list folds into its
 * header. When every step is done, it says so and can be dismissed.
 */
function OnboardingChecklist({
  className,
  title = "Get started",
  description,
  steps,
  completed: completedProp,
  defaultCompleted = [],
  onCompletedChange,
  defaultOpen = true,
  onDismiss,
  allowManualCheck = true,
  labels = {},
}: {
  className?: string
  title?: React.ReactNode
  description?: React.ReactNode
  steps: ChecklistStep[]
  /** Controlled ids of done steps. */
  completed?: string[]
  defaultCompleted?: string[]
  onCompletedChange?: (completed: string[]) => void
  /** Start unfolded. */
  defaultOpen?: boolean
  /** Shows a close button; hide the checklist in this callback. */
  onDismiss?: () => void
  /** The circles toggle steps. Turn off when your app marks them done. */
  allowManualCheck?: boolean
  labels?: {
    progress?: (done: number, total: number) => string
    done?: string
    dismiss?: string
    markDone?: (step: string) => string
    markUndone?: (step: string) => string
    allDone?: React.ReactNode
  }
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultCompleted)
  const completed = completedProp ?? uncontrolled
  const done = steps.filter((step) => completed.includes(step.id)).length
  const allDone = done === steps.length && steps.length > 0
  const firstOpen = steps.find((step) => !completed.includes(step.id))?.id ?? null
  const [expanded, setExpanded] = React.useState<string | null>(firstOpen)
  const [open, setOpen] = React.useState(defaultOpen)

  const name = (step: ChecklistStep) => step.label ?? (typeof step.title === "string" ? step.title : step.id)

  const toggle = (step: ChecklistStep) => {
    const isDone = completed.includes(step.id)
    const next = isDone ? completed.filter((id) => id !== step.id) : [...completed, step.id]
    setUncontrolled(next)
    onCompletedChange?.(next)
    // Finishing a step opens the next one left to do.
    if (!isDone) setExpanded(steps.find((s) => s.id !== step.id && !next.includes(s.id))?.id ?? null)
  }

  return (
    <CollapsiblePrimitive.Root
      open={open}
      onOpenChange={setOpen}
      data-slot="onboarding-checklist"
      className={cn(
        "flex w-full flex-col rounded-[min(var(--radius-4xl),24px)] bg-card text-card-foreground ring-1 ring-foreground/5 dark:ring-foreground/10",
        className
      )}
    >
      <div className="flex items-start gap-2 p-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="m-0 truncate text-sm font-medium">{title}</h3>
            <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
              {done}/{steps.length}
            </span>
          </div>
          {description ? <p className="m-0 text-xs text-muted-foreground">{description}</p> : null}
          <Progress
            value={steps.length ? (done / steps.length) * 100 : 0}
            aria-label={labels.progress?.(done, steps.length) ?? `${done} of ${steps.length} steps done`}
          />
        </div>
        <div className="-me-1.5 -mt-1.5 flex shrink-0 items-center">
          <CollapsiblePrimitive.Trigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={open ? "Fold the checklist" : "Unfold the checklist"}
                className="text-muted-foreground"
              />
            }
          >
            <ChevronDownIcon className={cn("transition-transform duration-200", !open && "-rotate-90")} />
          </CollapsiblePrimitive.Trigger>
          {onDismiss ? (
            <Button variant="ghost" size="icon-sm" onClick={onDismiss} aria-label={labels.dismiss ?? "Dismiss"} className="text-muted-foreground">
              <XIcon />
            </Button>
          ) : null}
        </div>
      </div>

      <CollapsiblePrimitive.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0">
        {allDone ? (
          <div className="mx-4 mb-4 flex items-center gap-2 rounded-2xl bg-jade-wash px-3 py-2.5 text-xs text-jade-ink">
            <CheckIcon className="size-4 shrink-0" aria-hidden />
            {labels.allDone ?? "All set. You can dismiss this checklist."}
          </div>
        ) : null}
        <ol className="m-0 flex list-none flex-col gap-0.5 px-2 pb-2">
          {steps.map((step) => {
            const isDone = completed.includes(step.id)
            const isOpen = expanded === step.id
            const panelId = `${step.id}-panel`
            return (
              <li
                key={step.id}
                data-done={isDone ? "" : undefined}
                data-open={isOpen ? "" : undefined}
                className="rounded-2xl transition-colors data-open:bg-muted/60"
              >
                <div className="flex items-center gap-2.5 px-2 py-1.5">
                  <button
                    type="button"
                    disabled={!allowManualCheck}
                    aria-pressed={isDone}
                    aria-label={
                      isDone
                        ? (labels.markUndone?.(name(step)) ?? `Mark ${name(step)} as not done`)
                        : (labels.markDone?.(name(step)) ?? `Mark ${name(step)} as done`)
                    }
                    onClick={() => toggle(step)}
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-default",
                      isDone
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-dashed border-muted-foreground/50 hover:border-solid hover:border-foreground/60"
                    )}
                  >
                    {isDone ? <CheckIcon className="size-3" /> : null}
                  </button>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setExpanded(isOpen ? null : step.id)}
                    className={cn(
                      "min-w-0 flex-1 truncate rounded-lg py-0.5 text-start text-xs font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
                      isDone && "text-muted-foreground line-through decoration-muted-foreground/50"
                    )}
                  >
                    {step.title}
                  </button>
                </div>
                {isOpen && (step.description || step.action) ? (
                  <div id={panelId} className="flex flex-col items-start gap-2.5 ps-9.5 pe-3 pb-3">
                    {step.description ? <p className="m-0 text-xs text-muted-foreground">{step.description}</p> : null}
                    {step.action}
                  </div>
                ) : null}
              </li>
            )
          })}
        </ol>
      </CollapsiblePrimitive.Panel>
    </CollapsiblePrimitive.Root>
  )
}

export { OnboardingChecklist }
export type { ChecklistStep }
