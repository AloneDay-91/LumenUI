<script setup lang="ts">
import { DrawerPortal, type DrawerPortalProps } from "reka-ui"

const props = defineProps<DrawerPortalProps>()
</script>

<template>
  <DrawerPortal v-bind="props">
    <slot />
  </DrawerPortal>
</template>
