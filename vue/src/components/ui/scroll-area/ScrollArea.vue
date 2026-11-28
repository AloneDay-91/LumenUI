<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  type ScrollAreaRootProps,
} from "reka-ui"

import { cn } from "@/lib/utils"

// "auto" matches Base UI: the scrollbar shows whenever the content overflows.
const props = withDefaults(defineProps<ScrollAreaRootProps & { class?: HTMLAttributes["class"] }>(), {
  type: "auto",
})

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <ScrollAreaRoot data-slot="scroll-area" v-bind="delegated" :class="cn('relative', props.class)">
    <ScrollAreaViewport
      data-slot="scroll-area-viewport"
      class="size-full scroll-fade overflow-hidden rounded-[inherit]"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      class="m-1 flex w-1.5 justify-center rounded-full bg-transparent"
    >
      <ScrollAreaThumb class="w-full rounded-full bg-foreground/20" />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
