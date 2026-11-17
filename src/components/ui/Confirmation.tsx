"use client"

import * as React from "react"
import { CheckIcon, ShieldAlertIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { CodeBlock } from "@/components/ui/CodeBlock"
import { cn } from "@/lib/utils"

type ConfirmationState = "pending" | "approved" | "denied"

/**
 * Asks before a tool runs: what it will do, the arguments, and Approve or
 * Deny. Once answered, the card shrinks to one line that says what was decided.
 */
function Confirmation({
  title,
  description,
  input,
  state = "pending",
  onApprove,
  onDeny,
  labels = {},
  className,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  /** The tool arguments, printed as JSON. */
  input?: unknown
  state?: ConfirmationState
  onApprove?: () => void
  onDeny?: () => void
  labels?: { approve?: string; deny?: string; approved?: string; denied?: string }
  className?: string
}) {
  const titleId = React.useId()

  if (state !== "pending") {
    const approved = state === "approved"
    return (
      <div
        data-slot="confirmation"
        data-state={state}
        className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)}
      >
        {approved ? (
          <CheckIcon aria-hidden className="size-3.5 text-jade-ink" />
        ) : (
          <XIcon aria-hidden className="size-3.5 text-crimson-ink" />
        )}
        <span>
          {approved ? (labels.approved ?? "Approved") : (labels.denied ?? "Denied")}:{" "}
          <span className="text-foreground">{title}</span>
        </span>
      </div>
    )
  }

  return (
    <section
      data-slot="confirmation"
      data-state={state}
      aria-labelledby={titleId}
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-orange-line bg-card p-3 text-xs",
        className
      )}
    >
      <div className="flex items-start gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-wash text-orange-ink">
          <ShieldAlertIcon aria-hidden className="size-3.5" />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5 pt-0.5">
          <h3 id={titleId} className="m-0 text-sm font-medium">
            {title}
          </h3>
          {description ? <p className="m-0 text-muted-foreground">{description}</p> : null}
        </div>
      </div>
      {input !== undefined ? (
        <CodeBlock
          code={typeof input === "string" ? input : JSON.stringify(input, null, 2)}
          copyable={false}
          wrap
          className="[&>pre]:p-2.5"
        />
      ) : null}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onDeny}>
          {labels.deny ?? "Deny"}
        </Button>
        <Button size="sm" onClick={onApprove}>
          {labels.approve ?? "Approve"}
        </Button>
      </div>
    </section>
  )
}

export { Confirmation }
export type { ConfirmationState }
