<script setup lang="ts">
import { AlertDialogTrigger, useForwardProps, type AlertDialogTriggerProps } from "reka-ui"

const props = defineProps<AlertDialogTriggerProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <AlertDialogTrigger v-slot="slotProps" data-slot="alert-dialog-trigger" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </AlertDialogTrigger>
</template>
