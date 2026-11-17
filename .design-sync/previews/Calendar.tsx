import * as React from "react"
import { Calendar } from "lumen-ui"

export const Single = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 14))
  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar mode="single" defaultMonth={new Date(2026, 9, 1)} selected={date} onSelect={setDate} />
      <p className="text-xs text-muted-foreground">
        {date ? date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Pick a day."}
      </p>
    </div>
  )
}

export const Range = () => {
  const [range, setRange] = React.useState<{ from?: Date; to?: Date } | undefined>({
    from: new Date(2026, 9, 6),
    to: new Date(2026, 9, 12),
  })
  return (
    <Calendar
      mode="range"
      defaultMonth={new Date(2026, 9, 1)}
      selected={range as never}
      onSelect={setRange as never}
    />
  )
}
