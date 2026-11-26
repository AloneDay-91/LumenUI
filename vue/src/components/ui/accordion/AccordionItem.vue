<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { AccordionItem, useForwardProps, type AccordionItemProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <AccordionItem
    data-slot="accordion-item"
    v-bind="forwarded"
    :class="cn('border-b border-border', props.class)"
  >
    <slot />
  </AccordionItem>
</template>
