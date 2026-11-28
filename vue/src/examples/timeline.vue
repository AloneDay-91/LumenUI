<script setup lang="ts">
import {
  Timeline, TimelineContent, TimelineDescription, TimelineItem, TimelineMarker, TimelineSeparator,
  TimelineTime, TimelineTitle,
} from "@/components/ui/timeline"

const events = [
  { title: "0.5.0 tagged", date: "2026-09-20", label: "20 Sep 2026", text: "Native components, logo favicon, full-width previews." },
  { title: "0.4.0 tagged", date: "2026-09-19", label: "19 Sep 2026", text: "API tabs, English docs, copy-paste CSS tokens." },
  { title: "Previews stay on the page", date: "2026-09-18", label: "18 Sep 2026", text: "Each component keeps its live preview in the docs." },
]
</script>

<template>
  <div class="w-full max-w-md">
    <Timeline>
      <TimelineItem v-for="event in events" :key="event.date">
        <TimelineSeparator />
        <TimelineMarker />
        <TimelineContent>
          <TimelineTitle>{{ event.title }}</TimelineTitle>
          <TimelineTime :datetime="event.date">{{ event.label }}</TimelineTime>
          <TimelineDescription>{{ event.text }}</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  </div>
</template>
