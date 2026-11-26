<script setup lang="ts">
import { DropdownMenuTrigger, useForwardProps, type DropdownMenuTriggerProps } from "reka-ui"

const props = defineProps<DropdownMenuTriggerProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DropdownMenuTrigger v-slot="slotProps" data-slot="dropdown-menu-trigger" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DropdownMenuTrigger>
</template>
