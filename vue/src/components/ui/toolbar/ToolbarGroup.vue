<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"

// Reka has no plain Toolbar group (only ToolbarToggleGroup): a role="group" wrapper.
// The buttons inside still join the toolbar's arrow-key navigation.
const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), {
  as: "div",
})
</script>

<template>
  <Primitive
    data-slot="toolbar-group"
    role="group"
    :as="as"
    :as-child="asChild"
    :class="cn('flex items-center gap-0.5', props.class)"
  >
    <slot />
  </Primitive>
</template>
