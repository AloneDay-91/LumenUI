"use client"

// Brand Wheel · adapted from snapcn (https://snapcn.dev/docs/text/brand-wheel).
// The first roll, the twenty-frame steps, the fade with distance, the pointer's
// approach, the press and the exit are snapcn's measurements; each pill is a
// Lumen outline Button carrying a model's official mark and name.

import { useCurrentFrame, useVideoConfig } from "remotion"

import { Button } from "@/components/ui/Button"

import { AI_MARKS } from "./ai-marks"
import { Pointer, Stage } from "./stage"

export const REF_W = 712
export const REF_H = 402

type Table = readonly (readonly [number, number])[]

const ROW_Y = 196.43
const ROW_X = 360.875
const PITCH = 57.45
const PILL_H = 38.75
const LABEL = 22.8
/** The maker's mark beside each name. */
const MARK = 24
const LEAD = 30.65
const LEAD_GAP = 20.05
const BLUR = 2.4
const DIM = 0.42
const SHRINK = 0.93
const SHRINK_AT: readonly [number, number] = [-33.6, -9.6]
const CURSOR_IN: readonly [number, number] = [-34.6, -19.6]
const PRESS: readonly [number, number, number, number] = [-2.6, -0.6, 4.4, 7.4]
const RING_AT = 0.4
const RING_W = 12.5
const RING_FADE: readonly [number, number] = [3.4, 17.4]
const EXIT_AT = 2.4
const EXIT_FADE: readonly [number, number] = [20.4, 25.4]

/** One step between pills, in frames, eased: slow off the mark, quick through, settling. */
const STEP: readonly number[] = [
  0, 0.0264, 0.055, 0.0864, 0.122, 0.1636, 0.2147, 0.2838, 0.3991, 0.5496, 0.656, 0.7222, 0.771, 0.8107,
  0.8452, 0.8759, 0.9042, 0.9293, 0.953, 0.9763, 1,
]
const STEP_FRAMES = 20
const FIRST: Table = [
  [11.5, 0], [12, 0.0003], [13, 0.0015], [14, 0.0041], [15, 0.0077], [16, 0.0145], [17, 0.0228],
  [18, 0.0363], [19, 0.054], [20, 0.0788], [21, 0.1178], [22, 0.1899], [23, 0.3876], [24, 0.567],
  [25, 0.6587], [26, 0.7226], [27, 0.7733], [28, 0.815], [29, 0.8507], [30, 0.8826], [31, 0.9114],
  [32, 0.9365], [33, 0.9596], [34, 0.9823], [34.72, 1],
]
const FIRST_REST = 34.72
const SWAP = 0.36
const STOP_EARLY = 1.12
const FADE: Table = [
  [0, 1], [12, 1], [21.4, 0.88], [32.4, 0.81], [41.7, 0.7], [47, 0.61], [53.9, 0.47], [59.4, 0.36],
  [67.2, 0.25], [74.2, 0.14], [82.6, 0.09], [93.5, 0.04], [105, 0],
]
const ENTER: Table = [
  [0, 38], [1, 31.5], [2, 25], [3, 20.5], [4, 17], [5, 14], [6, 11.3], [7, 9.2], [8, 7.6], [9, 6.2],
  [10, 5], [11, 4], [12, 3.2], [13, 2.5], [14, 1.9], [15, 1.4], [16, 1], [18, 0.45], [21, 0],
]
/** The pointer, in frames from the stop: x, y. */
const CURSOR: readonly (readonly [number, number, number])[] = [
  [-40, 640, 343], [-37, 606, 314], [-34, 580, 292], [-31.6, 557, 273], [-30.6, 553, 267],
  [-29.6, 548, 263], [-28.6, 542, 258], [-27.6, 536, 253], [-26.6, 528.5, 248], [-25.6, 522, 242.5],
  [-24.6, 515.5, 237.5], [-23.6, 509.5, 233], [-22.6, 504.5, 229], [-21.6, 500, 225.5],
  [-20.6, 496.5, 222.5], [-19.6, 493.5, 220], [-18.6, 491, 218], [-17.6, 488.5, 216.2],
  [-16.6, 486.5, 214.6], [-15.6, 484.5, 213.2], [-14.6, 483, 212], [-13.6, 481.6, 211],
  [-12.6, 480.5, 210.2], [-11.6, 479.6, 209.6], [-10.6, 479, 209.1], [-8.6, 478.4, 208.6],
  [-6.6, 478, 208.4],
]

