<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, type HTMLAttributes } from "vue"
import { addDays, format as formatIso, startOfDay, startOfWeek } from "date-fns"

import { cn } from "@/lib/utils"
import type { HeatmapLabels, HeatmapValue } from "."

/**
 * A year of activity as a grid of days, one column per week, in five steps
 * of the primary. Each day has its value as a tooltip; the whole grid reads
 * as one summary for screen readers.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    /** One entry per day. Days that are missing count as 0. */
    data: HeatmapValue[]
    /** Last day shown. Defaults to today. */
    end?: Date
    /** Columns. 53 is a year. */
    weeks?: number
    weekStartsOn?: 0 | 1
    /** The value that gets the darkest step. Defaults to the highest in data. */
    max?: number
    /** Language of month and day names. */
    locale?: string
    labels?: HeatmapLabels
  }>(),
  { weeks: 53, weekStartsOn: 1, labels: () => ({}) }
)

// Five steps from the muted surface to the primary.
const levels = [
  "bg-muted",
  "bg-[color-mix(in_oklch,var(--primary)_28%,var(--muted))]",
  "bg-[color-mix(in_oklch,var(--primary)_50%,var(--muted))]",
  "bg-[color-mix(in_oklch,var(--primary)_75%,var(--muted))]",
  "bg-primary",
]
const cellClassName = "size-[11px] rounded-[3px] ring-1 ring-foreground/5 ring-inset"
const rowsStyle = { gridTemplateRows: "0.875rem repeat(7, 11px)" }

// Dates and names depend on the viewer's clock and locale: render them only on the client.
const hydrated = ref(false)
const scrollRef = ref<HTMLDivElement | null>(null)

const last = computed(() => startOfDay(props.end ?? (hydrated.value ? new Date() : new Date(2000, 0, 1))))
const first = computed(() =>
  addDays(startOfWeek(last.value, { weekStartsOn: props.weekStartsOn }), -(props.weeks - 1) * 7)
)

const byDay = computed(() => {
  const map = new Map<string, number>()
  for (const entry of props.data) {
    const key = formatIso(typeof entry.date === "string" ? new Date(entry.date) : entry.date, "yyyy-MM-dd")
    map.set(key, (map.get(key) ?? 0) + entry.value)
  }
  return map
})

const max = computed(() => props.max ?? Math.max(1, ...byDay.value.values()))
const level = (value: number) => (value <= 0 ? 0 : Math.min(4, Math.ceil((value / max.value) * 4)))
const fmt = (options: Intl.DateTimeFormatOptions, date: Date) =>
  new Intl.DateTimeFormat(props.locale, options).format(date)

const columns = computed(() =>
  Array.from({ length: props.weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const date = addDays(first.value, w * 7 + d)
      return {
        date,
        value: date > last.value ? null : (byDay.value.get(formatIso(date, "yyyy-MM-dd")) ?? 0),
      }
    })
  )
)

const totals = computed(() => {
  let total = 0
  let active = 0
  for (const column of columns.value)
    for (const day of column)
      if (day.value) {
        total += day.value
        active++
      }
  return { total, active }
})

// Name a month over the week its first day falls in. The first column names
// its own month unless another starts right after.
const months = computed(() => {
  const monthSoon = columns.value.slice(1, 3).some((c) => c.some((day) => day.date.getDate() === 1))
  return columns.value.map((column, w) => {
    const firstOfMonth = column.find((day) => day.date.getDate() === 1)?.date
    return firstOfMonth ?? (w === 0 && !monthSoon ? column[0].date : null)
  })
})

const summary = computed(() => {
  if (!hydrated.value) return undefined
  const { total, active } = totals.value
  return (
    props.labels.summary?.(total, active) ??
    `${total} in total over ${active} active days, ${fmt({ dateStyle: "medium" }, first.value)} to ${fmt({ dateStyle: "medium" }, last.value)}`
  )
})

function dayTitle(value: number, date: Date) {
  if (!hydrated.value) return undefined
  return (
    props.labels.value?.(value, date) ??
    `${value} on ${fmt({ weekday: "long", day: "numeric", month: "long" }, date)}`
  )
}

onMounted(() => {
  hydrated.value = true
})

// Open on the latest weeks when the grid is wider than its box.
watch(
  hydrated,
  async () => {
    await nextTick()
    if (scrollRef.value) scrollRef.value.scrollLeft = scrollRef.value.scrollWidth
  },
  { immediate: true }
)
</script>

<template>
  <div data-slot="heatmap" :class="cn('flex w-full flex-col gap-2 text-[10px] text-muted-foreground', props.class)">
    <div class="flex min-w-0">
      <!-- Weekday labels stay put while the weeks scroll. -->
      <div aria-hidden="true" class="grid shrink-0 gap-[3px] pe-1.5" :style="rowsStyle">
        <span />
        <span v-for="d in 7" :key="d" class="leading-[11px]">
          {{ hydrated && (d - 1) % 2 === 1 ? fmt({ weekday: "short" }, addDays(first, d - 1)) : "" }}
        </span>
      </div>
      <div ref="scrollRef" role="img" :aria-label="summary" class="min-w-0 flex-1 overflow-x-auto pb-1">
        <div class="inline-grid grid-flow-col gap-[3px]" :style="rowsStyle">
          <template v-for="(column, w) in columns" :key="w">
            <span class="h-3.5 w-[11px] overflow-visible leading-none whitespace-nowrap">
              {{ hydrated && months[w] ? fmt({ month: "short" }, months[w]!) : "" }}
            </span>
            <template v-for="day in column" :key="+day.date">
              <span v-if="day.value === null" class="size-[11px]" />
              <span v-else :title="dayTitle(day.value, day.date)" :class="cn(cellClassName, levels[level(day.value)])" />
            </template>
          </template>
        </div>
      </div>
    </div>
    <div aria-hidden="true" class="flex items-center justify-end gap-[3px]">
      <span class="me-1">{{ labels.less ?? "Less" }}</span>
      <span v-for="tone in levels" :key="tone" :class="cn(cellClassName, tone)" />
      <span class="ms-1">{{ labels.more ?? "More" }}</span>
    </div>
  </div>
</template>
