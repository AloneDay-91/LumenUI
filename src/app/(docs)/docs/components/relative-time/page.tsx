import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { RelativeTimeDemo } from "@/components/docs/MiscExamples"

export default function RelativeTimePage() {
  return (
    <ComponentDocs
      name="Relative Time"
      description="“3 minutes ago” that keeps itself current. A native time element, with the exact date in its title."
      preview={<RelativeTimeDemo />}
      usage={`import { RelativeTime } from "@/components/ui/RelativeTime"

<RelativeTime date={comment.createdAt} />`}
      extraHeadings={[
        { id: "updates", text: "Updates", level: 2 },
        { id: "locale", text: "Locale", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="updates">Updates</h2>
            <p>
              It re-renders every 15 seconds in the first minute, every minute in
              the first hour, every hour in the first day, then stops. One timer
              per instance, cleared on unmount.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="locale">Locale</h2>
            <p>
              Text comes from <code>Intl.RelativeTimeFormat</code>, so{" "}
              <code>locale=&quot;fr&quot;</code> gives “il y a 3 minutes” and
              “hier” with no strings to translate. <code>titleFormat</code> sets the
              exact date shown on hover.
            </p>
            <CodeBlock
              code={`<RelativeTime
  date={date}
  locale="fr"
  titleFormat={{ dateStyle: "full", timeStyle: "short" }}
/>`}
            />
          </section>
        </>
      }
    />
  )
}
