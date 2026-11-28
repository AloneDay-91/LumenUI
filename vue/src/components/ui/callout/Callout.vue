<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import type { CalloutColor, CalloutSize, CalloutVariant } from "."

import "./callout.css"

const props = withDefaults(
  defineProps<{
    variant?: CalloutVariant
    size?: CalloutSize
    color?: CalloutColor
    highContrast?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { variant: "soft", size: "default", color: "gray", highContrast: false }
)
</script>

<template>
  <div
    data-slot="callout"
    :data-variant="variant"
    :data-size="size"
    :data-color="color"
    :data-high-contrast="highContrast ? 'true' : undefined"
    :class="
      cn(
        'group/callout grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-1 rounded-2xl px-4 py-3 text-sm leading-5',
        size === 'sm' && 'gap-x-2 px-3 py-2 text-xs leading-4',
        size === 'lg' && 'gap-x-3.5 px-5 py-4 text-base leading-6',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
