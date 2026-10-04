import { DatePickerExamples, DatePickerPreview } from "@/components/docs/DatePickerExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"

export default function DatePickerPage() {
  return (
    <ComponentDocs
      name="Date Picker"
      description="An outline button that opens the calendar in a popover. The label is the chosen day, or a quiet placeholder."
      preview={<DatePickerPreview />}
      usage={`import { DatePicker } from "@/components/ui/DatePicker"

<DatePicker value={date} onValueChange={setDate} />`}
      extraHeadings={[{ id: "range", text: "Range", level: 2 }]}
      extra={<DatePickerExamples />}
    />
  )
}
