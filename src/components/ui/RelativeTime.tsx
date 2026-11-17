"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["week", 7 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

function relative(date: Date, now: number, locale: string | undefined) {
  const seconds = Math.round((date.getTime() - now) / 1000)
  const format = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size || unit === "second") {
      if (unit === "second" && Math.abs(seconds) < 45) return format.format(0, "second")
      return format.format(Math.round(seconds / size), unit)
    }
  }
  return ""
}

/** How often to re-render: every 15s in the first minute, then by the unit shown. */
function nextTick(date: Date, now: number) {
  const age = Math.abs(now - date.getTime()) / 1000
  if (age < 60) return 15_000
  if (age < 3600) return 60_000
  if (age < 86_400) return 3_600_000
  return null
}

/**
 * "3 minutes ago" that keeps itself current. A native <time> with the exact
 * date in its title and dateTime, so the precise moment is one hover away.
 */
function RelativeTime({
  className,
  date: dateProp,
  locale,
  titleFormat = { dateStyle: "medium", timeStyle: "short" },
  ...props
}: Omit<React.ComponentProps<"time">, "dateTime" | "children"> & {
  date: Date | string | number
  locale?: string
  titleFormat?: Intl.DateTimeFormatOptions
}) {
  const date = React.useMemo(() => new Date(dateProp), [dateProp])
  // Default to the page's language, not the browser's, so the text matches the UI around it.
  const resolvedLocale =
    locale ?? (typeof document === "undefined" ? undefined : document.documentElement.lang || undefined)
  const [now, setNow] = React.useState(() => Date.now())

  React.useEffect(() => {
    const delay = nextTick(date, now)
    if (delay === null) return
    const id = setTimeout(() => setNow(Date.now()), delay)
    return () => clearTimeout(id)
  }, [date, now])

  return (
    <time
      data-slot="relative-time"
      dateTime={date.toISOString()}
      title={new Intl.DateTimeFormat(resolvedLocale, titleFormat).format(date)}
      // Server and client clocks differ by the time it takes to hydrate.
      suppressHydrationWarning
      className={cn("tabular-nums", className)}
      {...props}
    >
      {relative(date, now, resolvedLocale)}
    </time>
  )
}

export { RelativeTime }
