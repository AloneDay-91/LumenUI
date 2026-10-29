"use client"

import { CodeBlock } from "@/components/docs/CodeBlock"
import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Button } from "@/components/ui/Button"
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/components/ui/Field"
import { Form } from "@/components/ui/Form"

const command = "npx @aloneday/lumenui@latest add form field button"

export default function FormRecipePage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "form", text: "Form", level: 1 },
          { id: "order", text: "Copy order", level: 2 },
          { id: "preview", text: "Preview", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          title="Form"
          description="A labeled field, the error under it, and a button that submits. Copy Field, then Form, then Button."
        />

        <section className="space-y-4">
          <h2 id="order">Copy order</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Field connects the label, the control, and the error.</li>
            <li>Form collects the values and shows those errors together.</li>
            <li>Button submits. The command also writes the files Field and Form import.</li>
          </ol>
          <CodeBlock language="bash" code={command} />
        </section>

        <section className="space-y-4">
          <h2 id="preview">Preview</h2>
          <p>Submit the empty form. The errors appear under each field.</p>
          <Preview>
            <Form
              className="w-full max-w-xs"
              onFormSubmit={(values) => {
                void values
              }}
            >
              <Field name="name">
                <FieldLabel>Name</FieldLabel>
                <FieldControl required />
                <FieldError match="valueMissing">Enter a name.</FieldError>
              </Field>
              <Field name="email">
                <FieldLabel>Email</FieldLabel>
                <FieldControl type="email" required />
                <FieldError match="valueMissing">Enter an email.</FieldError>
                <FieldError match="typeMismatch">That is not an email.</FieldError>
              </Field>
              <Button type="submit">Create account</Button>
            </Form>
          </Preview>
        </section>
      </div>
    </>
  )
}
