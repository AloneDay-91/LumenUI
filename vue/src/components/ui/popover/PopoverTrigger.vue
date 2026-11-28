<script setup lang="ts">
import { PopoverTrigger, useForwardProps, type PopoverTriggerProps } from "reka-ui"

const props = defineProps<PopoverTriggerProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <PopoverTrigger v-slot="slotProps" data-slot="popover-trigger" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </PopoverTrigger>
</template>
