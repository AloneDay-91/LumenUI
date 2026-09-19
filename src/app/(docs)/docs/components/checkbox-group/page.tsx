"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Checkbox } from "@/components/ui/Checkbox"
import { CheckboxGroup } from "@/components/ui/CheckboxGroup"
import { Label } from "@/components/ui/Label"

export default function CheckboxGroupPage() {
  return (
    <ComponentDocs
      name="Checkbox Group"
      description="Shared state for a set of checkboxes. Built on @base-ui/react/checkbox-group."
      preview={
        <CheckboxGroup defaultValue={["inter"]} className="w-48">
          <Label className="gap-2">
            <Checkbox value="inter" />
            Inter
          </Label>
          <Label className="gap-2">
            <Checkbox value="fraunces" />
            Fraunces
          </Label>
          <Label className="gap-2">
            <Checkbox value="mono" />
            JetBrains Mono
          </Label>
        </CheckboxGroup>
      }
      usage={`import { CheckboxGroup } from "@/components/ui/CheckboxGroup"
import { Checkbox } from "@/components/ui/Checkbox"

<CheckboxGroup defaultValue={["inter"]}>
  <Checkbox value="inter" />
  <Checkbox value="fraunces" />
</CheckboxGroup>`}
    />
  )
}
