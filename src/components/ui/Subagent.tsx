"use client"

import * as React from "react"
import { BotIcon } from "lucide-react"

import { Trace, TraceContent, TraceSection, TraceTrigger, type TraceStatus } from "@/components/ui/Trace"

/**
 * A run handed to another agent: its name, the task it got, the tools it
 * called (as nested Tool traces), and what it returned.
 */
function Subagent({
  name,
  status = "done",
  meta,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Trace>, "variant" | "children"> & {
  name: React.ReactNode
  status?: TraceStatus
  /** Duration, tool count, or model. */
  meta?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Trace data-slot="subagent" variant="card" status={status} {...props}>
      <TraceTrigger icon={<BotIcon />} label={name} meta={meta} />
      <TraceContent>{children}</TraceContent>
    </Trace>
  )
}

/** The brief the subagent received. */
function SubagentTask({ children }: { children: React.ReactNode }) {
  return (
    <TraceSection label="Task">
      <p className="m-0 text-muted-foreground">{children}</p>
    </TraceSection>
  )
}

/** The subagent's own steps, usually Tool traces. */
function SubagentSteps({ children, label = "Steps" }: { children: React.ReactNode; label?: string }) {
  return (
    <TraceSection label={label}>
      <div className="flex flex-col gap-1.5">{children}</div>
    </TraceSection>
  )
}

/** What it handed back. */
function SubagentResult({ children, label = "Result" }: { children: React.ReactNode; label?: string }) {
  return (
    <TraceSection label={label}>
      <div className="text-foreground">{children}</div>
    </TraceSection>
  )
}

export { Subagent, SubagentTask, SubagentSteps, SubagentResult }
