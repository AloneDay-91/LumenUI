import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/Field"
import { PasswordInput } from "@/components/ui/PasswordInput"

export default function PasswordInputPage() {
  return (
    <ComponentDocs
      name="Password Input"
      description="Password field with a show and hide toggle. An Input Group with a ghost icon button at the end."
      preview={
        <div className="w-full max-w-64">
          <PasswordInput placeholder="Password" aria-label="Password" />
        </div>
      }
      usage={`import { PasswordInput } from "@/components/ui/PasswordInput"

<PasswordInput placeholder="Password" aria-label="Password" />`}
      extraHeadings={[
        { id: "field", text: "With a field", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="field">With a field</h2>
            <p>
              Inside a <code>Field</code>, the label and the description attach to
              the input. Use <code>autoComplete=&quot;new-password&quot;</code> on
              a sign-up form so the browser offers to generate one.
            </p>
            <div className="w-full max-w-64">
              <Field>
                <FieldLabel>New password</FieldLabel>
                <PasswordInput autoComplete="new-password" />
                <FieldDescription>At least 12 characters.</FieldDescription>
              </Field>
            </div>
            <CodeBlock
              code={`<Field>
  <FieldLabel>New password</FieldLabel>
  <PasswordInput autoComplete="new-password" />
  <FieldDescription>At least 12 characters.</FieldDescription>
</Field>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The toggle is a real button with <code>aria-pressed</code>. Its name
              switches between <code>showLabel</code> and <code>hideLabel</code>;
              pass translated strings for other languages.
            </p>
          </section>
        </>
      }
    />
  )
}
