import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { TourDemo } from "@/components/docs/MiscExamples"

export default function TourPage() {
  return (
    <ComponentDocs
      name="Tour"
      description="Walks the reader through a page, one element at a time: the rest dims, a card sits beside the target, Next and Back move between steps."
      preview={<TourDemo />}
      usage={`import { Tour, type TourStep } from "@/components/ui/Tour"

const steps: TourStep[] = [
  { target: "[data-tour='search']", title: "Search everything", description: "…" },
  { target: "[data-tour='create']", title: "Start a project" },
]

const [open, setOpen] = React.useState(false)

<Tour steps={steps} open={open} onOpenChange={setOpen} />`}
      extraHeadings={[
        { id: "targets", text: "Targets", level: 2 },
        { id: "once", text: "Show it once", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="targets">Targets</h2>
            <p>
              <code>target</code> is a CSS selector; a <code>data-tour</code>{" "}
              attribute keeps it stable when classes change. The target scrolls into
              view and the cut-out follows it on scroll and resize. A step without a
              target centers its card, for a welcome or a closing note.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="once">Show it once</h2>
            <CodeBlock
              code={`const [open, setOpen] = React.useState(false)

React.useEffect(() => {
  if (!localStorage.getItem("tour-done")) setOpen(true)
}, [])

<Tour
  steps={steps}
  open={open}
  onOpenChange={setOpen}
  onFinish={() => localStorage.setItem("tour-done", "1")}
/>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The card is a modal dialog named by its title. Focus moves into it on
              each step and Tab stays inside. Escape or the close button ends the
              tour and gives focus back to what had it. Clicks on the dimmed page do
              nothing, so a stray click does not lose the reader&apos;s place.
            </p>
          </section>
        </>
      }
    />
  )
}
