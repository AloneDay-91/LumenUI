<script setup lang="ts">
import { computed, shallowRef } from "vue"
import { CalendarDate, DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date"

import { Calendar } from "@/components/ui/calendar"

const date = shallowRef<DateValue | undefined>(new CalendarDate(2026, 10, 4))
const formatter = new DateFormatter("en-US", { dateStyle: "long" })
const label = computed(() => (date.value ? formatter.format(date.value.toDate(getLocalTimeZone())) : "Pick a day."))
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <Calendar v-model="date" :default-placeholder="date" />
    <p class="text-xs text-muted-foreground">{{ label }}</p>
  </div>
</template>
