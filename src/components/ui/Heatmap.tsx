"use client"

import * as React from "react"
import { addDays, format as formatIso, startOfDay, startOfWeek } from "date-fns"

import { cn } from "@/lib/utils"

type HeatmapValue = { date: Date | string; value: number }

const subscribeNothing = () => () => {}

// Five steps from the muted surface to the primary.
const levels = [
  "bg-muted",
  "bg-[color-mix(in_oklch,var(--primary)_28%,var(--muted))]",
  "bg-[color-mix(in_oklch,var(--primary)_50%,var(--muted))]",
  "bg-[color-mix(in_oklch,var(--primary)_75%,var(--muted))]",
  "bg-primary",
]

/**
 * A year of activity as a grid of days, one column per week, in five steps
 * of the primary. Each day has its value as a tooltip; the whole grid reads
 * as one summary for screen readers.
 */
function Heatmap({
  className,
  data,
  end,
  weeks = 53,
  weekStartsOn = 1,
  max: maxProp,
  locale,
  labels = {},
}: {
  className?: string
  /** One entry per day. Days that are missing count as 0. */
  data: HeatmapValue[]
  /** Last day shown. Defaults to today. */
  end?: Date
  /** Columns. 53 is a year. */
  weeks?: number
  weekStartsOn?: 0 | 1
  /** The value that gets the darkest step. Defaults to the highest in data. */
  max?: number
  /** Language of month and day names. */
  locale?: string
  labels?: {
    /** Tooltip of a day: "3 contributions on Monday, 24 November". */
    value?: (value: number, date: Date) => string
    /** Summary read by screen readers. */
    summary?: (total: number, days: number) => string
    less?: string
    more?: string
  }
}) {
  const hydrated = React.useSyncExternalStore(subscribeNothing, () => true, () => false)
  const last = startOfDay(end ?? (hydrated ? new Date() : new Date(2000, 0, 1)))
  const first = addDays(startOfWeek(last, { weekStartsOn }), -(weeks - 1) * 7)

  const byDay = React.useMemo(() => {
    const map = new Map<string, number>()
    for (const entry of data) {
      const key = formatIso(typeof entry.date === "string" ? new Date(entry.date) : entry.date, "yyyy-MM-dd")
      map.set(key, (map.get(key) ?? 0) + entry.value)
    }
    return map
  }, [data])

  const max = maxProp ?? Math.max(1, ...byDay.values())
  const level = (value: number) => (value <= 0 ? 0 : Math.min(4, Math.ceil((value / max) * 4)))
  const fmt = (options: Intl.DateTimeFormatOptions, date: Date) => new Intl.DateTimeFormat(locale, options).format(date)

  const columns = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const date = addDays(first, w * 7 + d)
      return { date, value: date > last ? null : (byDay.get(formatIso(date, "yyyy-MM-dd")) ?? 0) }
    })
  )

  let total = 0
  let active = 0
  for (const column of columns)
    for (const day of column)
      if (day.value) {
        total += day.value
        active++
      }

  const scrollRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    // Open on the latest weeks when the grid is wider than its box.
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
  }, [hydrated])

  return (
    <div data-slot="heatmap" className={cn("flex w-full flex-col gap-2 text-[10px] text-muted-foreground", className)}>
      <div className="flex min-w-0">
      {/* Weekday labels stay put while the weeks scroll. */}
      <div aria-hidden className="grid shrink-0 gap-[3px] pe-1.5" style={{ gridTemplateRows: "0.875rem repeat(7, 11px)" }}>
        <span />
        {Array.from({ length: 7 }, (_, d) => (
          <span key={d} className="leading-[11px]">
            {hydrated && d % 2 === 1 ? fmt({ weekday: "short" }, addDays(first, d)) : ""}
          </span>
        ))}
      </div>
      <div
        ref={scrollRef}
        role="img"
        aria-label={
          !hydrated
            ? undefined
            : (labels.summary?.(total, active) ??
              `${total} in total over ${active} active days, ${fmt({ dateStyle: "medium" }, first)} to ${fmt({ dateStyle: "medium" }, last)}`)
        }
        className="min-w-0 flex-1 overflow-x-auto pb-1"
      >
        <div className="inline-grid grid-flow-col gap-[3px]" style={{ gridTemplateRows: "0.875rem repeat(7, 11px)" }}>
          {columns.map((column, w) => {
            // Name a month over the week its first day falls in. The first
            // column names its own month unless another starts right after.
            const firstOfMonth = column.find((day) => day.date.getDate() === 1)?.date
            const monthSoon = columns.slice(1, 3).some((c) => c.some((day) => day.date.getDate() === 1))
            const month = firstOfMonth ?? (w === 0 && !monthSoon ? column[0].date : null)
            return (
              <React.Fragment key={w}>
                <span className="h-3.5 w-[11px] overflow-visible leading-none whitespace-nowrap">
                  {hydrated && month ? fmt({ month: "short" }, month) : ""}
                </span>
                {column.map(({ date, value }) =>
                  value === null ? (
                    <span key={+date} className="size-[11px]" />
                  ) : (
                    <span
                      key={+date}
                      title={
                        hydrated
                          ? (labels.value?.(value, date) ??
                            `${value} on ${fmt({ weekday: "long", day: "numeric", month: "long" }, date)}`)
                          : undefined
                      }
                      className={cn("size-[11px] rounded-[3px] ring-1 ring-foreground/5 ring-inset", levels[level(value)])}
                    />
                  )
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
      </div>
      <div aria-hidden className="flex items-center justify-end gap-[3px]">
        <span className="me-1">{labels.less ?? "Less"}</span>
        {levels.map((tone) => (
          <span key={tone} className={cn("size-[11px] rounded-[3px] ring-1 ring-foreground/5 ring-inset", tone)} />
        ))}
        <span className="ms-1">{labels.more ?? "More"}</span>
      </div>
    </div>
  )
}

export { Heatmap }
export type { HeatmapValue }
