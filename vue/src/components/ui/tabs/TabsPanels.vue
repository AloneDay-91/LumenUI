<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="tabs-panels" :class="cn('relative min-h-16 overflow-hidden', props.class)">
    <slot />
  </div>
</template>
