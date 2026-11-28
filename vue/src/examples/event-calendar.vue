<script setup lang="ts">
import { ref } from "vue"

import { EventCalendar, type CalendarEvent } from "@/components/ui/event-calendar"

function at(dayOffset: number, hour: number, minute = 0) {
  const date = new Date()
  const monday = date.getDate() - ((date.getDay() + 6) % 7)
  return new Date(date.getFullYear(), date.getMonth(), monday + dayOffset, hour, minute)
}

const events = ref<CalendarEvent[]>([
  { id: "e1", title: "Design review", start: at(0, 10), end: at(0, 11), color: "indigo", description: "Room 2" },
  { id: "e2", title: "Standup", start: at(1, 9, 30), end: at(1, 9, 45), color: "gray" },
  { id: "e3", title: "Customer call", start: at(1, 14), end: at(1, 15), color: "jade", description: "Alex Martin" },
  { id: "e4", title: "Pairing", start: at(1, 14, 30), end: at(1, 16), color: "cyan" },
  { id: "e5", title: "Release 1.4", start: at(2, 0), end: at(2, 23, 59), allDay: true, color: "orange" },
  { id: "e6", title: "Lunch & learn", start: at(3, 12), end: at(3, 13, 30), color: "orange" },
  { id: "e7", title: "Incident review", start: at(4, 16), end: at(4, 17), color: "crimson" },
  { id: "e8", title: "Planning", start: at(7, 10), end: at(7, 12), color: "indigo" },
])
const picked = ref("Click an event, or an empty slot to add one.")

function addEvent(start: Date) {
  const end = new Date(start.getTime() + 60 * 60_000)
  events.value = [...events.value, { id: `n${events.value.length}`, title: "New event", start, end, color: "jade" }]
  picked.value = `Added an event at ${start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}.`
}
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <EventCalendar :events="events" @event-click="(event) => (picked = `Opened “${event.title}”.`)" @slot-click="addEvent" />
    <p class="m-0 text-xs text-muted-foreground" aria-live="polite">{{ picked }}</p>
  </div>
</template>
