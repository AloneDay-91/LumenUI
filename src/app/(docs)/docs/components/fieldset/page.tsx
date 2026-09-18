"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Checkbox } from "@/components/ui/Checkbox"
import { Fieldset, FieldsetLegend } from "@/components/ui/Fieldset"
import { Label } from "@/components/ui/Label"

export default function FieldsetPage() {
  return (
    <ComponentDocs
      name="Fieldset"
      description="Fieldset natif avec légende stylable. Construit sur @base-ui/react/fieldset."
      preview={
        <Fieldset className="w-56">
          <FieldsetLegend>Notifications</FieldsetLegend>
          <Label className="gap-2">
            <Checkbox defaultChecked />
            Email
          </Label>
          <Label className="gap-2">
            <Checkbox />
            Push
          </Label>
        </Fieldset>
      }
      usage={`import { Fieldset, FieldsetLegend } from "@/components/ui/Fieldset"

<Fieldset>
  <FieldsetLegend>Notifications</FieldsetLegend>
</Fieldset>`}
    />
  )
}
