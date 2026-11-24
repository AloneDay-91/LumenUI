"use client"

import * as React from "react"
import { EraserIcon, Undo2Icon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import { cn } from "@/lib/utils"

type Point = { x: number; y: number; p: number }

const INK = "#1a1a1a"
type Mode = "draw" | "type"

/** Smooth strokes: quadratic curves through midpoints, width from pressure. */
function paint(canvas: HTMLCanvasElement, strokes: Point[][], color: string, width: number) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  const ratio = window.devicePixelRatio || 1
  const { clientWidth: w, clientHeight: h } = canvas
  if (canvas.width !== Math.round(w * ratio) || canvas.height !== Math.round(h * ratio)) {
    canvas.width = Math.round(w * ratio)
    canvas.height = Math.round(h * ratio)
  }
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  for (const stroke of strokes) {
    if (stroke.length === 1) {
      const [dot] = stroke
      ctx.beginPath()
      ctx.arc(dot.x * w, dot.y * h, (width * (0.5 + dot.p)) / 2, 0, Math.PI * 2)
      ctx.fill()
      continue
    }
    for (let i = 1; i < stroke.length; i++) {
      const a = stroke[i - 1]
      const b = stroke[i]
      const prev = stroke[i - 2] ?? a
      ctx.lineWidth = width * (0.5 + (a.p + b.p) / 2)
      ctx.beginPath()
      ctx.moveTo(((prev.x + a.x) / 2) * w, ((prev.y + a.y) / 2) * h)
      ctx.quadraticCurveTo(a.x * w, a.y * h, ((a.x + b.x) / 2) * w, ((a.y + b.y) / 2) * h)
      ctx.stroke()
    }
  }
}

/**
 * A box to sign in with a mouse, a finger, or a pen, where pressure thickens
 * the line. Undo removes the last stroke. With `allowTyped`, a second mode
 * writes the typed name in a script face, so the keyboard alone can sign.
 * The value is a PNG data URL, or null while empty.
 */
