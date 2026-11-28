<script setup lang="ts">
import { computed, provide, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { kbdGroupVariants, kbdSizeKey, type KbdGroupVariantProps } from "."

const props = defineProps<{
  size?: KbdGroupVariantProps["size"]
  class?: HTMLAttributes["class"]
}>()

provide(
  kbdSizeKey,
  computed(() => props.size ?? undefined)
)
</script>

<template>
  <span data-slot="kbd-group" :class="cn(kbdGroupVariants({ size }), props.class)">
    <slot />
  </span>
</template>
