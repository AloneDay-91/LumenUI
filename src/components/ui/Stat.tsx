import * as React from "react"
import { ArrowDownRightIcon, ArrowUpRightIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Stat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat"
      className={cn("flex min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function StatLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-label"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function StatValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-value"
      className={cn(
        "font-heading text-2xl leading-none font-medium tracking-tight tabular-nums",
        className
      )}
      {...props}
    />
  )
}

type StatTrend = "up" | "down" | "neutral"

const trendIcon = {
  up: ArrowUpRightIcon,
  down: ArrowDownRightIcon,
  neutral: MinusIcon,
} satisfies Record<StatTrend, React.ComponentType<{ className?: string }>>

const trendLabel: Record<StatTrend, string> = {
  up: "Up",
  down: "Down",
  neutral: "No change",
}

function StatDelta({
  className,
  trend = "neutral",
  intent,
  srLabel = trendLabel[trend],
  children,
  ...props
}: React.ComponentProps<"span"> & {
  trend?: StatTrend
  /** Which colour reads as good. Defaults to the trend: up is jade, down is crimson. */
  intent?: "positive" | "negative" | "neutral"
  srLabel?: string
}) {
  const Icon = trendIcon[trend]
  const tone =
    intent ?? (trend === "up" ? "positive" : trend === "down" ? "negative" : "neutral")

  return (
    <span
      data-slot="stat-delta"
      data-trend={trend}
      className={cn(
        "inline-flex w-fit items-center gap-0.5 rounded-2xl px-1.5 py-0.5 text-xs font-medium tabular-nums",
        tone === "positive" && "bg-jade-wash text-jade-ink",
        tone === "negative" && "bg-crimson-wash text-crimson-ink",
        tone === "neutral" && "bg-secondary text-secondary-foreground",
        className
      )}
      {...props}
    >
      <Icon aria-hidden className="size-3" />
      <span className="sr-only">{srLabel} </span>
      {children}
    </span>
  )
}

function StatDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stat-description"
      className={cn("m-0 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Stat, StatLabel, StatValue, StatDelta, StatDescription }
