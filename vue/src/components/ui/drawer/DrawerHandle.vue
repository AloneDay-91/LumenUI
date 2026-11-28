<script setup lang="ts">
import type { HTMLAttributes } from "vue"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="drawer-handle" aria-hidden="true" :class="props.class">
    <slot />
  </div>
</template>
