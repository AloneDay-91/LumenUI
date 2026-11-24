import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { SelectionBarDemo } from "@/components/docs/WorkflowExamples"
import { Kbd } from "@/components/ui/Kbd"

export default function SelectionBarPage() {
  return (
    <ComponentDocs
      name="Selection Bar"
      description="A bar of bulk actions that rises when something is selected: the count, a clear button, and your actions."
      preview={<SelectionBarDemo />}
      usage={`import { SelectionBar, SelectionBarAction } from "@/components/ui/SelectionBar"

<SelectionBar count={selected.length} onClear={() => setSelected([])}>
  <SelectionBarAction>Archive</SelectionBarAction>
  <SelectionBarAction variant="destructive">Delete</SelectionBarAction>
</SelectionBar>`}
      extraHeadings={[
        { id: "position", text: "Position", level: 2 },
        { id: "data-table", text: "With Data Table", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="position">Position</h2>
            <p>
              By default the bar is <code>fixed</code> at the bottom of the window. Set <code>position="absolute"</code> to keep it inside the nearest positioned parent, such as a card or a dialog.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="data-table">With Data Table</h2>
            <p>
              Pass the number of selected rows and clear the selection in <code>onClear</code>. The bar keeps the last count while it slides away, so it never reads “0 selected”.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The bar is a toolbar named “Selection actions”: <Kbd>Tab</Kbd> enters it, the arrows move between its buttons, <Kbd>Escape</Kbd> clears the selection. The count is a polite live region. While hidden, the bar is <code>inert</code>.
            </p>
          </section>
        </>
      }
    />
  )
}
