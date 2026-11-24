"use client"

import { useState } from "react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { ColorPicker, ColorPickerPanel } from "@/components/ui/ColorPicker"
import { Kbd } from "@/components/ui/Kbd"

const brand = [
  "#262626",
  "#5877f7",
  "#0ea5a4",
  "#16a34a",
  "#eab308",
  "#f97316",
  "#e11d48",
  "#a855f7",
]

function MainDemo() {
  const [color, setColor] = useState("#5877f7")

  return (
    <div className="flex w-full max-w-xs flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <ColorPicker value={color} onValueChange={setColor} swatches={brand} aria-label="Primary" />
        <span className="font-mono text-xs text-muted-foreground">{color}</span>
      </div>
      <ColorPicker
        showValue
        defaultValue="oklch(62.8% 0.2 29)"
        format="oklch"
        alpha
        swatches={brand}
        aria-label="Accent"
      />
    </div>
  )
}

function PanelDemo() {
  const [color, setColor] = useState("rgb(14 165 164 / 0.8)")

  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <ColorPickerPanel value={color} onValueChange={setColor} format="rgb" alpha swatches={brand} aria-label="Highlight" />
      <p className="m-0 font-mono text-[11px] text-muted-foreground">{color}</p>
    </div>
  )
}

export default function ColorPickerPage() {
  return (
    <ComponentDocs
      name="Color Picker"
      description="A swatch or a field that opens a full picker: saturation and brightness, hue, opacity, hex, rgb, hsl, and oklch, an eyedropper, and swatches."
      preview={<MainDemo />}
      usage={`import { ColorPicker } from "@/components/ui/ColorPicker"

<ColorPicker defaultValue="#5877f7" onValueChange={(color) => console.log(color)} />`}
      extraHeadings={[
        { id: "formats", text: "Formats", level: 2 },
        { id: "opacity", text: "Opacity", level: 2 },
        { id: "swatches", text: "Swatches and eyedropper", level: 2 },
        { id: "panel", text: "Inline panel", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="formats">Formats</h2>
            <p>
              <code>value</code> takes any of <code>#rgb</code>, <code>#rrggbb</code>,{" "}
              <code>#rrggbbaa</code>, <code>rgb()</code>, <code>hsl()</code>, and{" "}
              <code>oklch()</code>. <code>format</code> sets how{" "}
              <code>onValueChange</code> writes the colour back: <code>hex</code> by
              default, so the theme tokens stay hex. In the popup, the field switches
              between the formats in <code>formats</code> and accepts a pasted colour in
              any of them; <Kbd>Enter</Kbd> applies it, <Kbd>Escape</Kbd> restores it.
              Colours outside sRGB, like a wide oklch, are clamped to the nearest one.
            </p>
            <CodeBlock
              code={`<ColorPicker format="oklch" defaultValue="oklch(62.8% 0.2 29)" />
// onValueChange → "oklch(62.8% 0.2 29)"`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="opacity">Opacity</h2>
            <p>
              <code>alpha</code> adds an opacity slider over a checkerboard. Below 100%,
              values gain an alpha part: <code>#5877f7cc</code>,{" "}
              <code>rgb(88 119 247 / 0.8)</code>. Without it, alpha in a value is dropped.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="swatches">Swatches and eyedropper</h2>
            <p>
              <code>swatches</code> lists colours to pick in one click, eight per row; the
              current one is checked. Where the browser has the EyeDropper API, a button
              next to the sliders picks any pixel on screen. Turn it off with{" "}
              <code>eyeDropper={"{false}"}</code>.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="panel">Inline panel</h2>
            <p>
              <code>ColorPickerPanel</code> is the same picker without the popover, for a
              sidebar, a card, or a settings page. It takes the same props.
            </p>
            <Preview>
              <PanelDemo />
            </Preview>
            <CodeBlock
              code={`import { ColorPickerPanel } from "@/components/ui/ColorPicker"

<ColorPickerPanel value={color} onValueChange={setColor} format="rgb" alpha />`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The trigger is named by <code>aria-label</code>, plus the value when{" "}
              <code>showValue</code> is set. The area is a 2D slider:{" "}
              <Kbd>←</Kbd> <Kbd>→</Kbd> change saturation, <Kbd>↑</Kbd> <Kbd>↓</Kbd>{" "}
              brightness, with <Kbd>Shift</Kbd> for bigger steps, and it reads both
              values. Hue and opacity are sliders that read degrees and percentages.
              Swatches are toggle buttons named by their colour.
            </p>
          </section>
        </>
      }
    />
  )
}
