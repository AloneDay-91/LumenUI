<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { NavigationMenuItem, type NavigationMenuItemProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<NavigationMenuItemProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <NavigationMenuItem
    data-slot="navigation-menu-item"
    v-bind="delegated"
    :class="cn('flex items-center', props.class)"
  >
    <slot />
  </NavigationMenuItem>
</template>
