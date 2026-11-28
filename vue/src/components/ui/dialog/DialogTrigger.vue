<script setup lang="ts">
import { DialogTrigger, useForwardProps, type DialogTriggerProps } from "reka-ui"

const props = defineProps<DialogTriggerProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DialogTrigger v-slot="slotProps" data-slot="dialog-trigger" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DialogTrigger>
</template>
