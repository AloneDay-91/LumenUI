<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/** A labelled block inside a card trace: Input, Output, Error. */
const props = defineProps<{ label?: string; class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="trace-section"
    :class="cn('space-y-1.5 px-3 py-2.5 [&+&]:border-t [&+&]:border-border', props.class)"
  >
    <div v-if="$slots.label || label" class="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
      <slot name="label">{{ label }}</slot>
    </div>
    <slot />
  </div>
</template>
