<script setup lang="ts">
import VisAxis from "@unovis/vue/components/axis"

import { formatChartValue, useChart } from "./context"

defineOptions({ inheritAttrs: false })

// Other VisAxis props (numTicks, tickValues…) pass through.
const props = defineProps<{
  tickFormat?: (tick: number | Date, i: number) => string
  /** Hides the labels; grid lines from ChartGrid stay. */
  hide?: boolean
}>()

const { grid } = useChart()

const empty = () => ""
</script>

<template>
  <VisAxis
    type="y"
    :grid-line="grid.horizontal"
    :tick-line="false"
    :domain-line="false"
    :tick-padding="hide ? 0 : 8"
    tick-text-color="var(--muted-foreground)"
    tick-text-font-size="12px"
    :tick-format="hide ? empty : (props.tickFormat ?? formatChartValue)"
    v-bind="$attrs"
  />
</template>
