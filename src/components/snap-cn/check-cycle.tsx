"use client"

// Check Cycle · adapted from snapcn (https://snapcn.dev/docs/text/check-cycle).
// The roll every two thirds of a second, the hold and the step back are
// snapcn's measurements, without the checkbox; the type is the site's heading
// face at its own weight.

import { Easing, useCurrentFrame, useVideoConfig } from "remotion"

import { Stage } from "./stage"

export const REF_W = 718
export const REF_H = 394
export const DURATION = 135

const SIZE = 21.78
/** The space between the headline and the rolling word: one word space of the type. */
const GAP = SIZE * 0.28
/** The centre line of the row. */
const ROW_Y = 197.2
/** The window the words roll through. */
const SLOT = [171.37, 223.62] as const
const TRAVEL = [44.19, 42.27] as const
const ROLL_AT = 0.0324
const ROLL_EVERY = 0.667
const ROLL_FOR = 0.5
const ROLL_EASE = Easing.bezier(0.65, 0, 0.35, 1)
const HOLD = 1.004
const PIVOT = [359.14, 197.52] as const
const ZOOM_TO = 0.8
const ZOOM_FOR = 0.6
const ZOOM_EASE = Easing.bezier(0.65, 0, 0.35, 1)

const unit = (v: number) => Math.min(1, Math.max(0, v))

/** How far the strip has rolled: every roll is the same eased step, summed. */
function stripAt(now: number, n: number): number {
  let s = 0
  for (let k = 0; k < n - 1; k++) {
    s += (TRAVEL[k % TRAVEL.length] ?? 0) * ROLL_EASE(unit((now - (ROLL_AT + k * ROLL_EVERY)) / ROLL_FOR))
  }
  return s
}

function restOf(k: number): number {
  let c = 0
  for (let j = 0; j < k; j++) c += TRAVEL[j % TRAVEL.length] ?? 0
  return c
}

export interface CheckCycleProps {
  headline?: string
  /** Comma-separated. */
  words?: string
}

/** A sentence that finishes itself over and over and steps back and rests. */
export function CheckCycle({
  headline = "Build",
  words = "Landing pages, Dashboards, Docs sites, SaaS apps, Admin panels, And more",
}: CheckCycleProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const list = words.split(",").map((w) => w.trim()).filter(Boolean)
  const n = Math.max(1, list.length)
  const now = frame / fps
  const s = stripAt(now, n)
  const zoomStart = ROLL_AT + Math.max(0, n - 2) * ROLL_EVERY + HOLD
  const z = 1 - (1 - ZOOM_TO) * ZOOM_EASE(unit((now - zoomStart) / ZOOM_FOR))

  return (
    <Stage width={REF_W} height={REF_H}>
      <div className="absolute inset-0" style={{ scale: z, transformOrigin: `${PIVOT[0]}px ${PIVOT[1]}px` }}>
        {/* One row: the headline and the rolling word share a single centre line. */}
        <div
          className="absolute inset-x-0 grid grid-cols-[1fr_auto_1fr] items-center font-heading font-normal tracking-[-0.02em] whitespace-nowrap text-foreground"
          style={{ top: ROW_Y, translate: "0 -50%", fontSize: SIZE, lineHeight: 1 }}
        >
          <span className="justify-self-end">
            {headline}
          </span>
          {/* Where the checkbox stood: the row still turns about this point. */}
          <span style={{ width: GAP }} />
          <span className="relative overflow-clip" style={{ height: SLOT[1] - SLOT[0] }}>
            {list.map((word, k) => {
              const y = restOf(k) - s
              if (Math.abs(y) > SLOT[1] - SLOT[0] + SIZE) return null
              return (
                <span
                  key={`${k}-${word}`}
                  className="absolute top-1/2 left-0"
                  style={{ translate: `0 calc(-50% + ${y}px)` }}
                >
                  {word}
                </span>
              )
            })}
            {/* Holds the column as wide as its longest word, so the row stays centred on the box. */}
            <span className="invisible block h-0">{list.reduce((a, b) => (b.length > a.length ? b : a), "")}</span>
          </span>
        </div>
      </div>
    </Stage>
  )
}

export default CheckCycle
