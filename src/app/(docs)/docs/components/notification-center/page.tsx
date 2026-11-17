import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { NotificationDemo } from "@/components/docs/MiscExamples"

export default function NotificationCenterPage() {
  return (
    <ComponentDocs
      name="Notification Center"
      description="A bell with an unread count that opens the list. Unread rows carry a dot and a bolder title; the times are Relative Time."
      preview={<NotificationDemo />}
      usage={`import { NotificationCenter } from "@/components/ui/NotificationCenter"

<NotificationCenter
  notifications={items}
  onItemClick={(item) => markRead(item.id)}
  onMarkAllRead={markAllRead}
/>`}
      extraHeadings={[
        { id: "data", text: "Items", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="data">Items</h2>
            <p>
              Each item has an <code>id</code>, a <code>title</code>, and
              optionally a <code>description</code>, a <code>date</code>, an{" "}
              <code>icon</code>, and <code>read</code>. The component keeps no
              state of its own: mark items read in your handlers and pass the list
              back.
            </p>
            <CodeBlock
              code={`{
  id: "214",
  icon: <GitPullRequestIcon />,
  title: "Review requested on #214",
  description: "Ada asked you to review…",
  date: "2026-11-17T09:12:00Z",
  read: false,
}`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The bell is named with the count, “Notifications, 2 unread”, since
              the badge itself is hidden from screen readers. Each unread row ends
              with a visually hidden “Unread”. Pass <code>labels</code> to
              translate.
            </p>
          </section>
        </>
      }
    />
  )
}
