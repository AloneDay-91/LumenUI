"use client"

import {
  useEffect,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react"

import { Input } from "@/components/ui/Input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { cn } from "@/lib/utils"

type Rgb = { r: number; g: number; b: number }
type Hsv = { h: number; s: number; v: number }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function parseHex(input: string): Rgb | null {
  const raw = input.trim().replace(/^#/, "")
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((channel) => channel + channel)
          .join("")
      : raw
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  }
}

function channelHex(value: number) {
  return Math.round(clamp(value, 0, 255)).toString(16).padStart(2, "0")
}

function rgbToHex({ r, g, b }: Rgb) {
  return `#${channelHex(r)}${channelHex(g)}${channelHex(b)}`
}

function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const delta = max - min
  let h = 0
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6
    else if (max === gn) h = (bn - rn) / delta + 2
    else h = (rn - gn) / delta + 4
    h *= 60
    if (h < 0) h += 360
  }
  return { h, s: max === 0 ? 0 : delta / max, v: max }
}

function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let rn = 0
  let gn = 0
  let bn = 0
  if (h < 60) {
    rn = c
    gn = x
  } else if (h < 120) {
    rn = x
    gn = c
  } else if (h < 180) {
    gn = c
    bn = x
  } else if (h < 240) {
    gn = x
    bn = c
  } else if (h < 300) {
    rn = x
    bn = c
  } else {
    rn = c
    bn = x
  }
  return { r: (rn + m) * 255, g: (gn + m) * 255, b: (bn + m) * 255 }
}

function hsvToHex(hsv: Hsv) {
  return rgbToHex(hsvToRgb(hsv))
}

function point(event: PointerEvent<HTMLElement>, node: HTMLElement) {
  const rect = node.getBoundingClientRect()
  return {
    x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
    y: clamp((event.clientY - rect.top) / rect.height, 0, 1),
  }
}

function ColorPicker({
  className,
  value,
  defaultValue = "#262626",
  onValueChange,
  disabled,
  "aria-label": ariaLabel = "Color",
}: {
  className?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  "aria-label"?: string
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const current = value ?? uncontrolled
  const rgb = parseHex(current)
  const hsv = rgb ? rgbToHsv(rgb) : null
  const swatch = rgb ? rgbToHex(rgb) : "#262626"
  const hueFromColor = hsv && hsv.s > 0.001 ? hsv.h : null
  const [hue, setHue] = useState(() => hsv?.h ?? 0)
  const [draft, setDraft] = useState(swatch)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (hueFromColor != null) setHue(hueFromColor)
  }, [hueFromColor])

  useEffect(() => {
    if (!editing) setDraft(swatch)
  }, [editing, swatch])

  const saturation = hsv?.s ?? 0
  const brightness = hsv?.v ?? 1
  const hueColor = hsvToHex({ h: hue, s: 1, v: 1 })

  function commit(next: Hsv) {
    const hex = hsvToHex(next)
    setHue(next.h)
    if (value === undefined) setUncontrolled(hex)
    onValueChange?.(hex)
  }

  function commitHex(input: string) {
    const next = parseHex(input)
    if (!next) return
    const parsed = rgbToHsv(next)
    commit({ ...parsed, h: parsed.s > 0.001 ? parsed.h : hue })
  }

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(
          "size-7 shrink-0 rounded-full border border-border bg-(--swatch) shadow-sm outline-none",
          "focus-visible:ring-3 focus-visible:ring-ring/30",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        style={{ "--swatch": swatch } as CSSProperties}
      />
      <PopoverContent align="start" className="flex w-56 flex-col px-3">
        <div className="py-2">
        <div
          role="slider"
          aria-label="Saturation and brightness"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(saturation * 100)}
          aria-valuetext={`${Math.round(saturation * 100)}% saturation, ${Math.round(brightness * 100)}% brightness`}
          tabIndex={0}
          className="relative h-32 w-full cursor-crosshair touch-none overflow-hidden rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
          style={{ backgroundColor: hueColor }}
          onPointerDown={(event) => {
            const node = event.currentTarget
            node.setPointerCapture(event.pointerId)
            const { x, y } = point(event, node)
            commit({ h: hue, s: x, v: 1 - y })
          }}
          onPointerMove={(event) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
            const { x, y } = point(event, event.currentTarget)
            commit({ h: hue, s: x, v: 1 - y })
          }}
          onKeyDown={(event) => {
            const step = event.shiftKey ? 0.1 : 0.02
            if (event.key === "ArrowRight") commit({ h: hue, s: clamp(saturation + step, 0, 1), v: brightness })
            else if (event.key === "ArrowLeft") commit({ h: hue, s: clamp(saturation - step, 0, 1), v: brightness })
            else if (event.key === "ArrowUp") commit({ h: hue, s: saturation, v: clamp(brightness + step, 0, 1) })
            else if (event.key === "ArrowDown") commit({ h: hue, s: saturation, v: clamp(brightness - step, 0, 1) })
            else return
            event.preventDefault()
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-black" />
          <span
            className="pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm ring-1 ring-black/30"
            style={{ left: `${saturation * 100}%`, top: `${(1 - brightness) * 100}%` }}
          />
        </div>
        </div>
        <div className="py-2">
        <div
          role="slider"
          aria-label="Hue"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={Math.round(hue)}
          tabIndex={0}
          className="relative h-3 w-full cursor-pointer touch-none rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
          style={{
            background:
              "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
          }}
          onPointerDown={(event) => {
            const node = event.currentTarget
            node.setPointerCapture(event.pointerId)
            commit({ h: point(event, node).x * 360, s: saturation || 1, v: brightness })
          }}
          onPointerMove={(event) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
            commit({ h: point(event, event.currentTarget).x * 360, s: saturation || 1, v: brightness })
          }}
          onKeyDown={(event) => {
            const step = event.shiftKey ? 20 : 4
            if (event.key === "ArrowRight" || event.key === "ArrowUp") commit({ h: (hue + step) % 360, s: saturation || 1, v: brightness })
            else if (event.key === "ArrowLeft" || event.key === "ArrowDown") commit({ h: (hue - step + 360) % 360, s: saturation || 1, v: brightness })
            else return
            event.preventDefault()
          }}
        >
          <span
            className="pointer-events-none absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm ring-1 ring-black/30"
            style={{ left: `${(hue / 360) * 100}%` }}
          />
        </div>
        </div>
        <div className="py-2">
        <Input
          value={editing ? draft : swatch}
          spellCheck={false}
          aria-label={`${ariaLabel} hex`}
          className="font-mono"
          onFocus={() => {
            setDraft(swatch)
            setEditing(true)
          }}
          onBlur={() => setEditing(false)}
          onChange={(event) => {
            const next = event.target.value
            setDraft(next)
            commitHex(next)
          }}
        />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker }
