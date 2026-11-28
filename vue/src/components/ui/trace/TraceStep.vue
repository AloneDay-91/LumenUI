<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import TraceStatusIcon from "./TraceStatusIcon.vue"
import { statusLabel, type TraceStatus } from "./context"

const props = withDefaults(
  defineProps<{
    status?: TraceStatus
    title?: string
    description?: string
    class?: HTMLAttributes["class"]
  }>(),
  { status: "done" },
)
</script>

<template>
  <li
    data-slot="trace-step"
    :data-status="status"
    :class="
      cn(
        'relative flex gap-2.5 pb-3 text-xs last:pb-0',
        // The rail joins this step's mark to the next one.
        'before:absolute before:start-[6.5px] before:top-5 before:bottom-0 before:w-px before:bg-border last:before:hidden',
        props.class,
      )
    "
  >
    <span class="mt-0.5 flex size-3.5 shrink-0 items-center justify-center bg-background">
      <TraceStatusIcon :status="status" />
    </span>
    <div class="flex min-w-0 flex-1 flex-col gap-1">
      <span
        :class="
          cn(
            'leading-[1.125rem] text-foreground',
            status === 'pending' && 'text-muted-foreground',
            status === 'done' && 'text-muted-foreground',
            status === 'running' && 'shimmer',
          )
        "
      >
        <slot name="title">{{ title }}</slot>
      </span>
      <span v-if="$slots.description || description" class="text-muted-foreground">
        <slot name="description">{{ description }}</slot>
      </span>
      <slot />
    </div>
    <span class="sr-only">, {{ statusLabel[status] }}</span>
  </li>
</template>
