<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { useCarousel } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { scrollSnaps, selectedIndex, scrollTo } = useCarousel()
</script>

<template>
  <div
    data-slot="carousel-dots"
    role="tablist"
    aria-label="Slides"
    :class="cn('flex items-center justify-center gap-1.5', props.class)"
  >
    <button
      v-for="(_, index) in scrollSnaps"
      :key="index"
      type="button"
      role="tab"
      :aria-label="`Go to slide ${index + 1}`"
      :aria-selected="index === selectedIndex"
      :class="
        cn(
          'h-1.5 rounded-full bg-foreground/20 transition-[width,background-color] outline-none focus-visible:ring-3 focus-visible:ring-ring/30',
          index === selectedIndex ? 'w-4 bg-foreground' : 'w-1.5',
        )
      "
      @click="scrollTo(index)"
    />
  </div>
</template>
