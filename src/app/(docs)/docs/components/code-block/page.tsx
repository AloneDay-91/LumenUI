import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { CodeBlockDemo } from "@/components/docs/AiExamples"

export default function CodeBlockPage() {
  return (
    <ComponentDocs
      name="Code Block"
      description="Code on a muted panel with the file name and a copy button. No highlighter is bundled: pass highlighted nodes as children, or a string as code."
      preview={<CodeBlockDemo />}
      usage={`import { CodeBlock } from "@/components/ui/CodeBlock"

<CodeBlock title="lumen.json" lineNumbers code={source} />`}
      extraHeadings={[
        { id: "highlight", text: "Syntax highlighting", level: 2 },
        { id: "options", text: "Options", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="highlight">Syntax highlighting</h2>
            <p>
              Bring your own highlighter and pass its output as children. <code>code</code> stays the plain text the copy button copies.
            </p>
            <CodeBlock
              code={`import { highlight } from "sugar-high"

<CodeBlock code={source} language="tsx">
  <code dangerouslySetInnerHTML={{ __html: highlight(source) }} />
</CodeBlock>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="options">Options</h2>
            <p>
              <code>wrap</code> breaks long lines instead of scrolling sideways, <code>maxHeight</code> caps the body, <code>copyable</code> hides the button. The body is focusable so keyboard users can scroll it.
            </p>
          </section>
        </>
      }
    />
  )
}
