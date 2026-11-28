<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { containerVariants, type ContainerVariantProps } from "."

/** Centered column with a max width and side gutters. */
interface Props extends PrimitiveProps {
  size?: ContainerVariantProps["size"]
  padding?: ContainerVariantProps["padding"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), { as: "div" })
</script>

<template>
  <Primitive
    data-slot="container"
    :data-size="props.size ?? 'lg'"
    :as="as"
    :as-child="asChild"
    :class="cn(containerVariants({ size: props.size, padding: props.padding }), props.class)"
  >
    <slot />
  </Primitive>
</template>
