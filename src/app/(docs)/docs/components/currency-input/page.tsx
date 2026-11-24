import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { CurrencyInputDemo } from "@/components/docs/WorkflowExamples"
import { Kbd } from "@/components/ui/Kbd"

export default function CurrencyInputPage() {
  return (
    <ComponentDocs
      name="Currency Input"
      description="A number field for money, formatted for the locale, with an optional currency picker."
      preview={<CurrencyInputDemo />}
      usage={`import { CurrencyInput } from "@/components/ui/CurrencyInput"

<CurrencyInput aria-label="Price" defaultCurrency="EUR" name="price" />`}
      extraHeadings={[
        { id: "format", text: "Format", level: 2 },
        { id: "picker", text: "Currency picker", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="format">Format</h2>
            <p>
              The amount stays a number in code and is shown with the symbol, separators, and decimals of <code>locale</code> and <code>currency</code>: “1 250,00 €” in French, “€1,250.00” in English. Decimals follow the currency, 0 for JPY, unless <code>fractionDigits</code> is set.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="picker">Currency picker</h2>
            <p>
              Pass <code>currencies</code> to show a picker at the end of the field; names come from <code>Intl.DisplayNames</code>. <code>currencyName</code> posts the code with the form.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The field is a spin button: <Kbd>↑</Kbd> and <Kbd>↓</Kbd> step by <code>step</code>, with <Kbd>Shift</Kbd> by ten times that. The picker is named after the current currency.
            </p>
          </section>
        </>
      }
    />
  )
}
