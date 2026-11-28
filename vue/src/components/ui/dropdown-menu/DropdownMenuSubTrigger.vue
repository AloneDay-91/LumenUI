<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ChevronRight } from "@lucide/vue"
import { DropdownMenuSubTrigger, useForwardProps, type DropdownMenuSubTriggerProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { dropdownMenuSubTriggerClassName } from "./styles"

const props = defineProps<
  DropdownMenuSubTriggerProps & { class?: HTMLAttributes["class"]; inset?: boolean }
>()

const delegated = computed(() => {
  const { class: _class, inset: _inset, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <DropdownMenuSubTrigger
    data-slot="dropdown-menu-sub-trigger"
    :data-inset="inset ? '' : undefined"
    v-bind="forwarded"
    :class="cn(dropdownMenuSubTriggerClassName, props.class)"
  >
    <slot />
    <ChevronRight class="ml-auto" />
  </DropdownMenuSubTrigger>
</template>
