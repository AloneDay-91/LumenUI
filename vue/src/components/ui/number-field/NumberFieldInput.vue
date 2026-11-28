<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { NumberFieldInput, useForwardProps, type NumberFieldInputProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { inputClassName } from "@/components/ui/styles"

const props = defineProps<NumberFieldInputProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <NumberFieldInput
    data-slot="number-field-input"
    v-bind="forwarded"
    :class="cn(inputClassName, 'rounded-none text-center', props.class)"
  />
</template>
