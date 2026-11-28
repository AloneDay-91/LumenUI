<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="stat-value" :class="cn('font-heading text-2xl leading-none font-medium tracking-tight tabular-nums', props.class)">
    <slot />
  </div>
</template>
