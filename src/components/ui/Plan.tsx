"use client"

import * as React from "react"
import { MapIcon } from "lucide-react"

import { Trace, TraceContent, TraceStep, TraceSteps, TraceTrigger } from "@/components/ui/Trace"
import type { TraceStatus } from "@/components/ui/Trace"
import { cn } from "@/lib/utils"

type PlanItem = { id: string; title: React.ReactNode; description?: React.ReactNode; status: TraceStatus }

/**
 * The steps the agent intends to take and how far it has got: a card Trace
 * with a progress bar in the header and the steps on a rail.
 */
function Plan({
  title = "Plan",
  steps,
  className,
  defaultOpen = true,
  ...props
}: Omit<React.ComponentProps<typeof Trace>, "variant" | "status" | "children" | "title"> & {
  title?: React.ReactNode
  steps: PlanItem[]
}) {
  const done = steps.filter((step) => step.status === "done").length
  const failed = steps.some((step) => step.status === "error")
  const running = steps.some((step) => step.status === "running")
  const status: TraceStatus = failed ? "error" : done === steps.length ? "done" : running ? "running" : "pending"
  const percent = steps.length === 0 ? 0 : Math.round((done / steps.length) * 100)

  return (
    <Trace
      data-slot="plan"
      variant="card"
      status={status}
      defaultOpen={defaultOpen}
      className={className}
      {...props}
    >
      <TraceTrigger
        icon={<MapIcon />}
        label={title}
        showStatus={false}
        meta={
          <span className="flex items-center gap-2">
            <span
              role="progressbar"
              aria-label="Plan progress"
              aria-valuemin={0}
              aria-valuemax={steps.length}
              aria-valuenow={done}
              className="h-1 w-16 overflow-hidden rounded-full bg-muted"
            >
              <span
                className={cn("block h-full rounded-full bg-primary transition-[width] duration-300", failed && "bg-crimson-solid")}
                style={{ width: `${percent}%` }}
              />
            </span>
            <span className="font-mono text-[11px]">
              {done}/{steps.length}
            </span>
          </span>
        }
      />
      <TraceContent>
        <TraceSteps className="px-3 py-3">
          {steps.map((step) => (
            <TraceStep key={step.id} status={step.status} title={step.title} description={step.description} />
          ))}
        </TraceSteps>
      </TraceContent>
    </Trace>
  )
}

export { Plan }
export type { PlanItem }
