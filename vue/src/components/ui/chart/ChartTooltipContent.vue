<script setup lang="ts">
import { computed } from "vue"

import { formatChartValue, useChart, type ChartConfig, type ChartTooltipPayload } from "./context"

const props = defineProps<{
  active?: boolean
  payload?: ChartTooltipPayload[]
  label?: string | number | null
  /** Needed only when rendered outside a Chart (ChartTooltip passes it). */
  config?: ChartConfig
}>()

const chart = useChart()
const config = computed(() => props.config ?? chart.config.value)

const rows = computed(() =>
  (props.payload ?? []).map((item) => {
    const key = String(item.dataKey ?? item.name ?? "")
    const name = String(item.name ?? "")
    const itemConfig = config.value[key] ?? config.value[name]
    return {
      id: `${key}-${name}`,
      color: item.color ?? itemConfig?.color,
      label: itemConfig?.label ?? name,
      value: formatChartValue(item.value),
    }
  })
)
</script>

<template>
  <div
    v-if="active && payload?.length"
    class="grid min-w-32 gap-1.5 rounded-2xl bg-popover px-2.5 py-2 text-xs text-popover-foreground ring-1 ring-foreground/5"
  >
    <div v-if="label != null && label !== ''" class="text-muted-foreground">{{ label }}</div>
    <div class="grid gap-1">
      <div v-for="row in rows" :key="row.id" class="flex items-center justify-between gap-4">
        <span class="flex items-center gap-1.5 text-muted-foreground">
          <span class="size-1.5 shrink-0 rounded-full" :style="{ background: row.color }" />
          {{ row.label }}
        </span>
        <span class="font-medium tabular-nums text-foreground">{{ row.value }}</span>
      </div>
    </div>
  </div>
</template>
