<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { DrawerViewport, type DrawerViewportProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<DrawerViewportProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <DrawerViewport
    data-slot="drawer-viewport"
    v-bind="delegated"
    :class="cn('pointer-events-none fixed inset-0 z-50 flex', props.class)"
  >
    <slot />
  </DrawerViewport>
</template>
