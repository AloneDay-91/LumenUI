"use client"

import { useRef } from "react"

import { StrokeLine, StrokePath, useStrokeClock } from "@/components/marketing/stroke-clock"
import { cn } from "@/lib/utils"

const stroke = "[&_*]:[vector-effect:non-scaling-stroke]"

const SCAN_ROWS = [
  { y: 46, x2: 68 },
  { y: 56, x2: 74 },
  { y: 66, x2: 70 },
  { y: 76, x2: 64 },
  { y: 86, x2: 60 },
] as const

/** A file whose lines grow, then recede. The Scandar scan canvas. */
export function ScanFigure({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useStrokeClock(ref)
  return (
    <svg ref={ref} viewBox="0 0 120 120" fill="none" strokeWidth={1} aria-hidden className={cn(stroke, className)}>
      <path d="M32 20H70L84 34V102H32Z" className="stroke-foreground" />
      <path d="M70 20V34H84" className="stroke-muted-foreground" />
      {SCAN_ROWS.map((row) => (
        <line key={row.y} x1={44} x2={row.x2} y1={row.y} y2={row.y} className="stroke-muted-foreground" />
      ))}
      <line x1={38} y1={56} x2={42} y2={56} className="stroke-muted-foreground" />
      <line x1={38} y1={66} x2={42} y2={66} className="stroke-foreground" />
      <line x1={40} y1={64} x2={40} y2={68} className="stroke-foreground" />
      <line x1={38} y1={76} x2={42} y2={76} className="stroke-foreground" />
      <line x1={40} y1={74} x2={40} y2={78} className="stroke-foreground" />
      {SCAN_ROWS.map((row, i) => (
        <StrokeLine key={`ray-${row.y}`} i={i} n={SCAN_ROWS.length} x1={44} y1={row.y} x2={row.x2} y2={row.y} />
      ))}
    </svg>
  )
}

/** Lines narrowing into one mark. The Scandar compare canvas. */
const FLOWS = [
  "M52 22H104C132 22 142 58 168 58",
  "M64 40H104C132 40 142 58 168 58",
  "M74 58H196",
  "M48 76H104C132 76 142 58 168 58",
  "M58 94H104C132 94 142 58 168 58",
  "M210 58H232",
] as const

export function CompareFigure({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useStrokeClock(ref)
  return (
    <svg ref={ref} viewBox="0 0 320 120" fill="none" strokeWidth={1} aria-hidden className={cn(stroke, className)}>
      <line x1="16" y1="22" x2="52" y2="22" className="stroke-muted-foreground" />
      <line x1="16" y1="40" x2="64" y2="40" className="stroke-muted-foreground" />
      <line x1="16" y1="58" x2="74" y2="58" className="stroke-foreground" />
      <line x1="16" y1="76" x2="48" y2="76" className="stroke-muted-foreground" />
      <line x1="16" y1="94" x2="58" y2="94" className="stroke-muted-foreground" />
      {FLOWS.map((d) => (
        <path key={d} d={d} className="stroke-foreground/35" />
      ))}
      {FLOWS.map((d, i) => (
        <StrokePath key={`ray-${d}`} i={i} n={FLOWS.length} d={d} />
      ))}
      <circle cx="168" cy="58" r="4" className="fill-background stroke-foreground" />
      <path d="M200 38H238L250 50V88H200Z" className="stroke-foreground" />
      <path d="M238 38V50H250" className="stroke-muted-foreground" />
      <line x1="210" y1="68" x2="224" y2="68" className="stroke-muted-foreground" />
      <rect x="228" y="54" width="8" height="8" className="fill-foreground" />
    </svg>
  )
}

const SWATCHES = [
  { y: 38, x2: 92 },
  { y: 56, x2: 72 },
  { y: 74, x2: 84 },
] as const

/** A token sheet: the same stroke clock, drawn as swatches. */
export function PaletteFigure({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useStrokeClock(ref)
  return (
    <svg ref={ref} viewBox="0 0 120 120" fill="none" strokeWidth={1} aria-hidden className={cn(stroke, className)}>
      <rect x="22" y="22" width="76" height="76" rx="10" className="stroke-foreground" />
      {SWATCHES.map((row) => (
        <line key={row.y} x1={36} x2={row.x2} y1={row.y} y2={row.y} className="stroke-muted-foreground" />
      ))}
      <rect x="36" y="86" width="10" height="6" rx="1" className="fill-foreground" />
      {SWATCHES.map((row, i) => (
        <StrokeLine key={`ray-${row.y}`} i={i} n={SWATCHES.length} x1={36} y1={row.y} x2={row.x2} y2={row.y} />
      ))}
    </svg>
  )
}

export type MenuFigureName = "palette" | "scan" | "compare"

export function MenuFigure({ name, className }: { name: MenuFigureName; className?: string }) {
  switch (name) {
    case "palette":
      return <PaletteFigure className={className} />
    case "scan":
      return <ScanFigure className={className} />
    case "compare":
      return <CompareFigure className={className} />
    default: {
      const unreachable: never = name
      return unreachable
    }
  }
}
