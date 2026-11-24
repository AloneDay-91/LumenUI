import * as React from "react"

import { cn } from "@/lib/utils"

type GaugeColor = "primary" | "indigo" | "cyan" | "orange" | "crimson" | "jade"

const strokes: Record<GaugeColor, string> = {
  primary: "stroke-primary",
  indigo: "stroke-indigo-solid",
  cyan: "stroke-cyan-solid",
  orange: "stroke-orange-solid",
  crimson: "stroke-crimson-solid",
  jade: "stroke-jade-solid",
}

/**
 * A value on an open arc, with the figure and a label in the middle. The arc
 * takes the colour of the first threshold the value stays under, so 80% CPU
 * can turn orange and 95% crimson.
 */
function Gauge({
  className,
  value,
  min = 0,
  max = 100,
  label,
  format,
  thresholds = [],
  color = "primary",
  size = 160,
  thickness = 12,
  "aria-label": ariaLabel,
}: {
  className?: string
  value: number
  min?: number
  max?: number
  /** Under the figure: "CPU", "of quota". */
  label?: React.ReactNode
  /** The figure in the middle. Defaults to a rounded percentage of the range. */
  format?: (value: number) => React.ReactNode
  /** Colour once the value reaches each point, lowest first. */
  thresholds?: { from: number; color: GaugeColor }[]
  /** Colour below the first threshold. */
  color?: GaugeColor
  /** Width in pixels. The height follows. */
  size?: number
  thickness?: number
  "aria-label"?: string
}) {
  const clamped = Math.min(max, Math.max(min, value))
  const ratio = max === min ? 0 : (clamped - min) / (max - min)
  const tone = [...thresholds].sort((a, b) => a.from - b.from).reduce((current, t) => (clamped >= t.from ? t.color : current), color)

  // A 240° arc, open at the bottom.
  const sweep = 240
  const radius = 50 - thickness / 2 / (size / 100)
  const circumference = 2 * Math.PI * radius
  const arc = (circumference * sweep) / 360
  const figure = format ? format(clamped) : `${Math.round(ratio * 100)}%`

  return (
    <div
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
      aria-valuetext={typeof figure === "string" ? figure : undefined}
      data-slot="gauge"
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size * 0.86 }}
    >
      <svg viewBox="0 0 100 86" className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <g transform="rotate(150 50 50)">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth={(thickness * 100) / size}
            strokeLinecap="round"
            strokeDasharray={`${arc} ${circumference}`}
            className="stroke-muted"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth={(thickness * 100) / size}
            strokeLinecap="round"
            strokeDasharray={`${arc * ratio} ${circumference}`}
            className={cn("transition-[stroke-dasharray,stroke] duration-500 ease-out motion-reduce:transition-none", strokes[tone])}
            style={{ opacity: ratio === 0 ? 0 : 1 }}
          />
        </g>
      </svg>
      <div className="relative flex flex-col items-center pt-[8%] text-center">
        <span className="font-medium tracking-tight tabular-nums" style={{ fontSize: size * 0.17 }}>
          {figure}
        </span>
        {label ? (
          <span className="text-muted-foreground" style={{ fontSize: Math.max(11, size * 0.075) }}>
            {label}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export { Gauge }
export type { GaugeColor }
