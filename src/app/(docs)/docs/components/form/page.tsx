"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/components/ui/Field"
import { Form } from "@/components/ui/Form"

export default function FormPage() {
  return (
    <ComponentDocs
      name="Form"
      description="Native form with consolidated errors. Built on @base-ui/react/form."
      preview={
        <Form
          className="w-64"
          onFormSubmit={(formValues) => {
            void formValues
          }}
        >
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <FieldControl type="email" required />
            <FieldError match="valueMissing">Required</FieldError>
          </Field>
          <Button type="submit">Send</Button>
        </Form>
      }
      usage={`import { Form } from "@/components/ui/Form"
import { Field, FieldLabel, FieldControl } from "@/components/ui/Field"

<Form onFormSubmit={(values) => console.log(values)}>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <FieldControl type="email" required />
  </Field>
</Form>`}
    />
  )
}
