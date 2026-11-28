<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <ul data-slot="pagination-content" :class="cn('flex items-center gap-1', props.class)">
    <slot />
  </ul>
</template>
