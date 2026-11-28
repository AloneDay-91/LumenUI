<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Check } from "@lucide/vue"
import {
  ComboboxItem,
  ComboboxItemIndicator,
  useForwardPropsEmits,
  type ComboboxItemEmits,
  type ComboboxItemProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { menuItemClassName } from "@/components/ui/styles"

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ComboboxItemEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <ComboboxItem data-slot="combobox-item" v-bind="forwarded" :class="cn(menuItemClassName, 'pr-8', props.class)">
    <slot />
    <ComboboxItemIndicator class="absolute right-2">
      <Check class="size-3.5" />
    </ComboboxItemIndicator>
  </ComboboxItem>
</template>
