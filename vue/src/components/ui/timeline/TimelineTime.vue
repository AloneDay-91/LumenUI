<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <time data-slot="timeline-time" :class="cn('font-mono text-xs text-muted-foreground', props.class)">
    <slot />
  </time>
</template>
