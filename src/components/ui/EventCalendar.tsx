"use client"

import * as React from "react"
import {
  addDays,
  addMonths,
  addWeeks,
  differenceInMinutes,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import { cn } from "@/lib/utils"

type EventColor = "gray" | "indigo" | "cyan" | "orange" | "crimson" | "jade"
type CalendarView = "day" | "week" | "month"

type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  color?: EventColor
  /** Second line in week and day views: a room, a link, a name. */
  description?: string
}

// Full class names, so Tailwind sees them.
const tones: Record<EventColor, string> = {
  gray: "bg-secondary text-secondary-foreground border-muted-foreground/50",
  indigo: "bg-indigo-wash text-indigo-ink border-indigo-solid",
  cyan: "bg-cyan-wash text-cyan-ink border-cyan-solid",
  orange: "bg-orange-wash text-orange-ink border-orange-solid",
  crimson: "bg-crimson-wash text-crimson-ink border-crimson-solid",
  jade: "bg-jade-wash text-jade-ink border-jade-solid",
}

const HOUR = 48

const subscribeMinute = (callback: () => void) => {
  const timer = window.setInterval(callback, 60_000)
  return () => window.clearInterval(timer)
}
const subscribeNothing = () => () => {}

/** Lays overlapping events side by side: each gets a column and the cluster's width. */
function layout(events: CalendarEvent[]) {
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

/**
 * A planner of events in day, week, and month views. Overlapping events sit
 * side by side, the current time is marked, and clicking an empty slot or an
 * event calls you back so you can open your own editor.
 */
function EventCalendar({
  className,
  events,
  date: dateProp,
  defaultDate,
  onDateChange,
  view: viewProp,
  defaultView = "week",
  onViewChange,
  views = ["day", "week", "month"],
  onEventClick,
  onSlotClick,
  dayStartHour = 7,
  dayEndHour = 21,
  weekStartsOn = 1,
  locale,
  labels = {},
}: {
  className?: string
  events: CalendarEvent[]
  /** Controlled date the view shows. */
  date?: Date
  defaultDate?: Date
  onDateChange?: (date: Date) => void
  view?: CalendarView
  defaultView?: CalendarView
  onViewChange?: (view: CalendarView) => void
  /** Views in the switcher. One hides it. */
  views?: CalendarView[]
  onEventClick?: (event: CalendarEvent) => void
  /** An empty slot was clicked: the start of that half hour, or the day in month view. */
  onSlotClick?: (date: Date) => void
  dayStartHour?: number
  dayEndHour?: number
  weekStartsOn?: 0 | 1
  /** Language of dates. Defaults to the page's. */
  locale?: string
  labels?: {
    today?: string
    previous?: string
    next?: string
    views?: Partial<Record<CalendarView, string>>
    more?: (count: number) => string
    allDay?: string
  }
}) {
  const minute = React.useSyncExternalStore(subscribeMinute, () => Math.floor(Date.now() / 60_000), () => null)
  const hydrated = React.useSyncExternalStore(subscribeNothing, () => true, () => false)
  const now = minute === null ? null : new Date(minute * 60_000)

  const [uncontrolledDate, setUncontrolledDate] = React.useState<Date | null>(defaultDate ?? null)
  const date = dateProp ?? uncontrolledDate ?? now ?? new Date(0)
  const [uncontrolledView, setUncontrolledView] = React.useState(defaultView)
  const view = viewProp ?? uncontrolledView

  const setDate = (next: Date) => {
    setUncontrolledDate(next)
    onDateChange?.(next)
  }
  const step = (direction: 1 | -1) =>
    setDate(view === "month" ? addMonths(date, direction) : view === "week" ? addWeeks(date, direction) : addDays(date, direction))

  const format = (options: Intl.DateTimeFormatOptions, value: Date) =>
    new Intl.DateTimeFormat(locale, options).format(value)
  const time = (value: Date) => format({ hour: "numeric", minute: "2-digit" }, value)

  const days =
    view === "day"
      ? [startOfDay(date)]
      : Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(date, { weekStartsOn }), i))

  const title = !hydrated
    ? " "
    : view === "month"
      ? format({ month: "long", year: "numeric" }, date)
      : view === "week"
        ? `${format({ day: "numeric", month: "short" }, days[0])} – ${format({ day: "numeric", month: "short", year: "numeric" }, days[6])}`
        : format({ weekday: "long", day: "numeric", month: "long", year: "numeric" }, date)

  const eventLabel = (event: CalendarEvent) =>
    event.allDay
      ? `${event.title}, ${format({ weekday: "long", day: "numeric", month: "long" }, event.start)}, ${labels.allDay ?? "all day"}`
      : `${event.title}, ${format({ weekday: "long", day: "numeric", month: "long" }, event.start)}, ${time(event.start)} – ${time(event.end)}`

  const hours = Array.from({ length: dayEndHour - dayStartHour }, (_, i) => dayStartHour + i)

  // Open the hours on the current time, an hour before it, once per view.
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const scrolledFor = React.useRef<string | null>(null)
  React.useEffect(() => {
    if (!hydrated || view === "month" || !scrollRef.current || scrolledFor.current === view) return
    scrolledFor.current = view
    const hour = minute === null ? dayStartHour : new Date(minute * 60_000).getHours()
    scrollRef.current.scrollTop = Math.max(0, (hour - dayStartHour - 1) * HOUR)
  }, [hydrated, view, minute, dayStartHour])

  return (
    <div
      data-slot="event-calendar"
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-[min(var(--radius-4xl),24px)] bg-card text-card-foreground ring-1 ring-foreground/5 dark:ring-foreground/10",
        className
      )}
    >
      <header className="flex flex-wrap items-center gap-2 border-b border-border p-3">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={() => now && setDate(now)}>
            {labels.today ?? "Today"}
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label={labels.previous ?? "Previous"} onClick={() => step(-1)}>
            <ChevronLeftIcon className="rtl:rotate-180" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label={labels.next ?? "Next"} onClick={() => step(1)}>
            <ChevronRightIcon className="rtl:rotate-180" />
          </Button>
        </div>
        <h2 aria-live="polite" className="m-0 min-w-32 flex-1 text-sm font-medium first-letter:uppercase">
          {title}
        </h2>
        {views.length > 1 ? (
          <ToggleGroup
            aria-label="View"
            value={[view]}
            onValueChange={(next) => {
              const v = next[0] as CalendarView | undefined
              if (!v) return
              setUncontrolledView(v)
              onViewChange?.(v)
            }}
          >
            {views.map((v) => (
              <Toggle key={v} value={v} className="capitalize">
                {labels.views?.[v] ?? v}
              </Toggle>
            ))}
          </ToggleGroup>
        ) : null}
      </header>

      {view === "month" ? (
        <MonthGrid
          date={date}
          events={events}
          weekStartsOn={weekStartsOn}
          hydrated={hydrated}
          now={now}
          format={format}
          eventLabel={eventLabel}
          onEventClick={onEventClick}
          onSlotClick={onSlotClick}
          more={labels.more}
        />
      ) : (
        <div ref={scrollRef} className="max-h-[36rem] overflow-auto">
          <div className="grid min-w-[36rem]" style={{ gridTemplateColumns: `3.5rem repeat(${days.length}, minmax(0, 1fr))` }}>
            {/* Day headings */}
            <div className="sticky top-0 z-20 border-b border-border bg-card" />
            {days.map((day) => {
              const today = now ? isSameDay(day, now) : false
              return (
                <div
                  key={+day}
                  className="sticky top-0 z-20 flex items-baseline justify-center gap-1.5 border-b border-s border-border bg-card px-1 py-2 text-xs"
                >
                  {hydrated ? (
                    <>
                      <span className="text-muted-foreground">{format({ weekday: "short" }, day)}</span>
                      <span
                        className={cn(
                          "inline-flex size-6 items-center justify-center rounded-full font-medium tabular-nums",
                          today && "bg-primary text-primary-foreground"
                        )}
                      >
                        {day.getDate()}
                      </span>
                    </>
                  ) : null}
                </div>
              )
            })}

            {/* All-day row */}
            {hydrated && events.some((event) => event.allDay && days.some((day) => event.start <= addDays(day, 1) && event.end >= day)) ? (
              <>
                <div className="border-b border-border px-1 py-1.5 text-end text-[10px] text-muted-foreground">
                  {labels.allDay ?? "All day"}
                </div>
                {days.map((day) => (
                  <div key={+day} className="flex flex-col gap-0.5 border-b border-s border-border p-0.5">
                    {events
                      .filter((event) => event.allDay && startOfDay(event.start) <= day && event.end >= day)
                      .map((event) => (
                        <EventChip key={event.id} event={event} label={eventLabel(event)} onClick={onEventClick} />
                      ))}
                  </div>
                ))}
              </>
            ) : null}

            {/* Hour gutter */}
            <div className="relative" style={{ height: hours.length * HOUR }}>
              {hydrated
                ? hours.map((hour, i) => (
                    <span
                      key={hour}
                      className="absolute end-2 -translate-y-1/2 text-[10px] text-muted-foreground tabular-nums"
                      style={{ top: i * HOUR }}
                    >
                      {i === 0 ? "" : time(new Date(2000, 0, 1, hour))}
                    </span>
                  ))
                : null}
            </div>

            {/* Day columns */}
            {days.map((day) => {
              const dayStart = new Date(day)
              dayStart.setHours(dayStartHour, 0, 0, 0)
              const dayEnd = new Date(day)
              dayEnd.setHours(dayEndHour, 0, 0, 0)
              const dayEvents = hydrated
                ? events.filter((event) => !event.allDay && event.start < dayEnd && event.end > dayStart)
                : []
              const showNow = now && isSameDay(day, now) && now >= dayStart && now <= dayEnd
              return (
                <div
                  key={+day}
                  role="group"
                  aria-label={hydrated ? format({ weekday: "long", day: "numeric", month: "long" }, day) : undefined}
                  className="relative border-s border-border"
                  style={{
                    height: hours.length * HOUR,
                    backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 ${HOUR - 1}px, var(--color-border) ${HOUR - 1}px ${HOUR}px)`,
                  }}
                  onClick={(event) => {
                    if (!onSlotClick || event.target !== event.currentTarget) return
                    const rect = event.currentTarget.getBoundingClientRect()
                    const minutes = Math.floor(((event.clientY - rect.top) / HOUR) * 2) * 30
                    const slot = new Date(dayStart)
                    slot.setMinutes(minutes)
                    onSlotClick(slot)
                  }}
                >
                  {layout(dayEvents).map(({ event, column, columns }) => {
                    const start = event.start < dayStart ? dayStart : event.start
                    const end = event.end > dayEnd ? dayEnd : event.end
                    const top = (differenceInMinutes(start, dayStart) / 60) * HOUR
                    const height = Math.max((differenceInMinutes(end, start) / 60) * HOUR - 2, 18)
                    return (
                      <button
                        key={event.id}
                        type="button"
                        aria-label={eventLabel(event)}
                        onClick={() => onEventClick?.(event)}
                        className={cn(
                          "absolute flex flex-col overflow-hidden rounded-lg border-s-2 px-1.5 py-1 text-start text-[11px] leading-tight outline-none transition-[filter] hover:brightness-95 focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/40 dark:hover:brightness-110",
                          tones[event.color ?? "indigo"]
                        )}
                        style={{
                          top: top + 1,
                          height,
                          insetInlineStart: `calc(${(column / columns) * 100}% + 2px)`,
                          width: `calc(${100 / columns}% - 4px)`,
                        }}
                      >
                        <span className="truncate font-medium">{event.title}</span>
                        {height > 32 ? (
                          <span className="truncate opacity-80">
                            {time(event.start)} – {time(event.end)}
                          </span>
                        ) : null}
                        {height > 48 && event.description ? (
                          <span className="truncate opacity-70">{event.description}</span>
                        ) : null}
                      </button>
                    )
                  })}
                  {showNow ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 z-10 h-px bg-crimson-solid before:absolute before:-top-1 before:-start-1 before:size-2 before:rounded-full before:bg-crimson-solid"
                      style={{ top: (differenceInMinutes(now!, dayStart) / 60) * HOUR }}
                    />
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function EventChip({
  event,
  label,
  onClick,
}: {
  event: CalendarEvent
  label: string
  onClick?: (event: CalendarEvent) => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => onClick?.(event)}
      className={cn(
        "w-full truncate rounded-md border-s-2 px-1.5 py-0.5 text-start text-[11px] font-medium outline-none hover:brightness-95 focus-visible:ring-3 focus-visible:ring-ring/40 dark:hover:brightness-110",
        tones[event.color ?? "indigo"]
      )}
    >
      {event.title}
    </button>
  )
}

function MonthGrid({
  date,
  events,
  weekStartsOn,
  hydrated,
  now,
  format,
  eventLabel,
  onEventClick,
  onSlotClick,
  more,
}: {
  date: Date
  events: CalendarEvent[]
  weekStartsOn: 0 | 1
  hydrated: boolean
  now: Date | null
  format: (options: Intl.DateTimeFormatOptions, value: Date) => string
  eventLabel: (event: CalendarEvent) => string
  onEventClick?: (event: CalendarEvent) => void
  onSlotClick?: (date: Date) => void
  more?: (count: number) => string
}) {
  const first = startOfWeek(startOfMonth(date), { weekStartsOn })
  const last = endOfWeek(endOfMonth(date), { weekStartsOn })
  const days: Date[] = []
  for (let day = first; day <= last; day = addDays(day, 1)) days.push(day)

  return (
    <div className="grid grid-cols-7">
      {days.slice(0, 7).map((day) => (
        <div key={+day} className="border-b border-border px-2 py-1.5 text-center text-[11px] text-muted-foreground">
          {hydrated ? format({ weekday: "short" }, day) : null}
        </div>
      ))}
      {days.map((day, index) => {
        const dayEvents = hydrated
          ? events
              .filter((event) => startOfDay(event.start) <= day && event.end > day)
              .sort((a, b) => +a.start - +b.start)
          : []
        const outside = !isSameMonth(day, date)
        const today = now ? isSameDay(day, now) : false
        return (
          <div
            key={+day}
            role="group"
            aria-label={hydrated ? format({ weekday: "long", day: "numeric", month: "long" }, day) : undefined}
            onClick={(event) => {
              if (onSlotClick && event.target === event.currentTarget) onSlotClick(day)
            }}
            className={cn(
              "flex min-h-24 flex-col gap-0.5 border-b border-border p-1",
              index % 7 !== 0 && "border-s",
              outside && "bg-muted/30"
            )}
          >
            <span
              className={cn(
                "mb-0.5 inline-flex size-6 items-center justify-center self-end rounded-full text-[11px] tabular-nums",
                outside && "text-muted-foreground",
                today && "bg-primary font-medium text-primary-foreground"
              )}
            >
              {day.getDate()}
            </span>
            {dayEvents.slice(0, 3).map((event) => (
              <EventChip key={event.id} event={event} label={eventLabel(event)} onClick={onEventClick} />
            ))}
            {dayEvents.length > 3 ? (
              <span className="px-1.5 text-[10px] text-muted-foreground">
                {more?.(dayEvents.length - 3) ?? `${dayEvents.length - 3} more`}
              </span>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export { EventCalendar }
export type { CalendarEvent, CalendarView, EventColor }
