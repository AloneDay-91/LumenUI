<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ContextMenuSeparator, type ContextMenuSeparatorProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<ContextMenuSeparatorProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <ContextMenuSeparator
    data-slot="context-menu-separator"
    v-bind="delegated"
    :class="cn('-mx-1 my-1 h-px bg-border/50', props.class)"
  />
</template>
