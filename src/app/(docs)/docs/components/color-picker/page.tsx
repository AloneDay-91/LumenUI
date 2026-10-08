"use client"

import { useState } from "react"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { ColorPicker } from "@/components/ui/ColorPicker"

export default function ColorPickerPage() {
  const [color, setColor] = useState("#262626")

  return (
    <ComponentDocs
      name="Color Picker"
      description="A swatch that opens hue, saturation, and a hex field."
      preview={<ColorPicker value={color} onValueChange={setColor} aria-label="Primary" />}
      usage={`import { ColorPicker } from "@/components/ui/ColorPicker"

<ColorPicker defaultValue="#262626" onValueChange={(hex) => console.log(hex)} />`}
    />
  )
}
