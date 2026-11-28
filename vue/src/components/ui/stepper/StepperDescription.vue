<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <p data-slot="stepper-description" :class="cn('text-xs text-muted-foreground', props.class)">
    <slot />
  </p>
</template>
