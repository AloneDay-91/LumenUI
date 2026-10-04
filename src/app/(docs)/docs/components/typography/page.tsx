import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  TypographyElements,
  TypographyOptOut,
  TypographyPreview,
  TypographyRhythm,
} from "@/components/docs/TypographyExamples"

export default function TypographyPage() {
  return (
    <ComponentDocs
      name="Typography"
      description="Rhythm for rendered HTML. Headings, lists, quotes, code, and tables follow three values: size, leading, and flow."
      preview={<TypographyPreview />}
      previewClassName="items-start justify-start"
      usage={`import { Typography } from "@/components/ui/Typography"

<Typography>
  <h1>Paper</h1>
  <p>The page is the surface.</p>
</Typography>`}
      extraHeadings={[
        { id: "rhythm", text: "Rhythm", level: 2 },
        { id: "elements", text: "Elements", level: 2 },
        { id: "opt-out", text: "Opt out", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="rhythm">Rhythm</h2>
            <p>
              <code>article</code> is the reading size. <code>compact</code>{" "}
              tightens the type for a chat bubble or a side panel. Each block
              adds its own space above, so a new paragraph does not restyle the
              ones already on screen.
            </p>
            <TypographyRhythm />
            <CodeBlock
              code={`<Typography variant="compact">
  <h2>Paper</h2>
  <p>The page is the surface.</p>
</Typography>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="elements">Elements</h2>
            <p>
              Wrap the HTML you already render. Headings use the foreground.
              Body, lists, and table cells use the muted grey. Links stay ink.
            </p>
            <TypographyElements />
          </section>

          <section className="space-y-4">
            <h2 id="opt-out">Opt out</h2>
            <p>
              Add <code>not-typography</code> to a component that should keep
              its own type. The class covers that element and everything inside
              it.
            </p>
            <TypographyOptOut />
            <CodeBlock
              code={`<Typography>
  <h3>Article heading</h3>
  <Card className="not-typography">
    <CardHeader>
      <CardTitle>Untouched</CardTitle>
    </CardHeader>
  </Card>
</Typography>`}
            />
          </section>
        </>
      }
    />
  )
}
