"use client"

// Prompt Send · adapted from snapcn (https://snapcn.dev/docs/ai-input/prompt-send).
// The unroll, the eased typing, the two camera cuts and the pointer's approach
// are snapcn's measured beats; the composer is Lumen's PromptInput with its own
// Suggestion chips and submit Button.

import { useMemo } from "react"
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion"

import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ui/PromptInput"
import { Suggestion } from "@/components/ui/Suggestion"

import { Caption, CLAMP, Pointer, Stage, tint } from "./stage"

export const REF_W = 714
export const REF_H = 402
export const DURATION = 165

/* The composer's box inside the frame, from Lumen's own spacing: p-2, a 40px field, gap-1, an h-8 toolbar. */
const PANEL = { w: 520, h: 94 }
const PANEL_X = (REF_W - PANEL.w) / 2
const PANEL_Y = (REF_H - PANEL.h) / 2
const TEXT_X = PANEL_X + 1 + 8 + 10
const TEXT_Y = PANEL_Y + 1 + 8 + 8 + 12
const SEND = { x: PANEL_X + PANEL.w - 1 - 8 - 16, y: PANEL_Y + 1 + 8 + 40 + 4 + 16 }

/* Beats, in seconds (snapcn's measurements). */
const UNROLL = 0.445
const FADE_FROM = 0.417
const FADE_FOR = 0.3
const CHIP_FROM = 0.445
const CHIP_STEP = 0.1
const CHIP_RISE = 11.4
const TYPE_FROM = 0.915
const TYPE_TO = 3.94
/** The push in on the caret is a continuous zoom, eased in and out, rather than snapcn's one-frame cut. */
const ZOOM_FROM = 1.0
const ZOOM_TO = 2.2
const CUT_IN_ZOOM = 2.327
const CUT_IN_AT = { x: 0.573, y: 0.488 }
const CUT_OUT = 4.008
/** The pull back to the send button, eased around snapcn's cut. */
const OUT_FROM = 3.85
const OUT_TO = 4.45
const CUT_OUT_ZOOM = 1.44
const CUT_OUT_AT = { x: 0.531, y: 0.526 }
const POINTER_FROM = 4.04
const POINTER_HALF_LIFE = 0.044
const CLICK = 4.658
const BLINK_AFTER = 0.327
const BLINK_HALF = 0.474

const unrollEase = Easing.bezier(0.3, 0, 0.35, 1)
const sineInOut = (u: number) => -(Math.cos(Math.PI * u) - 1) / 2

/** Prefix widths of the text in the field's own face, so the caret can be placed without the DOM. */
function usePrefixWidths(text: string): number[] {
  return useMemo(() => {
    const ctx = typeof document === "undefined" ? null : document.createElement("canvas").getContext("2d")
    if (!ctx) return [...Array(text.length + 1).keys()].map((i) => i * 7.2)
    ctx.font = `400 14px ${getComputedStyle(document.body).fontFamily}`
    return [...Array(text.length + 1).keys()].map((i) => ctx.measureText(text.slice(0, i)).width)
  }, [text])
}

export interface PromptSendProps {
  text?: string
  placeholder?: string
  chips?: readonly string[]
}

