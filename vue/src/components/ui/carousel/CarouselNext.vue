<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronRight, ChevronDown } from "@lucide/vue"

import { Button, type ButtonVariantProps } from "@/components/ui/button"
import { useCarousel } from "./context"

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariantProps["variant"]
    size?: ButtonVariantProps["size"]
    class?: HTMLAttributes["class"]
  }>(),
  { variant: "outline", size: "icon" },
)

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    type="button"
    :variant="variant"
    :size="size"
    data-slot="carousel-next"
    aria-label="Next slide"
    :class="props.class"
    :disabled="!canScrollNext"
    @click="scrollNext"
  >
    <slot>
      <ChevronRight v-if="orientation === 'horizontal'" />
      <ChevronDown v-else />
    </slot>
  </Button>
</template>
