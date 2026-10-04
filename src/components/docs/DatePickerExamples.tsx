"use client"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { Preview } from "@/components/docs/Preview"
import { DatePicker } from "@/components/ui/DatePicker"

export function DatePickerPreview() {
  return <DatePicker />
}

export function DatePickerExamples() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 id="range">Range</h2>
        <p className="text-sm text-muted-foreground">
          The popover stays open until both ends of the range are set.
        </p>
      </div>
      <Preview>
        <DatePicker mode="range" />
      </Preview>
      <CodeBlock code={`<DatePicker mode="range" />`} />
    </section>
  )
}
