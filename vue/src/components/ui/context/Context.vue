<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { ContextUsage } from "."

/**
 * How much of the context window the conversation has used: a ring and a
 * percentage, with the breakdown and the cost in a Popover.
 */
const props = defineProps<{
  /** Tokens in the window now. */
  used: number
  /** Window size in tokens. */
  max: number
  usage?: ContextUsage
  /** Already formatted, e.g. "$0.04". */
  cost?: string
  model?: string
  class?: HTMLAttributes["class"]
}>()

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 })

const share = computed(() => (props.max > 0 ? props.used / props.max : 0))
const percent = computed(() => Math.round(share.value * 100))
const rows = computed(
  () =>
    (
      [
        ["Input", props.usage?.input],
        ["Output", props.usage?.output],
        ["Reasoning", props.usage?.reasoning],
        ["Cached", props.usage?.cached],
      ] as [string, number | undefined][]
    ).filter(([, value]) => value !== undefined) as [string, number][]
)

// A ring that fills with the share of the window used.
const radius = 6
const circumference = 2 * Math.PI * radius
const tone = computed(() =>
  share.value >= 0.9 ? "var(--crimson-solid)" : share.value >= 0.7 ? "var(--orange-solid)" : "currentColor"
)
</script>

<template>
  <Popover>
    <PopoverTrigger
      data-slot="context"
      :aria-label="`Context window, ${percent}% used`"
      :class="
        cn(
          'inline-flex h-7 items-center gap-1.5 rounded-full px-2 font-mono text-[11px] text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30',
          props.class,
        )
      "
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" class="size-4 -rotate-90">
        <circle cx="8" cy="8" :r="radius" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="2" />
        <circle
          cx="8"
          cy="8"
          :r="radius"
          fill="none"
          :stroke="tone"
          stroke-width="2"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="circumference * (1 - Math.min(1, share))"
          class="transition-[stroke-dashoffset] duration-300"
        />
      </svg>
      {{ percent }}%
    </PopoverTrigger>
    <PopoverContent align="end" class="w-64 p-0 text-xs">
      <div class="flex flex-col gap-2 p-3">
        <div class="flex items-baseline justify-between">
          <span class="font-medium">Context window</span>
          <span class="font-mono text-muted-foreground">{{ percent }}%</span>
        </div>
        <div class="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            :class="cn('h-full rounded-full bg-primary', share >= 0.7 && 'bg-orange-solid', share >= 0.9 && 'bg-crimson-solid')"
            :style="{ width: `${Math.min(100, percent)}%` }"
          />
        </div>
        <div class="font-mono text-[11px] text-muted-foreground">
          {{ compact.format(used) }} / {{ compact.format(max) }} tokens{{ model ? ` · ${model}` : "" }}
        </div>
      </div>
      <dl
        v-if="rows.length > 0 || cost"
        class="m-0 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-t border-border p-3"
      >
        <template v-for="[label, value] in rows" :key="label">
          <dt class="text-muted-foreground">{{ label }}</dt>
          <dd class="m-0 text-end font-mono tabular-nums">{{ compact.format(value) }}</dd>
        </template>
        <template v-if="cost">
          <dt class="font-medium">Cost</dt>
          <dd class="m-0 text-end font-mono font-medium tabular-nums">{{ cost }}</dd>
        </template>
      </dl>
    </PopoverContent>
  </Popover>
</template>