/** A composer unrolls from a hairline, writes a brief while the camera rides the caret, then a pointer sends it. */
export function PromptSend({
  text = "Build a pricing page with three plans and an FAQ",
  placeholder = "Ask Lumen to build…",
  chips = ["Pricing page", "Dashboard", "Sign-in"],
}: PromptSendProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / fps
  const pre = usePrefixWidths(text)

  const unroll = unrollEase(Math.min(1, Math.max(0, t / UNROLL)))
  const fadeIn = interpolate(t, [FADE_FROM, FADE_FROM + FADE_FOR], [0, 1], CLAMP)

  // The typing is eased: slow in, fast through the middle, a settle on the last letters.
  const u = Math.min(1, Math.max(0, (t - TYPE_FROM) / (TYPE_TO - TYPE_FROM)))
  const flow = text.length * sineInOut(u)
  const typed = Math.floor(flow + 1e-6)
  const at = (c: number) => {
    const i = Math.min(text.length, Math.floor(c))
    const a = pre[i] ?? 0
    const b = pre[Math.min(text.length, i + 1)] ?? a
    return a + (b - a) * (c - i)
  }
  // The camera rides the continuous curve, the caret hops onto whole letters.
  const glide = { x: TEXT_X + at(flow), y: TEXT_Y }
  const caret = { x: TEXT_X + (pre[typed] ?? 0), y: TEXT_Y }

  // In: one continuous zoom that rides the caret. Out: an eased pull back onto the send
  // button, finished before the pointer clicks. No frame of the clip is a cut.
  const p = interpolate(t, [ZOOM_FROM, ZOOM_TO], [0, 1], { ...CLAMP, easing: Easing.inOut(Easing.cubic) })
  const inZoom = 1 + (CUT_IN_ZOOM - 1) * p
  // Where the caret sits on screen slides from its own place to snapcn's mark as the zoom grows.
  const target = {
    x: glide.x + (CUT_IN_AT.x * REF_W - glide.x) * p,
    y: glide.y + (CUT_IN_AT.y * REF_H - glide.y) * p,
  }
  const inShift = { x: target.x - inZoom * glide.x, y: target.y - inZoom * glide.y }
  const outShift = {
    x: CUT_OUT_AT.x * REF_W - CUT_OUT_ZOOM * SEND.x,
    y: CUT_OUT_AT.y * REF_H - CUT_OUT_ZOOM * SEND.y,
  }
  const out = interpolate(t, [OUT_FROM, OUT_TO], [0, 1], { ...CLAMP, easing: Easing.inOut(Easing.cubic) })
  const zoom = inZoom + (CUT_OUT_ZOOM - inZoom) * out
  const shift = { x: inShift.x + (outShift.x - inShift.x) * out, y: inShift.y + (outShift.y - inShift.y) * out }

  // The caret stays solid while typing and blinks off the last keystroke.
  const since = t - TYPE_TO - BLINK_AFTER
  const caretOn = t >= TYPE_FROM - 0.2 && (since < 0 || since % (BLINK_HALF * 2) >= BLINK_HALF)

  // The pointer belongs to the screen, not to the camera: it halves its distance every 44ms.
  const sendOnScreen = { x: CUT_OUT_AT.x * REF_W, y: CUT_OUT_AT.y * REF_H }
  const decay = 0.5 ** (Math.max(0, t - POINTER_FROM) / POINTER_HALF_LIFE)
  const pointer = {
    x: sendOnScreen.x + 4 + (REF_W + 40 - sendOnScreen.x) * decay,
    y: sendOnScreen.y + 4 + (REF_H + 30 - sendOnScreen.y) * decay,
  }
  const press = interpolate(t, [CLICK - 0.06, CLICK, CLICK + 0.18], [1, 0.86, 1], CLAMP)
  const sent = t >= CLICK
  const bloom = interpolate(t, [CLICK, CLICK + 0.6], [0, 1], { ...CLAMP, easing: Easing.out(Easing.cubic) })

  return (
    <Stage
      width={REF_W}
      height={REF_H}
      backdrop={
        <div
          className="absolute inset-0"
          style={{
            background: [
              `radial-gradient(70% 60% at 50% 120%, ${tint("--primary", 26)} 0%, transparent 100%)`,
              `radial-gradient(50% 40% at 100% 0%, ${tint("--primary", 10)} 0%, transparent 100%)`,
            ].join(", "),
          }}
        />
      }
    >
      <div className="absolute inset-0" style={{ translate: `${shift.x}px ${shift.y}px`, scale: zoom, transformOrigin: "0 0" }}>
        <div
          className="absolute"
          style={{
            left: PANEL_X,
            top: PANEL_Y,
            width: PANEL.w,
            scale: `${0.93 + 0.07 * unroll} 1`,
            clipPath: `inset(0 0 calc((100% - 2px) * ${1 - unroll}) 0)`,
          }}
        >
          <PromptInput value={text.slice(0, typed)} status={sent ? "submitted" : "ready"} className="shadow-lg">
            <PromptInputTextarea
              placeholder={placeholder}
              tabIndex={-1}
              readOnly
              style={{ opacity: typed > 0 ? 1 : fadeIn }}
            />
            <PromptInputToolbar>
              {chips.map((chip, i) => {
                const k = interpolate(t, [CHIP_FROM + i * CHIP_STEP, CHIP_FROM + i * CHIP_STEP + 0.3], [0, 1], {
                  ...CLAMP,
                  easing: Easing.out(Easing.cubic),
                })
                return (
                  <Suggestion
                    key={chip}
                    suggestion={chip}
                    tabIndex={-1}
                    style={{ opacity: k, translate: `0 ${(1 - k) * CHIP_RISE}px` }}
                  />
                )
              })}
              <div className="ms-auto" style={{ opacity: fadeIn, scale: press }}>
                <PromptInputSubmit tabIndex={-1} />
              </div>
            </PromptInputToolbar>
          </PromptInput>
        </div>

        {caretOn && !sent ? (
          <div className="absolute w-px bg-foreground" style={{ left: caret.x, top: caret.y - 9, height: 18 }} />
        ) : null}
      </div>

      {/* Screen-fixed, like the pointer: it leaves as the camera starts to push in on the caret. */}
      <Caption
        title="Designed for agents, too."
        description="Prompt input, suggestions and traces, in the same tokens."
        style={{
          top: 40,
          opacity: t < CUT_OUT ? interpolate(t, [0.3, 0.7, ZOOM_FROM, ZOOM_FROM + 0.3], [0, 1, 1, 0], CLAMP) : t >= CUT_OUT ? interpolate(t, [CUT_OUT, CUT_OUT + 0.3], [0, 1], CLAMP) : 0,
        }}
      />

      {sent ? (
        <div
          className="absolute rounded-full border-2 border-primary"
          style={{
            left: sendOnScreen.x,
            top: sendOnScreen.y,
            width: 48,
            height: 48,
            translate: "-50% -50%",
            scale: 1 + bloom * 3,
            opacity: 1 - bloom,
          }}
        />
      ) : null}
      {t >= POINTER_FROM ? <Pointer x={pointer.x} y={pointer.y} press={press} /> : null}
    </Stage>
  )
}

export default PromptSend
