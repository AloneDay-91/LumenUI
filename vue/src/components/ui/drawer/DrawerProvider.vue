<script setup lang="ts">
import { DrawerProvider } from "reka-ui"
</script>

<template>
  <DrawerProvider v-slot="slotProps">
    <slot v-bind="slotProps" />
  </DrawerProvider>
</template>
