import { MarkdownDemo } from "@/components/docs/AppExamples"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"

export default function MarkdownPage() {
  return (
    <ComponentDocs
      name="Markdown"
      description="Markdown rendered with Lumen typography: headings, lists and task lists, tables, quotes, code blocks, links, and images. Safe by default and readable while it streams."
      preview={<MarkdownDemo />}
      usage={`import { Markdown } from "@/components/ui/Markdown"

<Markdown variant="compact">{message.content}</Markdown>`}
      extraHeadings={[
        { id: "support", text: "What it reads", level: 2 },
        { id: "ai", text: "In a chat", level: 2 },
        { id: "security", text: "Security", level: 2 },
        { id: "headings", text: "Headings", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="support">What it reads</h2>
            <p>
              Headings, paragraphs, <strong>bold</strong>, <em>italic</em>, strikethrough, inline code, links, images, quotes, ordered and unordered lists with nesting, task lists, GFM tables with alignment, horizontal rules, and fenced code. Code blocks use Code Block, with a copy button unless <code>copyCode={false}</code>.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="ai">In a chat</h2>
            <p>
              Use <code>variant="compact"</code> inside a Message. An unclosed code fence still renders as code, so a reply stays readable while tokens arrive; replay the stream in the preview to see it.
            </p>
            <CodeBlock
              code={`<MessageContent>
  <Markdown variant="compact">{text}</Markdown>
</MessageContent>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="security">Security</h2>
            <p>
              The source is never turned into HTML. Text is escaped, raw HTML shows as text, and links keep only <code>http</code>, <code>https</code>, <code>mailto</code>, <code>tel</code>, and relative URLs, so <code>javascript:</code> links render as plain text. External links open in a new tab with <code>noreferrer</code>.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="headings">Headings</h2>
            <p>
              <code>headingOffset</code> shifts levels, so a <code>#</code> becomes an <code>h2</code> on a page that already has its <code>h1</code>. <code>headingIds</code> adds ids from the text for anchor links.
            </p>
          </section>
        </>
      }
    />
  )
}
