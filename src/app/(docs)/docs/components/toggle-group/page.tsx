"use client"

import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"

export default function ToggleGroupPage() {
  return (
    <ComponentDocs
      name="Toggle Group"
      description="Shared state for a series of Toggles. Built on @base-ui/react/toggle-group."
      preview={
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ToggleGroup defaultValue={["center"]} aria-label="Alignment">
            <Toggle value="left" aria-label="Left">
              <AlignLeft />
            </Toggle>
            <Toggle value="center" aria-label="Center">
              <AlignCenter />
            </Toggle>
            <Toggle value="right" aria-label="Right">
              <AlignRight />
            </Toggle>
          </ToggleGroup>
          <ToggleGroup
            multiple
            defaultValue={["bold"]}
            aria-label="Formatting"
          >
            <Toggle value="bold">Bold</Toggle>
            <Toggle value="italic">Italic</Toggle>
            <Toggle value="underline">Underline</Toggle>
          </ToggleGroup>
        </div>
      }
      usage={`import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"

<ToggleGroup defaultValue={["center"]} aria-label="Alignment">
  <Toggle value="left">Left</Toggle>
  <Toggle value="center">Center</Toggle>
</ToggleGroup>`}
    />
  )
}
