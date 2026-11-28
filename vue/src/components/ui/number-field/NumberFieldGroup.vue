<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"

// Reka has no NumberField group part: a plain wrapper that lays out the input and its buttons.
const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), {
  as: "div",
})
</script>

<template>
  <Primitive
    data-slot="number-field-group"
    role="group"
    :as="as"
    :as-child="asChild"
    :class="cn('flex', props.class)"
  >
    <slot />
  </Primitive>
</template>
