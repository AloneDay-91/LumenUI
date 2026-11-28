<script setup lang="ts">
import { DialogClose, useForwardProps, type DialogCloseProps } from "reka-ui"

const props = defineProps<DialogCloseProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DialogClose v-slot="slotProps" data-slot="dialog-close" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DialogClose>
</template>
