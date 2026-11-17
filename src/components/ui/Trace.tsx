"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { CheckIcon, ChevronDownIcon, CircleAlertIcon, CircleIcon } from "lucide-react"

import { Spinner } from "@/components/ui/Spinner"
import { cn } from "@/lib/utils"


/*
 * Trace is the shape every agent step shares: an icon, a title, a status, and
 * a body that folds. Reasoning, Tool, Plan, Task, Queue, Chain of Thought and
 * Subagent are all built on it, so a thread of mixed steps reads as one list.
 */

type TraceStatus = "pending" | "running" | "done" | "error"

const statusLabel: Record<TraceStatus, string> = {
  pending: "Pending",
  running: "Running",
  done: "Done",
  error: "Failed",
}

/** Small status mark: an empty ring, a Spinner, a jade check, a crimson alert. */
function TraceStatusIcon({
  status,
  className,
}: {
  status: TraceStatus
  className?: string
}) {
  const base = cn("size-3.5 shrink-0", className)
  switch (status) {
    case "running":
      return <Spinner role={undefined} aria-label={undefined} aria-hidden className={base} />
    case "done":
      return <CheckIcon aria-hidden className={cn(base, "text-jade-ink")} />
    case "error":
      return <CircleAlertIcon aria-hidden className={cn(base, "text-crimson-ink")} />
    default:
      return <CircleIcon aria-hidden className={cn(base, "text-muted-foreground/60")} />
  }
}

type TraceContextValue = { status: TraceStatus; variant: "plain" | "card" }

const TraceContext = React.createContext<TraceContextValue>({ status: "done", variant: "plain" })

function useTrace() {
  return React.useContext(TraceContext)
}

/**
 * One step. `plain` reads inline in a message; `card` frames it, for tool
 * calls and subagents whose body holds code.
 */
function Trace({
  className,
  status = "done",
  variant = "plain",
  ...props
}: CollapsiblePrimitive.Root.Props & {
  status?: TraceStatus
  variant?: "plain" | "card"
}) {
  return (
    <TraceContext.Provider value={{ status, variant }}>
      <CollapsiblePrimitive.Root
        data-slot="trace"
        data-status={status}
        data-variant={variant}
        className={cn(
          "group/trace flex flex-col text-xs",
          variant === "card" && "overflow-hidden rounded-2xl border border-border bg-card",
          variant === "plain" && "gap-2",
          className
        )}
        {...props}
      />
    </TraceContext.Provider>
  )
}

/**
 * The row: icon, label, optional meta, status, chevron. The label shimmers
 * while the step runs. Children replace the label.
 */
function TraceTrigger({
  className,
  icon,
  label,
  meta,
  showStatus = true,
  statusLabels = statusLabel,
  children,
  ...props
}: CollapsiblePrimitive.Trigger.Props & {
  icon?: React.ReactNode
  label?: React.ReactNode
  /** Right-aligned detail: a duration, a count, a model. */
  meta?: React.ReactNode
  showStatus?: boolean
  statusLabels?: Record<TraceStatus, string>
}) {
  const { status, variant } = useTrace()

  return (
    <CollapsiblePrimitive.Trigger
      data-slot="trace-trigger"
      className={cn(
        "group/trace-trigger flex items-center gap-2 text-start text-muted-foreground outline-none",
        variant === "card"
          ? "w-full px-3 py-2 text-foreground hover:bg-muted/50 focus-visible:bg-muted/50"
          : "w-fit rounded-lg hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30",
        "[&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      {icon ? (
        <span aria-hidden className="flex shrink-0 text-muted-foreground">
          {icon}
        </span>
      ) : null}
      <span
        className={cn(
          "min-w-0 truncate",
          variant === "card" && "flex-1 font-medium",
          status === "running" && "shimmer"
        )}
      >
        {children ?? label}
      </span>
      {meta ? <span className="shrink-0 text-muted-foreground tabular-nums">{meta}</span> : null}
      {showStatus && variant === "card" ? (
        <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
          <TraceStatusIcon status={status} />
          <span>{statusLabels[status]}</span>
        </span>
      ) : null}
      <ChevronDownIcon
        aria-hidden
        className="size-3.5! shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]/trace-trigger:rotate-180"
      />
    </CollapsiblePrimitive.Trigger>
  )
}

function TraceContent({ className, children, ...props }: CollapsiblePrimitive.Panel.Props) {
  const { variant } = useTrace()

  return (
    <CollapsiblePrimitive.Panel
      data-slot="trace-content"
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          variant === "plain" && "border-s-2 border-border ps-3 text-muted-foreground",
          variant === "card" && "border-t border-border"
        )}
      >
        {children}
      </div>
    </CollapsiblePrimitive.Panel>
  )
}

/** A labelled block inside a card trace: Input, Output, Error. */
function TraceSection({
  className,
  label,
  children,
  ...props
}: React.ComponentProps<"div"> & { label?: React.ReactNode }) {
  return (
    <div
      data-slot="trace-section"
      className={cn("space-y-1.5 px-3 py-2.5 [&+&]:border-t [&+&]:border-border", className)}
      {...props}
    >
      {label ? (
        <div className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </div>
      ) : null}
      {children}
    </div>
  )
}

/** A sequence of steps on a rail, each with its own status. */
function TraceSteps({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="trace-steps"
      className={cn("m-0 flex list-none flex-col p-0", className)}
      {...props}
    />
  )
}

function TraceStep({
  className,
  status = "done",
  title,
  description,
  children,
  ...props
}: Omit<React.ComponentProps<"li">, "title"> & {
  status?: TraceStatus
  title: React.ReactNode
  description?: React.ReactNode
}) {
  return (
    <li
      data-slot="trace-step"
      data-status={status}
      className={cn(
        "relative flex gap-2.5 pb-3 text-xs last:pb-0",
        // The rail joins this step's mark to the next one.
        "before:absolute before:start-[6.5px] before:top-5 before:bottom-0 before:w-px before:bg-border last:before:hidden",
        className
      )}
      {...props}
    >
      <span className="mt-0.5 flex size-3.5 shrink-0 items-center justify-center bg-background">
        <TraceStatusIcon status={status} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span
          className={cn(
            "leading-[1.125rem] text-foreground",
            status === "pending" && "text-muted-foreground",
            status === "done" && "text-muted-foreground",
            status === "running" && "shimmer"
          )}
        >
          {title}
        </span>
        {description ? <span className="text-muted-foreground">{description}</span> : null}
        {children}
      </div>
      <span className="sr-only">, {statusLabel[status]}</span>
    </li>
  )
}

export {
  Trace,
  TraceTrigger,
  TraceContent,
  TraceSection,
  TraceSteps,
  TraceStep,
  TraceStatusIcon,
  useTrace,
}
export type { TraceStatus }
