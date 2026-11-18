"use client"

// Portal Intro · adapted from snapcn (https://snapcn.dev/docs/scenes/portal-intro).
// snapcn's measured choreography, drawn with Lumen: the picture in the chip is a
// screenful of Lumen components, the type is the theme's heading face, and the
// title gets a page of its own.

import { useMemo } from "react"
import { Easing, interpolate, useCurrentFrame } from "remotion"

import { LumenMosaic } from "./mosaic"
import { at, CLAMP, Stage, type Table } from "./stage"

/** The frame, in the reference recording's own 714 × 402 pixels. */
export const REF_W = 714
export const REF_H = 402
/** Long enough for "Introducing" to hold on its own page, then leave. */
export const DURATION = 128
/** The title leaves letter by letter and is gone before the crossfade to the next scene starts. */
const EXIT_FOR = 9
const EXIT_STAGGER = 0.8
const EXIT_RISE = 10
const EXIT_FROM = DURATION - 1 - 22 - 10 * EXIT_STAGGER - EXIT_FOR

const LEAD = 1
const PIVOT_X = 345.17
const PIVOT_Y = 198.93
const CENTRE = 357
const LINE_SIZE = 26.834
const STAGGER = 6
const FIRST_LINE_TO = 22
const SECOND_LINE_TO = 46
/** The chip grows from its place in the line to the whole frame over these frames, eased: one continuous move. */
const OPEN_FROM = SECOND_LINE_TO
const OPEN_TO = 56
/** The title waits until the page has covered the middle of the frame. */
const TITLE_DELAY = 4
const TITLE_FROM = 48 + TITLE_DELAY
const CHIP_RADIUS = 4.32
const TITLE_SIZE = 30.29

/* The measured tables, keyed in recording frames (snapcn's own numbers). */
const SCALE: Table = {
  from: -1,
  v: [
    0.948789, 0.948789, 0.948789, 0.949727, 0.9491, 0.94994, 0.950745, 0.950887, 0.95062,
    0.951965, 0.952448, 0.953167, 0.95334, 0.954234, 0.955356, 0.956136, 0.957932, 0.959057,
    0.961321, 0.963993, 0.96696, 0.970379, 0.97696, 0.985827, 1.00001, 1.01553, 1.02495,
    1.03178, 1.0374, 1.04274, 1.04826, 1.05222, 1.05734, 1.06323, 1.06908, 1.07466, 1.08109,
    1.08821, 1.09531, 1.10385, 1.1126, 1.12312, 1.13474, 1.14857, 1.16463, 1.18435, 1.21107,
    1.26697,
  ],
}
const PAN: Table = {
  from: -1,
  v: [
    -57, -44.2, -34.069, -25.946, -20.352, -15.946, -12.41, -9.611, -7.358, -5.421, -3.863,
    -2.598, -1.655, -0.897, -0.338, 0.013, 0.226, 0.236, 0.249, 0.225, 0.19, 0.086, 0.055,
    -0.045,
  ],
}
const WORD_OPACITY: Table = {
  from: -1,
  v: [
    0, 0.15, 0.317, 0.457, 0.563, 0.642, 0.706, 0.754, 0.804, 0.812, 0.871, 0.888, 0.909,
    0.933, 0.949, 0.964, 0.981, 0.996, 0.988, 0.993, 0.994, 0.999, 1, 1,
  ],
}
const WORD_RISE: Table = {
  from: -1,
  v: [
    4.58, 3.907, 3.314, 2.797, 2.348, 1.962, 1.632, 1.354, 1.12, 0.926, 0.764, 0.629, 0.516,
    0.418, 0.333, 0.261, 0.2, 0.148, 0.104, 0.066, 0.034, 0.005, 0, 0,
  ],
}
const SLOT: Table = {
  from: 23,
  v: [
    60.732, 65.134, 67.143, 68.482, 69.546, 70.405, 71.05, 71.649, 72.167, 72.54, 72.803,
    73.062, 73.292, 73.382, 73.481, 73.663, 74.218, 75.148, 76.582, 78.659, 81.609, 85.948,
    92.559, 109.382,
  ],
}
const CHIP_W: Table = {
  from: 23,
  v: [
    44.508, 45.945, 46.76, 47.144, 47.798, 47.894, 48.001, 48.454, 48.466, 48.546, 48.653,
    48.693, 48.885, 49.032, 49.904, 51.058, 52.22, 54.09, 56.437, 59.433, 63.447, 69.108,
    77.2, 96.579,
  ],
}
const CHIP_H: Table = {
  from: 23,
  v: [
    25.253, 26.036, 26.521, 26.778, 26.907, 27.012, 27.039, 27.174, 27.431, 27.515, 27.597,
    27.85, 28.043, 28.097, 28.312, 28.967, 29.719, 30.467, 31.741, 33.415, 35.677, 38.81,
    43.202, 54.168,
  ],
}
const CHIP_ZOOM: Table = {
  from: 23,
  v: [
    1.3053, 1.2221, 1.1553, 1.1025, 1.062, 1.0324, 1.0126, 1.002, 1, 1.0065, 1.0215, 1.045,
    1.0777, 1.12, 1.1728, 1.2372, 1.3146, 1.4068, 1.5158, 1.6442, 1.7952, 1.9726, 2.1809,
    2.4258,
  ],
}
const TITLE_Y: Table = {
  from: 48,
  v: [
    212.158, 212.105, 212.085, 212.085, 212.085, 212.085, 212.085, 212.085, 212.085, 212.085,
    212.043, 211.919, 211.741, 211.499, 211.188, 210.801, 210.33, 209.769, 209.094, 208.213,
    207.02, 205.165, 201.343,
  ],
}
const LETTER_RISE: Table = {
  from: 0,
  v: [2.104, 1.661, 1.283, 0.964, 0.7, 0.486, 0.317, 0.187, 0.091, 0.026, 0],
}
const LETTER_OPACITY: Table = {
  from: 0,
  v: [0.372, 0.53, 0.64, 0.722, 0.791, 0.851, 0.892, 0.927, 0.953, 0.97, 0.981, 0.988, 0.995, 1],
}
export interface PortalIntroProps {
  lead?: string
  trail?: string
  title?: string
}

