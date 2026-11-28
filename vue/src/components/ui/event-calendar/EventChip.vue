<script setup lang="ts">
import { cn } from "@/lib/utils"
import { tones, type CalendarEvent } from "./types"

defineProps<{ event: CalendarEvent; label: string }>()
const emit = defineEmits<{ click: [event: CalendarEvent] }>()

const chipClassName =
  "w-full truncate rounded-md border-s-2 px-1.5 py-0.5 text-start text-[11px] font-medium outline-none hover:brightness-95 focus-visible:ring-3 focus-visible:ring-ring/40 dark:hover:brightness-110"
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :class="cn(chipClassName, tones[event.color ?? 'indigo'])"
    @click="emit('click', event)"
  >
    {{ event.title }}
  </button>
</template>
