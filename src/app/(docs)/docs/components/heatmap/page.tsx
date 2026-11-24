import { HeatmapDemo } from "@/components/docs/AppExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"

export default function HeatmapPage() {
  return (
    <ComponentDocs
      name="Heatmap"
      description="A year of activity as a grid of days in five steps of the primary, with month and weekday labels and a legend."
      preview={<HeatmapDemo />}
      usage={`import { Heatmap } from "@/components/ui/Heatmap"

<Heatmap data={[{ date: "2026-11-24", value: 4 }]} />`}
      extraHeadings={[
        { id: "data", text: "Data", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="data">Data</h2>
            <p>
              One entry per day, as a <code>Date</code> or an ISO string; missing days count as 0 and duplicates add up. The darkest step goes to the highest value, or to <code>max</code>. <code>weeks</code> sets the columns and <code>end</code> the last day, today by default.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The grid is an image with a summary for screen readers: the total, the active days, and the range. Each day has its value as a tooltip; write it with <code>labels.value</code>. Pass the same data to a Table or a Chart when people need to read each day.
            </p>
          </section>
        </>
      }
    />
  )
}
