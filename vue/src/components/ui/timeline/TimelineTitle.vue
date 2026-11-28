<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <p data-slot="timeline-title" :class="cn('text-sm font-medium text-foreground', props.class)">
    <slot />
  </p>
</template>
