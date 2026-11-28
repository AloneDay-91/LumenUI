<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  NumberFieldRoot,
  useForwardPropsEmits,
  type NumberFieldRootEmits,
  type NumberFieldRootProps,
} from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<NumberFieldRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<NumberFieldRootEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <NumberFieldRoot
    v-slot="slotProps"
    data-slot="number-field"
    v-bind="forwarded"
    :class="cn('flex flex-col gap-1.5', props.class)"
  >
    <slot v-bind="slotProps" />
  </NumberFieldRoot>
</template>
