"use client"

import * as React from "react"

import {
  getShaderRenderer,
  subscribeShaderFrame,
} from "@/lib/shader-renderer"
import { getFallbackGradientStyle, type ShaderConfig } from "@/lib/shaders"
import { cn } from "@/lib/utils"

export type ShaderCanvasProps = {
  config: ShaderConfig
  className?: string
  /** Whether the shader actively animates when visible. */
  active?: boolean
  /** Caps pixel density to keep gallery cards light while studio stays retina-sharp. */
  maxDpr?: number
  /** Cap frame rate (e.g. 30 for cards, 60 for studio). */
  maxFps?: number
  /** Callback invoked when custom GLSL fails to compile or recovers. */
  onCompileError?: (error: string | null) => void
  /** Ref populated with the current elapsed shader time (for PNG export parity). */
  timeRef?: React.MutableRefObject<number>
}

export function ShaderCanvas({
  config,
  className,
  active = true,
  maxDpr = 1.25,
  maxFps = 30,
  onCompileError,
  timeRef,
}: ShaderCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const configRef = React.useRef(config)
  const onErrorRef = React.useRef(onCompileError)
  const lastErrorRef = React.useRef<string | null>(null)
  const lastTimeRef = React.useRef(2.4)
  const [visible, setVisible] = React.useState(true)
  const [webglReady, setWebglReady] = React.useState(true)

  React.useEffect(() => {
    configRef.current = config
  }, [config])

  React.useEffect(() => {
    onErrorRef.current = onCompileError
  }, [onCompileError])

  const drawFrame = React.useCallback(
    (timeSeconds: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      if (rect.width < 2 || rect.height < 2) return

      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      const w = Math.max(2, Math.round(rect.width * dpr))
      const h = Math.max(2, Math.round(rect.height * dpr))

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }

      lastTimeRef.current = timeSeconds
      if (timeRef) timeRef.current = timeSeconds

      const result = getShaderRenderer().renderToCanvas(
        canvas,
        configRef.current,
        timeSeconds,
      )

      if (result.error !== lastErrorRef.current) {
        lastErrorRef.current = result.error
        onErrorRef.current?.(result.error)
      }

      if (!result.ok && result.error === null) {
        setWebglReady(false)
      } else if (result.ok) {
        setWebglReady(true)
      }
    },
    [maxDpr, timeRef],
  )

  // Track viewport visibility so offscreen cards pause completely.
  React.useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        setVisible(entries[0]?.isIntersecting ?? true)
      },
      { rootMargin: "120px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Redraw immediately on resize or config change.
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    drawFrame(lastTimeRef.current)

    if (typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(() => {
      drawFrame(lastTimeRef.current)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [config, drawFrame])

  // Subscribe to the shared animation clock when visible and animated.
  React.useEffect(() => {
    if (!visible || !active || !config.animated) return

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion) return

    const minDelta = 1 / Math.max(1, maxFps)
    let lastDraw = -Infinity

    return subscribeShaderFrame((elapsed) => {
      if (elapsed - lastDraw < minDelta) return
      lastDraw = elapsed
      drawFrame(elapsed)
    })
  }, [visible, active, config.animated, maxFps, drawFrame])

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ backgroundImage: getFallbackGradientStyle(config) }}
    >
      {webglReady ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="block h-full w-full"
        />
      ) : null}
    </div>
  )
}
