<script setup lang="ts">
import { Heatmap, type HeatmapValue } from "@/components/ui/heatmap"

function activity(): HeatmapValue[] {
  const out: HeatmapValue[] = []
  const today = new Date()
  // A seeded wave, so the year looks lived in and stays the same per day.
  for (let i = 0; i < 371; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
    const weekday = date.getDay()
    const seed = Math.sin(i * 12.9898) * 43758.5453
    const noise = seed - Math.floor(seed)
    const busy = weekday === 0 || weekday === 6 ? 0.25 : 1
    out.push({ date, value: noise > 0.35 ? Math.round(noise * 10 * busy) : 0 })
  }
  return out
}

const data = activity()
const labels = {
  value: (value: number, date: Date) =>
    `${value} commits on ${date.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" })}`,
}
</script>

<template>
  <Heatmap :data="data" class="max-w-3xl" :labels="labels" />
</template>
