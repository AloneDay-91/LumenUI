<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), {
  as: "div",
})
</script>

<template>
  <Primitive
    data-slot="otp-field-separator"
    role="separator"
    aria-orientation="horizontal"
    :as="as"
    :as-child="asChild"
    :class="cn('text-muted-foreground', props.class)"
  >
    <slot />
  </Primitive>
</template>
