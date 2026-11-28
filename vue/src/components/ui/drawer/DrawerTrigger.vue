<script setup lang="ts">
import { DrawerTrigger, useForwardProps, type DrawerTriggerProps } from "reka-ui"

const props = defineProps<DrawerTriggerProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DrawerTrigger v-slot="slotProps" data-slot="drawer-trigger" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DrawerTrigger>
</template>
