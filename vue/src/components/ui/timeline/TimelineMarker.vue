<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="timeline-marker" :class="cn('relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full bg-foreground ring-4 ring-background group-last/timeline-item:mt-1.5', props.class)">
    <slot />
  </div>
</template>
