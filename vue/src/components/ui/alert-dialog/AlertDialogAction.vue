<script setup lang="ts">
import { AlertDialogAction, useForwardProps, type AlertDialogActionProps } from "reka-ui"

const props = defineProps<AlertDialogActionProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <AlertDialogAction v-slot="slotProps" data-slot="alert-dialog-action" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </AlertDialogAction>
</template>
