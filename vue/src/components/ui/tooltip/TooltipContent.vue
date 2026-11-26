<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  TooltipContent,
  TooltipPortal,
  useForwardPropsEmits,
  type TooltipContentEmits,
  type TooltipContentProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { popupClassName } from "@/components/ui/styles"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TooltipContentProps & { class?: HTMLAttributes["class"] }>(), {
  sideOffset: 6,
})
const emits = defineEmits<TooltipContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(popupClassName, 'z-50 max-w-xs px-2.5 py-1.5 text-xs', props.class)"
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
