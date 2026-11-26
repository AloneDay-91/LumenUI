<script setup lang="ts">
import { AlertDialogRoot, useForwardPropsEmits, type AlertDialogProps, type AlertDialogEmits } from "reka-ui"

const props = defineProps<AlertDialogProps>()
const emits = defineEmits<AlertDialogEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AlertDialogRoot v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </AlertDialogRoot>
</template>
