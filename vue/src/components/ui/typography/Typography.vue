<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { typographyVariants, type TypographyVariantProps } from "."

import "./typography.css"

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      variant?: TypographyVariantProps["variant"]
      class?: HTMLAttributes["class"]
    }
  >(),
  { as: "div", variant: "article" },
)
</script>

<template>
  <Primitive
    data-slot="typography"
    :data-variant="variant"
    :as="as"
    :as-child="asChild"
    :class="cn(typographyVariants({ variant }), props.class)"
  >
    <slot />
  </Primitive>
</template>
