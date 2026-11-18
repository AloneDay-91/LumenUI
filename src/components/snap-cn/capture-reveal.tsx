"use client"

// Capture Reveal · adapted from snapcn (https://snapcn.dev/docs/screens/capture-reveal).
// The window's drop, the toast's press and pop, the counter, the cursor and the
// headline's rise are snapcn's curves, measured in beats of a 24fps recording.
// The window holds the real Customize page in the site theme, the toast is a Lumen Item
// with the Spinner and status icon Lumen's Toast uses, and the type is the theme's.

import { Easing, useCurrentFrame, useVideoConfig } from "remotion"

import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/Item"

import { ThemeControls } from "@/components/theme/ThemeControls"
import { ThemePreview } from "@/components/theme/ThemePreview"
import { StaticThemeDraft } from "@/components/theme/theme-draft"

import { LUMEN_SITE_PRESET } from "./site-preset"
import { Pointer, Stage, useStageMode } from "./stage"

export const REF_W = 714
export const REF_H = 394
export const DURATION = 130

/** The Customize page is laid out at this width, then scaled into the window. */
const PAGE_W = 1440

const BEATS = 24
const REF_AT = 32

/** Wider than snapcn's 400px so the page reads; still centred on the same fixed origin. */
const WIN = { x: 352.85 - 290, y: 106.57, w: 580 }
const WIN_ORIGIN = [352.85, 361.33] as const
const DROP = 107.905
const SHRINK = 0.1581
const DROP_AT = 0.154
const DROP_FOR = 19.16
const DROP_EASE = Easing.bezier(0.5492, 0.2279, 0.1361, 0.9381)
const SETTLE = 0.0267
const SETTLE_AT = 18.62
const SETTLE_TAU = 28.94

const CURSOR_FROM = [573.334, 189.634] as const
const CURSOR_BY = [-83.28, -111.49] as const
const CURSOR_AT = -0.03
const CURSOR_FOR = 19.5
const CURSOR_EASE = Easing.bezier(0.54, 0.1, 0.41, 0.97)
const DRIFT = [-0.16, -0.43] as const
const DRIFT_AT = 19

const HEAD = { x: 353.64, mid: 188.619, pitch: 45.304, size: 45.93 }
const RISE = 22.585
const RISE_AT = 7.342
const RISE_FOR = 23.972
const RISE_EASE = Easing.bezier(0.114, 1, 0.665, 1)
const FADE_AT = 8
const FADE_FOR = 8.322
const FADE_EASE = Easing.bezier(0, 0.235, 0.166, 1)

const TOAST_AT = [357.7, 62.9] as const
const PRESSED = 0.8855
const SWAP_AT = 7.5
const POP_FROM = 0.9053
const POP_FOR = 22.84
const POP_EASE = Easing.bezier(0.3012, 1.056, 0.8028, 1.0)
const TOAST_IN = -26
const PRESS_AT = -24
/** Three percent a beat, linear. */
const COUNT_RATE = 3

const OUTRO_AT = 40
const OUTRO_DROP = 240
const OUTRO_SCALE = 1.3

const unit = (v: number) => Math.min(1, Math.max(0, v))
const ease = (f: (t: number) => number, at: number, dur: number, n: number) => f(unit((n - at) / dur))

export interface CaptureRevealProps {
  capturing?: string
  copied?: string
  /** `|` breaks it into lines. */
  headline?: string
}

