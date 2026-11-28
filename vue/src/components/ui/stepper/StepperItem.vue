<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import type { StepStatus } from "."

const props = withDefaults(defineProps<{ status?: StepStatus; class?: HTMLAttributes["class"] }>(), {
  status: "upcoming",
})

const itemClassName = [
  "group/step relative flex min-w-0 before:content-[''] after:content-['']",
  "group-data-[orientation=vertical]/stepper:before:hidden",
  // Horizontal: circle on a shared baseline, copy underneath.
  // ::before / ::after are the rails — they stop short of the circle.
  "group-data-[orientation=horizontal]/stepper:flex-1 group-data-[orientation=horizontal]/stepper:flex-col group-data-[orientation=horizontal]/stepper:items-center group-data-[orientation=horizontal]/stepper:gap-2.5",
  "group-data-[orientation=horizontal]/stepper:before:absolute group-data-[orientation=horizontal]/stepper:before:top-3.5 group-data-[orientation=horizontal]/stepper:before:right-[calc(50%+1rem)] group-data-[orientation=horizontal]/stepper:before:left-0 group-data-[orientation=horizontal]/stepper:before:h-px group-data-[orientation=horizontal]/stepper:before:bg-border",
  "group-data-[orientation=horizontal]/stepper:after:absolute group-data-[orientation=horizontal]/stepper:after:top-3.5 group-data-[orientation=horizontal]/stepper:after:left-[calc(50%+1rem)] group-data-[orientation=horizontal]/stepper:after:right-0 group-data-[orientation=horizontal]/stepper:after:h-px group-data-[orientation=horizontal]/stepper:after:bg-border",
  "group-data-[orientation=horizontal]/stepper:first:before:hidden group-data-[orientation=horizontal]/stepper:last:after:hidden",
  "group-data-[orientation=horizontal]/stepper:data-[status=complete]:before:bg-foreground group-data-[orientation=horizontal]/stepper:data-[status=complete]:after:bg-foreground group-data-[orientation=horizontal]/stepper:data-[status=current]:before:bg-foreground",
  // Vertical: 1.75rem track for the circle, rail centered on that track.
  "group-data-[orientation=vertical]/stepper:grid group-data-[orientation=vertical]/stepper:grid-cols-[1.75rem_minmax(0,1fr)] group-data-[orientation=vertical]/stepper:gap-x-3 group-data-[orientation=vertical]/stepper:items-start group-data-[orientation=vertical]/stepper:pb-8 group-data-[orientation=vertical]/stepper:last:pb-0",
  "group-data-[orientation=vertical]/stepper:after:absolute group-data-[orientation=vertical]/stepper:after:top-7 group-data-[orientation=vertical]/stepper:after:bottom-0 group-data-[orientation=vertical]/stepper:after:left-3.5 group-data-[orientation=vertical]/stepper:after:-translate-x-1/2 group-data-[orientation=vertical]/stepper:after:w-px group-data-[orientation=vertical]/stepper:after:bg-border",
  "group-data-[orientation=vertical]/stepper:last:after:hidden",
  "group-data-[orientation=vertical]/stepper:data-[status=complete]:after:bg-foreground",
]
</script>

<template>
  <li
    data-slot="stepper-item"
    :data-status="status"
    :aria-current="status === 'current' ? 'step' : undefined"
    :class="cn(itemClassName, props.class)"
  >
    <slot />
  </li>
</template>
