"use client"

import * as React from "react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Badge } from "@/components/ui/Badge"
import { SortableList } from "@/components/ui/SortableList"

type Task = { id: string; title: string; tag: string }

const initial: Task[] = [
  { id: "tokens", title: "Ship the token sheet", tag: "Design" },
  { id: "docs", title: "Rewrite the install guide", tag: "Docs" },
  { id: "cli", title: "Publish the CLI", tag: "Release" },
  { id: "a11y", title: "Audit focus rings", tag: "A11y" },
]

function SortableDemo() {
  const [tasks, setTasks] = React.useState(initial)
  return (
    <SortableList
      aria-label="Priorities"
      className="w-full max-w-sm"
      items={tasks}
      getKey={(task) => task.id}
      getLabel={(task) => task.title}
      onReorder={setTasks}
      renderItem={(task) => (
        <div className="flex items-center justify-between gap-2">
          <span className="truncate">{task.title}</span>
          <Badge variant="secondary">{task.tag}</Badge>
        </div>
      )}
    />
  )
}

export default function SortableListPage() {
  return (
    <ComponentDocs
      name="Sortable List"
      description="A list you reorder by dragging the grip, or from the keyboard. Each move is announced to screen readers."
      preview={<SortableDemo />}
      usage={`import { SortableList } from "@/components/ui/SortableList"

const [tasks, setTasks] = React.useState(initial)

<SortableList
  aria-label="Priorities"
  items={tasks}
  getKey={(task) => task.id}
  getLabel={(task) => task.title}
  onReorder={setTasks}
  renderItem={(task) => task.title}
/>`}
      extraHeadings={[
        { id: "keyboard", text: "Keyboard", level: 2 },
        { id: "messages", text: "Announcements", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="keyboard">Keyboard</h2>
            <p>
              Tab to a grip and press Space to pick the row up. Up and Down move
              it, Home and End send it to the ends, Space drops it, Escape puts the
              whole list back as it was. Dragging with a pointer only works on the
              grip, so text in a row stays selectable.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="messages">Announcements</h2>
            <p>
              A live region says what happened: picked up, moved to position 2 of
              4, dropped, cancelled. Pass <code>messages</code> to translate them;
              each one is a function of the label and the position.
            </p>
            <CodeBlock
              code={`<SortableList
  messages={{
    handle: (label) => \`Réordonner \${label}\`,
    dropped: (label, position, total) =>
      \`\${label} déposé en position \${position} sur \${total}.\`,
  }}
  …
/>`}
            />
          </section>
        </>
      }
    />
  )
}
