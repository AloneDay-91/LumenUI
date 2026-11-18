"use client"

// Word Gather · adapted from snapcn (https://snapcn.dev/docs/text/word-gather).
// The beat clock, the lead word's two clocks, the scatter and the drop order are
// snapcn's measurements; the type is the site's heading face at its own weight,
// and the accent the words land in is the primary token.

import { useMemo } from "react"
import { useCurrentFrame } from "remotion"

import { Stage } from "./stage"

export const REF_W = 710
export const REF_H = 388
export const DURATION = 75

type Pt = readonly [number, number]

const LINE_CX = REF_W / 2 - 3.53
const CENTRE_X = REF_W / 2
const CENTRE_Y = REF_H / 2
const CAP = 35.82
const LINE_H = 48.18
const DROP = 5.77
const CAP_RATIO = 0.74909
const ASC = 0.9527
const LEADING = 1.2103
/** The site's heading tracking. */
const TRACKING = -0.02

const FIRST_AT = 20
const STAGGER = 1
const SETTLE = 4
const LEAD_RISE = 20.6

/** Output frames to beats of the reference. */
const BEAT: readonly Pt[] = [
  [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [6, 5], [7, 6], [8, 7], [9, 8], [10, 9], [12, 10], [13, 11],
  [14, 12], [15, 13], [17, 14], [18, 15], [19, 16], [20, 17], [22, 18], [23, 19], [24, 20], [26, 21],
  [27, 22], [28, 23], [29, 24], [31, 25], [32, 26], [33, 27], [34, 28], [35, 29], [37, 30], [38, 31],
  [39, 32], [41, 33], [42, 34], [43, 35], [44, 36], [45, 37], [47, 38], [48, 39],
]
const TRAVEL: readonly Pt[] = [
  [0, 0], [1, 0.391], [2, 0.563], [3, 0.686], [4, 0.77], [5, 0.836], [6, 0.887], [7, 0.928], [8, 0.96],
  [9, 0.982], [10, 0.991], [12, 0.996], [14, 1],
]
const LEAD_X: readonly Pt[] = [
  [10, 0], [11, 0.004], [12, 0.007], [13, 0.02], [14, 0.036], [15, 0.063], [16, 0.107], [17, 0.18],
  [18, 0.317], [19, 0.547], [20, 0.701], [21, 0.793], [22, 0.852], [23, 0.892], [24, 0.921], [25, 0.946],
  [26, 0.959], [27, 0.97], [28, 0.98], [29, 0.99], [30, 0.992], [31, 1],
]
const LEAD_Y: readonly Pt[] = [
  [0, 0], [1, 0.131], [2, 0.211], [3, 0.27], [4, 0.329], [5, 0.35], [6, 0.391], [7, 0.411], [8, 0.4341],
  [9, 0.47], [10, 0.514], [11, 0.612], [12, 0.817], [13, 0.905], [14, 0.949], [15, 0.985], [16, 1],
]
const SCALE: readonly Pt[] = [
  [0, 1.289], [18, 1.289], [19, 1.2798], [20, 1.2782], [21, 1.2727], [22, 1.264], [23, 1.2546], [24, 1.2414],
  [25, 1.2184], [26, 1.159], [27, 1.0689], [28, 1.0417], [29, 1.0275], [30, 1.0193], [31, 1.0132],
  [32, 1.0081], [33, 1.0064], [34, 1], [39, 1],
]
/** Where each word lands before it slides home, from its slot. */
const SCATTER: readonly Pt[] = [
  [44.4, -59.2],
  [73.8, -1],
  [-31.7, -1.7],
  [12.4, 41],
  [96.2, -1.7],
]
const ORDER: readonly number[] = [5, 3, 1, 4, 2]

function track(table: readonly Pt[], at: number): number {
  const first = table[0]
  const last = table[table.length - 1]
  if (!first || !last) return 0
  if (at <= first[0]) return first[1]
  if (at >= last[0]) return last[1]
  for (let i = 0; i < table.length - 1; i++) {
    const a = table[i]
    const b = table[i + 1]
    if (!a || !b) break
    if (at <= b[0]) return a[1] + ((b[1] - a[1]) * (at - a[0])) / (b[0] - a[0])
  }
  return last[1]
}

/** The words after the lead, in the order they drop: snapcn's seed, then everything else. */
function dropOrder(n: number): number[] {
  const out: number[] = []
  const seen = new Set<number>()
  const take = (i: number) => {
    if (i >= 1 && i <= n && !seen.has(i)) {
      seen.add(i)
      out.push(i)
    }
  }
  for (const seed of ORDER) take(seed <= n ? seed : ((seed - 1) % n) + 1)
  for (let i = 1; i <= n; i++) take(i)
  return out
}

type Slot = { x: number; baseline: number }

/** The wrap and every slot, solved once at scale 1, so the line can never reflow under the motion. */
function solve(widths: number[], space: number, maxWidth: number): Slot[] {
  const lines: number[][] = [[]]
  let run = 0
  widths.forEach((w, i) => {
    const line = lines[lines.length - 1] as number[]
    const add = (line.length ? space : 0) + w
    if (line.length > 0 && run + add > maxWidth) {
      lines.push([i])
      run = w
    } else {
      line.push(i)
      run += add
    }
  })
  const top = CENTRE_Y + CAP / 2 + DROP - ((lines.length - 1) * LINE_H) / 2
  const out: Slot[] = []
  lines.forEach((line, k) => {
    const total = line.reduce((sum, i) => sum + (widths[i] ?? 0), 0) + space * (line.length - 1)
    let x = LINE_CX - total / 2
    for (const i of line) {
      out[i] = { x, baseline: top + k * LINE_H }
      x += (widths[i] ?? 0) + space
    }
  })
  return out
}

export interface WordGatherProps {
  text?: string
  maxWidth?: number
}

/** A sentence that arrives one word at a time, out of order, and gathers. */
export function WordGather({
  text = "Components you copy, paste and own.",
  maxWidth = 520,
}: WordGatherProps) {
  const frame = useCurrentFrame()
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text])
  const size = CAP / CAP_RATIO

  const { widths, space } = useMemo(() => {
    const ctx = typeof document === "undefined" ? null : document.createElement("canvas").getContext("2d")
    if (!ctx) return { widths: words.map((w) => w.length * size * 0.52), space: size * 0.26 }
    ctx.font = `400 ${size}px ${getComputedStyle(document.body).fontFamily}`
    ctx.letterSpacing = `${TRACKING * size}px`
    return { widths: words.map((w) => ctx.measureText(w).width), space: ctx.measureText(" ").width }
  }, [words, size])
  const slots = useMemo(() => solve(widths, space, maxWidth), [widths, space, maxWidth])
  const order = useMemo(() => dropOrder(words.length - 1), [words.length])

  const b = track(BEAT, frame)
  const s = track(SCALE, b)
  const aloneX = LINE_CX - (widths[0] ?? 0) / 2
  const aloneBase = CENTRE_Y + CAP / 2
  const lx = track(LEAD_X, b)
  const ly = track(LEAD_Y, b)

  return (
    <Stage width={REF_W} height={REF_H}>
      {words.map((word, i) => {
        const slot = slots[i]
        if (!slot) return null
        let x = slot.x
        let base = slot.baseline
        let landed = 1
        if (i === 0) {
          // The lead runs on two clocks: it drops onto its line, then slides along it.
          x = slot.x + (aloneX - slot.x) * (1 - lx)
          base = slot.baseline + (aloneBase - slot.baseline + LEAD_RISE) * (1 - ly)
        } else {
          const k = order.indexOf(i)
          const at = FIRST_AT + STAGGER * (k < 0 ? i - 1 : k)
          if (b < at) return null
          const p = track(TRAVEL, b - at)
          const d = SCATTER[(i - 1) % SCATTER.length] ?? [0, 0]
          x = slot.x + d[0] * (1 - p)
          base = slot.baseline + d[1] * (1 - p)
          // Lands in the accent and turns to ink as it settles.
          landed = Math.min(1, Math.max(0, (b - at) / SETTLE))
        }
        const rise = ASC * size
        return (
          <div
            key={`${i}:${word}`}
            className="absolute font-heading font-normal whitespace-pre"
            style={{
              left: CENTRE_X + (x - CENTRE_X) * s,
              top: CENTRE_Y + (base - CENTRE_Y) * s - rise,
              fontSize: size,
              lineHeight: LEADING,
              letterSpacing: `${TRACKING}em`,
              scale: s,
              transformOrigin: `0 ${rise}px`,
              color: `color-mix(in oklch, var(--foreground) ${landed * 100}%, var(--primary))`,
            }}
          >
            {word}
          </div>
        )
      })}
    </Stage>
  )
}

export default WordGather
