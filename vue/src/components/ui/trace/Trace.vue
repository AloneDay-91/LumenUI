<script setup lang="ts">
import { computed, provide, type HTMLAttributes } from "vue"
import { CollapsibleRoot, useForwardPropsEmits, type CollapsibleRootEmits, type CollapsibleRootProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { TraceContextKey, type TraceStatus } from "./context"

/**
 * One step. `plain` reads inline in a message; `card` frames it, for tool
 * calls and subagents whose body holds code.
 */
const props = withDefaults(
  defineProps<
    CollapsibleRootProps & {
      status?: TraceStatus
      variant?: "plain" | "card"
      class?: HTMLAttributes["class"]
    }
  >(),
  { status: "done", variant: "plain" },
)
const emits = defineEmits<CollapsibleRootEmits>()

const delegated = computed(() => {
  const { class: _class, status: _status, variant: _variant, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)

provide(
  TraceContextKey,
  computed(() => ({ status: props.status, variant: props.variant })),
)
</script>

<template>
  <CollapsibleRoot
    v-slot="slotProps"
    data-slot="trace"
    :data-status="status"
    :data-variant="variant"
    v-bind="forwarded"
    :class="
      cn(
        'group/trace flex flex-col text-xs',
        variant === 'card' && 'overflow-hidden rounded-2xl border border-border bg-card',
        variant === 'plain' && 'gap-2',
        props.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </CollapsibleRoot>
</template>
