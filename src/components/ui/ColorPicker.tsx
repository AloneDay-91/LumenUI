"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { CheckIcon, PipetteIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { CopyButton } from "@/components/ui/CopyButton"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import { inputClassName } from "@/components/ui/styles"
import { cn } from "@/lib/utils"

/* ---------------------------------------------------------------------------
   Colour maths. Everything goes through sRGB 0–255 plus alpha 0–1.
   --------------------------------------------------------------------------- */

type Rgba = { r: number; g: number; b: number; a: number }
type Hsva = { h: number; s: number; v: number; a: number }
type ColorFormat = "hex" | "rgb" | "hsl" | "oklch"

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const round = (value: number, digits = 0) => {
  const f = 10 ** digits
  return Math.round(value * f) / f
}

function rgbToHsv({ r, g, b, a }: Rgba): Hsva {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const delta = max - Math.min(rn, gn, bn)
  let h = 0
  if (delta) {
    if (max === rn) h = ((gn - bn) / delta) % 6
    else if (max === gn) h = (bn - rn) / delta + 2
    else h = (rn - gn) / delta + 4
    h = (h * 60 + 360) % 360
  }
  return { h, s: max ? delta / max : 0, v: max, a }
}

function hsvToRgb({ h, s, v, a }: Hsva): Rgba {
  const f = (n: number) => {
    const k = (n + h / 60) % 6
    return (v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255
  }
  return { r: f(5), g: f(3), b: f(1), a }
}

function rgbToHsl({ r, g, b }: Rgba) {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  const d = max - min
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0
  return { h: rgbToHsv({ r, g, b, a: 1 }).h, s, l }
}

function hslToRgb(h: number, s: number, l: number, a: number): Rgba {
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    return (l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255
  }
  return { r: f(0), g: f(8), b: f(4), a }
}

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const toGamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)

/** sRGB → OKLCH (Björn Ottosson's OKLab), lightness 0–1. */
function rgbToOklch({ r, g, b }: Rgba) {
  const [lr, lg, lb] = [r, g, b].map((c) => toLinear(c / 255))
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const C = Math.hypot(A, B)
  return { l: L, c: C, h: C < 0.0001 ? 0 : (Math.atan2(B, A) * 180) / Math.PI + (B < 0 ? 360 : 0) }
}

/** OKLCH → sRGB, clamped into the sRGB gamut. */
function oklchToRgb(L: number, C: number, H: number, a: number): Rgba {
  const A = C * Math.cos((H * Math.PI) / 180)
  const B = C * Math.sin((H * Math.PI) / 180)
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3
  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  return {
    r: clamp(toGamma(lr)) * 255,
    g: clamp(toGamma(lg)) * 255,
    b: clamp(toGamma(lb)) * 255,
    a,
  }
}

/** Reads #rgb, #rgba, #rrggbb, #rrggbbaa, rgb(), hsl(), and oklch(), with or without commas. */
function parseColor(input: string): Rgba | null {
  const text = input.trim().toLowerCase()
  const hex = text.match(/^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/)
  if (hex) {
    let raw = hex[1]
    if (raw.length <= 4) raw = [...raw].map((c) => c + c).join("")
    const n = (i: number) => Number.parseInt(raw.slice(i, i + 2), 16)
    return { r: n(0), g: n(2), b: n(4), a: raw.length === 8 ? round(n(6) / 255, 3) : 1 }
  }
  const fn = text.match(/^(rgba?|hsla?|oklch)\(\s*([^)]*)\)$/)
  if (!fn) return null
  const parts = fn[2].split(/[\s,/]+/).filter(Boolean)
  if (parts.length < 3) return null
  const num = (part: string, scale = 1) =>
    part.endsWith("%") ? (Number.parseFloat(part) / 100) * scale : Number.parseFloat(part)
  const alpha = parts[3] === undefined ? 1 : clamp(num(parts[3]))
  const values = parts.slice(0, 3)
  if (values.some((part) => Number.isNaN(Number.parseFloat(part)))) return null
  if (fn[1].startsWith("rgb")) {
    const [r, g, b] = values.map((part) => clamp(num(part, 255), 0, 255))
    return { r, g, b, a: alpha }
  }
  if (fn[1].startsWith("hsl")) {
    const h = Number.parseFloat(values[0])
    const s = clamp(Number.parseFloat(values[1]) / 100)
    const l = clamp(Number.parseFloat(values[2]) / 100)
    return hslToRgb(((h % 360) + 360) % 360, s, l, alpha)
  }
  const L = values[0].endsWith("%") ? num(values[0]) : Number.parseFloat(values[0])
  const C = values[1].endsWith("%") ? num(values[1], 0.4) : Number.parseFloat(values[1])
  return oklchToRgb(clamp(L), Math.max(0, C), Number.parseFloat(values[2]) || 0, alpha)
}

