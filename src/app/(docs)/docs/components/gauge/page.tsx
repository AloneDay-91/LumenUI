import { GaugeDemo } from "@/components/docs/AppExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"

export default function GaugePage() {
  return (
    <ComponentDocs
      name="Gauge"
      description="A value on an open arc with the figure in the middle, whose colour can change past thresholds."
      preview={<GaugeDemo />}
      usage={`import { Gauge } from "@/components/ui/Gauge"

<Gauge value={64} label="CPU" thresholds={[{ from: 75, color: "orange" }, { from: 90, color: "crimson" }]} />`}
      extraHeadings={[
        { id: "range", text: "Range and figure", level: 2 },
        { id: "thresholds", text: "Thresholds", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="range">Range and figure</h2>
            <p>
              <code>min</code> and <code>max</code> set the range; the figure defaults to a percentage of it. <code>format</code> writes your own, such as GB used or a duration. <code>size</code> and <code>thickness</code> are in pixels.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="thresholds">Thresholds</h2>
            <p>
              <code>thresholds</code> lists the points where the colour changes, lowest first; below the first, the arc takes <code>color</code>, the primary by default.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The gauge is a meter with its value, range, and figure. Colour is never the only signal: the figure stays in the middle.
            </p>
          </section>
        </>
      }
    />
  )
}
