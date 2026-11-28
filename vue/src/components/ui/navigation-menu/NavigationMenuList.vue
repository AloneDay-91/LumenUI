<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { NavigationMenuList, type NavigationMenuListProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<NavigationMenuListProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <NavigationMenuList
    data-slot="navigation-menu-list"
    v-bind="delegated"
    :class="cn('flex items-center gap-8', props.class)"
  >
    <slot />
  </NavigationMenuList>
</template>
