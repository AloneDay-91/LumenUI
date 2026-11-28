<script setup lang="ts">
import { DrawerClose, useForwardProps, type DrawerCloseProps } from "reka-ui"

const props = defineProps<DrawerCloseProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DrawerClose v-slot="slotProps" data-slot="drawer-close" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DrawerClose>
</template>
