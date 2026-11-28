<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { AccordionContent, useForwardProps, type AccordionContentProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <AccordionContent
    data-slot="accordion-panel"
    v-bind="forwarded"
    :class="cn('overflow-hidden text-xs text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down', props.class)"
  >
    <div class="pb-3"><slot /></div>
  </AccordionContent>
</template>
