<script setup lang="ts">
import { ContextMenuRoot, useForwardPropsEmits, type ContextMenuRootEmits, type ContextMenuRootProps } from "reka-ui"

const props = defineProps<ContextMenuRootProps>()
const emits = defineEmits<ContextMenuRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ContextMenuRoot v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </ContextMenuRoot>
</template>
