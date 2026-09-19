"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Label } from "@/components/ui/Label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"

export default function RadioGroupPage() {
  return (
    <ComponentDocs
      name="Radio Group"
      description="Exclusive choice among radios. Built on @base-ui/react/radio-group."
      preview={
        <RadioGroup defaultValue="light" className="w-40">
          <Label className="gap-2">
            <RadioGroupItem value="light" />
            Light
          </Label>
          <Label className="gap-2">
            <RadioGroupItem value="dark" />
            Dark
          </Label>
        </RadioGroup>
      }
      usage={`import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"

<RadioGroup defaultValue="light">
  <RadioGroupItem value="light" />
  <RadioGroupItem value="dark" />
</RadioGroup>`}
    />
  )
}
