<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  PopoverContent,
  PopoverPortal,
  useForwardPropsEmits,
  type PopoverContentEmits,
  type PopoverContentProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { popupClassName } from "@/components/ui/styles"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PopoverContentProps & { class?: HTMLAttributes["class"] }>(), {
  align: "center",
  sideOffset: 6,
})
const emits = defineEmits<PopoverContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      data-slot="popover-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(popupClassName, 'z-50 w-72 p-4', props.class)"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
