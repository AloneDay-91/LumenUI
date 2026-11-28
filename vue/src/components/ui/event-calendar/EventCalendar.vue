<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type HTMLAttributes } from "vue"
import { addDays, addMonths, addWeeks, differenceInMinutes, isSameDay, startOfDay, startOfWeek } from "date-fns"
import { ChevronLeft, ChevronRight } from "@lucide/vue"
import type { AcceptableValue } from "reka-ui"

import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import EventChip from "./EventChip.vue"
import MonthGrid from "./MonthGrid.vue"
import { HOUR, layout, tones, type CalendarEvent, type CalendarView, type EventCalendarLabels } from "./types"

/**
 * A planner of events in day, week, and month views. Overlapping events sit
 * side by side, the current time is marked, and clicking an empty slot or an
 * event emits so you can open your own editor.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    events: CalendarEvent[]
    /** Controlled date the view shows (v-model:date). */
    date?: Date
    defaultDate?: Date
    /** Controlled view (v-model:view). */
    view?: CalendarView
    defaultView?: CalendarView
    /** Views in the switcher. One hides it. */
    views?: CalendarView[]
    dayStartHour?: number
    dayEndHour?: number
    weekStartsOn?: 0 | 1
    /** Language of dates. Defaults to the page's. */
    locale?: string
    labels?: EventCalendarLabels
  }>(),
  {
    date: undefined,
    defaultDate: undefined,
    view: undefined,
    defaultView: "week",
    views: () => ["day", "week", "month"],
    dayStartHour: 7,
    dayEndHour: 21,
    weekStartsOn: 1,
    locale: undefined,
    labels: () => ({}),
  }
)

const emit = defineEmits<{
  "update:date": [date: Date]
  "update:view": [view: CalendarView]
  eventClick: [event: CalendarEvent]
  /** An empty slot was clicked: the start of that half hour, or the day in month view. */
  slotClick: [date: Date]
}>()

// The current minute, null until mounted so the server and the browser render the same frame.
const minute = ref<number | null>(null)
const hydrated = ref(false)
let timer: number | undefined
onMounted(() => {
  hydrated.value = true
  minute.value = Math.floor(Date.now() / 60_000)
  timer = window.setInterval(() => (minute.value = Math.floor(Date.now() / 60_000)), 60_000)
})
onBeforeUnmount(() => window.clearInterval(timer))
const now = computed(() => (minute.value === null ? null : new Date(minute.value * 60_000)))

const uncontrolledDate = ref<Date | null>(props.defaultDate ?? null)
const date = computed(() => props.date ?? uncontrolledDate.value ?? now.value ?? new Date(0))
const uncontrolledView = ref<CalendarView>(props.defaultView)
const view = computed(() => props.view ?? uncontrolledView.value)

function setDate(next: Date) {
  uncontrolledDate.value = next
  emit("update:date", next)
}
function step(direction: 1 | -1) {
  const d = date.value
  setDate(view.value === "month" ? addMonths(d, direction) : view.value === "week" ? addWeeks(d, direction) : addDays(d, direction))
}
function goToday() {
  if (now.value) setDate(now.value)
}
function onViewChange(next: AcceptableValue[]) {
  const v = next[0] as CalendarView | undefined
  if (!v) return
  uncontrolledView.value = v
  emit("update:view", v)
}

const format = (options: Intl.DateTimeFormatOptions, value: Date) => new Intl.DateTimeFormat(props.locale, options).format(value)
const time = (value: Date) => format({ hour: "numeric", minute: "2-digit" }, value)

const days = computed(() =>
  view.value === "day"
    ? [startOfDay(date.value)]
    : Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(date.value, { weekStartsOn: props.weekStartsOn }), i))
)

const title = computed(() => {
  if (!hydrated.value) return " "
  if (view.value === "month") return format({ month: "long", year: "numeric" }, date.value)
  if (view.value === "week")
    return `${format({ day: "numeric", month: "short" }, days.value[0]!)} – ${format({ day: "numeric", month: "short", year: "numeric" }, days.value[6]!)}`
  return format({ weekday: "long", day: "numeric", month: "long", year: "numeric" }, date.value)
})

const eventLabel = (event: CalendarEvent) =>
  event.allDay
    ? `${event.title}, ${format({ weekday: "long", day: "numeric", month: "long" }, event.start)}, ${props.labels.allDay ?? "all day"}`
    : `${event.title}, ${format({ weekday: "long", day: "numeric", month: "long" }, event.start)}, ${time(event.start)} – ${time(event.end)}`

