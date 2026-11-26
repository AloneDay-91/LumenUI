<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ChevronDown } from "@lucide/vue"
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="delegated"
      :class="
        cn(
          'flex flex-1 items-center justify-between gap-3 py-3 text-left text-sm font-medium outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/30 disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          props.class,
        )
      "
    >
      <slot />
      <ChevronDown class="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionTrigger>
  </AccordionHeader>
</template>
