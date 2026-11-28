<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Minus } from "@lucide/vue"
import { NumberFieldDecrement, useForwardProps, type NumberFieldDecrementProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<NumberFieldDecrementProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <NumberFieldDecrement
    data-slot="number-field-decrement"
    v-bind="forwarded"
    :class="
      cn(
        'flex size-8 items-center justify-center rounded-l-2xl border border-r-0 border-border bg-transparent text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot><Minus class="size-3.5" /></slot>
  </NumberFieldDecrement>
</template>
