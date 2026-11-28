<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { useCarousel } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { orientation } = useCarousel()
</script>

<template>
  <div
    data-slot="carousel-item"
    :class="
      cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-3' : 'pt-3',
        props.class,
      )
    "
  >
    <!-- Keeps a card ring or border inside the clipped viewport. -->
    <div class="h-full p-0.5"><slot /></div>
  </div>
</template>
