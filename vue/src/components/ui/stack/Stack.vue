<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { stackVariants, type StackVariants } from "."

/** Flex layout on the Lumen spacing steps. Renders a div unless `as` / `as-child` says otherwise. */
const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      direction?: StackVariants["direction"]
      gap?: StackVariants["gap"]
      align?: StackVariants["align"]
      justify?: StackVariants["justify"]
      wrap?: StackVariants["wrap"]
      class?: HTMLAttributes["class"]
    }
  >(),
  { as: "div", wrap: undefined },
)
</script>

<template>
  <Primitive
    data-slot="stack"
    :data-direction="direction ?? 'column'"
    :as="as"
    :as-child="asChild"
    :class="cn(stackVariants({ direction, gap, align, justify, wrap }), props.class)"
  >
    <slot />
  </Primitive>
</template>
