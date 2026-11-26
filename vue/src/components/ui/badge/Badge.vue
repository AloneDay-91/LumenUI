<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { badgeColorClass, badgeVariants, type BadgeColor, type BadgeVariantProps } from "."

interface Props extends PrimitiveProps {
  variant?: BadgeVariantProps["variant"]
  color?: BadgeColor
  highContrast?: boolean
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "span",
  variant: "default",
  highContrast: false,
})
</script>

<template>
  <Primitive
    data-slot="badge"
    :as="as"
    :as-child="asChild"
    :data-variant="variant"
    :data-color="color"
    :class="
      cn(
        badgeVariants({ variant: color ? 'ghost' : variant }),
        color ? badgeColorClass[color][highContrast ? 'contrast' : 'soft'] : null,
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
