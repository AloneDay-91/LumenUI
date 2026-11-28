<script setup lang="ts" generic="Datum extends Record<string, unknown>">
import { h, render } from "vue"
import VisCrosshair from "@unovis/vue/components/crosshair"
import VisTooltip from "@unovis/vue/components/tooltip"

import ChartTooltipContent from "./ChartTooltipContent.vue"
import { chartColor, useChart, type ChartTooltipPayload } from "./context"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  /** Field of the datum shown as the tooltip heading, like the category on the x axis. */
  labelKey?: keyof Datum & string
  /** Turns the datum into the heading. Wins over labelKey. */
  labelFormatter?: (datum: Datum) => string
  /** Series to list. Defaults to every key of the Chart config. */
  keys?: (keyof Datum & string)[]
}>()

const { config } = useChart()

function payloadOf(datum: Datum): ChartTooltipPayload[] {
  const keys = props.keys ?? Object.keys(config.value)
  return keys
    .filter((key) => datum[key] !== undefined)
    .map((key) => ({ dataKey: key, name: key, value: datum[key], color: chartColor(key) }))
}

// Unovis takes the tooltip as HTML: render the Vue content off-screen and hand over its markup.
function template(datum: Datum) {
  if (!datum) return ""
  const label = props.labelFormatter
    ? props.labelFormatter(datum)
    : props.labelKey
      ? String(datum[props.labelKey] ?? "")
      : undefined
  const el = document.createElement("div")
  render(h(ChartTooltipContent, { active: true, payload: payloadOf(datum), label, config: config.value }), el)
  const html = el.innerHTML
  render(null, el)
  return html
}

function circleColor(_datum: Datum, i: number) {
  const keys = props.keys ?? Object.keys(config.value)
  return chartColor(keys[i % Math.max(1, keys.length)] ?? "")
}
</script>

<template>
  <!-- Unovis puts its tooltip above the plot (z-index 999999); the box is see-through so ChartTooltipContent draws the card. -->
  <VisTooltip />
  <VisCrosshair :template="template" :color="circleColor" v-bind="$attrs" />
</template>
