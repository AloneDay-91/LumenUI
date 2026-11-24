import { MentionInputDemo } from "@/components/docs/AppExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Kbd } from "@/components/ui/Kbd"

export default function MentionInputPage() {
  return (
    <ComponentDocs
      name="Mention Input"
      description="A text area where @ opens people, / opens commands, or any trigger you add. Picked items are tinted in the text, and the value stays plain text."
      preview={<MentionInputDemo />}
      usage={`import { MentionInput } from "@/components/ui/MentionInput"

<MentionInput
  aria-label="Comment"
  triggers={[
    { char: "@", items: people, label: "People" },
    { char: "/", items: commands, label: "Commands" },
  ]}
  onValueChange={(text, mentions) => save(text, mentions)}
/>`}
      extraHeadings={[
        { id: "value", text: "Value", level: 2 },
        { id: "items", text: "Items", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="value">Value</h2>
            <p>
              The value is the text as typed, with <code>@Alex Martin</code> written out. <code>onValueChange</code> also gets the mentions still in it, each with its trigger, id, and label, so you can notify the people mentioned or run the command. Deleting the text removes the mention.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="items">Items</h2>
            <p>
              <code>items</code> is a list filtered by what is typed, or a function of the query for your own search. Each item has an <code>id</code>, a <code>label</code>, and optionally a <code>description</code> and an <code>icon</code>, such as an Avatar.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The field is a combobox: <Kbd>↑</Kbd> and <Kbd>↓</Kbd> move in the list, <Kbd>Enter</Kbd> or <Kbd>Tab</Kbd> pick, <Kbd>Escape</Kbd> closes. Other keys reach your <code>onKeyDown</code>, for example to send on <Kbd>⌘</Kbd> <Kbd>Enter</Kbd>.
            </p>
          </section>
        </>
      }
    />
  )
}
