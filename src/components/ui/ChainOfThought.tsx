"use client"

import * as React from "react"
import { ListTreeIcon } from "lucide-react"

import {
  Trace,
  TraceContent,
  TraceStep,
  TraceSteps,
  TraceTrigger,
  type TraceStatus,
} from "@/components/ui/Trace"

/**
 * A one-line summary that unfolds into the steps the agent took. While a step
 * runs, the summary shimmers; when all are done it reads as a past tense line.
 */
function ChainOfThought({
  summary,
  status = "done",
  children,
  ...props
}: Omit<React.ComponentProps<typeof Trace>, "variant" | "children"> & {
  summary: React.ReactNode
  status?: TraceStatus
  children: React.ReactNode
}) {
  return (
    <Trace data-slot="chain-of-thought" status={status} {...props}>
      <TraceTrigger icon={<ListTreeIcon />} label={summary} />
      <TraceContent>
        <TraceSteps className="py-1">{children}</TraceSteps>
      </TraceContent>
    </Trace>
  )
}

/** One step of the chain. Children hold what it found: links, images, a quote. */
const ChainOfThoughtStep = TraceStep

export { ChainOfThought, ChainOfThoughtStep }
