"use client"

// Roster Grant · adapted from snapcn (https://snapcn.dev/docs/scenes/roster-grant).
// The camera, the three rows, the pointer and the grant cascade are snapcn's
// measured curves; the cards are live Lumen components, the call to action is
// a Lumen Button, and every colour is a theme token.

import { useMemo } from "react"
import { useCurrentFrame, useVideoConfig } from "remotion"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

import { COMPONENT_EXAMPLES, type ComponentExample } from "./component-examples"
import { knots, Pointer, Stage, tint } from "./stage"

/* Geometry, in the reference's own 712 × 398 pixels. */
export const REF_W = 712
export const REF_H = 398
export const DURATION = 120

const ORIGIN = { x: 356, y: 200 }
const ROW_PITCH = 109.5
const CARD = { w: 286, h: 94, gap: 26 }
const CARD_PITCH = CARD.w + CARD.gap
const AVATAR = { size: 48, padX: 16 }
/** The Lumen button, sized up for the shot: h-11, px-6, text-sm, no icon. */
const PILL = { h: 44, padX: 24, label: 14, iconGap: 0, iconW: 0 }

/* Curves, read off the reference frame by frame. */
const TAU = 0.753
const ZOOM = 0.184
const cameraScale = (t: number) => 1 + ZOOM * Math.exp(-Math.max(0, t) / TAU)

const ROW1_T = [0, 0.322, 0.564, 0.964, 1.455, 1.964, 3.172, 3.497, 3.73, 4.005]
const ROW1_V = [0, -69.7, -104.5, -144.2, -178.2, -204.5, -242.8, -248.9, -254.8, -258.8]
const ROW3_T = [0, 0.164, 0.247, 0.322, 0.564, 0.805, 1.047, 1.405, 1.855, 2.447, 3.047, 3.364, 4.005]
const ROW3_V = [0, 58.2, 93.6, 119.7, 175.8, 216.2, 247.4, 282.6, 314.5, 342.2, 357.9, 363, 365]
const ROW_PHASE = [-118, 0, -142.3]

const PAN_T = [0, 2.95, 3.014, 3.247, 3.447, 3.564, 3.73, 3.814, 3.93, 3.972, 4.005]
const PAN_V = [0, 0, -1, -6.5, -16.5, -25.5, -43.4, -55.9, -82.4, -95.4, -113.4]
const pan = (t: number) => knots(t, PAN_T, PAN_V)

/** Room the middle row leaves either side of the button: floor, amplitude, time constant. */
const CLEARANCE = { left: [51, 57.3, 0.805], right: [65, 79.7, 0.91] } as const
const clearance = (side: "left" | "right", t: number) => {
  const [floor, amp, tau] = CLEARANCE[side]
  return floor + amp * Math.exp(-Math.max(0, t) / tau)
}

/** Down in 0.18s, back in 0.53s: a click, not a bounce. */
const PRESS_T = [1.622, 1.689, 1.764, 1.805, 1.897, 1.964, 2.047, 2.122, 2.205, 2.255, 2.33]
const PRESS_V = [1, 0.969, 0.946, 0.931, 0.949, 0.958, 0.968, 0.977, 0.986, 0.995, 1]
const FLIP_AT = 1.689

const CURSOR_T = [
  0, 0.164, 0.247, 0.322, 0.414, 0.489, 0.564, 0.722, 0.889, 0.93, 1.047, 1.164, 1.289, 1.405,
  2.03, 2.089, 2.172, 2.255, 2.33, 2.414, 2.505, 2.605, 2.73, 2.897, 3.089, 3.289, 3.497, 3.689,
  4.005,
]
const CURSOR_X = [
  123, 117.8, 110.6, 106, 103.8, 102.3, 101.7, 101.3, 101.6, 101.6, 101.8, 102.5, 103.6, 103.7,
  104.9, 107, 112.1, 121.1, 133, 143, 150.2, 158, 163.6, 168.8, 173, 175.4, 177.9, 178.4, 178.2,
]
const CURSOR_Y = [
  89.5, 85.4, 76.1, 65.6, 56.6, 49.1, 43.2, 35.4, 30.2, 28.2, 22.2, 13.8, -0.2, -2.6, -2.6, 0.5,
  5.8, 16.4, 29.6, 40.4, 48.3, 56.8, 62.7, 65.6, 72.9, 75.8, 77.6, 78.5, 78.7,
]
const LAND_INSET = 18

/** The pointer rests just inside the button's trailing edge, whatever the label's width. */
function cursorAt(t: number, half: number) {
  const x = knots(t, CURSOR_T, CURSOR_X)
  const y = knots(t, CURSOR_T, CURSOR_Y)
  const over = Math.min(1, Math.max(0, (PILL.h * 1.5 - Math.abs(y)) / PILL.h))
  const pull = Math.max(0, x - (half - LAND_INSET))
  return { x: x - pull * over, y }
}

