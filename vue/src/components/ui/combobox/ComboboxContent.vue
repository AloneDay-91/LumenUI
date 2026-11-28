<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  ComboboxContent,
  ComboboxPortal,
  useForwardPropsEmits,
  type ComboboxContentEmits,
  type ComboboxContentProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { popupClassName } from "@/components/ui/styles"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ComboboxContentProps & { class?: HTMLAttributes["class"] }>(), {
  position: "popper",
  sideOffset: 4,
})
const emits = defineEmits<ComboboxContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent
      data-slot="combobox-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          popupClassName,
          'isolate z-50 flex max-h-(--reka-popper-available-height) w-(--reka-popper-anchor-width) min-w-36 flex-col overflow-hidden p-1',
          props.class,
        )
      "
    >
      <slot />
    </ComboboxContent>
  </ComboboxPortal>
</template>
