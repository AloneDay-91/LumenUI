"use client"

import { format } from "date-fns"
import { useState } from "react"
import type { DateRange } from "@daypicker/react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { Preview } from "@/components/docs/Preview"
import { Calendar } from "@/components/ui/Calendar"

export function CalendarPreview() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 4))

  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar mode="single" selected={date} onSelect={setDate} />
      <p className="text-xs text-muted-foreground">
        {date ? format(date, "MMMM d, yyyy") : "Pick a day."}
      </p>
    </div>
  )
}

export function CalendarExamples() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 9, 6),
    to: new Date(2026, 9, 12),
  })

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 id="range">Range</h2>
        <p className="text-sm text-muted-foreground">
          The ends are ink pills. The days between them sit on a muted band.
        </p>
      </div>
      <Preview>
        <Calendar mode="range" selected={range} onSelect={setRange} />
      </Preview>
      <CodeBlock
        code={`<Calendar mode="range" selected={range} onSelect={setRange} />`}
      />
    </section>
  )
}
