<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="timeline-separator" aria-hidden="true" :class="cn('absolute top-4 bottom-0 left-[4.5px] w-px bg-border group-last/timeline-item:hidden', props.class)">
    <slot />
  </div>
</template>
