<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  NavigationMenuContent,
  useForwardPropsEmits,
  type NavigationMenuContentEmits,
  type NavigationMenuContentProps,
} from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<NavigationMenuContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<NavigationMenuContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <NavigationMenuContent
    data-slot="navigation-menu-content"
    v-bind="forwarded"
    :class="cn('w-full', props.class)"
  >
    <slot />
  </NavigationMenuContent>
</template>
