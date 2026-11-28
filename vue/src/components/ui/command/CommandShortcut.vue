<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { Kbd, type KbdVariantProps } from "@/components/ui/kbd"

const props = defineProps<{
  size?: KbdVariantProps["size"]
  variant?: KbdVariantProps["variant"]
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Kbd data-slot="command-shortcut" :size="size" :variant="variant" :class="cn('ms-auto', props.class)">
    <slot />
  </Kbd>
</template>
