<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { CollapsibleContent, useForwardPropsEmits, type CollapsibleContentEmits, type CollapsibleContentProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<CollapsibleContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CollapsibleContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <CollapsibleContent
    data-slot="collapsible-panel"
    v-bind="forwarded"
    :class="
      cn(
        'overflow-hidden text-xs data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
        props.class,
      )
    "
  >
    <slot />
  </CollapsibleContent>
</template>
