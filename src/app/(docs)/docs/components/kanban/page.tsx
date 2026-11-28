import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { KanbanDemo } from "@/components/docs/WorkflowExamples"
import { Kbd } from "@/components/ui/Kbd"

export default function KanbanPage() {
  return (
    <ComponentDocs
      name="Kanban"
      description="Columns of cards you move by dragging, or from the keyboard, with every move announced."
      preview={<KanbanDemo />}
      usage={`import { Kanban } from "@/components/ui/Kanban"

<Kanban
  columns={[
    { id: "todo", title: "To do" },
    { id: "done", title: "Done" },
  ]}
  value={tasks}
  onValueChange={setTasks}
  getKey={(task) => task.id}
  getLabel={(task) => task.title}
  renderCard={(task) => task.title}
/>`}
      extraHeadings={[
        { id: "data", text: "Data", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="data">Data</h2>
            <p>
              <code>value</code> maps each column id to its cards, in order. <code>onValueChange</code> gets the whole board after a move; save it, or send the change to your API. Each card renders through <code>renderCard</code>, and <code>renderColumnFooter</code> adds something under each column, such as an add button.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              Focus a card and press <Kbd>Space</Kbd> to pick it up. <Kbd>↑</Kbd> and <Kbd>↓</Kbd> move it within the column, <Kbd>←</Kbd> and <Kbd>→</Kbd> to the next column, <Kbd>Space</Kbd> drops it and <Kbd>Escape</Kbd> puts it back. Each step is announced; translate the sentences with <code>messages</code>. Buttons and links inside a card keep their clicks.
            </p>
          </section>
        </>
      }
    />
  )
}
