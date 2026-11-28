<script setup lang="ts">
import { computed } from "vue"

import { useChart, type ChartLegendPayload } from "./context"

const props = defineProps<{ payload?: ChartLegendPayload[] }>()
const { config } = useChart()

const entries = computed(() =>
  (props.payload ?? []).map((entry) => {
    const key = String(entry.dataKey ?? entry.value ?? "")
    const name = String(entry.value ?? "")
    const itemConfig = config.value[key] ?? config.value[name]
    return { id: `${key}-${name}`, color: entry.color, label: itemConfig?.label ?? name }
  })
)
</script>

<template>
  <div v-if="entries.length" class="flex flex-wrap items-center gap-x-3 gap-y-1 pt-3">
    <span v-for="entry in entries" :key="entry.id" class="inline-flex items-center gap-1.5 text-muted-foreground">
      <span class="size-1.5 shrink-0 rounded-full" :style="{ background: entry.color }" />
      {{ entry.label }}
    </span>
  </div>
</template>
