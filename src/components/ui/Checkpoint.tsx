"use client"

import * as React from "react"
import { BookmarkIcon, RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

/**
 * A point in the conversation you can return to: a rule across the thread
 * with a label and a Restore button.
 */
function Checkpoint({
  label,
  onRestore,
  restoreLabel = "Restore",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  label: React.ReactNode
  onRestore?: () => void
  restoreLabel?: string
}) {
  return (
    <div
      data-slot="checkpoint"
      role="separator"
      aria-label={typeof label === "string" ? `Checkpoint: ${label}` : "Checkpoint"}
      className={cn("flex items-center gap-3 text-xs text-muted-foreground", className)}
      {...props}
    >
      <span aria-hidden className="h-px flex-1 bg-border" />
      <span className="flex items-center gap-1.5">
        <BookmarkIcon aria-hidden className="size-3.5" />
        {label}
      </span>
      {onRestore ? (
        <Button variant="ghost" size="xs" onClick={onRestore} className="text-muted-foreground">
          <RotateCcwIcon data-icon="inline-start" />
          {restoreLabel}
        </Button>
      ) : null}
      <span aria-hidden className="h-px flex-1 bg-border" />
    </div>
  )
}

export { Checkpoint }
