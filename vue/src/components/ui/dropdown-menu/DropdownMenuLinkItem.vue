<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  DropdownMenuItem,
  useForwardPropsEmits,
  type DropdownMenuItemEmits,
  type DropdownMenuItemProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { dropdownMenuItemClassName } from "./styles"

const props = defineProps<
  Omit<DropdownMenuItemProps, "as"> & {
    class?: HTMLAttributes["class"]
    href: string
    inset?: boolean
  }
>()
const emits = defineEmits<DropdownMenuItemEmits>()

const delegated = computed(() => {
  const { class: _class, inset: _inset, href: _href, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <!-- Renders an <a>: the browser follows the link and the menu closes on select. -->
  <DropdownMenuItem
    data-slot="dropdown-menu-link-item"
    as="a"
    :href="href"
    :data-inset="inset ? '' : undefined"
    v-bind="forwarded"
    :class="cn(dropdownMenuItemClassName, 'text-popover-foreground no-underline', props.class)"
  >
    <slot />
  </DropdownMenuItem>
</template>
