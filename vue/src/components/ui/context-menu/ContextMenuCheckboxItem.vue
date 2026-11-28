<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Check } from "@lucide/vue"
import {
  ContextMenuCheckboxItem,
  ContextMenuItemIndicator,
  useForwardPropsEmits,
  type ContextMenuCheckboxItemEmits,
  type ContextMenuCheckboxItemProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { menuItemClassName } from "@/components/ui/styles"

const props = defineProps<ContextMenuCheckboxItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ContextMenuCheckboxItemEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <ContextMenuCheckboxItem
    data-slot="context-menu-checkbox-item"
    v-bind="forwarded"
    :class="cn(menuItemClassName, 'pr-8', props.class)"
  >
    <slot />
    <ContextMenuItemIndicator class="absolute right-2">
      <Check class="size-3.5" />
    </ContextMenuItemIndicator>
  </ContextMenuCheckboxItem>
</template>
