import { CalendarExamples, CalendarPreview } from "@/components/docs/CalendarExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"

export default function CalendarPage() {
  return (
    <ComponentDocs
      name="Calendar"
      description="A month on DayPicker. Outline chevrons, ink pills for the selected day, muted type for the days outside the month."
      preview={<CalendarPreview />}
      usage={`import { Calendar } from "@/components/ui/Calendar"

<Calendar mode="single" selected={date} onSelect={setDate} />`}
      extraHeadings={[{ id: "range", text: "Range", level: 2 }]}
      extra={<CalendarExamples />}
    />
  )
}
