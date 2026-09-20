"use client"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Rating } from "@/components/ui/Rating"

export default function RatingPage() {
  return (
    <ComponentDocs
      name="Rating"
      description="Star score. Keyboard arrows, radiogroup semantics. Not a Base UI primitive."
      preview={<Rating defaultValue={4} label="Docs quality" />}
      usage={`import { Rating } from "@/components/ui/Rating"

<Rating defaultValue={4} label="Docs quality" />`}
      extraHeadings={[
        { id: "readonly", text: "Read only", level: 2 },
        { id: "keyboard", text: "Keyboard", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="readonly">Read only</h2>
            <p>
              <code>readOnly</code> paints a score without making it a control.
            </p>
            <Preview>
              <Rating defaultValue={3} readOnly label="Average score" />
            </Preview>
            <CodeBlock
              code={`<Rating defaultValue={3} readOnly label="Average score" />`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="keyboard">Keyboard</h2>
            <p>
              Focus the group, then Arrow, Home, and End. Each star is a radio;
              the group is the tab stop.
            </p>
          </section>
        </>
      }
    />
  )
}
