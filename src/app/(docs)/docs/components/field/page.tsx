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
      description="Libellé et validation pour un contrôle. Construit sur @base-ui/react/field."
      preview={
        <Field className="w-64">
          <FieldLabel>Email</FieldLabel>
          <FieldControl type="email" placeholder="vous@studio.fr" required />
          <FieldDescription>Utilisé pour la facturation.</FieldDescription>
        </Field>
      }
      usage={`import { Field, FieldLabel, FieldControl, FieldDescription } from "@/components/ui/Field"

<Field>
  <FieldLabel>Email</FieldLabel>
  <FieldControl type="email" required />
  <FieldDescription>Utilisé pour la facturation.</FieldDescription>
</Field>`}
    />
  )
}
