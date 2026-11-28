<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{
  count: number
  /** Accessible name. Defaults to "<count> more". */
  label?: string
  class?: HTMLAttributes["class"]
}>()

const ariaLabel = computed(() => props.label ?? `${props.count} more`)
</script>

<template>
  <span
    data-slot="avatar-group-count"
    :aria-label="ariaLabel"
    :class="
      cn(
        'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-[11px] font-medium text-secondary-foreground ring-2 ring-background tabular-nums',
        props.class,
      )
    "
  >
    <span aria-hidden="true">+{{ count }}</span>
  </span>
</template>
