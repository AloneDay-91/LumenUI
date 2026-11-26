<script setup lang="ts">
import { AlertDialogCancel, useForwardProps, type AlertDialogCancelProps } from "reka-ui"

const props = defineProps<AlertDialogCancelProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <AlertDialogCancel v-slot="slotProps" data-slot="alert-dialog-close" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </AlertDialogCancel>
</template>
