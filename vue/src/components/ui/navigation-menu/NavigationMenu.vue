<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  NavigationMenuRoot,
  useForwardPropsEmits,
  type NavigationMenuRootEmits,
  type NavigationMenuRootProps,
} from "reka-ui"

import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<NavigationMenuRootProps & { class?: HTMLAttributes["class"] }>(), {
  // Base UI's `delay` of 0: panels open as soon as the pointer reaches a trigger.
  delayDuration: 0,
  as: "nav",
  orientation: "horizontal",
  skipDelayDuration: 300,
  unmountOnHide: true,
})
const emits = defineEmits<NavigationMenuRootEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <NavigationMenuRoot
    v-slot="slotProps"
    data-slot="navigation-menu"
    v-bind="forwarded"
    :class="cn('group/navigation-menu relative flex w-full flex-col', props.class)"
  >
    <slot v-bind="slotProps" />
  </NavigationMenuRoot>
</template>
