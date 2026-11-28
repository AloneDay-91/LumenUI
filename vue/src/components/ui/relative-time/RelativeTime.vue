<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/**
 * "3 minutes ago" that keeps itself current. A native <time> with the exact
 * date in its title and datetime, so the precise moment is one hover away.
 */
const props = withDefaults(
  defineProps<{
    date: Date | string | number
    locale?: string
    titleFormat?: Intl.DateTimeFormatOptions
    class?: HTMLAttributes["class"]
  }>(),
  { titleFormat: () => ({ dateStyle: "medium", timeStyle: "short" }) }
)

const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["week", 7 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

function relative(date: Date, now: number, locale: string | undefined) {
  const seconds = Math.round((date.getTime() - now) / 1000)
  const format = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size || unit === "second") {
      if (unit === "second" && Math.abs(seconds) < 45) return format.format(0, "second")
      return format.format(Math.round(seconds / size), unit)
    }
  }
  return ""
}

/** How often to re-render: every 15s in the first minute, then by the unit shown. */
function nextTick(date: Date, now: number) {
  const age = Math.abs(now - date.getTime()) / 1000
  if (age < 60) return 15_000
  if (age < 3600) return 60_000
  if (age < 86_400) return 3_600_000
  return null
}

const date = computed(() => new Date(props.date))
// Default to the page's language, not the browser's, so the text matches the UI around it.
const resolvedLocale = computed(
  () =>
    props.locale ?? (typeof document === "undefined" ? undefined : document.documentElement.lang || undefined)
)
const now = ref(Date.now())

let timer: ReturnType<typeof setTimeout> | undefined
watch(
  [date, now],
  ([d, n]) => {
    clearTimeout(timer)
    const delay = nextTick(d, n)
    if (delay === null) return
    timer = setTimeout(() => (now.value = Date.now()), delay)
  },
  { immediate: true }
)
onBeforeUnmount(() => clearTimeout(timer))

const title = computed(() => new Intl.DateTimeFormat(resolvedLocale.value, props.titleFormat).format(date.value))
const text = computed(() => relative(date.value, now.value, resolvedLocale.value))
</script>

<template>
  <time
    data-slot="relative-time"
    :datetime="date.toISOString()"
    :title="title"
    :class="cn('tabular-nums', props.class)"
  >{{ text }}</time>
</template>
