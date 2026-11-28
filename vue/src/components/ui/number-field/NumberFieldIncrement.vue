<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Plus } from "@lucide/vue"
import { NumberFieldIncrement, useForwardProps, type NumberFieldIncrementProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<NumberFieldIncrementProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <NumberFieldIncrement
    data-slot="number-field-increment"
    v-bind="forwarded"
    :class="
      cn(
        'flex size-8 items-center justify-center rounded-r-2xl border border-l-0 border-border bg-transparent text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot><Plus class="size-3.5" /></slot>
  </NumberFieldIncrement>
</template>
