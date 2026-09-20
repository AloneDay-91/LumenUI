import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Button } from "@/components/ui/Button"
import { Spinner } from "@/components/ui/Spinner"

export default function SpinnerPage() {
  return (
    <ComponentDocs
      name="Spinner"
      description="Indeterminate loading indicator. A spinning lucide icon, sized by its context."
      preview={<Spinner className="size-5" />}
      usage={`import { Spinner } from "@/components/ui/Spinner"

<Spinner />`}
      extraHeadings={[
        { id: "sizing", text: "Sizing", level: 2 },
        { id: "in-button", text: "In a Button", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="sizing">Sizing</h2>
            <p>
              The spinner sets no size of its own. Standalone it falls back to the
              lucide default of <code>1em</code>, so it follows the font size;
              inside a Button the button&apos;s icon rules take over. Pass a{" "}
              <code>size-*</code> class for anything else.
            </p>
            <Preview className="flex-wrap items-center gap-4">
              <Spinner className="size-3" />
              <Spinner className="size-4" />
              <Spinner className="size-6" />
              <span className="text-2xl">
                <Spinner />
              </span>
            </Preview>
            <CodeBlock
              code={`<Spinner className="size-4" />

{/* follows the surrounding font size */}
<span className="text-2xl">
  <Spinner />
</span>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="in-button">In a Button</h2>
            <p>
              Mark it with <code>data-icon</code> like any other button icon so
              the padding tightens on that side.
            </p>
            <Preview className="flex-wrap items-center gap-3">
              <Button disabled>
                <Spinner data-icon="inline-start" />
                Saving
              </Button>
              <Button size="icon" variant="outline" disabled aria-label="Saving">
                <Spinner />
              </Button>
            </Preview>
            <CodeBlock
              code={`<Button disabled>
  <Spinner data-icon="inline-start" />
  Saving
</Button>`}
            />
            <p>
              The spinner carries <code>role=&quot;status&quot;</code> and an{" "}
              <code>aria-label</code> of &quot;Loading&quot;. When the button
              already announces its own pending label, hide the spinner from
              assistive tech with <code>aria-hidden</code> to avoid saying it
              twice.
            </p>
          </section>
        </>
      }
    />
  )
}
