"use client"

// Word Wheel · adapted from snapcn (https://snapcn.dev/docs/text/word-wheel).
// The reel's roll, its swell into the slot and its fade with distance are
// snapcn's measured curves, played slower; the type is the site's heading face
// and weight, each framework carries its official mark, and the reel runs from
// the muted ink to the ink.

import type { ReactNode } from "react"
import { useCurrentFrame, useVideoConfig } from "remotion"

import { FrameworkMark } from "@/components/marketing/FrameworkMarks"
import { StackMark } from "@/components/marketing/StackMarks"

import { Stage } from "./stage"

export const REF_W = 638
export const REF_H = 354
/** The measured roll, played this much slower so every name can be read. */
const SLOW = 1.6
export const DURATION = 120

type Table = readonly (readonly [number, number])[]

const PITCH = 34
const BASE_Y = 183.8
const GAP = 8.01
const INDENT = 30.87
const SIZE = 30.63
const ASC = 25.43
const SMALL = 1 / 1.665
const SWAP = 0.07

/** How far the reel has rolled, against seconds: decelerating over a second and three quarters. */
const ROLL: Table = [
  [0.1583, 0.00033], [0.175, 0.02175], [0.2083, 0.05298], [0.2417, 0.08995], [0.275, 0.13203],
  [0.3083, 0.18194], [0.3417, 0.23034], [0.3833, 0.28119], [0.4167, 0.32889], [0.45, 0.37627],
  [0.4833, 0.42203], [0.5167, 0.46322], [0.5583, 0.50415], [0.575, 0.54044], [0.6083, 0.57445],
  [0.6417, 0.6073], [0.675, 0.63751], [0.7083, 0.66516], [0.7417, 0.69074], [0.775, 0.71485],
  [0.8083, 0.73897], [0.8417, 0.75963], [0.875, 0.77896], [0.9083, 0.79751], [0.9417, 0.81422],
  [0.975, 0.83177], [1.0167, 0.84767], [1.05, 0.86162], [1.0833, 0.87394], [1.1167, 0.88608],
  [1.1417, 0.89735], [1.175, 0.9077], [1.2083, 0.91734], [1.2417, 0.92633], [1.275, 0.93528],
  [1.3083, 0.94438], [1.35, 0.95087], [1.3833, 0.95819], [1.4417, 0.96961], [1.475, 0.97442],
  [1.5083, 0.97863], [1.5417, 0.98239], [1.575, 0.98571], [1.6083, 0.98903], [1.6417, 0.99161],
  [1.6833, 0.99381], [1.7167, 0.99569], [1.75, 0.99732], [1.7833, 0.99858], [1.8083, 0.99926],
  [1.8417, 1],
]
/** Opacity against distance from the slot, as a fraction of the frame height. */
const FADE: Table = [
  [0, 1], [0.085, 0.97], [0.155, 0.89], [0.22, 0.744], [0.288, 0.518], [0.356, 0.357], [0.424, 0.25],
  [0.492, 0.185],
]

function read(table: Table, v: number, at: 0 | 1 = 0): number {
  const to = at === 0 ? 1 : 0
  const first = table[0]
  const last = table[table.length - 1]
  if (!first || !last) return 0
  if (v <= first[at]) return first[to]
  if (v >= last[at]) return last[to]
  for (let i = 1; i < table.length; i++) {
    const hi = table[i]
    const lo = table[i - 1]
    if (hi && lo && v <= hi[at]) return lo[to] + ((hi[to] - lo[to]) * (v - lo[at])) / (hi[at] - lo[at])
  }
  return last[to]
}

/** When the roll reaches a fraction of its travel. */
function rollReaches(p: number): number {
  const first = ROLL[0]
  const last = ROLL[ROLL.length - 1]
  if (!first || !last) return Number.POSITIVE_INFINITY
  if (p <= first[1]) return Number.NEGATIVE_INFINITY
  if (p > last[1]) return Number.POSITIVE_INFINITY
  return read(ROLL, p, 1)
}

function swell(t: number): number {
  if (t <= 0) return 0
  if (t >= SWAP) return 1
  return 1 - (1 - t / SWAP) ** 3
}

/** The official marks the site already uses for its frameworks. */
const MARKS: Record<string, ReactNode> = {
  "any React app": <StackMark id="react" className="size-full" />,
  "Next.js": <FrameworkMark id="next" className="size-full" />,
  Vite: <FrameworkMark id="vite" className="size-full" />,
  "React Router": <FrameworkMark id="react-router" className="size-full" />,
  Astro: <FrameworkMark id="astro" className="size-full" />,
  "TanStack Start": <FrameworkMark id="tanstack" className="size-full" />,
}

/** A word with its mark, as one line item of the reel. */
function Entry({ word }: { word: string }) {
  return (
    <span className="inline-flex items-center gap-[0.3em]">
      {MARKS[word] ? <span className="flex size-[0.8em] shrink-0">{MARKS[word]}</span> : null}
      {word}
    </span>
  )
}

export interface WordWheelProps {
  headline?: string
  /** Comma-separated. The reel rolls once through and stops back on the first. */
  words?: string
}

/** A column of words spins like a reel and stops on one, beside a lead-in that holds the line. */
export function WordWheel({
  headline = "Built for",
  words = "any React app, Next.js, Vite, React Router, Astro, TanStack Start",
}: WordWheelProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const reel = words.split(",").map((w) => w.trim()).filter(Boolean)
  const rows = reel.length || 1
  const travel = rows * PITCH
  const now = frame / fps / SLOW
  const s = read(ROLL, now) * travel
  const first = Math.ceil((s - BASE_Y - PITCH) / PITCH)
  const last = Math.floor((s - BASE_Y + REF_H + PITCH) / PITCH)

  return (
    <Stage width={REF_W} height={REF_H}>
      {/* Centred as a whole sentence on the word it stops on, so the answer lands mid-frame. */}
      <div
        className="absolute font-heading font-normal tracking-[-0.02em] whitespace-nowrap text-foreground"
        style={{ left: "50%", top: BASE_Y - ASC, fontSize: SIZE, lineHeight: 1, translate: "-50% 0" }}
      >
        {headline}
        {/* A zero-width anchor as tall as the line, top-aligned, so the reel hangs from the line's top, not its baseline. */}
        <span className="relative inline-block w-0 align-top" style={{ height: "1em" }}>
          {Array.from({ length: last - first + 1 }, (_, n) => {
            const i = first + n
            const y = BASE_Y + PITCH * i - s
            const d = y - BASE_Y
            const p =
              swell(now - rollReaches((PITCH * (i - 0.5)) / travel)) -
              swell(now - rollReaches((PITCH * (i + 0.5)) / travel))
            return (
              <div
                key={i}
                className="absolute top-0 whitespace-nowrap"
                style={{
                  left: GAP + INDENT,
                  translate: `${-INDENT * p}px ${y - BASE_Y}px`,
                  scale: SMALL + (1 - SMALL) * p,
                  transformOrigin: "0 50%",
                  opacity: read(FADE, Math.abs(d) / REF_H),
                  color: `color-mix(in oklch, var(--foreground) ${p * 100}%, var(--muted-foreground))`,
                }}
              >
                <Entry word={reel[((i % rows) + rows) % rows] ?? ""} />
              </div>
            )
          })}
        </span>
        {/* Holds the resting word's width, so the sentence is centred on how it ends. */}
        <span className="invisible inline-block" style={{ marginLeft: GAP }}>
          <Entry word={reel[0] ?? ""} />
        </span>
      </div>
    </Stage>
  )
}

export default WordWheel
