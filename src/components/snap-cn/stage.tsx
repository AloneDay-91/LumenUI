"use client"

import { createContext, useContext, type CSSProperties, type ReactNode } from "react"
import { MousePointer2Icon } from "lucide-react"
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion"

import { cn } from "@/lib/utils"

import "./stage.css"

export type StageMode = "light" | "dark"

/** Which end of the theme the video is drawn in. The Player follows the site; Studio picks per composition. */
export const StageModeContext = createContext<StageMode>("light")

export function useStageMode(): StageMode {
  return useContext(StageModeContext)
}

/**
 * The frame every Lumen scene is laid out in.
 *
 * Lumen components are sized for a screen (text-sm, h-8 buttons), so a scene is
 * drawn at a reference size close to a laptop viewport and scaled up to the
 * composition as one piece. Nothing below a stage knows the render size, and
 * every colour, radius and font comes from the theme tokens in globals.css.
 */
export function Stage({
  width: refW,
  height: refH,
  className,
  backdrop,
  children,
  style,
}: {
  width: number
  height: number
  className?: string
  /** Painted at the composition's own size, under the scaled frame. */
  backdrop?: ReactNode
  children: ReactNode
  style?: CSSProperties
}) {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()
  const k = Math.min(width / refW, height / refH)
  const mode = useStageMode()

  return (
    <AbsoluteFill
      // `clip`, not `hidden`: a block that scrolls something into view (cmdk does) can
      // scroll an overflow-hidden box and slide the whole frame; a clipped box cannot scroll.
      className={cn(
        mode,
        "lumen-stage overflow-clip bg-background text-left font-sans text-foreground antialiased",
        className
      )}
      style={{ "--stage-t": frame / fps, textRendering: "geometricPrecision", ...style } as CSSProperties}
    >
      {backdrop}
      {/* A picture of an interface, not one: nothing in it takes focus or clicks. */}
      <div
        inert
        style={{
          position: "absolute",
          left: (width - refW * k) / 2,
          top: (height - refH * k) / 2,
          width: refW,
          height: refH,
          scale: k,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  )
}

/** The pointer: lucide's MousePointer2, filled with the ink and rimmed with the page. */
export function Pointer({
  x,
  y,
  size = 22,
  press = 1,
  opacity = 1,
}: {
  x: number
  y: number
  size?: number
  press?: number
  opacity?: number
}) {
  // The tip of MousePointer2 sits at (4.04, 4.69) in its 24px box: anchor on it.
  const tip = size / 24
  return (
    <MousePointer2Icon
      aria-hidden
      className="absolute top-0 left-0 fill-foreground stroke-background"
      strokeWidth={1.6}
      style={{
        width: size,
        height: size,
        opacity,
        translate: `${x - 4.04 * tip}px ${y - 4.69 * tip}px`,
        scale: press,
        transformOrigin: `${4.04 * tip}px ${4.69 * tip}px`,
      }}
    />
  )
}

export const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const

/** Piecewise-linear lookup through measured knots. */
export function knots(t: number, ts: readonly number[], vs: readonly number[]): number {
  return interpolate(t, ts as number[], vs as number[], CLAMP)
}

/** A per-frame table starting at frame `from`, read with linear in-betweens. */
export type Table = { from: number; v: readonly number[] }

export function at(table: Table, x: number): number {
  const n = table.v.length
  const i = x - table.from
  if (i <= 0) return table.v[0] ?? 0
  if (i >= n - 1) return table.v[n - 1] ?? 0
  const i0 = Math.floor(i)
  const a = table.v[i0] ?? 0
  const b = table.v[i0 + 1] ?? a
  return a + (b - a) * (i - i0)
}

/** A token tinted toward transparent, for washes and glows. */
export function tint(token: string, percent: number): string {
  return `color-mix(in oklch, var(${token}) ${percent}%, transparent)`
}

/** A title over a description, in the site's own heading face, weight and tracking. */
export function Caption({
  title,
  description,
  className,
  style,
}: {
  title: string
  description?: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <div className={cn("absolute inset-x-0 flex flex-col items-center gap-1.5 text-center", className)} style={style}>
      <div className="font-heading text-2xl leading-tight font-normal tracking-[-0.02em] text-foreground">{title}</div>
      {description ? <p className="m-0 text-[15px] leading-relaxed text-muted-foreground">{description}</p> : null}
    </div>
  )
}
