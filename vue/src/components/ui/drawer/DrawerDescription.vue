<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { DrawerDescription, useForwardProps, type DrawerDescriptionProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<DrawerDescriptionProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <DrawerDescription data-slot="drawer-description" v-bind="forwarded" :class="cn('text-xs text-muted-foreground', props.class)">
    <slot />
  </DrawerDescription>
</template>
