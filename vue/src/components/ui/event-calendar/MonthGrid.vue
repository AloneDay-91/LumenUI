<script setup lang="ts">
import { computed } from "vue"
import { addDays, endOfMonth, endOfWeek, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek } from "date-fns"

import { cn } from "@/lib/utils"
import EventChip from "./EventChip.vue"
import type { CalendarEvent } from "./types"

const props = defineProps<{
  date: Date
  events: CalendarEvent[]
  weekStartsOn: 0 | 1
  hydrated: boolean
  now: Date | null
  format: (options: Intl.DateTimeFormatOptions, value: Date) => string
  eventLabel: (event: CalendarEvent) => string
  more?: (count: number) => string
}>()
const emit = defineEmits<{ eventClick: [event: CalendarEvent]; slotClick: [date: Date] }>()

const days = computed(() => {
  const first = startOfWeek(startOfMonth(props.date), { weekStartsOn: props.weekStartsOn })
  const last = endOfWeek(endOfMonth(props.date), { weekStartsOn: props.weekStartsOn })
  const out: Date[] = []
  for (let day = first; day <= last; day = addDays(day, 1)) out.push(day)
  return out
})

const cells = computed(() =>
  days.value.map((day, index) => ({
    day,
    index,
    events: props.hydrated
      ? props.events
          .filter((event) => startOfDay(event.start) <= day && event.end > day)
          .sort((a, b) => +a.start - +b.start)
      : [],
    outside: !isSameMonth(day, props.date),
    today: props.now ? isSameDay(day, props.now) : false,
  }))
)

function onCellClick(event: MouseEvent, day: Date) {
  if (event.target === event.currentTarget) emit("slotClick", day)
}
</script>

<template>
  <div class="grid grid-cols-7">
    <div
      v-for="day in days.slice(0, 7)"
      :key="+day"
      class="border-b border-border px-2 py-1.5 text-center text-[11px] text-muted-foreground"
    >
      <template v-if="hydrated">{{ format({ weekday: "short" }, day) }}</template>
    </div>
    <div
      v-for="cell in cells"
      :key="+cell.day"
      role="group"
      :aria-label="hydrated ? format({ weekday: 'long', day: 'numeric', month: 'long' }, cell.day) : undefined"
      :class="
        cn(
          'flex min-h-24 flex-col gap-0.5 border-b border-border p-1',
          cell.index % 7 !== 0 && 'border-s',
          cell.outside && 'bg-muted/30',
        )
      "
      @click="onCellClick($event, cell.day)"
    >
      <span
        :class="
          cn(
            'mb-0.5 inline-flex size-6 items-center justify-center self-end rounded-full text-[11px] tabular-nums',
            cell.outside && 'text-muted-foreground',
            cell.today && 'bg-primary font-medium text-primary-foreground',
          )
        "
      >
        {{ cell.day.getDate() }}
      </span>
      <EventChip
        v-for="event in cell.events.slice(0, 3)"
        :key="event.id"
        :event="event"
        :label="eventLabel(event)"
        @click="emit('eventClick', $event)"
      />
      <span v-if="cell.events.length > 3" class="px-1.5 text-[10px] text-muted-foreground">
        {{ more?.(cell.events.length - 3) ?? `${cell.events.length - 3} more` }}
      </span>
    </div>
  </div>
</template>
