<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ToolbarRoot, useForwardProps, type ToolbarRootProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<ToolbarRootProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ToolbarRoot
    data-slot="toolbar"
    v-bind="forwarded"
    :class="cn('flex w-fit items-center gap-1 rounded-4xl border border-border bg-background p-1', props.class)"
  >
    <slot />
  </ToolbarRoot>
</template>