/** A toast counts a capture up over a window of Lumen UI; the window drops away and a headline rises from behind it. */
export function CaptureReveal({
  capturing = "Capturing selection…",
  copied = "Copied to clipboard.",
  headline = "Copy it, paste it, | it's yours.",
}: CaptureRevealProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const n = (frame / fps) * BEATS - REF_AT
  const mode = useStageMode()

  // The window: one transform, a drop and a shrink on the same curve, then a slow settle.
  const p = ease(DROP_EASE, DROP_AT, DROP_FOR, n)
  const settle = n > SETTLE_AT ? SETTLE * (1 - Math.exp(-(n - SETTLE_AT) / SETTLE_TAU)) : 0
  const outro = ease(DROP_EASE, OUTRO_AT, DROP_FOR, n)
  const fadeOut = n < OUTRO_AT ? 1 : 1 - ease(FADE_EASE, OUTRO_AT, FADE_FOR, n)
  const winScale = 1 - SHRINK * p - settle
  const winDrop = DROP * p + OUTRO_DROP * outro

  // The toast presses in while it counts, then pops on the swap.
  const done = n >= SWAP_AT
  const toastScale = done
    ? POP_FROM + (1 - POP_FROM) * ease(POP_EASE, SWAP_AT, POP_FOR, n)
    : 1 - (1 - PRESSED) * ease(POP_EASE, PRESS_AT, POP_FOR, n)
  const toastOpacity = (n < TOAST_IN ? 0 : done ? 1 : ease(FADE_EASE, TOAST_IN, FADE_FOR, n)) * fadeOut
  const percent = Math.min(100, Math.floor(1 + COUNT_RATE * (n - TOAST_IN) + 1e-6))

  // The headline rises from behind the window without scaling or blurring, then pushes forward.
  const rise = RISE * (1 - ease(RISE_EASE, RISE_AT, RISE_FOR, n))
  const headOpacity = n < FADE_AT ? 0 : ease(FADE_EASE, FADE_AT, FADE_FOR, n)
  const lines = headline.split("|").map((l) => l.trim()).filter(Boolean)
  const headMid = HEAD.mid + (REF_H / 2 - HEAD.mid) * outro

  const cp = ease(CURSOR_EASE, CURSOR_AT, CURSOR_FOR, n)
  const drift = Math.max(0, n - DRIFT_AT)
  const cursor = {
    x: CURSOR_FROM[0] + CURSOR_BY[0] * cp + DRIFT[0] * drift,
    y: CURSOR_FROM[1] + CURSOR_BY[1] * cp + DRIFT[1] * drift,
  }

  return (
    <Stage
      width={REF_W}
      height={REF_H}
    >
      {/* The headline sits behind the window and rises out from under it. */}
      <div
        className="absolute flex flex-col items-center font-heading font-normal tracking-[-0.02em] text-foreground"
        style={{
          left: HEAD.x,
          top: headMid,
          translate: `-50% calc(-50% + ${rise}px)`,
          opacity: headOpacity,
          scale: 1 + (OUTRO_SCALE - 1) * outro,
          fontSize: HEAD.size,
          lineHeight: `${HEAD.pitch}px`,
        }}
      >
        {lines.map((line) => (
          <span key={line} className="whitespace-nowrap">
            {line}
          </span>
        ))}
      </div>

      <div
        className="absolute overflow-clip rounded-[min(var(--radius-4xl),24px)] border border-border bg-card shadow-lg"
        style={{
          left: WIN.x,
          top: WIN.y,
          width: WIN.w,
          height: WIN.w * 1.25,
          translate: `0 ${winDrop}px`,
          scale: winScale,
          transformOrigin: `${WIN_ORIGIN[0] - WIN.x}px ${WIN_ORIGIN[1] - WIN.y}px`,
        }}
      >
        <div className="flex h-7 items-center gap-1.5 border-b border-border px-3">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-2 rounded-full bg-border" />
          ))}
          <span className="mx-auto rounded-md bg-muted px-6 py-0.5 font-mono text-[9px] text-muted-foreground">
            lumen-ui.dev/blocks
          </span>
        </div>
        {/* The real Customize page, opened on the Lumen design system. */}
        <div
          className="flex overflow-clip bg-background"
          style={{ width: PAGE_W, height: (WIN.w * 1.25 - 28) / (WIN.w / PAGE_W), scale: WIN.w / PAGE_W, transformOrigin: "0 0" }}
        >
          <StaticThemeDraft preset={LUMEN_SITE_PRESET} palette={mode}>
            <aside className="w-72 shrink-0 overflow-clip border-r border-border px-4 py-5">
              <ThemeControls />
            </aside>
            <div className="min-w-0 flex-1 overflow-clip">
              <div className="flex h-11 items-center border-b border-border px-6 text-xs text-muted-foreground">
                Customize
              </div>
              <ThemePreview />
            </div>
          </StaticThemeDraft>
        </div>
      </div>

      <div
        className="absolute"
        style={{ left: TOAST_AT[0], top: TOAST_AT[1], translate: "-50% -50%", scale: toastScale, opacity: toastOpacity }}
      >
        <Item variant="outline" size="sm" className="w-max flex-nowrap bg-popover px-3.5 shadow-lg">
          <ItemContent>
            <ItemTitle className="font-normal">{done ? copied : capturing}</ItemTitle>
          </ItemContent>
          {done ? null : (
            <ItemActions className="font-mono text-xs text-muted-foreground tabular-nums">
              {Math.max(1, percent)}%
            </ItemActions>
          )}
        </Item>
      </div>

      <Pointer x={cursor.x} y={cursor.y} opacity={fadeOut} />
    </Stage>
  )
}

export default CaptureReveal
