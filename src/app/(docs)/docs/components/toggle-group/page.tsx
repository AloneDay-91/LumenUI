"use client"

import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"

export default function ToggleGroupPage() {
  return (
    <ComponentDocs
      name="Toggle Group"
      description="État partagé pour une série de Toggle. Construit sur @base-ui/react/toggle-group."
      preview={
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ToggleGroup defaultValue={["center"]} aria-label="Alignement">
            <Toggle value="left" aria-label="Gauche">
              <AlignLeft />
            </Toggle>
            <Toggle value="center" aria-label="Centre">
              <AlignCenter />
            </Toggle>
            <Toggle value="right" aria-label="Droite">
              <AlignRight />
            </Toggle>
          </ToggleGroup>
          <ToggleGroup
            multiple
            defaultValue={["bold"]}
            aria-label="Mise en forme"
          >
            <Toggle value="bold">Gras</Toggle>
            <Toggle value="italic">Italique</Toggle>
            <Toggle value="underline">Souligné</Toggle>
          </ToggleGroup>
        </div>
      }
      usage={`import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"

<ToggleGroup defaultValue={["center"]} aria-label="Alignement">
  <Toggle value="left">Gauche</Toggle>
  <Toggle value="center">Centre</Toggle>
</ToggleGroup>`}
    />
  )
}
