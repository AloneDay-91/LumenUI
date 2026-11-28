<script setup lang="ts">
import { computed, useSlots, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import type { GaugeColor } from "."

const strokes: Record<GaugeColor, string> = {
  primary: "stroke-primary",
  indigo: "stroke-indigo-solid",
  cyan: "stroke-cyan-solid",
  orange: "stroke-orange-solid",
  crimson: "stroke-crimson-solid",
  jade: "stroke-jade-solid",
}

/**
 * A value on an open arc, with the figure and a label in the middle. The arc
 * takes the colour of the first threshold the value stays under, so 80% CPU
 * can turn orange and 95% crimson.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    value: number
    min?: number
    max?: number
    /** Under the figure: "CPU", "of quota". The `label` slot takes richer content. */
    label?: string
    /** The figure in the middle. Defaults to a rounded percentage of the range. The `figure` slot overrides it. */
    format?: (value: number) => string | number
    /** Colour once the value reaches each point, lowest first. */
    thresholds?: { from: number; color: GaugeColor }[]
    /** Colour below the first threshold. */
    color?: GaugeColor
    /** Width in pixels. The height follows. */
    size?: number
    thickness?: number
    ariaLabel?: string
  }>(),
  { min: 0, max: 100, thresholds: () => [], color: "primary", size: 160, thickness: 12 }
)

defineSlots<{
  figure?: (props: { value: number; ratio: number }) => unknown
  label?: () => unknown
}>()
const slots = useSlots()

const clamped = computed(() => Math.min(props.max, Math.max(props.min, props.value)))
const ratio = computed(() => (props.max === props.min ? 0 : (clamped.value - props.min) / (props.max - props.min)))
const tone = computed(() =>
  [...props.thresholds]
    .sort((a, b) => a.from - b.from)
    .reduce<GaugeColor>((current, t) => (clamped.value >= t.from ? t.color : current), props.color)
)

// A 240° arc, open at the bottom.
const sweep = 240
const radius = computed(() => 50 - props.thickness / 2 / (props.size / 100))
const circumference = computed(() => 2 * Math.PI * radius.value)
const arc = computed(() => (circumference.value * sweep) / 360)
const strokeWidth = computed(() => (props.thickness * 100) / props.size)
const figure = computed(() =>
  props.format ? String(props.format(clamped.value)) : `${Math.round(ratio.value * 100)}%`
)
const hasLabel = computed(() => !!props.label || !!slots.label)
</script>

<template>
  <div
    role="meter"
    :aria-valuenow="clamped"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-label="ariaLabel ?? label"
    :aria-valuetext="slots.figure ? undefined : figure"
    data-slot="gauge"
    :class="cn('relative inline-flex shrink-0 items-center justify-center', props.class)"
    :style="{ width: `${size}px`, height: `${size * 0.86}px` }"
  >
    <svg viewBox="0 0 100 86" class="absolute inset-0 size-full overflow-visible" aria-hidden="true">
      <g transform="rotate(150 50 50)">
        <circle
          cx="50"
          cy="50"
          :r="radius"
          fill="none"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          :stroke-dasharray="`${arc} ${circumference}`"
          class="stroke-muted"
        />
        <circle
          cx="50"
          cy="50"
          :r="radius"
          fill="none"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          :stroke-dasharray="`${arc * ratio} ${circumference}`"
          :class="cn('transition-[stroke-dasharray,stroke] duration-500 ease-out motion-reduce:transition-none', strokes[tone])"
          :style="{ opacity: ratio === 0 ? 0 : 1 }"
        />
      </g>
    </svg>
    <div class="relative flex flex-col items-center pt-[8%] text-center">
      <span class="font-medium tracking-tight tabular-nums" :style="{ fontSize: `${size * 0.17}px` }">
        <slot name="figure" :value="clamped" :ratio="ratio">{{ figure }}</slot>
      </span>
      <span
        v-if="hasLabel"
        class="text-muted-foreground"
        :style="{ fontSize: `${Math.max(11, size * 0.075)}px` }"
      >
        <slot name="label">{{ label }}</slot>
      </span>
    </div>
  </div>
</template>
