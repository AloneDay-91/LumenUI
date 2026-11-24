"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const subscribeNothing = () => () => {}

/** Fast start, gentle landing. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t))

/**
 * A number that counts up (or down) to its value, formatted for the locale.
 * It starts when it scrolls into view, runs again when the value changes,
 * and jumps straight to the value for people who ask for reduced motion.
 * Screen readers get the final value only.
 */
function NumberTicker({
  className,
  value,
  from = 0,
  duration = 1200,
  delay = 0,
  format,
  locale,
  startOnView = true,
}: {
  className?: string
  value: number
  /** Where the first count starts. Later changes start from the current value. */
  from?: number
  /** Milliseconds. */
  duration?: number
  /** Milliseconds before the first count. */
  delay?: number
  /** Intl options: currency, percent, decimals, compact notation. */
  format?: Intl.NumberFormatOptions
  locale?: string
  /** Wait until the number is on screen. */
  startOnView?: boolean
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = React.useState(from)
  const shown = React.useRef(from)
  const [visible, setVisible] = React.useState(!startOnView)

  React.useEffect(() => {
    if (visible || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [visible])

  const first = React.useRef(true)
  React.useEffect(() => {
    if (!visible) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const start = shown.current
    if (reduce || duration <= 0 || start === value) {
      shown.current = value
      setDisplay(value)
      return
    }
    let frame = 0
    let began: number | null = null
    const wait = first.current ? delay : 0
    first.current = false
    const tick = (time: number) => {
      began ??= time + wait
      const t = Math.min(1, Math.max(0, (time - began) / duration))
      const next = start + (value - start) * easeOutExpo(t)
      shown.current = next
      setDisplay(next)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, visible, duration, delay])

  // The server cannot know the visitor's locale: format in en-US until hydrated.
  const hydrated = React.useSyncExternalStore(subscribeNothing, () => true, () => false)
  const resolvedLocale = locale ?? (hydrated ? undefined : "en-US")
  const formatter = React.useMemo(() => new Intl.NumberFormat(resolvedLocale, format), [resolvedLocale, format])
  // Percentages show the value × 100, so they keep two more decimals.
  const decimals =
    (format?.maximumFractionDigits ?? format?.minimumFractionDigits ?? 0) + (format?.style === "percent" ? 2 : 0)
  // While counting, round to the decimals the final value shows.
  const rounded = display === value ? value : Number(display.toFixed(decimals))

  return (
    <span ref={ref} data-slot="number-ticker" className={cn("inline-block tabular-nums", className)}>
      <span aria-hidden>{formatter.format(rounded)}</span>
      <span className="sr-only">{formatter.format(value)}</span>
    </span>
  )
}

export { NumberTicker }
