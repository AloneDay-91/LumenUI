"use client"

import * as React from "react"
import { FileIcon, SearchIcon } from "lucide-react"

import {
  Trace,
  TraceContent,
  TraceStep,
  TraceSteps,
  TraceTrigger,
  type TraceStatus,
} from "@/components/ui/Trace"
import { cn } from "@/lib/utils"

/**
 * What the agent is doing, as it does it: a plain Trace whose title is the
 * task and whose body lists each action as it happens.
 */
function Task({
  title,
  status = "running",
  icon = <SearchIcon />,
  children,
  defaultOpen = true,
  ...props
}: Omit<React.ComponentProps<typeof Trace>, "variant" | "children" | "title"> & {
  title: React.ReactNode
  status?: TraceStatus
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Trace data-slot="task" status={status} defaultOpen={defaultOpen} {...props}>
      <TraceTrigger icon={icon} label={title} />
      <TraceContent>
        <TraceSteps className="py-1">{children}</TraceSteps>
      </TraceContent>
    </Trace>
  )
}

const TaskItem = TraceStep

/** A file the task read or wrote, as a small chip inside an item. */
function TaskFile({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="task-file"
      className={cn(
        "inline-flex h-5 w-fit items-center gap-1 rounded-md bg-muted px-1.5 font-mono text-[11px] text-foreground",
        className
      )}
      {...props}
    >
      <FileIcon aria-hidden className="size-3 text-muted-foreground" />
      {children}
    </span>
  )
}

export { Task, TaskItem, TaskFile }
export type { TraceStatus as TaskStatus }
