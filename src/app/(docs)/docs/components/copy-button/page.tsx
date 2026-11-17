import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { CopyButton } from "@/components/ui/CopyButton"
import { InputGroup, InputGroupAddon, InputGroupText } from "@/components/ui/InputGroup"

const command = "npx @aloneday/lumenui@latest add copy-button"

export default function CopyButtonPage() {
  return (
    <ComponentDocs
      name="Copy Button"
      description="Copies a value to the clipboard and swaps to a check for two seconds. An icon button by default, a labelled button with children."
      preview={
        <div className="flex flex-wrap items-center gap-3">
          <CopyButton value={command} />
          <CopyButton value={command} variant="outline">
            Copy command
          </CopyButton>
        </div>
      }
      usage={`import { CopyButton } from "@/components/ui/CopyButton"

<CopyButton value="npx @aloneday/lumenui@latest add copy-button" />

<CopyButton value={token} variant="outline">
  Copy token
</CopyButton>`}
      extraHeadings={[
        { id: "field", text: "In a field", level: 2 },
        { id: "lazy", text: "Value at click time", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="field">In a field</h2>
            <p>
              Inside an Input Group, the icon button sits at the end of a
              read-only value, the usual pattern for API keys and install
              commands.
            </p>
            <div className="w-full max-w-sm">
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                <span className="min-w-0 flex-1 truncate font-mono text-xs">{command}</span>
                <InputGroupAddon align="end" className="pe-1">
                  <CopyButton value={command} size="icon-xs" />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <CodeBlock
              code={`<InputGroup>
  <span className="flex-1 truncate font-mono text-xs">{command}</span>
  <InputGroupAddon align="end" className="pe-1">
    <CopyButton value={command} size="icon-xs" />
  </InputGroupAddon>
</InputGroup>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="lazy">Value at click time</h2>
            <p>
              Pass a function when the text is expensive to build or changes
              often. It runs on click, not on render. <code>onCopy</code> gets the
              text that was copied.
            </p>
            <CodeBlock
              code={`<CopyButton
  value={() => JSON.stringify(settings, null, 2)}
  onCopy={(text) => track("copied", text.length)}
/>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The icon button is named <code>label</code>, then{" "}
              <code>copiedLabel</code> while the check shows. A polite status
              region announces the copy, so screen-reader users hear it without
              the button moving focus.
            </p>
          </section>
        </>
      }
    />
  )
}
