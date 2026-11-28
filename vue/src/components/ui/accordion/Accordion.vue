<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { AccordionRoot, useForwardPropsEmits, type AccordionRootProps, type AccordionRootEmits } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<AccordionRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<AccordionRootEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <AccordionRoot
    data-slot="accordion"
    v-bind="forwarded"
    :class="cn('flex w-full flex-col', props.class)"
  >
    <slot />
  </AccordionRoot>
</template>
