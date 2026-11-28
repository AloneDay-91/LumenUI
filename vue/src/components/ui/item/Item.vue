<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { itemVariants, type ItemVariantProps } from "."

interface Props extends PrimitiveProps {
  variant?: ItemVariantProps["variant"]
  size?: ItemVariantProps["size"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  variant: "default",
  size: "default",
})
</script>

<template>
  <Primitive
    data-slot="item"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(itemVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
