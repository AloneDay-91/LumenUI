<script setup lang="ts">
import { computed } from "vue"

import ChartLegendContent from "./ChartLegendContent.vue"
import { chartColor, useChart, type ChartLegendPayload } from "./context"

// Place it after the Unovis container inside Chart: it takes a row under the plot.
const props = defineProps<{
  /** Series to show. Defaults to every key of the Chart config. */
  keys?: string[]
  /** Entries to show instead of the config's. */
  payload?: ChartLegendPayload[]
}>()

const { config } = useChart()

const entries = computed<ChartLegendPayload[]>(
  () =>
    props.payload ??
    (props.keys ?? Object.keys(config.value)).map((key) => ({ dataKey: key, value: key, color: chartColor(key) }))
)
</script>

<template>
  <ChartLegendContent :payload="entries" />
</template>
