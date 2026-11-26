<script setup lang="ts">
import { TooltipProvider, useForwardProps, type TooltipProviderProps } from "reka-ui"

const props = defineProps<TooltipProviderProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <TooltipProvider v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </TooltipProvider>
</template>