/** A sentence with a picture chip leans in until the chip takes the frame, which closes to a page of its own for the title. */
export function PortalIntro({
  lead = "Every interface",
  trail = "you ship",
  title = "Introducing",
}: PortalIntroProps) {
  const r = useCurrentFrame() - LEAD
  const s = at(SCALE, Math.min(r, SECOND_LINE_TO))
  const leadWords = lead.split(/\s+/).filter(Boolean)

  const widths = useMemo(() => {
    const ctx = typeof document === "undefined" ? null : document.createElement("canvas").getContext("2d")
    if (!ctx) return { alone: lead.length * LINE_SIZE * 0.5, lead: (lead.length + 1) * LINE_SIZE * 0.5, trail: (trail.length + 1) * LINE_SIZE * 0.5 }
    ctx.font = `400 ${LINE_SIZE}px ${getComputedStyle(document.body).fontFamily}`
    ctx.letterSpacing = `${-0.02 * LINE_SIZE}px`
    return { alone: ctx.measureText(lead).width, lead: ctx.measureText(`${lead} `).width, trail: ctx.measureText(` ${trail}`).width }
  }, [lead, trail])

  // Where the chip is on its last frame in the line, so the page grows out of it with no jump.
  const s0 = at(SCALE, SECOND_LINE_TO)
  const slot0 = at(SLOT, SECOND_LINE_TO)
  const lineLeft = CENTRE - (widths.lead + slot0 + widths.trail) / 2
  const chipX = PIVOT_X + s0 * (lineLeft + widths.lead + slot0 / 2 - PIVOT_X)
  const chipW = at(CHIP_W, SECOND_LINE_TO) * s0
  const chipH = at(CHIP_H, SECOND_LINE_TO) * s0
  const grow = interpolate(r, [OPEN_FROM, OPEN_TO], [0, 1], { ...CLAMP, easing: Easing.bezier(0.65, 0, 0.35, 1) })
  // When the line re-sets with the chip, the lead holds still and glides over instead of jumping.
  const reset = interpolate(r, [FIRST_LINE_TO + 1, FIRST_LINE_TO + 10], [0, 1], { ...CLAMP, easing: Easing.inOut(Easing.cubic) })
  const resetTotal = widths.lead + at(SLOT, FIRST_LINE_TO + 1) + widths.trail
  const hold = ((resetTotal - widths.alone) / 2) * (1 - reset)
  const arrive = interpolate(r, [FIRST_LINE_TO + 1, FIRST_LINE_TO + 7], [0, 1], { ...CLAMP, easing: Easing.out(Easing.cubic) })

  const opening =
    r >= OPEN_FROM
      ? {
          l: chipX - chipW / 2 + (0 - (chipX - chipW / 2)) * grow,
          t: PIVOT_Y - chipH / 2 + (0 - (PIVOT_Y - chipH / 2)) * grow,
          w: chipW + (REF_W - chipW) * grow,
          h: chipH + (REF_H - chipH) * grow,
          r: CHIP_RADIUS * s0 * (1 - grow),
        }
      : null
  // The picture in the chip settles to the page colour before the chip opens, so the
  // frame it opens onto is a plain page for the title in the current theme, never a scrim.
  const page = Math.min(1, Math.max(0, (r - (SECOND_LINE_TO - 10)) / 10))

  const word = "font-heading font-normal tracking-[-0.02em] whitespace-pre text-foreground"

  return (
    <Stage width={REF_W} height={REF_H}>
      {/* The line, scaled about the measured pivot. */}
      {r < OPEN_TO ? (
        <div
          className="absolute inset-0"
          style={{ scale: s, transformOrigin: `${PIVOT_X}px ${PIVOT_Y}px` }}
        >
          <div
            className="absolute flex items-center"
            style={{
              left: CENTRE,
              top: PIVOT_Y,
              fontSize: LINE_SIZE,
              lineHeight: 1,
              translate: `calc(-50% + ${r < FIRST_LINE_TO + 0.5 ? at(PAN, r) : hold}px) -50%`,
            }}
          >
            {r < FIRST_LINE_TO + 0.5 ? (
              leadWords.map((w, i) => (
                <span
                  key={w + i}
                  className={word}
                  style={{
                    opacity: at(WORD_OPACITY, r - STAGGER * i),
                    translate: `0 ${at(WORD_RISE, r - STAGGER * i)}px`,
                  }}
                >
                  {i < leadWords.length - 1 ? `${w} ` : w}
                </span>
              ))
            ) : (
              <>
                <span className={word}>{`${lead} `}</span>
                <span
                  className="relative flex shrink-0 items-center justify-center"
                  style={{ width: at(SLOT, r), height: LINE_SIZE }}
                >
                  <span
                    className="relative block shrink-0 overflow-clip rounded-2xl border border-border bg-card shadow-md"
                    style={{ width: at(CHIP_W, r), height: at(CHIP_H, r), scale: arrive, opacity: arrive }}
                  >
                    <span
                      className="absolute top-1/2 left-1/2 block"
                      style={{
                        width: REF_W,
                        height: REF_H,
                        translate: "-50% -50%",
                        scale: (at(CHIP_H, r) / REF_H) * 1.6 * at(CHIP_ZOOM, r),
                      }}
                    >
                      <LumenMosaic />
                    </span>
                    <span className="absolute inset-0 bg-background" style={{ opacity: page }} />
                  </span>
                </span>
                <span className={word} style={{ opacity: arrive }}>{` ${trail}`}</span>
              </>
            )}
          </div>
        </div>
      ) : null}

      {/* The chip takes the frame. */}
      {opening ? (
        <div
          className="absolute border border-border bg-background shadow-lg"
          style={{
            left: opening.l,
            top: opening.t,
            width: opening.w,
            height: opening.h,
            borderRadius: opening.r,
            // The edge fades as the page reaches the frame, so the title sits on a plain page.
            borderColor: `color-mix(in oklch, var(--border) ${(1 - grow) * 100}%, transparent)`,
            boxShadow: grow >= 1 ? "none" : undefined,
          }}
        />
      ) : null}

      {r >= TITLE_FROM ? (
        <div
          className="absolute flex font-heading font-normal tracking-[-0.02em] whitespace-pre text-foreground"
          style={{
            left: CENTRE,
            top: at(TITLE_Y, r - TITLE_DELAY),
            fontSize: TITLE_SIZE,
            lineHeight: 1,
            translate: "-50% -100%",
          }}
        >
          {[...title].map((ch, i) => {
            const kk = r - TITLE_FROM - i
            // The exit mirrors the entrance: letter by letter, left to right, up and out.
            const out = interpolate(r - EXIT_FROM - i * EXIT_STAGGER, [0, EXIT_FOR], [0, 1], {
              ...CLAMP,
              easing: Easing.in(Easing.cubic),
            })
            return (
              <span
                key={i}
                style={{
                  opacity: (kk < 0 ? 0 : at(LETTER_OPACITY, kk)) * (1 - out),
                  translate: `0 ${at(LETTER_RISE, kk) - EXIT_RISE * out}px`,
                  filter: out > 0 ? `blur(${out * 2}px)` : undefined,
                }}
              >
                {ch}
              </span>
            )
          })}
        </div>
      ) : null}

    </Stage>
  )
}

export default PortalIntro
