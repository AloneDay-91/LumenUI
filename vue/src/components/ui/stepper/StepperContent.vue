<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="stepper-content"
    :class="cn('min-w-0 space-y-0.5', 'group-data-[orientation=horizontal]/stepper:text-center', props.class)"
  >
    <slot />
  </div>
</template>