const hours = computed(() => Array.from({ length: props.dayEndHour - props.dayStartHour }, (_, i) => props.dayStartHour + i))

const showAllDay = computed(
  () =>
    hydrated.value &&
    props.events.some((event) => event.allDay && days.value.some((day) => event.start <= addDays(day, 1) && event.end >= day))
)
const allDayEvents = (day: Date) => props.events.filter((event) => event.allDay && startOfDay(event.start) <= day && event.end >= day)

const columns = computed(() =>
  days.value.map((day) => {
    const dayStart = new Date(day)
    dayStart.setHours(props.dayStartHour, 0, 0, 0)
    const dayEnd = new Date(day)
    dayEnd.setHours(props.dayEndHour, 0, 0, 0)
    const dayEvents = hydrated.value
      ? props.events.filter((event) => !event.allDay && event.start < dayEnd && event.end > dayStart)
      : []
    const n = now.value
    const nowTop = n && isSameDay(day, n) && n >= dayStart && n <= dayEnd ? (differenceInMinutes(n, dayStart) / 60) * HOUR : null
    const placed = layout(dayEvents).map(({ event, column, columns }) => {
      const start = event.start < dayStart ? dayStart : event.start
      const end = event.end > dayEnd ? dayEnd : event.end
      const top = (differenceInMinutes(start, dayStart) / 60) * HOUR
      const height = Math.max((differenceInMinutes(end, start) / 60) * HOUR - 2, 18)
      return {
        event,
        height,
        style: {
          top: `${top + 1}px`,
          height: `${height}px`,
          insetInlineStart: `calc(${(column / columns) * 100}% + 2px)`,
          width: `calc(${100 / columns}% - 4px)`,
        },
      }
    })
    return { day, dayStart, today: n ? isSameDay(day, n) : false, placed, nowTop }
  })
)

function onSlot(event: MouseEvent, dayStart: Date) {
  if (event.target !== event.currentTarget) return
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const minutes = Math.floor(((event.clientY - rect.top) / HOUR) * 2) * 30
  const slot = new Date(dayStart)
  slot.setMinutes(minutes)
  emit("slotClick", slot)
}

// Open the hours on the current time, an hour before it, once per view.
const scrollRef = ref<HTMLDivElement | null>(null)
let scrolledFor: string | null = null
watch(
  [hydrated, view, minute, () => props.dayStartHour],
  async () => {
    await nextTick()
    if (!hydrated.value || view.value === "month" || !scrollRef.value || scrolledFor === view.value) return
    scrolledFor = view.value
    const hour = minute.value === null ? props.dayStartHour : new Date(minute.value * 60_000).getHours()
    scrollRef.value.scrollTop = Math.max(0, (hour - props.dayStartHour - 1) * HOUR)
  },
  { flush: "post" }
)

const rootClassName =
  "flex w-full flex-col overflow-hidden rounded-[min(var(--radius-4xl),24px)] bg-card text-card-foreground ring-1 ring-foreground/5 dark:ring-foreground/10"
const eventClassName =
  "absolute flex flex-col overflow-hidden rounded-lg border-s-2 px-1.5 py-1 text-start text-[11px] leading-tight outline-none transition-[filter] hover:brightness-95 focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/40 dark:hover:brightness-110"
const nowClassName =
  "pointer-events-none absolute inset-x-0 z-10 h-px bg-crimson-solid before:absolute before:-top-1 before:-start-1 before:size-2 before:rounded-full before:bg-crimson-solid"
const gridBackground = `repeating-linear-gradient(to bottom, transparent 0 ${HOUR - 1}px, var(--color-border) ${HOUR - 1}px ${HOUR}px)`
</script>

