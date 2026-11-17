"use client"

import * as React from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { cn } from "@/lib/utils"

type ContextUsage = {
  input?: number
  output?: number
  reasoning?: number
  cached?: number
}

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 })

/** A ring that fills with the share of the window used. */
function Ring({ value }: { value: number }) {
  const radius = 6
  const circumference = 2 * Math.PI * radius
  const tone = value >= 0.9 ? "var(--crimson-solid)" : value >= 0.7 ? "var(--orange-solid)" : "currentColor"
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 -rotate-90">
      <circle cx="8" cy="8" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
      <circle
        cx="8"
        cy="8"
        r={radius}
        fill="none"
        stroke={tone}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - Math.min(1, value))}
        className="transition-[stroke-dashoffset] duration-300"
      />
    </svg>
  )
}

/**
 * How much of the context window the conversation has used: a ring and a
 * percentage, with the breakdown and the cost in a Popover.
 */
function Context({
  used,
  max,
  usage,
  cost,
  model,
  className,
}: {
  /** Tokens in the window now. */
  used: number
  /** Window size in tokens. */
  max: number
  usage?: ContextUsage
  /** Already formatted, e.g. "$0.04". */
  cost?: string
  model?: string
  className?: string
}) {
  const share = max > 0 ? used / max : 0
  const percent = Math.round(share * 100)
  const rows = [
    ["Input", usage?.input],
    ["Output", usage?.output],
    ["Reasoning", usage?.reasoning],
    ["Cached", usage?.cached],
  ].filter(([, value]) => value !== undefined) as [string, number][]

  return (
    <Popover>
      <PopoverTrigger
        data-slot="context"
        aria-label={`Context window, ${percent}% used`}
        className={cn(
          "inline-flex h-7 items-center gap-1.5 rounded-full px-2 font-mono text-[11px] text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30",
          className
        )}
      >
        <Ring value={share} />
        {percent}%
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-0 text-xs">
        <div className="flex flex-col gap-2 p-3">
          <div className="flex items-baseline justify-between">
            <span className="font-medium">Context window</span>
            <span className="font-mono text-muted-foreground">{percent}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full bg-primary",
                share >= 0.7 && "bg-orange-solid",
                share >= 0.9 && "bg-crimson-solid"
              )}
              style={{ width: `${Math.min(100, percent)}%` }}
            />
          </div>
          <div className="font-mono text-[11px] text-muted-foreground">
            {compact.format(used)} / {compact.format(max)} tokens{model ? ` · ${model}` : ""}
          </div>
        </div>
        {rows.length > 0 || cost ? (
          <dl className="m-0 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-t border-border p-3">
            {rows.map(([label, value]) => (
              <React.Fragment key={label}>
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="m-0 text-end font-mono tabular-nums">{compact.format(value)}</dd>
              </React.Fragment>
            ))}
            {cost ? (
              <>
                <dt className="font-medium">Cost</dt>
                <dd className="m-0 text-end font-mono font-medium tabular-nums">{cost}</dd>
              </>
            ) : null}
          </dl>
        ) : null}
      </PopoverContent>
    </Popover>
  )
}

export { Context }
export type { ContextUsage }
