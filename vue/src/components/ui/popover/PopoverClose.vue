<script setup lang="ts">
import { PopoverClose, useForwardProps, type PopoverCloseProps } from "reka-ui"

const props = defineProps<PopoverCloseProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <PopoverClose v-slot="slotProps" data-slot="popover-close" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </PopoverClose>
</template>
