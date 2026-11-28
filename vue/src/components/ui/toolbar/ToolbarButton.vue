<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ToolbarButton, useForwardProps, type ToolbarButtonProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const props = defineProps<ToolbarButtonProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ToolbarButton
    data-slot="toolbar-button"
    v-bind="forwarded"
    :class="cn(buttonVariants({ variant: 'ghost', size: 'sm' }), props.class)"
  >
    <slot />
  </ToolbarButton>
</template>
