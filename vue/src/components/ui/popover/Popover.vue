<script setup lang="ts">
import { PopoverRoot, useForwardPropsEmits, type PopoverRootProps, type PopoverRootEmits } from "reka-ui"

const props = defineProps<PopoverRootProps>()
const emits = defineEmits<PopoverRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <PopoverRoot v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </PopoverRoot>
</template>
