import { ChartBarPreview, ChartExamples } from "@/components/docs/ChartExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"

export default function ChartPage() {
  return (
    <ComponentDocs
      name="Chart"
      description="Monochrome charts on Recharts. Ink on paper, a quiet tooltip, no rainbow series."
      preview={<ChartBarPreview />}
      previewClassName="px-5 py-6"
      usage={`import { Bar, BarChart } from "recharts"

import { Chart, ChartGrid, ChartTooltip, ChartXAxis, ChartYAxis } from "@/components/ui/Chart"

const readers = [
  { month: "Jan", readers: 420 },
  { month: "Feb", readers: 380 },
  { month: "Mar", readers: 510 },
  { month: "Apr", readers: 460 },
  { month: "May", readers: 590 },
  { month: "Jun", readers: 640 },
]

<Chart config={{ readers: { label: "Readers" } }}>
  <BarChart data={readers}>
    <ChartGrid />
    <ChartXAxis dataKey="month" />
    <ChartYAxis hide />
    <ChartTooltip />
    <Bar dataKey="readers" fill="var(--color-readers)" radius={[6, 6, 0, 0]} />
  </BarChart>
</Chart>`}
      extraHeadings={[
        { id: "area", text: "Area", level: 2 },
        { id: "line", text: "Line", level: 2 },
        { id: "donut", text: "Donut", level: 2 },
      ]}
      extra={<ChartExamples />}
    />
  )
}