const hex2 = (value: number) => Math.round(clamp(value, 0, 255)).toString(16).padStart(2, "0")

function formatColor(color: Rgba, format: ColorFormat): string {
  const a = round(color.a, 2)
  const alpha = a < 1 ? ` / ${a}` : ""
  switch (format) {
    case "hex":
      return `#${hex2(color.r)}${hex2(color.g)}${hex2(color.b)}${a < 1 ? hex2(a * 255) : ""}`
    case "rgb":
      return `rgb(${Math.round(color.r)} ${Math.round(color.g)} ${Math.round(color.b)}${alpha})`
    case "hsl": {
      const { h, s, l } = rgbToHsl(color)
      return `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%${alpha})`
    }
    case "oklch": {
      const { l, c, h } = rgbToOklch(color)
      return `oklch(${round(l * 100, 1)}% ${round(c, 3)} ${round(h, 1)}${alpha})`
    }
  }
}

/* ---------------------------------------------------------------------------
   State: HSV keeps the hue while the colour is grey or black.
   --------------------------------------------------------------------------- */

function useColorState({
  value,
  defaultValue,
  onValueChange,
  format,
  alpha,
}: {
  value?: string
  defaultValue: string
  onValueChange?: (value: string) => void
  format: ColorFormat
  alpha: boolean
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const current = value ?? uncontrolled
  const parsed = parseColor(current) ?? parseColor(defaultValue) ?? { r: 0, g: 0, b: 0, a: 1 }
  const fromValue = rgbToHsv(alpha ? parsed : { ...parsed, a: 1 })
  // The hue survives greys: a value with no saturation keeps the last one.
  const [hue, setHue] = React.useState(fromValue.h)
  const [syncedFrom, setSyncedFrom] = React.useState(current)
  if (syncedFrom !== current) {
    setSyncedFrom(current)
    if (fromValue.s > 0.001 && fromValue.v > 0.001) setHue(fromValue.h)
  }
  const hsva: Hsva = { ...fromValue, h: fromValue.s > 0.001 && fromValue.v > 0.001 ? fromValue.h : hue }

  const commit = (next: Hsva) => {
    setHue(next.h)
    const text = formatColor(hsvToRgb({ ...next, a: alpha ? next.a : 1 }), format)
    setSyncedFrom(text)
    if (value === undefined) setUncontrolled(text)
    onValueChange?.(text)
  }
  const commitText = (text: string) => {
    const next = parseColor(text)
    if (!next) return false
    const hsv = rgbToHsv(next)
    commit({ ...hsv, h: hsv.s > 0.001 && hsv.v > 0.001 ? hsv.h : hue })
    return true
  }
  return { hsva, rgba: hsvToRgb(hsva), commit, commitText }
}

const noopSubscribe = () => () => {}
const checker =
  "bg-[conic-gradient(var(--color-muted)_25%,transparent_0_50%,var(--color-muted)_0_75%,transparent_0)] bg-size-[8px_8px] bg-background"

/* ---------------------------------------------------------------------------
   Parts
   --------------------------------------------------------------------------- */

function SaturationArea({
  hsva,
  onChange,
  label,
}: {
  hsva: Hsva
  onChange: (next: Hsva) => void
  label: string
}) {
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    onChange({
      ...hsva,
      s: clamp((event.clientX - rect.left) / rect.width),
      v: 1 - clamp((event.clientY - rect.top) / rect.height),
    })
  }
  return (
    <div
      role="slider"
      aria-roledescription="2D slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(hsva.s * 100)}
      aria-valuetext={`Saturation ${Math.round(hsva.s * 100)}%, brightness ${Math.round(hsva.v * 100)}%`}
      tabIndex={0}
      data-slot="color-picker-area"
      className="relative h-36 w-full cursor-crosshair touch-none overflow-hidden rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
      style={{ backgroundColor: `hsl(${hsva.h} 100% 50%)` }}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        move(event)
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event)
      }}
      onKeyDown={(event) => {
        const step = event.shiftKey ? 0.1 : 0.01
        const next = { ...hsva }
        if (event.key === "ArrowRight") next.s = clamp(hsva.s + step)
        else if (event.key === "ArrowLeft") next.s = clamp(hsva.s - step)
        else if (event.key === "ArrowUp") next.v = clamp(hsva.v + step)
        else if (event.key === "ArrowDown") next.v = clamp(hsva.v - step)
        else return
        event.preventDefault()
        onChange(next)
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-black" />
      <span
        aria-hidden
        className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.25),0_1px_3px_rgb(0_0_0/0.3)]"
        style={{
          left: `${hsva.s * 100}%`,
          top: `${(1 - hsva.v) * 100}%`,
          backgroundColor: formatColor(hsvToRgb({ ...hsva, a: 1 }), "hex"),
        }}
      />
    </div>
  )
}

