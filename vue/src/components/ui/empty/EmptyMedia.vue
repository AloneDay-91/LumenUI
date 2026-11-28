<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { emptyMediaVariants, type EmptyMediaVariants } from "."

const props = withDefaults(
  defineProps<{ variant?: EmptyMediaVariants["variant"]; class?: HTMLAttributes["class"] }>(),
  { variant: "icon" },
)
</script>

<template>
  <div data-slot="empty-media" :data-variant="variant" :class="cn(emptyMediaVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
