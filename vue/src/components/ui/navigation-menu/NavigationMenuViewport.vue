<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { NavigationMenuViewport, type NavigationMenuViewportProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<NavigationMenuViewportProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <NavigationMenuViewport
    data-slot="navigation-menu-viewport"
    v-bind="delegated"
    :class="cn('relative w-full overflow-hidden', props.class)"
  />
</template>
