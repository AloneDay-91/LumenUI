<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  ContextMenuContent,
  ContextMenuPortal,
  useForwardPropsEmits,
  type ContextMenuContentEmits,
  type ContextMenuContentProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { popupClassName } from "@/components/ui/styles"

defineOptions({ inheritAttrs: false })

const props = defineProps<ContextMenuContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ContextMenuContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      data-slot="context-menu-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          popupClassName,
          'z-50 flex max-h-(--reka-popper-available-height) min-w-36 flex-col overflow-hidden',
          props.class,
        )
      "
    >
      <div data-slot="context-menu-viewport" class="min-h-0 flex-1 scroll-fade overflow-y-auto p-1">
        <slot />
      </div>
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
