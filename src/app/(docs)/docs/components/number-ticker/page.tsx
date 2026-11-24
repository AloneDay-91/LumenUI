import { NumberTickerDemo } from "@/components/docs/AppExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"

export default function NumberTickerPage() {
  return (
    <ComponentDocs
      name="Number Ticker"
      description="A number that counts to its value when it comes into view, formatted for the locale, and again each time it changes."
      preview={<NumberTickerDemo />}
      usage={`import { NumberTicker } from "@/components/ui/NumberTicker"

<NumberTicker value={48250} format={{ style: "currency", currency: "EUR" }} />`}
      extraHeadings={[
        { id: "format", text: "Format", level: 2 },
        { id: "motion", text: "Motion", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="format">Format</h2>
            <p>
              <code>format</code> takes <code>Intl.NumberFormat</code> options: currency, percent, decimals, or compact notation such as 12K. While counting, figures keep the decimals of the final value.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="motion">Motion</h2>
            <p>
              The count runs for <code>duration</code> milliseconds after <code>delay</code>, starting when the number is on screen unless <code>startOnView={false}</code>. With reduced motion, it shows the value at once.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The moving figure is hidden from screen readers; they read the final value only.
            </p>
          </section>
        </>
      }
    />
  )
}
