<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { cardVariants, type CardVariantProps } from "."

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    variant?: CardVariantProps["variant"]
    size?: CardVariantProps["size"]
  }>(),
  { variant: "default", size: "default" }
)
</script>

<template>
  <div
    data-slot="card"
    :data-size="size"
    :data-variant="variant"
    :class="cn(cardVariants({ size, variant }), props.class)"
  >
    <slot />
  </div>
</template>
