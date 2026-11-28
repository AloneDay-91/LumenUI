<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/** A row of prompts that scrolls sideways on narrow screens. */
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="suggestions"
    role="group"
    :class="
      cn(
        'flex w-full gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
