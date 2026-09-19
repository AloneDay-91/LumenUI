"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/Field"

export default function FieldPage() {
  return (
    <ComponentDocs
      name="Field"
      description="Label and validation for a control. Built on @base-ui/react/field."
      preview={
        <Field className="w-64">
          <FieldLabel>Email</FieldLabel>
          <FieldControl type="email" placeholder="you@studio.com" required />
          <FieldDescription>Used for billing.</FieldDescription>
        </Field>
      }
      usage={`import { Field, FieldLabel, FieldControl, FieldDescription } from "@/components/ui/Field"

<Field>
  <FieldLabel>Email</FieldLabel>
  <FieldControl type="email" required />
  <FieldDescription>Used for billing.</FieldDescription>
</Field>`}
    />
  )
}
