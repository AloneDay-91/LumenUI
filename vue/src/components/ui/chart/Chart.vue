<script setup lang="ts">
import { computed, provide, reactive, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { chartKey, chartVars, type ChartConfig } from "./context"

const props = defineProps<{ config: ChartConfig; class?: HTMLAttributes["class"] }>()

provide(chartKey, {
  config: computed(() => props.config),
  grid: reactive({ horizontal: false, vertical: false }),
})

// The Unovis container fills what is left of the frame once a ChartLegend takes its row.
const frameClassName =
  "flex aspect-video w-full min-w-0 flex-col text-xs [&_.unovis-xy-container]:min-h-0 [&_.unovis-xy-container]:w-full [&_.unovis-xy-container]:flex-1 [&_.unovis-single-container]:min-h-0 [&_.unovis-single-container]:w-full [&_.unovis-single-container]:flex-1"

// Unovis reads its colours from CSS variables: point them at the theme.
const visVars: Record<string, string> = {
  "--vis-font-family": "inherit",
  "--vis-axis-font-family": "inherit",
  "--vis-axis-tick-label-color": "var(--muted-foreground)",
  "--vis-dark-axis-tick-label-color": "var(--muted-foreground)",
  "--vis-axis-tick-label-font-size": "12px",
  "--vis-axis-grid-color": "var(--border)",
  "--vis-dark-axis-grid-color": "var(--border)",
  "--vis-axis-domain-color": "var(--border)",
  "--vis-dark-axis-domain-color": "var(--border)",
  "--vis-crosshair-line-stroke-color": "var(--border)",
  "--vis-crosshair-circle-stroke-color": "var(--background)",
  "--vis-tooltip-background-color": "transparent",
  "--vis-dark-tooltip-background-color": "transparent",
  "--vis-tooltip-border-color": "transparent",
  "--vis-dark-tooltip-border-color": "transparent",
  "--vis-tooltip-shadow-color": "transparent",
  "--vis-dark-tooltip-shadow-color": "transparent",
  "--vis-tooltip-box-shadow": "none",
  "--vis-tooltip-backdrop-filter": "none",
  "--vis-tooltip-padding": "0",
  "--vis-tooltip-text-color": "var(--popover-foreground)",
  "--vis-dark-tooltip-text-color": "var(--popover-foreground)",
}

const style = computed(() => ({ ...visVars, ...chartVars(props.config) }))
</script>

<template>
  <div data-slot="chart" :class="cn(frameClassName, props.class)" :style="style">
    <slot />
  </div>
</template>
