<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <h2 data-slot="popover-title" :class="cn('text-sm font-medium', props.class)">
    <slot />
  </h2>
</template>
