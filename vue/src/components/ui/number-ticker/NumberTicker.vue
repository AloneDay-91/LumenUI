<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/** Fast start, gentle landing. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t))

/**
 * A number that counts up (or down) to its value, formatted for the locale.
 * It starts when it scrolls into view, runs again when the value changes,
 * and jumps straight to the value for people who ask for reduced motion.
 * Screen readers get the final value only.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    value: number
    /** Where the first count starts. Later changes start from the current value. */
    from?: number
    /** Milliseconds. */
    duration?: number
    /** Milliseconds before the first count. */
    delay?: number
    /** Intl options: currency, percent, decimals, compact notation. */
    format?: Intl.NumberFormatOptions
    locale?: string
    /** Wait until the number is on screen. */
    startOnView?: boolean
  }>(),
  { from: 0, duration: 1200, delay: 0, startOnView: true }
)

const el = ref<HTMLSpanElement>()
const display = ref(props.from)
let shown = props.from
const visible = ref(!props.startOnView)
let observer: IntersectionObserver | undefined
let frame = 0
let first = true

onMounted(() => {
  if (visible.value || !el.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  observer.observe(el.value)
})

function run() {
  cancelAnimationFrame(frame)
  if (!visible.value) return
  const value = props.value
  const duration = props.duration
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const start = shown
  if (reduce || duration <= 0 || start === value) {
    shown = value
    display.value = value
    return
  }
  let began: number | null = null
  const wait = first ? props.delay : 0
  first = false
  const tick = (time: number) => {
    began ??= time + wait
    const t = Math.min(1, Math.max(0, (time - began) / duration))
    const next = start + (value - start) * easeOutExpo(t)
    shown = next
    display.value = next
    if (t < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

watch(() => [props.value, visible.value, props.duration, props.delay], run, { immediate: true, flush: "post" })

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
})

const formatter = computed(() => new Intl.NumberFormat(props.locale, props.format))
// Percentages show the value × 100, so they keep two more decimals.
const decimals = computed(
  () =>
    (props.format?.maximumFractionDigits ?? props.format?.minimumFractionDigits ?? 0) +
    (props.format?.style === "percent" ? 2 : 0)
)
// While counting, round to the decimals the final value shows.
const rounded = computed(() =>
  display.value === props.value ? props.value : Number(display.value.toFixed(decimals.value))
)
</script>

<template>
  <span ref="el" data-slot="number-ticker" :class="cn('inline-block tabular-nums', props.class)">
    <span aria-hidden="true">{{ formatter.format(rounded) }}</span>
    <span class="sr-only">{{ formatter.format(value) }}</span>
  </span>
</template>
