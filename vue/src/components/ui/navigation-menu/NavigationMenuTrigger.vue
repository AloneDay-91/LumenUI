<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { NavigationMenuTrigger, type NavigationMenuTriggerProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { navigationMenuTriggerStyle } from "./variants"

const props = defineProps<NavigationMenuTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
    v-bind="delegated"
    :class="cn(navigationMenuTriggerStyle(), props.class)"
  >
    <slot />
  </NavigationMenuTrigger>
</template>
