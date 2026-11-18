"use client"

// Sky Lockup · adapted from snapcn (https://snapcn.dev/docs/scenes/sky-lockup).
// snapcn's beats (a held line, a staggered leave,
// the mark sliding over and the wordmark cutting in letter by letter) drawn with
// the Lumen symbol in the ink colour on the plain page, in the theme's heading face.

import { useMemo } from "react"
import { Easing, interpolate, useCurrentFrame } from "remotion"

import { LogoMark } from "./logo-mark"

import { CLAMP, Stage } from "./stage"

export const REF_W = 960
export const REF_H = 540
export const DURATION = 90

const LINE_Y = 285
const TYPE_SIZE = 45
const WORD_GAP = 10
const TILE = 44
const LOCKUP_TILE = 56
const LOCKUP_SIZE = 54
const LOCKUP_GAP = 14

/* Out frames, after snapcn's CUT: the line holds, leaves, the page washes off, the wordmark cuts in. */
const LEAVE_AT = 24
const LEAVE_STAGGER = 0.7
const MOVE_FROM = 30
const MOVE_TO = 46
const LETTERS_AT = 44
const LETTER_STAGGER = 1.2
const TAGLINE_AT = 60

/** Each letter by frames since it cut in (snapcn's LETTER_RISE, at half scale). */
const LETTER_RISE = [8.1, 6.08, 5.13, 4.32, 3.65, 2.97, 2.5, 2.1, 1.76, 1.42, 1.15, 0.95, 0.75, 0.57, 0.41, 0.27, 0.16, 0.07, 0]
const settle = Easing.bezier(0.3, 0, 0.2, 1)

function useWidth(text: string, size: number): number {
  return useMemo(() => {
    const ctx = typeof document === "undefined" ? null : document.createElement("canvas").getContext("2d")
    if (!ctx) return text.length * size * 0.55
    ctx.font = `400 ${size}px ${getComputedStyle(document.body).fontFamily}`
    ctx.letterSpacing = `${-0.02 * size}px`
    return ctx.measureText(text).width
  }, [text, size])
}

export interface SkyLockupProps {
  before?: string
  after?: string
  brand?: string
  tagline?: string
}

/** A one-line promise takes itself apart, and the mark in the sentence becomes the logo. */
export function SkyLockup({
  before = "Copy it,",
  after = "own it.",
  brand = "Lumen UI",
  tagline = "Copy-paste components, built on Base UI.",
}: SkyLockupProps) {
  const f = useCurrentFrame()
  const brandW = useWidth(brand, LOCKUP_SIZE)

  const lockupW = LOCKUP_TILE + LOCKUP_GAP + brandW
  const lockupX = REF_W / 2 - lockupW / 2
  const move = settle(Math.min(1, Math.max(0, (f - MOVE_FROM) / (MOVE_TO - MOVE_FROM))))
  const markX = REF_W / 2 + (lockupX + LOCKUP_TILE / 2 - REF_W / 2) * move
  const markSize = TILE + (LOCKUP_TILE - TILE) * move

  const left = before.split(/\s+/).filter(Boolean)
  const right = after.split(/\s+/).filter(Boolean)

  const leave = (j: number) => {
    const k = f - LEAVE_AT - LEAVE_STAGGER * j
    return {
      y: interpolate(k, [0, 6], [0, -16], { ...CLAMP, easing: Easing.in(Easing.quad) }),
      opacity: interpolate(k, [0, 5], [1, 0], CLAMP),
    }
  }
  const word = (w: string, j: number) => {
    const l = leave(j)
    return (
      <span key={w + j} className="whitespace-pre" style={{ translate: `0 ${l.y}px`, opacity: l.opacity }}>
        {w}
      </span>
    )
  }

  return (
    <Stage width={REF_W} height={REF_H}>
      {/* The line: words either side of a centre column the mark sits in. */}
      <div
        className="absolute inset-x-0 grid grid-cols-[1fr_auto_1fr] items-center font-heading font-normal tracking-[-0.02em] text-foreground"
        style={{ top: LINE_Y, translate: "0 -50%", fontSize: TYPE_SIZE, lineHeight: 1, columnGap: WORD_GAP * 1.4 }}
      >
        <span className="flex justify-end" style={{ gap: WORD_GAP }}>
          {left.map((w, i) => word(w, i))}
        </span>
        <span style={{ width: TILE, height: TILE }} />
        <span className="flex" style={{ gap: WORD_GAP }}>
          {right.map((w, i) => word(w, left.length + i))}
        </span>
      </div>

      {/* The mark slides over and becomes the logo. */}
      <span
        className="absolute flex items-center justify-center text-foreground"
        style={{ left: markX, top: LINE_Y, width: markSize, height: markSize, translate: "-50% -50%" }}
      >
        <LogoMark frame={f} buildAt={2} waveAt={MOVE_FROM} shimmerAt={TAGLINE_AT} className="size-full" />
      </span>

      <div
        className="absolute flex font-heading font-normal tracking-[-0.02em] whitespace-pre text-foreground"
        style={{ left: lockupX + LOCKUP_TILE + LOCKUP_GAP, top: LINE_Y, translate: "0 -50%", fontSize: LOCKUP_SIZE, lineHeight: 1 }}
      >
        {[...brand].map((ch, i) => {
          const k = f - LETTERS_AT - LETTER_STAGGER * i
          return (
            <span
              key={i}
              style={{
                opacity: k < 0 ? 0 : interpolate(k, [0, 3], [0.3, 1], CLAMP),
                translate: `0 ${LETTER_RISE[Math.max(0, Math.min(LETTER_RISE.length - 1, Math.floor(k)))] ?? 0}px`,
              }}
            >
              {ch}
            </span>
          )
        })}
      </div>

      <p
        className="absolute inset-x-0 text-center text-[15px] text-muted-foreground"
        style={{
          top: LINE_Y + 52,
          opacity: interpolate(f, [TAGLINE_AT, TAGLINE_AT + 10], [0, 1], CLAMP),
          translate: `0 ${interpolate(f, [TAGLINE_AT, TAGLINE_AT + 14], [6, 0], { ...CLAMP, easing: Easing.out(Easing.cubic) })}px`,
        }}
      >
        {tagline}
      </p>
    </Stage>
  )
}

export default SkyLockup
