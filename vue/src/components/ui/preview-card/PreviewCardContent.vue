<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { HoverCardContent, HoverCardPortal, useForwardProps, type HoverCardContentProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { popupClassName } from "@/components/ui/styles"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<HoverCardContentProps & { class?: HTMLAttributes["class"] }>(), {
  sideOffset: 8,
})

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      data-slot="preview-card-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(popupClassName, 'isolate z-50 w-72 p-4 text-xs', props.class)"
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>
