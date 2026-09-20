import { SearchIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/InputGroup"

export default function InputGroupPage() {
  return (
    <ComponentDocs
      name="Input Group"
      description="An input with addons on either side. One field, one focus ring."
      preview={
        <div className="w-full max-w-sm">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search a component…" />
        </InputGroup>
        </div>
      }
      usage={`import { SearchIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/InputGroup"

<InputGroup>
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search a component…" />
</InputGroup>`}
      extraHeadings={[
        { id: "suffix", text: "Suffix", level: 2 },
        { id: "domain", text: "Domain", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="suffix">Suffix</h2>
            <p>
              <code>align=&quot;end&quot;</code> parks the addon after the
              field. The ring stays on the group.
            </p>
            <Preview>
              <div className="w-full max-w-sm">
                <InputGroup>
                  <InputGroupInput placeholder="0.625" />
                  <InputGroupAddon align="end">
                    <InputGroupText>rem</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </Preview>
            <CodeBlock
              code={`<InputGroup>
  <InputGroupInput placeholder="0.625" />
  <InputGroupAddon align="end">
    <InputGroupText>rem</InputGroupText>
  </InputGroupAddon>
</InputGroup>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="domain">Domain</h2>
            <Preview>
              <div className="w-full max-w-sm">
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput defaultValue="ui.lumen.dev" />
                </InputGroup>
              </div>
            </Preview>
            <CodeBlock
              code={`<InputGroup>
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput defaultValue="ui.lumen.dev" />
</InputGroup>`}
            />
          </section>
        </>
      }
    />
  )
}