const GRANT_AT = 70 / 30
const GRANT_STEP = 7 / 30
/** How far a card has turned to the accent: a short ease instead of a switch. */
const granted = (order: number, t: number) => Math.min(1, Math.max(0, (t + 1e-6 - (GRANT_AT + GRANT_STEP * order)) / GRANT_FADE))
const GRANT_FADE = 0.2
/** The button crossfades to the primary over this long instead of flipping on one frame. */
const FLIP_FOR = 0.15
/** Top, middle, bottom, top, bottom, middle: a system granting, not a list iterating. */
const TURNS = [
  [0, 3],
  [1, 5],
  [2, 4],
] as const
const turnOf = (row: number, step: number) => 6 * Math.floor(step / 2) + (TURNS[row % 3]?.[step % 2] ?? 0)

export type RosterEntry = ComponentExample

/** What Lumen is granting: its own components, live. */
export const LUMEN_ROSTER = COMPONENT_EXAMPLES

/** Inter's advance widths in em, so the button's width is known before it is drawn. */
const ADVANCE: Record<string, number> = {
  " ": 0.26, a: 0.541, b: 0.578, c: 0.512, d: 0.578, e: 0.541, f: 0.34, g: 0.578, h: 0.552,
  i: 0.24, j: 0.24, k: 0.512, l: 0.24, m: 0.827, n: 0.552, o: 0.571, p: 0.578, q: 0.578,
  r: 0.351, s: 0.501, t: 0.35, u: 0.552, v: 0.499, w: 0.753, x: 0.501, y: 0.499, z: 0.474,
  A: 0.665, B: 0.654, C: 0.677, D: 0.7, E: 0.6, F: 0.578, G: 0.72, H: 0.71, I: 0.273, L: 0.57,
  M: 0.872, N: 0.73, O: 0.747, P: 0.635, R: 0.635, S: 0.614, T: 0.601, U: 0.71, W: 0.948,
}
const pillWidth = (label: string) => {
  let em = 0
  for (const ch of label.trim()) em += ADVANCE[ch] ?? 0.55
  return PILL.padX * 2 + em * PILL.label + PILL.iconGap + PILL.iconW
}

function rowDrift(row: 0 | 1 | 2, t: number) {
  if (row === 0) return knots(t, ROW1_T, ROW1_V)
  if (row === 2) return knots(t, ROW3_T, ROW3_V)
  return 0
}

/** Rows 0 and 2 are marquees; row 1 is two stacks anchored to the button's edges. */
function slotRest(row: 0 | 1 | 2, slot: number, half: number) {
  if (row !== 1) return (ROW_PHASE[row] ?? 0) + slot * CARD_PITCH
  const edge = half + CARD.w / 2
  return slot < 0
    ? -(edge + CLEARANCE.left[0]) + (slot + 1) * CARD_PITCH
    : edge + CLEARANCE.right[0] + slot * CARD_PITCH
}

function rowShift(row: 0 | 1 | 2, slot: number, t: number) {
  if (row !== 1) return rowDrift(row, t)
  const side = slot < 0 ? "left" : "right"
  const open = clearance(side, t) - CLEARANCE[side][0]
  return side === "left" ? -open : open
}

/** Every slot that reaches the frame at any point, so the DOM never changes. */
function slotRange(row: 0 | 1 | 2, half: number) {
  let lo = Number.POSITIVE_INFINITY
  let hi = Number.NEGATIVE_INFINITY
  for (let t = 0; t <= 4.2; t += 0.05) {
    const reach = REF_W / 2 / cameraScale(t) + CARD.w
    lo = Math.min(lo, -pan(t) - reach)
    hi = Math.max(hi, -pan(t) + reach)
  }
  const out: number[] = []
  for (let slot = -12; slot <= 12; slot++) {
    for (let t = 0; t <= 4.2; t += 0.05) {
      const u = slotRest(row, slot, half) + rowShift(row, slot, t)
      if (u > lo && u < hi) {
        out.push(slot)
        break
      }
    }
  }
  return out
}

/** The cascade opens on the monogram nearest the middle of the frame, left of centre when it can. */
function grantSeed(row: 0 | 1 | 2, len: number, half: number) {
  const reach = REF_W / 2 / cameraScale(GRANT_AT)
  let left = Number.NEGATIVE_INFINITY
  let leftSlot: number | null = null
  let near = Number.POSITIVE_INFINITY
  let nearSlot = 0
  for (const slot of slotRange(row, half)) {
    const u = slotRest(row, slot, half) + rowShift(row, slot, GRANT_AT)
    const disc = u - CARD.w / 2 + AVATAR.padX + AVATAR.size / 2
    if (Math.abs(disc) > reach - AVATAR.size / 2) continue
    if (disc <= 0 && disc > left) {
      left = disc
      leftSlot = slot
    }
    if (Math.abs(disc) < near) {
      near = Math.abs(disc)
      nearSlot = slot
    }
  }
  const best = leftSlot ?? nearSlot
  return ((best % len) + len) % len
}

