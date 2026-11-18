"use client"

// Agent Steps · adapted from snapcn (https://snapcn.dev/docs/ai-input/agent-steps).
// The bottom-anchored column, its additive one-row travel, the holds and the
// two-length outro are snapcn's measurements; the log is Lumen's TraceSteps,
// whose running and done states (spinner, shimmer, check) are the component's own.

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion"

import { Item, ItemContent, ItemTitle } from "@/components/ui/Item"
import { TraceStep, TraceSteps } from "@/components/ui/Trace"

import { Caption, CLAMP, Stage, tint } from "./stage"

export const REF_W = 714
export const REF_H = 402
export const DURATION = 135

/** Row centre to row centre: 0.0738 of the frame height. */
const ROW_PITCH = 0.0738 * REF_H
const CENTER_Y = REF_H / 2
const COLUMN_W = 300
const TRAVEL = 0.308
const SWELL = 0.5
const SLIDE = 0.6
const SWELL_TO = 1.4

const travelEase = Easing.bezier(0.3, 0.7, 0.3, 1)
const outroEase = Easing.bezier(0.3, 0, 0.3, 1)

export interface AgentStep {
  running: string
  done: string
}

export interface AgentStepsProps {
  prompt?: string
  steps?: readonly AgentStep[]
  /** What the last step turns into. */
  result?: string
  queryHold?: number
  stepHold?: number
  finalHold?: number
}

export const LUMEN_STEPS: readonly AgentStep[] = [
  { running: "Reading the Lumen registry…", done: "Read 112 components" },
  { running: "Choosing blocks…", done: "Picked 3 pricing blocks" },
  { running: "Composing the layout…", done: "Composed 4 sections" },
  { running: "Applying your theme…", done: "Applied 24 tokens" },
  { running: "Writing pricing.tsx…", done: "Wrote pricing.tsx" },
]

/** An agent narrating its work: a log that writes itself on the centre line, then clears to the answer. */
export function AgentSteps({
  prompt = "Build a pricing page with three plans and an FAQ",
  steps = LUMEN_STEPS,
  result = "Pricing page ready · 3 plans, 6 questions",
  queryHold = 0.683,
  stepHold = 0.45,
  finalHold = 0.283,
}: AgentStepsProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / fps

  const arrive = steps.map((_, i) => queryHold + i * stepHold)
  const outroAt = (arrive[arrive.length - 1] ?? queryHold) + finalHold
  const shown = arrive.filter((a) => t >= a).length

  // Additive travel: every new row lifts the column one pitch, and moves that overlap carry each other.
  const lift = arrive.reduce(
    (sum, a) => sum + ROW_PITCH * travelEase(Math.min(1, Math.max(0, (t - a) / TRAVEL))),
    0
  )
  const swell = outroEase(Math.min(1, Math.max(0, (t - outroAt) / SWELL)))
  const slide = outroEase(Math.min(1, Math.max(0, (t - outroAt) / SLIDE)))
  const resultIn = interpolate(t, [outroAt + SLIDE * 0.6, outroAt + SLIDE], [0, 1], CLAMP)

  const last = steps[steps.length - 1]
  const lastLive = shown === steps.length

  return (
    <Stage
      width={REF_W}
      height={REF_H}
      backdrop={
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(46.5% 46.5% at 85.8% 85.4%, ${tint("--primary", 17)} 0%, transparent 100%)` }}
        />
      }
    >
      {/* The column hangs from its last row, which always sits on the centre line. */}
      <div
        className="absolute"
        style={{
          left: (REF_W - COLUMN_W) / 2,
          top: CENTER_Y,
          width: COLUMN_W,
          translate: `0 ${-lift}px`,
          scale: 1 + (SWELL_TO - 1) * swell,
          transformOrigin: `50% ${lift}px`,
          opacity: 1 - swell,
        }}
      >
        {/* Row 0 is the prompt; step i sits i + 1 pitches below it. */}
        <div className="absolute left-0 flex w-full items-center" style={{ top: -ROW_PITCH / 2, height: ROW_PITCH }}>
          <Item variant="outline" size="xs" className="w-fit max-w-full bg-card px-3 shadow-sm">
            <ItemContent>
              <ItemTitle className="truncate text-xs font-normal">{prompt}</ItemTitle>
            </ItemContent>
          </Item>
        </div>
        {steps.map((step, i) => {
          if (i >= shown) return null
          const isLast = i === steps.length - 1
          const done = !isLast && i < shown - 1
          return (
            <div
              key={step.running}
              className="absolute left-0 flex w-full items-center"
              style={{
                top: (i + 1) * ROW_PITCH - ROW_PITCH / 2,
                height: ROW_PITCH,
                visibility: isLast && swell > 0 ? "hidden" : undefined,
              }}
            >
              <TraceSteps className="w-full">
                <TraceStep status={done ? "done" : "running"} title={done ? step.done : step.running} className="text-sm" />
              </TraceSteps>
            </div>
          )
        })}
      </div>

      {/* The surviving row slides to the middle while the rest swells away, then becomes the answer. */}
      {last && lastLive && swell > 0 ? (
        <div
          className="absolute flex items-center"
          style={{ left: (REF_W - COLUMN_W) / 2, top: CENTER_Y - ROW_PITCH / 2, width: COLUMN_W, height: ROW_PITCH }}
        >
          <div className="w-full" style={{ translate: `${slide * 50}% 0` }}>
            <div className="w-fit" style={{ translate: `${-slide * 50}% 0`, opacity: 1 - resultIn }}>
              <TraceSteps>
                <TraceStep status="running" title={last.running} className="text-sm" />
              </TraceSteps>
            </div>
          </div>
        </div>
      ) : null}

      {resultIn > 0 ? (
        <div
          className="absolute"
          style={{ left: REF_W / 2, top: CENTER_Y, translate: "-50% -50%", opacity: resultIn, scale: 0.94 + 0.06 * resultIn }}
        >
          <Item variant="outline" size="sm" className="w-max flex-nowrap bg-card shadow-lg">
            <ItemContent>
              <ItemTitle className="shimmer text-base">{result}</ItemTitle>
            </ItemContent>
          </Item>
        </div>
      ) : null}
      {/* Below the centre line, where the column never grows. */}
      <Caption
        title="Every step, on screen."
        description="Chat, traces, plans and tools for AI apps."
        style={{ top: 290, opacity: interpolate(t, [0.2, 0.6], [0, 1], CLAMP) }}
      />
    </Stage>
  )
}

export default AgentSteps
