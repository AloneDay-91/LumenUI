<script setup lang="ts">
/**
 * Renders the popup inside the NavigationMenu element by default, as the React version
 * does. Pass `container` (an element or a selector) to teleport it elsewhere.
 */
const props = defineProps<{
  container?: string | HTMLElement | null
  disabled?: boolean
  defer?: boolean
}>()
</script>

<template>
  <Teleport v-if="props.container && !props.disabled" :to="props.container" :defer="props.defer">
    <slot />
  </Teleport>
  <slot v-else />
</template>
