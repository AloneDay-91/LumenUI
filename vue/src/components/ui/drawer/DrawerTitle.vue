<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { DrawerTitle, useForwardProps, type DrawerTitleProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<DrawerTitleProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <DrawerTitle data-slot="drawer-title" v-bind="forwarded" :class="cn('text-sm font-medium', props.class)">
    <slot />
  </DrawerTitle>
</template>
