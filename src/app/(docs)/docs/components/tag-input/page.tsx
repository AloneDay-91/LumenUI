import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { TagInput } from "@/components/ui/TagInput"

export default function TagInputPage() {
  return (
    <ComponentDocs
      name="Tag Input"
      description="Field that turns text into removable tags. Enter or a comma adds one, Backspace on an empty field removes the last."
      preview={
        <div className="w-full max-w-80">
          <TagInput
            defaultValue={["design", "tokens"]}
            placeholder="Add a tag"
            aria-label="Tags"
          />
        </div>
      }
      usage={`import { TagInput } from "@/components/ui/TagInput"

<TagInput
  defaultValue={["design", "tokens"]}
  placeholder="Add a tag"
  aria-label="Tags"
/>`}
      extraHeadings={[
        { id: "max", text: "Limit", level: 2 },
        { id: "form", text: "In a form", level: 2 },
        { id: "paste", text: "Paste", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="max">Limit</h2>
            <p>
              <code>max</code> stops the field once it is full. Duplicates are
              skipped unless <code>allowDuplicates</code> is set.
            </p>
            <div className="w-full max-w-80">
              <TagInput defaultValue={["react", "vue", "svelte"]} max={3} aria-label="Frameworks" />
            </div>
            <CodeBlock code={`<TagInput defaultValue={["react", "vue", "svelte"]} max={3} />`} />
          </section>
          <section className="space-y-4">
            <h2 id="form">In a form</h2>
            <p>
              With <code>name</code>, each tag posts as its own hidden input, so{" "}
              <code>formData.getAll(&quot;tags&quot;)</code> returns the list.
            </p>
            <CodeBlock code={`<TagInput name="tags" aria-label="Tags" />`} />
          </section>
          <section className="space-y-4">
            <h2 id="paste">Paste</h2>
            <p>
              Text pasted with commas or line breaks becomes one tag per entry.
              Text left in the field when it loses focus becomes a tag too.
            </p>
          </section>
        </>
      }
    />
  )
}
