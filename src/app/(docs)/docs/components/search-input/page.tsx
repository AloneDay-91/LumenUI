import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { SearchInput } from "@/components/ui/SearchInput"

export default function SearchInputPage() {
  return (
    <ComponentDocs
      name="Search Input"
      description="Search field with a leading icon and a clear button. Escape empties it, the native cancel button is hidden."
      preview={
        <div className="w-full max-w-64">
          <SearchInput placeholder="Search components" aria-label="Search components" />
        </div>
      }
      usage={`import { SearchInput } from "@/components/ui/SearchInput"

<SearchInput placeholder="Search components" aria-label="Search components" />`}
      extraHeadings={[
        { id: "controlled", text: "Controlled", level: 2 },
        { id: "keyboard", text: "Keyboard", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="controlled">Controlled</h2>
            <p>
              <code>onValueChange</code> gets the text on every keystroke and on
              clear, so one handler drives a filter. <code>onClear</code> runs only
              when the field is emptied by the button or Escape.
            </p>
            <div className="w-full max-w-64">
              <SearchInput defaultValue="Button" aria-label="Search" />
            </div>
            <CodeBlock
              code={`const [query, setQuery] = React.useState("")

<SearchInput
  value={query}
  onValueChange={setQuery}
  aria-label="Search"
/>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="keyboard">Keyboard</h2>
            <p>
              Escape clears a field that holds text and keeps focus in it. On an
              empty field, Escape passes through, so a Dialog around it still
              closes.
            </p>
          </section>
        </>
      }
    />
  )
}
