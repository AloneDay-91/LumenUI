<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { MenubarItem, useForwardPropsEmits, type MenubarItemEmits, type MenubarItemProps } from "reka-ui"

import { dropdownMenuItemClassName } from "@/components/ui/dropdown-menu/styles"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<
    MenubarItemProps & {
      class?: HTMLAttributes["class"]
      inset?: boolean
      variant?: "default" | "destructive"
    }
  >(),
  { variant: "default" }
)
const emits = defineEmits<MenubarItemEmits>()

const delegated = computed(() => {
  const { class: _class, inset: _inset, variant: _variant, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <MenubarItem
    data-slot="dropdown-menu-item"
    :data-inset="inset ? '' : undefined"
    :data-variant="variant"
    v-bind="forwarded"
    :class="cn(dropdownMenuItemClassName, props.class)"
  >
    <slot />
  </MenubarItem>
</template>
