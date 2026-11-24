import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { PhoneInputDemo } from "@/components/docs/WorkflowExamples"

export default function PhoneInputPage() {
  return (
    <ComponentDocs
      name="Phone Input"
      description="A country picker with flags and calling codes next to a phone field. It formats as you type and returns E.164."
      preview={<PhoneInputDemo />}
      usage={`import { PhoneInput } from "@/components/ui/PhoneInput"

<PhoneInput aria-label="Phone number" defaultCountry="FR" name="phone" />`}
      extraHeadings={[
        { id: "value", text: "Value", level: 2 },
        { id: "countries", text: "Countries", level: 2 },
        { id: "validation", text: "Validation", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="value">Value</h2>
            <p>
              The value is E.164, such as <code>+33612345678</code>, ready for an SMS API. The second argument of <code>onValueChange</code> gives the country and the national digits. A leading 0 is dropped where the country writes one, and pasting <code>+44…</code> or <code>0044…</code> switches the country.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="countries">Countries</h2>
            <p>
              The default list covers forty-odd countries; country names come from <code>Intl.DisplayNames</code> in the page language. Pass <code>countries</code> to narrow, reorder, or extend it. Each entry has an ISO code, a calling code, and an optional <code>pattern</code> with one <code>#</code> per digit.
            </p>
            <CodeBlock
              code={`<PhoneInput
  aria-label="Phone"
  countries={[
    { code: "FR", dial: "33", pattern: "# ## ## ## ##", trunkZero: true },
    { code: "BE", dial: "32", pattern: "### ## ## ##", trunkZero: true },
  ]}
/>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="validation">Validation</h2>
            <p>
              The field formats; it does not check that a number exists. For strict rules per country, validate the E.164 value on the server, for example with libphonenumber.
            </p>
          </section>
        </>
      }
    />
  )
}
