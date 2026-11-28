<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"

/**
 * Hidden on screen, read by screen readers. With `focusable`, it shows again
 * while it holds focus — the pattern behind a skip link.
 */
const props = withDefaults(
  defineProps<PrimitiveProps & { focusable?: boolean; class?: HTMLAttributes["class"] }>(),
  { as: "span", focusable: false },
)
</script>

<template>
  <Primitive
    data-slot="visually-hidden"
    :as="as"
    :as-child="asChild"
    :class="cn('sr-only', focusable && 'focus:not-sr-only focus-within:not-sr-only', props.class)"
  >
    <slot />
  </Primitive>
</template>