function read(table: Table, v: number): number {
  const first = table[0]
  const last = table[table.length - 1]
  if (!first || !last) return 0
  if (v <= first[0]) return first[1]
  if (v >= last[0]) return last[1]
  for (let i = 1; i < table.length; i++) {
    const hi = table[i]
    const lo = table[i - 1]
    if (hi && lo && v <= hi[0]) return lo[1] + ((hi[1] - lo[1]) * (v - lo[0])) / (hi[0] - lo[0])
  }
  return last[1]
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const ramp = (v: number, a: number, b: number) => clamp01((v - a) / (b - a))
const smooth = (v: number) => v * v * (3 - 2 * v)
const stopFrame = (n: number) => FIRST_REST + STEP_FRAMES * Math.max(0, n - 2) - STOP_EARLY

export const brandWheelDuration = (n: number) => Math.ceil(stopFrame(n) + EXIT_FADE[1])

function rollAt(f: number, n: number): number {
  if (n < 2) return 0
  const g = Math.min(f, stopFrame(n))
  if (g < FIRST_REST) return read(FIRST, g)
  const k = (g - FIRST_REST) / STEP_FRAMES
  const whole = Math.floor(k)
  const u = (k - whole) * STEP_FRAMES
  const i = Math.floor(u)
  const a = STEP[i] ?? 1
  const b = STEP[i + 1] ?? 1
  return Math.min(n - 1, 1 + whole + a + (b - a) * (u - i))
}

function cursorAt(v: number): readonly [number, number] {
  const first = CURSOR[0]
  const last = CURSOR[CURSOR.length - 1]
  if (!first || !last) return [0, 0]
  if (v <= first[0]) return [first[1], first[2]]
  for (let i = 1; i < CURSOR.length; i++) {
    const hi = CURSOR[i]
    const lo = CURSOR[i - 1]
    if (hi && lo && v <= hi[0]) {
      const k = (v - lo[0]) / (hi[0] - lo[0])
      return [lo[1] + (hi[1] - lo[1]) * k, lo[2] + (hi[2] - lo[2]) * k]
    }
  }
  return [last[1], last[2]]
}

export const AI_MODELS = "Claude, GPT, Gemini, Mistral, Llama, Grok, Cursor, any model"
export const DURATION = brandWheelDuration(AI_MODELS.split(",").length)

export interface BrandWheelProps {
  lead?: string
  /** Comma-separated. The wheel stops on the last, and the pointer clicks it. */
  items?: string
}

/** A lead word and a wheel of pills rolling through the models, until a pointer clicks the last one. */
export function BrandWheel({ lead = "Pair it with", items = AI_MODELS }: BrandWheelProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const reel = items.split(",").map((s) => s.trim()).filter(Boolean)
  const n = reel.length
  const f = (frame * 30) / fps
  const since = f - stopFrame(n)
  const q = rollAt(f, n)
  const focus = Math.min(n - 1, Math.floor(q + 1 - SWAP))
  const slide = read(ENTER, f) - 0.0212 * Math.max(0, since - EXIT_AT) ** 2.24
  const gone = 1 - ramp(since, EXIT_FADE[0], EXIT_FADE[1])
  const shrink = 1 - (1 - SHRINK) * smooth(ramp(since, ...SHRINK_AT))
  const ringW = RING_W * (1 - Math.exp(-Math.max(0, since - RING_AT) / 2.5))
  const ringA = since > RING_AT ? 1 - ramp(since, ...RING_FADE) : 0
  const [tx, ty] = cursorAt(since)
  const press = 1 - 0.1 * (smooth(ramp(since, PRESS[0], PRESS[1])) - smooth(ramp(since, PRESS[2], PRESS[3])))

  return (
    <Stage width={REF_W} height={REF_H}>
      <div
        className="absolute flex items-center whitespace-nowrap"
        style={{
          left: ROW_X,
          top: ROW_Y - PILL_H / 2,
          height: PILL_H,
          opacity: gone,
          translate: `calc(-50% + ${slide}px) 0`,
        }}
      >
        <div
          className="font-heading font-normal tracking-[-0.02em] text-foreground"
          style={{ marginRight: LEAD_GAP, fontSize: LEAD, lineHeight: 1 }}
        >
          {lead}
        </div>
        {/* Every pill in one grid cell: the column is as wide as its widest label. */}
        <div className="grid" style={{ height: PILL_H, opacity: ramp(f, -1, 3), scale: shrink }}>
          {reel.map((label, i) => {
            const d = (i - q) * PITCH
            const vis = read(FADE, Math.abs(d * shrink))
            const sharp = i === focus
            return (
              <div
                key={`${i}-${label}`}
                style={{
                  gridArea: "1 / 1",
                  visibility: vis > 0 ? "visible" : "hidden",
                  translate: `0 ${d}px`,
                  opacity: vis * (sharp ? 1 : DIM),
                  filter: sharp ? undefined : `blur(${BLUR}px)`,
                }}
              >
                <Button
                  tabIndex={-1}
                  variant="outline"
                  className="w-full justify-start gap-2.5 rounded-2xl bg-card ps-2.5 pe-4 font-heading font-normal tracking-[-0.02em]"
                  style={{
                    height: PILL_H,
                    fontSize: LABEL,
                    boxShadow:
                      i === n - 1 && ringA > 0
                        ? `0 0 0 ${ringW}px color-mix(in oklch, var(--primary) ${ringA * 18}%, transparent)`
                        : undefined,
                  }}
                >
                  {AI_MARKS[label] ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      fillRule={AI_MARKS[label]?.evenOdd ? "evenodd" : undefined}
                      aria-hidden
                      className="shrink-0"
                      style={{ width: MARK, height: MARK }}
                    >
                      {AI_MARKS[label]?.d.map((d) => <path key={d.slice(0, 24)} d={d} />)}
                    </svg>
                  ) : null}
                  {label}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
      {n > 1 ? <Pointer x={tx} y={ty} press={press} opacity={ramp(since, ...CURSOR_IN) * gone} /> : null}
    </Stage>
  )
}

export default BrandWheel
