<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ChevronRight } from "@lucide/vue"
import { MenubarSubTrigger, useForwardProps, type MenubarSubTriggerProps } from "reka-ui"

import { dropdownMenuSubTriggerClassName } from "@/components/ui/dropdown-menu/styles"
import { cn } from "@/lib/utils"

const props = defineProps<MenubarSubTriggerProps & { class?: HTMLAttributes["class"]; inset?: boolean }>()

const delegated = computed(() => {
  const { class: _class, inset: _inset, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <MenubarSubTrigger
    data-slot="dropdown-menu-sub-trigger"
    :data-inset="inset ? '' : undefined"
    v-bind="forwarded"
    :class="cn(dropdownMenuSubTriggerClassName, props.class)"
  >
    <slot />
    <ChevronRight class="ml-auto" />
  </MenubarSubTrigger>
</template>
