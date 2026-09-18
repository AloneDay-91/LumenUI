"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/NumberField"

export default function NumberFieldPage() {
  return (
    <ComponentDocs
      name="Number Field"
      description="Saisie numérique avec incrément et décrément. Construit sur @base-ui/react/number-field."
      preview={
        <NumberField defaultValue={4} min={0} max={12}>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      }
      usage={`import { NumberField, NumberFieldGroup, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement } from "@/components/ui/NumberField"

<NumberField defaultValue={4}>
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>`}
    />
  )
}