export interface RosterGrantProps {
  rows?: readonly (readonly RosterEntry[])[]
  label?: string
}

/** Rows of components stream past a button; a pointer clicks it and the roster lights up. */
export function RosterGrant({ rows = LUMEN_ROSTER, label = "Install all" }: RosterGrantProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / fps

  const half = pillWidth(label) / 2
  const point = cursorAt(t, half)
  const ranges = useMemo(() => [slotRange(0, half), slotRange(1, half), slotRange(2, half)], [half])
  const seeds = useMemo(
    () => [0, 1, 2].map((row) => grantSeed(row as 0 | 1 | 2, rows[row]?.length || 1, half)),
    [rows, half]
  )
  const press = knots(t, PRESS_T, PRESS_V)
  const on = Math.min(1, Math.max(0, (t - FLIP_AT) / FLIP_FOR))

  return (
    <Stage
      width={REF_W}
      height={REF_H}
      backdrop={
        <div
          className="absolute inset-0"
          style={{
            background: [
              `radial-gradient(58% 44% at 50% 46%, ${tint("--card", 90)} 0%, transparent 100%)`,
              `radial-gradient(78% 62% at 64% 116%, ${tint("--primary", 36)} 0%, transparent 100%)`,
              `radial-gradient(52% 46% at -4% -8%, ${tint("--primary", 14)} 0%, transparent 100%)`,
            ].join(", "),
          }}
        />
      }
    >
      {/* The camera: one scale and one pan, nothing below it reflows. */}
      <div
        className="absolute inset-0"
        style={{
          translate: `${pan(t) * cameraScale(t)}px 0`,
          scale: cameraScale(t),
          transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`,
        }}
      >
        {([0, 1, 2] as const).flatMap((row) => {
          const roster = rows[row] ?? []
          if (roster.length === 0) return []
          const seed = seeds[row] ?? 0
          const top = ORIGIN.y + (row - 1) * ROW_PITCH - CARD.h / 2
          const sides = row === 1 ? ([-1, 1] as const) : ([0] as const)
          return sides.map((side) => (
            <div
              key={`${row}:${side}`}
              className="absolute inset-0"
              style={{ translate: `${rowShift(row, side, t)}px 0` }}
            >
              {(ranges[row] ?? [])
                .filter((n) => (row === 1 ? (side < 0 ? n < 0 : n >= 0) : true))
                .map((slot) => {
                  const i = ((slot % roster.length) + roster.length) % roster.length
                  const entry = roster[i]
                  if (!entry) return null
                  const order = turnOf(row, (((i - seed) % roster.length) + roster.length) % roster.length)
                  const lit = granted(order, t)
                  return (
                    <Card
                      key={slot}
                      className="absolute gap-0 py-0 shadow-sm"
                      style={{
                        borderColor: `color-mix(in oklch, var(--primary) ${lit * 100}%, var(--border))`,
                        boxShadow: `0 0 0 2px color-mix(in oklch, var(--primary) ${lit * 25}%, transparent)`,
                        left: slotRest(row, slot, half) + ORIGIN.x - CARD.w / 2,
                        top,
                        width: CARD.w,
                        height: CARD.h,
                      }}
                    >
                      <div className="flex h-7 items-center justify-between px-3 pt-1 text-[11px] text-muted-foreground">
                        {entry.name}
                      </div>
                      <div className="flex flex-1 items-center justify-center px-3 pb-2">{entry.example}</div>
                    </Card>
                  )
                })}
            </div>
          ))
        })}

        <div
          className="absolute"
          style={{ left: ORIGIN.x, top: ORIGIN.y, translate: "-50% -50%", scale: press }}
        >
          {/* The two states of the same Button, stacked, so the flip is a crossfade. */}
          <Button tabIndex={-1} variant="outline" className="h-11 gap-2 bg-card px-6 text-sm shadow-lg">
            {label}
          </Button>
          <Button
            tabIndex={-1}
            className="absolute inset-0 h-11 gap-2 px-6 text-sm shadow-lg"
            style={{ opacity: on }}
          >
            {label}
          </Button>
        </div>

        <Pointer x={ORIGIN.x + point.x} y={ORIGIN.y + point.y} />
      </div>
    </Stage>
  )
}

export default RosterGrant
