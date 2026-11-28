<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ToolbarSeparator, useForwardProps, type ToolbarSeparatorProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<ToolbarSeparatorProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ToolbarSeparator data-slot="toolbar-separator" v-bind="forwarded" :class="cn('h-4 w-px bg-border', props.class)" />
</template>
