<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { DrawerBackdrop, type DrawerBackdropProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { backdropClassName } from "@/components/ui/styles"

const props = defineProps<DrawerBackdropProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <DrawerBackdrop
    data-slot="drawer-backdrop"
    v-bind="delegated"
    :class="
      cn(
        backdropClassName,
        'opacity-[calc(1-var(--drawer-swipe-progress,0))] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0',
        props.class,
      )
    "
  />
</template>
