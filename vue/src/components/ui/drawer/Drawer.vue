<script setup lang="ts">
import { DrawerRoot, useForwardPropsEmits, type DrawerRootEmits, type DrawerRootProps } from "reka-ui"

const props = defineProps<DrawerRootProps>()
const emits = defineEmits<DrawerRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerRoot v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DrawerRoot>
</template>
