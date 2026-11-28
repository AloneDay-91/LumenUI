<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { itemMediaVariants, type ItemMediaVariantProps } from "."

const props = withDefaults(
  defineProps<{ variant?: ItemMediaVariantProps["variant"]; class?: HTMLAttributes["class"] }>(),
  { variant: "default" }
)
</script>

<template>
  <div data-slot="item-media" :data-variant="variant" :class="cn(itemMediaVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