<template>
  <div data-slot="event-calendar" :class="cn(rootClassName, props.class)">
    <header class="flex flex-wrap items-center gap-2 border-b border-border p-3">
      <div class="flex items-center gap-1">
        <Button variant="outline" size="sm" @click="goToday">{{ labels.today ?? "Today" }}</Button>
        <Button variant="ghost" size="icon-sm" :aria-label="labels.previous ?? 'Previous'" @click="step(-1)">
          <ChevronLeft class="rtl:rotate-180" />
        </Button>
        <Button variant="ghost" size="icon-sm" :aria-label="labels.next ?? 'Next'" @click="step(1)">
          <ChevronRight class="rtl:rotate-180" />
        </Button>
      </div>
      <h2 aria-live="polite" class="m-0 min-w-32 flex-1 text-sm font-medium first-letter:uppercase">{{ title }}</h2>
      <ToggleGroup v-if="views.length > 1" aria-label="View" :model-value="[view]" @update:model-value="onViewChange">
        <ToggleGroupItem v-for="v in views" :key="v" :value="v" class="capitalize">
          {{ labels.views?.[v] ?? v }}
        </ToggleGroupItem>
      </ToggleGroup>
    </header>

    <MonthGrid
      v-if="view === 'month'"
      :date="date"
      :events="events"
      :week-starts-on="weekStartsOn"
      :hydrated="hydrated"
      :now="now"
      :format="format"
      :event-label="eventLabel"
      :more="labels.more"
      @event-click="emit('eventClick', $event)"
      @slot-click="emit('slotClick', $event)"
    />
    <div v-else ref="scrollRef" class="max-h-[36rem] overflow-auto">
      <div class="grid min-w-[36rem]" :style="{ gridTemplateColumns: `3.5rem repeat(${days.length}, minmax(0, 1fr))` }">
        <!-- Day headings -->
        <div class="sticky top-0 z-20 border-b border-border bg-card" />
        <div
          v-for="column in columns"
          :key="+column.day"
          class="sticky top-0 z-20 flex items-baseline justify-center gap-1.5 border-b border-s border-border bg-card px-1 py-2 text-xs"
        >
          <template v-if="hydrated">
            <span class="text-muted-foreground">{{ format({ weekday: "short" }, column.day) }}</span>
            <span
              :class="
                cn(
                  'inline-flex size-6 items-center justify-center rounded-full font-medium tabular-nums',
                  column.today && 'bg-primary text-primary-foreground',
                )
              "
            >
              {{ column.day.getDate() }}
            </span>
          </template>
        </div>

        <!-- All-day row -->
        <template v-if="showAllDay">
          <div class="border-b border-border px-1 py-1.5 text-end text-[10px] text-muted-foreground">
            {{ labels.allDay ?? "All day" }}
          </div>
          <div v-for="day in days" :key="+day" class="flex flex-col gap-0.5 border-b border-s border-border p-0.5">
            <EventChip
              v-for="event in allDayEvents(day)"
              :key="event.id"
              :event="event"
              :label="eventLabel(event)"
              @click="emit('eventClick', $event)"
            />
          </div>
        </template>

        <!-- Hour gutter -->
        <div class="relative" :style="{ height: `${hours.length * HOUR}px` }">
          <template v-if="hydrated">
            <span
              v-for="(hour, i) in hours"
              :key="hour"
              class="absolute end-2 -translate-y-1/2 text-[10px] text-muted-foreground tabular-nums"
              :style="{ top: `${i * HOUR}px` }"
            >
              {{ i === 0 ? "" : time(new Date(2000, 0, 1, hour)) }}
            </span>
          </template>
        </div>

        <!-- Day columns -->
        <div
          v-for="column in columns"
          :key="+column.day"
          role="group"
          :aria-label="hydrated ? format({ weekday: 'long', day: 'numeric', month: 'long' }, column.day) : undefined"
          class="relative border-s border-border"
          :style="{ height: `${hours.length * HOUR}px`, backgroundImage: gridBackground }"
          @click="onSlot($event, column.dayStart)"
        >
          <button
            v-for="{ event, height, style } in column.placed"
            :key="event.id"
            type="button"
            :aria-label="eventLabel(event)"
            :class="cn(eventClassName, tones[event.color ?? 'indigo'])"
            :style="style"
            @click="emit('eventClick', event)"
          >
            <span class="truncate font-medium">{{ event.title }}</span>
            <span v-if="height > 32" class="truncate opacity-80">{{ time(event.start) }} – {{ time(event.end) }}</span>
            <span v-if="height > 48 && event.description" class="truncate opacity-70">{{ event.description }}</span>
          </button>
          <span v-if="column.nowTop !== null" aria-hidden="true" :class="nowClassName" :style="{ top: `${column.nowTop}px` }" />
        </div>
      </div>
    </div>
  </div>
</template>
