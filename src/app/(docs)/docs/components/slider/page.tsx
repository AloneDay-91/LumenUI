"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Slider } from "@/components/ui/Slider"

export default function SliderPage() {
  return (
    <ComponentDocs
      name="Slider"
      description="Styleable range control. Built on @base-ui/react/slider."
      preview={<Slider className="w-56" defaultValue={40} />}
      usage={`import { Slider } from "@/components/ui/Slider"

<Slider defaultValue={40} />`}
    />
  )
}
