<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ChevronDown } from "@lucide/vue"
import { ComboboxTrigger, useForwardProps, type ComboboxTriggerProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<ComboboxTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ComboboxTrigger
    data-slot="combobox-trigger"
    v-bind="forwarded"
    :class="
      cn(
        'inline-flex size-8 items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted',
        props.class,
      )
    "
  >
    <slot><ChevronDown class="size-4" /></slot>
  </ComboboxTrigger>
</template>
