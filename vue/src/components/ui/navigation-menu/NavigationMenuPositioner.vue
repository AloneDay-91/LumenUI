<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { injectNavigationMenuContext } from "reka-ui"

import { cn } from "@/lib/utils"

/**
 * Pins the popup full width under the menu bar. `side`, `align`, `sideOffset` and
 * `collisionPadding` are written as data attributes only: like in React, the
 * classes below override any floating placement.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    side?: "top" | "right" | "bottom" | "left"
    align?: "start" | "center" | "end"
    sideOffset?: number
    collisionPadding?: number
  }>(),
  { side: "bottom", align: "start", sideOffset: 0, collisionPadding: 0 },
)

const menu = injectNavigationMenuContext()
const open = computed(() => !!menu.modelValue.value)
</script>

<template>
  <div
    data-slot="navigation-menu-positioner"
    :data-side="side"
    :data-align="align"
    :data-state="open ? 'open' : 'closed'"
    :class="cn('absolute! top-full! left-0! z-50 w-full max-w-none transform-none!', props.class)"
  >
    <slot />
  </div>
</template>
