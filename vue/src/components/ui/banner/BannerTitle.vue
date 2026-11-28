<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span data-slot="banner-title" :class="cn('font-medium text-foreground', props.class)">
    <slot />
  </span>
</template>
