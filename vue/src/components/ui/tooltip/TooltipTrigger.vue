<script setup lang="ts">
import { TooltipTrigger, useForwardProps, type TooltipTriggerProps } from "reka-ui"

const props = defineProps<TooltipTriggerProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <TooltipTrigger v-slot="slotProps" data-slot="tooltip-trigger" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </TooltipTrigger>
</template>
