<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Check } from "@lucide/vue"
import {
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
  useForwardPropsEmits,
  type DropdownMenuCheckboxItemEmits,
  type DropdownMenuCheckboxItemProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { dropdownMenuCheckboxItemClassName } from "./styles"

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <DropdownMenuCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    v-bind="forwarded"
    :class="cn(dropdownMenuCheckboxItemClassName, props.class)"
  >
    <span class="pointer-events-none absolute right-2 flex items-center justify-center">
      <DropdownMenuItemIndicator>
        <Check />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
