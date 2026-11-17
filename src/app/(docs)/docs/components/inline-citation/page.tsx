import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { InlineCitationDemo } from "@/components/docs/AiExamples"

export default function InlineCitationPage() {
  return (
    <ComponentDocs
      name="Inline Citation"
      description="A source in the sentence: a small pill with the site name that opens a preview on hover or focus."
      preview={<InlineCitationDemo />}
      usage={`import { InlineCitation } from "@/components/ui/InlineCitation"

<p>
  A Split Button pairs one action with a menu of variants
  <InlineCitation href={url} title="Split Button" excerpt="A main action joined to…" />.
</p>`}
      extraHeadings={[
        { id: "numbers", text: "Numbered", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="numbers">Numbered</h2>
            <p>
              Pass <code>index</code> to show 1, 2, 3 instead of the site name, when a reply cites many sources.
            </p>
          </section>
        </>
      }
    />
  )
}
