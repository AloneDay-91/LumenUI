<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="card-title" :class="cn('font-heading text-sm font-medium', props.class)">
    <slot />
  </div>
</template>
