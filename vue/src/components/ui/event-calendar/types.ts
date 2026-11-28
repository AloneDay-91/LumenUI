export type EventColor = "gray" | "indigo" | "cyan" | "orange" | "crimson" | "jade"
export type CalendarView = "day" | "week" | "month"

export type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  color?: EventColor
  /** Second line in week and day views: a room, a link, a name. */
  description?: string
}

export type EventCalendarLabels = {
  today?: string
  previous?: string
  next?: string
  views?: Partial<Record<CalendarView, string>>
  more?: (count: number) => string
  allDay?: string
}

// Full class names, so Tailwind sees them.
export const tones: Record<EventColor, string> = {
  gray: "bg-secondary text-secondary-foreground border-muted-foreground/50",
  indigo: "bg-indigo-wash text-indigo-ink border-indigo-solid",
  cyan: "bg-cyan-wash text-cyan-ink border-cyan-solid",
  orange: "bg-orange-wash text-orange-ink border-orange-solid",
  crimson: "bg-crimson-wash text-crimson-ink border-crimson-solid",
  jade: "bg-jade-wash text-jade-ink border-jade-solid",
}

export const HOUR = 48

/** Lays overlapping events side by side: each gets a column and the cluster's width. */
export function layout(events: CalendarEvent[]) {
  const sorted = [...events].sort((a, b) => +a.start - +b.start || +b.end - +a.end)
  const placed: { event: CalendarEvent; column: number; columns: number }[] = []
  let cluster: typeof placed = []
  let clusterEnd = 0
  const close = () => {
    const columns = Math.max(1, ...cluster.map((p) => p.column + 1))
    cluster.forEach((p) => (p.columns = columns))
    cluster = []
  }
  for (const event of sorted) {
    if (cluster.length && +event.start >= clusterEnd) close()
    const used = new Set(cluster.filter((p) => +p.event.end > +event.start).map((p) => p.column))
    let column = 0
    while (used.has(column)) column++
    const entry = { event, column, columns: 1 }
    cluster.push(entry)
    placed.push(entry)
    clusterEnd = Math.max(clusterEnd, +event.end)
  }
  close()
  return placed
}
