import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { InlineEditDemo } from "@/components/docs/WorkflowExamples"

export default function InlineEditPage() {
  return (
    <ComponentDocs
      name="Inline Edit"
      description="Text that turns into a field when clicked. Enter saves, Escape cancels, and the text keeps the size of its parent."
      preview={<InlineEditDemo />}
      usage={`import { InlineEdit } from "@/components/ui/InlineEdit"

<InlineEdit aria-label="Project name" value={name} onValueChange={setName} />`}
      extraHeadings={[
        { id: "saving", text: "Saving", level: 2 },
        { id: "typography", text: "Typography", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="saving">Saving</h2>
            <p>
              <code>onValueChange</code> runs once per save, only when the value changed. Leaving the field saves too. Values are trimmed, and an empty one is refused unless <code>allowEmpty</code> is set; <code>placeholder</code> shows while it is empty.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="typography">Typography</h2>
            <p>
              The text and the field inherit size, weight, and line height, so the same component works in a heading or a table cell.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              At rest it is a button named “Project name: Website relaunch”. The field takes the same name, and focus returns to the button after saving or cancelling.
            </p>
          </section>
        </>
      }
    />
  )
}