function SignaturePad({
  className,
  onValueChange,
  strokeWidth = 2.5,
  allowTyped = true,
  disabled,
  height = 160,
  labels = {},
  "aria-label": ariaLabel = "Signature",
}: {
  className?: string
  /** A transparent PNG data URL of the signature, or null when cleared. */
  onValueChange?: (value: string | null, details: { mode: Mode; name?: string }) => void
  strokeWidth?: number
  /** Adds a Type mode: the name in a script face. */
  allowTyped?: boolean
  disabled?: boolean
  /** Pixels. */
  height?: number
  labels?: {
    draw?: string
    type?: string
    placeholder?: string
    namePlaceholder?: string
    undo?: string
    clear?: string
  }
  "aria-label"?: string
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const strokes = React.useRef<Point[][]>([])
  const drawing = React.useRef(false)
  const [count, setCount] = React.useState(0)
  const [mode, setMode] = React.useState<Mode>("draw")
  const [name, setName] = React.useState("")
  const nameRef = React.useRef<HTMLInputElement>(null)

  const color = () => (canvasRef.current ? getComputedStyle(canvasRef.current).color : "#000")
  const redraw = React.useCallback(() => {
    if (canvasRef.current) paint(canvasRef.current, strokes.current, color(), strokeWidth)
  }, [strokeWidth])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const observer = new ResizeObserver(redraw)
    observer.observe(canvas)
    // The ink follows the theme.
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const theme = new MutationObserver(redraw)
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] })
    media.addEventListener("change", redraw)
    return () => {
      observer.disconnect()
      theme.disconnect()
      media.removeEventListener("change", redraw)
    }
  }, [redraw, mode])

  // The exported image always has dark ink, whatever the theme on screen.
  const emitDrawn = () => {
    const canvas = canvasRef.current
    if (!strokes.current.length || !canvas) {
      onValueChange?.(null, { mode: "draw" })
      return
    }
    const out = document.createElement("canvas")
    out.style.width = `${canvas.clientWidth}px`
    out.style.height = `${canvas.clientHeight}px`
    document.body.appendChild(out)
    paint(out, strokes.current, INK, strokeWidth)
    out.remove()
    onValueChange?.(out.toDataURL("image/png"), { mode: "draw" })
  }

  const emitTyped = (text: string) => {
    if (!text.trim()) {
      onValueChange?.(null, { mode: "type", name: text })
      return
    }
    const canvas = document.createElement("canvas")
    const ratio = window.devicePixelRatio || 1
    const width = canvasRef.current?.parentElement?.clientWidth ?? 400
    canvas.width = width * ratio
    canvas.height = height * ratio
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.scale(ratio, ratio)
    const family = nameRef.current ? getComputedStyle(nameRef.current).fontFamily : "serif"
    ctx.font = `italic ${Math.round(height * 0.32)}px ${family}`
    ctx.fillStyle = INK
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, width / 2, height / 2, width - 32)
    onValueChange?.(canvas.toDataURL("image/png"), { mode: "type", name: text })
  }

  const point = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect()
    return {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
      // Mice report 0.5; pens and some touch screens report real pressure.
      p: event.pointerType === "mouse" || !event.pressure ? 0.5 : event.pressure,
    }
  }

  const undo = () => {
    strokes.current = strokes.current.slice(0, -1)
    setCount(strokes.current.length)
    redraw()
    emitDrawn()
  }
  const clear = () => {
    if (mode === "type") {
      setName("")
      emitTyped("")
      return
    }
    strokes.current = []
    setCount(0)
    redraw()
    emitDrawn()
  }

  const empty = mode === "draw" ? count === 0 : !name.trim()

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      data-slot="signature-pad"
      className={cn("flex w-full flex-col gap-2", disabled && "pointer-events-none opacity-50", className)}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-background"
        style={{ height }}
      >
        {mode === "draw" ? (
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={count ? `${ariaLabel}: drawn, ${count} strokes` : `${ariaLabel}: empty`}
            className="absolute inset-0 size-full cursor-crosshair touch-none text-foreground"
            onPointerDown={(event) => {
              if (event.button !== 0) return
              try {
                event.currentTarget.setPointerCapture(event.pointerId)
              } catch {
                // An unknown pointer id (a synthetic event) cannot be captured; draw anyway.
              }
              drawing.current = true
              strokes.current = [...strokes.current, [point(event)]]
              setCount(strokes.current.length)
              redraw()
            }}
            onPointerMove={(event) => {
              if (!drawing.current) return
              const stroke = strokes.current[strokes.current.length - 1]
              const events = event.nativeEvent.getCoalescedEvents?.() ?? [event.nativeEvent]
              for (const e of events) {
                const rect = event.currentTarget.getBoundingClientRect()
                stroke.push({
                  x: (e.clientX - rect.left) / rect.width,
                  y: (e.clientY - rect.top) / rect.height,
                  p: e.pointerType === "mouse" || !e.pressure ? 0.5 : e.pressure,
                })
              }
              redraw()
            }}
            onPointerUp={() => {
              if (!drawing.current) return
              drawing.current = false
              emitDrawn()
            }}
            onPointerCancel={() => (drawing.current = false)}
          />
        ) : (
          <input
            ref={nameRef}
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              emitTyped(event.target.value)
            }}
            placeholder={labels.namePlaceholder ?? "Type your full name"}
            aria-label={`${ariaLabel}: typed name`}
            className="absolute inset-0 size-full bg-transparent px-6 text-center font-serif text-[2rem] italic outline-none placeholder:font-sans placeholder:text-sm placeholder:not-italic placeholder:text-muted-foreground"
          />
        )}
        {/* The signing line. */}
        <span aria-hidden className="pointer-events-none absolute inset-x-6 bottom-8 border-b border-dashed border-border" />
        {mode === "draw" && count === 0 ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-2.5 text-center text-[11px] text-muted-foreground"
          >
            {labels.placeholder ?? "Sign above the line"}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-1">
        {allowTyped ? (
          <ToggleGroup
            aria-label="Signature mode"
            value={[mode]}
            onValueChange={(next) => {
              const m = next[0] as Mode | undefined
              if (!m || m === mode) return
              setMode(m)
              if (m === "type") emitTyped(name)
              else {
                // Redraw the strokes kept from before, once the canvas is back.
                requestAnimationFrame(() => {
                  redraw()
                  emitDrawn()
                })
              }
            }}
          >
            <Toggle value="draw">{labels.draw ?? "Draw"}</Toggle>
            <Toggle value="type">{labels.type ?? "Type"}</Toggle>
          </ToggleGroup>
        ) : null}
        <span className="flex-1" />
        {mode === "draw" ? (
          <Button variant="ghost" size="sm" onClick={undo} disabled={count === 0}>
            <Undo2Icon data-icon="inline-start" />
            {labels.undo ?? "Undo"}
          </Button>
        ) : null}
        <Button variant="ghost" size="sm" onClick={clear} disabled={empty}>
          <EraserIcon data-icon="inline-start" />
          {labels.clear ?? "Clear"}
        </Button>
      </div>
    </div>
  )
}

export { SignaturePad }
