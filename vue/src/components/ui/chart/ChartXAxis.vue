<script setup lang="ts" generic="Datum extends Record<string, unknown>">
import { computed } from "vue"
import VisAxis from "@unovis/vue/components/axis"

import { useChart } from "./context"

defineOptions({ inheritAttrs: false })

// Other VisAxis props (numTicks, tickTextAngle…) pass through.
const props = defineProps<{
  /** Plot the x as the index (`:x="(_, i) => i"`) and name each tick from this field. */
  dataKey?: keyof Datum & string
  /** The chart data, needed with dataKey. */
  data?: Datum[]
  tickFormat?: (tick: number | Date, i: number) => string
  /** Hides the labels; grid lines from ChartGrid stay. */
  hide?: boolean
}>()

const { grid } = useChart()

const tickFormat = computed(() => {
  if (props.hide) return () => ""
  if (props.tickFormat) return props.tickFormat
  if (props.dataKey && props.data) {
    const { dataKey, data } = props
    return (tick: number | Date) => String(data[Math.round(Number(tick))]?.[dataKey] ?? "")
  }
  return undefined
})

const tickValues = computed(() => (props.dataKey && props.data ? props.data.map((_, i) => i) : undefined))
</script>

<template>
  <VisAxis
    type="x"
    :grid-line="grid.vertical"
    :tick-line="false"
    :domain-line="false"
    :tick-padding="8"
    tick-text-color="var(--muted-foreground)"
    tick-text-font-size="12px"
    :tick-format="tickFormat"
    :tick-values="tickValues"
    v-bind="$attrs"
  />
</template>
