<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { useCarousel } from "./context"

defineOptions({ inheritAttrs: false })

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { carouselRef, orientation } = useCarousel()
</script>

<template>
  <div ref="carouselRef" data-slot="carousel-content" :class="cn('overflow-hidden', props.class)">
    <div
      :class="cn('flex', orientation === 'horizontal' ? '-ml-3' : 'h-full -mt-3 flex-col')"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