function ChannelSlider({
  label,
  value,
  max,
  step,
  valueText,
  background,
  thumbColor,
  checkered,
  onChange,
}: {
  label: string
  value: number
  max: number
  step: number
  valueText: string
  background: string
  thumbColor: string
  checkered?: boolean
  onChange: (value: number) => void
}) {
  return (
    <SliderPrimitive.Root
      value={value}
      min={0}
      max={max}
      step={step}
      onValueChange={(next) => onChange(Array.isArray(next) ? next[0] : next)}
      className="flex w-full touch-none"
    >
      <SliderPrimitive.Control className="flex h-4 w-full cursor-pointer items-center">
        <SliderPrimitive.Track
          className={cn("relative h-3 w-full rounded-full ring-1 ring-foreground/5 ring-inset select-none", checkered && checker)}
        >
          <span aria-hidden className="absolute inset-0 rounded-full" style={{ background }} />
          <SliderPrimitive.Thumb
            aria-label={label}
            getAriaValueText={() => valueText}
            className="size-4 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.25),0_1px_3px_rgb(0_0_0/0.3)] outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40"
            style={{ backgroundColor: thumbColor }}
          />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

type ColorPickerPanelProps = {
  className?: string
  /** Any CSS colour this component reads: hex, rgb(), hsl(), oklch(). */
  value?: string
  defaultValue?: string
  /** Called with the colour written in `format`. */
  onValueChange?: (value: string) => void
  /** How values are written out, and the format the field opens on. */
  format?: ColorFormat
  /** Formats offered in the field's switcher. Empty hides it. */
  formats?: ColorFormat[]
  /** Adds an opacity slider; values gain an alpha part below 100%. */
  alpha?: boolean
  /** Colours offered as one-click swatches. */
  swatches?: string[]
  /** Shows the eyedropper where the browser supports it. */
  eyeDropper?: boolean
  "aria-label"?: string
}

/**
 * The picker itself, without a popover: a saturation and brightness area,
 * hue and opacity sliders, a field that reads and writes hex, rgb, hsl, and
 * oklch, an eyedropper, and swatches. Use it inline, in a sidebar or a card.
 */
function ColorPickerPanel({
  className,
  value,
  defaultValue = "#262626",
  onValueChange,
  format = "hex",
  formats = ["hex", "rgb", "hsl", "oklch"],
  alpha = false,
  swatches,
  eyeDropper = true,
  "aria-label": ariaLabel = "Color",
}: ColorPickerPanelProps) {
  const [shown, setShown] = React.useState<ColorFormat>(format)
  const { hsva, rgba, commit, commitText } = useColorState({ value, defaultValue, onValueChange, format, alpha })
  const [draft, setDraft] = React.useState<string | null>(null)
  const [invalid, setInvalid] = React.useState(false)
  const canPick = React.useSyncExternalStore(
    noopSubscribe,
    () => "EyeDropper" in window,
    () => false
  )

  const solid = formatColor({ ...rgba, a: 1 }, "hex")
  const text = formatColor(rgba, shown)
  const outputValue = formatColor(rgba, format)

  const pick = async () => {
    try {
      const dropper = new (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper()
      const result = await dropper.open()
      commitText(result.sRGBHex)
    } catch {
      // Escape or a refused permission: nothing to do.
    }
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      data-slot="color-picker-panel"
      className={cn("flex w-full flex-col gap-3", className)}
    >
      <SaturationArea hsva={hsva} onChange={commit} label={`${ariaLabel}: saturation and brightness`} />

      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <ChannelSlider
            label={`${ariaLabel}: hue`}
            value={hsva.h}
            max={359}
            step={1}
            valueText={`${Math.round(hsva.h)} degrees`}
            background="linear-gradient(to right in hsl longer hue, hsl(0 100% 50%), hsl(360 100% 50%))"
            thumbColor={`hsl(${hsva.h} 100% 50%)`}
            onChange={(h) => commit({ ...hsva, h })}
          />
          {alpha ? (
            <ChannelSlider
              label={`${ariaLabel}: opacity`}
              value={hsva.a}
              max={1}
              step={0.01}
              valueText={`${Math.round(hsva.a * 100)}%`}
              background={`linear-gradient(to right, transparent, ${solid})`}
              thumbColor={formatColor(rgba, "rgb")}
              checkered
              onChange={(a) => commit({ ...hsva, a })}
            />
          ) : null}
        </div>
        {eyeDropper && canPick ? (
          <Button variant="outline" size="icon-sm" onClick={pick} aria-label="Pick a color from the screen">
            <PipetteIcon />
          </Button>
        ) : null}
      </div>

      <div className="flex items-center gap-1.5">
        <span
          aria-hidden
          className={cn("size-8 shrink-0 overflow-hidden rounded-xl ring-1 ring-foreground/10 ring-inset", checker)}
        >
          <span className="block size-full" style={{ backgroundColor: formatColor(rgba, "rgb") }} />
        </span>
        <input
          value={draft ?? text}
          spellCheck={false}
          autoComplete="off"
          aria-label={`${ariaLabel}, ${shown}`}
          aria-invalid={invalid || undefined}
          onFocus={() => setDraft(text)}
          onChange={(event) => {
            setDraft(event.target.value)
            setInvalid(false)
          }}
          onBlur={() => {
            if (draft !== null && draft !== text && !commitText(draft)) setInvalid(true)
            setDraft(null)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              if (draft !== null && !commitText(draft)) setInvalid(true)
              else setDraft(null)
            } else if (event.key === "Escape" && draft !== null) {
              event.stopPropagation()
              setDraft(null)
              setInvalid(false)
            }
          }}
          className={cn(inputClassName, "min-w-0 flex-1 px-2.5 font-mono text-[11px]")}
        />
        <CopyButton value={outputValue} size="icon-sm" label={`Copy ${outputValue}`} />
      </div>

      {formats.length > 1 ? (
        <ToggleGroup
          aria-label="Color format"
          value={[shown]}
          onValueChange={(next) => next[0] && setShown(next[0] as ColorFormat)}
          className="w-full"
        >
          {formats.map((f) => (
            <Toggle key={f} value={f} className="flex-1 px-2 font-mono text-[11px] uppercase">
              {f}
            </Toggle>
          ))}
        </ToggleGroup>
      ) : null}

      {swatches?.length ? (
        <div role="group" aria-label="Swatches" className="grid grid-cols-8 gap-1.5">
          {swatches.map((swatch) => {
            const color = parseColor(swatch)
            if (!color) return null
            const selected =
              formatColor(color, "hex") === formatColor(alpha ? rgba : { ...rgba, a: 1 }, "hex")
            return (
              <button
                key={swatch}
                type="button"
                aria-label={swatch}
                aria-pressed={selected}
                onClick={() => commitText(swatch)}
                className={cn(
                  "relative flex aspect-square items-center justify-center overflow-hidden rounded-lg ring-1 ring-foreground/10 ring-inset outline-none transition-transform hover:scale-110 focus-visible:ring-3 focus-visible:ring-ring/40",
                  checker
                )}
              >
                <span aria-hidden className="absolute inset-0" style={{ backgroundColor: formatColor(color, "rgb") }} />
                {selected ? (
                  <CheckIcon
                    aria-hidden
                    className="relative size-3"
                    style={{ color: rgbToOklch(color).l > 0.6 ? "#000" : "#fff" }}
                  />
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

/**
 * A swatch that opens the picker in a popover. With `showValue`, the trigger
 * is a field-sized button with the swatch and the value written out.
 */
function ColorPicker({
  className,
  disabled,
  showValue = false,
  placeholder,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: ColorPickerPanelProps & {
  disabled?: boolean
  /** A field-like trigger with the value next to the swatch. */
  showValue?: boolean
  placeholder?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const label = props["aria-label"] ?? "Color"
  // The trigger mirrors the panel's value; keep an uncontrolled copy for it.
  const [uncontrolled, setUncontrolled] = React.useState(props.defaultValue ?? "#262626")
  const current = props.value ?? uncontrolled
  const parsed = parseColor(current)
  const fill = parsed ? formatColor(props.alpha ? parsed : { ...parsed, a: 1 }, "rgb") : "transparent"
  const written = parsed ? formatColor(props.alpha ? parsed : { ...parsed, a: 1 }, props.format ?? "hex") : ""

  const swatch = (
    <span
      aria-hidden
      className={cn("block size-full overflow-hidden rounded-[inherit]", checker)}
    >
      <span className="block size-full" style={{ backgroundColor: fill }} />
    </span>
  )

  return (
    <Popover open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger
        type="button"
        disabled={disabled}
        aria-label={showValue ? `${label}: ${written || placeholder || "none"}` : label}
        data-slot="color-picker"
        className={cn(
          "outline-none focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50",
          showValue
            ? "flex h-8 w-full min-w-0 items-center gap-2 rounded-2xl border border-border bg-transparent ps-1.5 pe-3 text-start text-xs transition-colors hover:bg-muted/50 data-popup-open:border-ring"
            : "size-7 shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/10 ring-offset-0 transition-transform hover:scale-105",
          className
        )}
      >
        {showValue ? (
          <>
            <span className="size-5 shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/10">{swatch}</span>
            <span className={cn("min-w-0 flex-1 truncate font-mono text-[11px]", !written && "text-muted-foreground")}>
              {written || placeholder}
            </span>
          </>
        ) : (
          swatch
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-3">
        <ColorPickerPanel
          {...props}
          value={current}
          onValueChange={(next) => {
            if (props.value === undefined) setUncontrolled(next)
            props.onValueChange?.(next)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker, ColorPickerPanel, parseColor, formatColor }
export type { ColorFormat, ColorPickerPanelProps }
