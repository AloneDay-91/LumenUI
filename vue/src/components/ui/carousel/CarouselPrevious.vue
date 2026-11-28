<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronLeft, ChevronUp } from "@lucide/vue"

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

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    type="button"
    :variant="variant"
    :size="size"
    data-slot="carousel-previous"
    aria-label="Previous slide"
    :class="props.class"
    :disabled="!canScrollPrev"
    @click="scrollPrev"
  >
    <slot>
      <ChevronLeft v-if="orientation === 'horizontal'" />
      <ChevronUp v-else />
    </slot>
  </Button>
</template>
