<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="empty" :class="cn('flex w-full flex-col items-center justify-center gap-4 rounded-[min(var(--radius-4xl),24px)] border border-dashed border-border px-6 py-12 text-center', props.class)">
    <slot />
  </div>
</template>
