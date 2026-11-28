<script setup lang="ts">
import type { HTMLAttributes } from "vue"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <nav data-slot="breadcrumb" aria-label="Breadcrumb" :class="props.class">
    <slot />
  </nav>
</template>
