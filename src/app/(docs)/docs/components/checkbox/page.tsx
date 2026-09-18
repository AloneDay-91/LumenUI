"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Checkbox } from "@/components/ui/Checkbox"
import { Label } from "@/components/ui/Label"

export default function CheckboxPage() {
  return (
    <ComponentDocs
      name="Checkbox"
      description="Case à cocher stylable. Construit sur @base-ui/react/checkbox."
      preview={
        <Label className="gap-2">
          <Checkbox defaultChecked />
          Newsletter
        </Label>
      }
      usage={`import { Checkbox } from "@/components/ui/Checkbox"
import { Label } from "@/components/ui/Label"

<Label className="gap-2">
  <Checkbox defaultChecked />
  Newsletter
</Label>`}
    />
  )
}
