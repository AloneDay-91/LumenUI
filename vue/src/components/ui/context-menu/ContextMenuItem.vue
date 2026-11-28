<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ContextMenuItem, useForwardPropsEmits, type ContextMenuItemEmits, type ContextMenuItemProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { menuItemClassName } from "@/components/ui/styles"

const props = defineProps<ContextMenuItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ContextMenuItemEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <ContextMenuItem data-slot="context-menu-item" v-bind="forwarded" :class="cn(menuItemClassName, props.class)">
    <slot />
  </ContextMenuItem>
</template>
