<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <li data-slot="timeline-item" :class="cn('group/timeline-item relative grid grid-cols-[auto_1fr] gap-x-3 pb-6 last:pb-0', props.class)">
    <slot />
  </li>
</template>
