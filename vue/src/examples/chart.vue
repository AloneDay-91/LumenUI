<script setup lang="ts">
import VisStackedBar from "@unovis/vue/components/stacked-bar"
import VisXYContainer from "@unovis/vue/containers/xy-container"

import { Chart, ChartGrid, ChartTooltip, ChartXAxis, ChartYAxis, chartColor, type ChartConfig } from "@/components/ui/chart"

type Row = { month: string; readers: number }

const readers: Row[] = [
  { month: "Jan", readers: 420 },
  { month: "Feb", readers: 380 },
  { month: "Mar", readers: 510 },
  { month: "Apr", readers: 460 },
  { month: "May", readers: 590 },
  { month: "Jun", readers: 640 },
]

const config: ChartConfig = { readers: { label: "Readers" } }
</script>

<template>
  <Chart :config="config">
    <VisXYContainer :data="readers" :margin="{ top: 8, right: 8, left: 0, bottom: 0 }">
      <ChartGrid />
      <ChartXAxis :data="readers" data-key="month" />
      <ChartYAxis hide />
      <ChartTooltip label-key="month" />
      <VisStackedBar
        :x="(_: Row, i: number) => i"
        :y="(d: Row) => d.readers"
        :color="chartColor('readers')"
        :rounded-corners="6"
        :bar-max-width="28"
      />
    </VisXYContainer>
  </Chart>
</template>
