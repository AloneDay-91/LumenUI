<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  ComboboxAnchor,
  ComboboxInput,
  useForwardPropsEmits,
  type ComboboxInputEmits,
  type ComboboxInputProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { inputClassName } from "@/components/ui/styles"

const props = defineProps<ComboboxInputProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ComboboxInputEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <!-- The input is the anchor the list opens under and takes its width from. -->
  <ComboboxAnchor as-child>
    <ComboboxInput data-slot="combobox-input" v-bind="forwarded" :class="cn(inputClassName, props.class)" />
  </ComboboxAnchor>
</template>
