<script setup lang="ts">
import { HoverCardRoot, useForwardPropsEmits, type HoverCardRootEmits, type HoverCardRootProps } from "reka-ui"

// Base UI's PreviewCard opens after 600ms and closes after 300ms.
const props = withDefaults(defineProps<HoverCardRootProps>(), {
  open: undefined,
  openDelay: 600,
  closeDelay: 300,
})
const emits = defineEmits<HoverCardRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <HoverCardRoot v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </HoverCardRoot>
</template>
