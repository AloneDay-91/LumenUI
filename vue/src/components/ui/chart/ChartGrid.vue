<script setup lang="ts">
import { onUnmounted, watchEffect } from "vue"

import { useChart } from "./context"

// Unovis draws grid lines from the axes: horizontal lines come from ChartYAxis
// (keep one, even with `hide`), vertical lines from ChartXAxis.
const props = withDefaults(defineProps<{ horizontal?: boolean; vertical?: boolean }>(), {
  horizontal: true,
  vertical: false,
})

const { grid } = useChart()

watchEffect(() => {
  grid.horizontal = props.horizontal
  grid.vertical = props.vertical
})

onUnmounted(() => {
  grid.horizontal = false
  grid.vertical = false
})
</script>

<template>
  <slot />
</template>
