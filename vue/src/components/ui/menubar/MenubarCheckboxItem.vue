<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Check } from "@lucide/vue"
import {
  MenubarCheckboxItem,
  MenubarItemIndicator,
  useForwardPropsEmits,
  type MenubarCheckboxItemEmits,
  type MenubarCheckboxItemProps,
} from "reka-ui"

import { dropdownMenuCheckboxItemClassName } from "@/components/ui/dropdown-menu/styles"
import { cn } from "@/lib/utils"

const props = defineProps<MenubarCheckboxItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<MenubarCheckboxItemEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <MenubarCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    v-bind="forwarded"
    :class="cn(dropdownMenuCheckboxItemClassName, props.class)"
  >
    <span class="pointer-events-none absolute right-2 flex items-center justify-center">
      <MenubarItemIndicator>
        <Check />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarCheckboxItem>
</template>
