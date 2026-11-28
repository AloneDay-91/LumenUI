<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { labelColorClass, type DataListColor } from "."

const props = withDefaults(
  defineProps<{
    color?: DataListColor
    highContrast?: boolean
    width?: string
    minWidth?: string
    maxWidth?: string
    class?: HTMLAttributes["class"]
  }>(),
  { color: "gray", highContrast: false }
)
// A `style` attribute falls through after the size style below, so it wins, as in React.
</script>

<template>
  <dt
    data-slot="data-list-label"
    :data-color="color"
    :data-high-contrast="highContrast ? '' : undefined"
    :style="{ width, minWidth, maxWidth }"
    :class="
      cn(
        'm-0 flex min-w-0 items-baseline text-xs font-normal',
        labelColorClass[color][highContrast ? 'contrast' : 'soft'],
        'group-data-[orientation=horizontal]/data-list:min-w-[7.5rem] group-data-[orientation=horizontal]/data-list:shrink-0',
        'group-data-[size=lg]/data-list:text-sm',
        props.class,
      )
    "
  >
    <slot />
  </dt>
</template>
