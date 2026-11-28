<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ArrowDownRight, ArrowUpRight, Minus } from "@lucide/vue"

import { cn } from "@/lib/utils"
import type { StatIntent, StatTrend } from "."

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    trend?: StatTrend
    /** Which colour reads as good. Defaults to the trend: up is jade, down is crimson. */
    intent?: StatIntent
    srLabel?: string
  }>(),
  { trend: "neutral" }
)

const trendIcon = { up: ArrowUpRight, down: ArrowDownRight, neutral: Minus }
const trendLabel: Record<StatTrend, string> = { up: "Up", down: "Down", neutral: "No change" }

const icon = computed(() => trendIcon[props.trend])
const label = computed(() => props.srLabel ?? trendLabel[props.trend])
const tone = computed(
  () => props.intent ?? (props.trend === "up" ? "positive" : props.trend === "down" ? "negative" : "neutral")
)
</script>

<template>
  <span
    data-slot="stat-delta"
    :data-trend="trend"
    :class="
      cn(
        'inline-flex w-fit items-center gap-0.5 rounded-2xl px-1.5 py-0.5 text-xs font-medium tabular-nums',
        tone === 'positive' && 'bg-jade-wash text-jade-ink',
        tone === 'negative' && 'bg-crimson-wash text-crimson-ink',
        tone === 'neutral' && 'bg-secondary text-secondary-foreground',
        props.class,
      )
    "
  >
    <component :is="icon" aria-hidden="true" class="size-3" />
    <span class="sr-only">{{ label }} </span>
    <slot />
  </span>
</template>
