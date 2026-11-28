<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { CollapsibleContent, useForwardPropsEmits, type CollapsibleContentEmits, type CollapsibleContentProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { useTrace } from "./context"

const props = defineProps<CollapsibleContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CollapsibleContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)

const trace = useTrace()
</script>

<template>
  <CollapsibleContent
    data-slot="trace-content"
    v-bind="forwarded"
    :class="
      cn(
        'overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
        props.class,
      )
    "
  >
    <div
      :class="
        cn(
          trace.variant === 'plain' && 'border-s-2 border-border ps-3 text-muted-foreground',
          trace.variant === 'card' && 'border-t border-border',
        )
      "
    >
      <slot />
    </div>
  </CollapsibleContent>
</template>
