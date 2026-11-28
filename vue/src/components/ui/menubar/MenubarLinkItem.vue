<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { MenubarItem, useForwardPropsEmits, type MenubarItemEmits, type MenubarItemProps } from "reka-ui"

import { dropdownMenuItemClassName } from "@/components/ui/dropdown-menu/styles"
import { cn } from "@/lib/utils"

const props = defineProps<
  Omit<MenubarItemProps, "as"> & { class?: HTMLAttributes["class"]; href: string; inset?: boolean }
>()
const emits = defineEmits<MenubarItemEmits>()

const delegated = computed(() => {
  const { class: _class, inset: _inset, href: _href, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <MenubarItem
    data-slot="dropdown-menu-link-item"
    as="a"
    :href="href"
    :data-inset="inset ? '' : undefined"
    v-bind="forwarded"
    :class="cn(dropdownMenuItemClassName, 'text-popover-foreground no-underline', props.class)"
  >
    <slot />
  </MenubarItem>
</template>
