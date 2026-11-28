<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Bot } from "@lucide/vue"
import { useForwardPropsEmits, type CollapsibleRootEmits, type CollapsibleRootProps } from "reka-ui"

import { Trace, TraceContent, TraceTrigger, type TraceStatus } from "@/components/ui/trace"

/**
 * A run handed to another agent: its name, the task it got, the tools it
 * called (as nested traces), and what it returned.
 */
const props = withDefaults(
  defineProps<
    CollapsibleRootProps & {
      /** The `#name` slot takes rich content. */
      name?: string
      status?: TraceStatus
      /** Duration, tool count, or model. The `#meta` slot takes rich content. */
      meta?: string
      class?: HTMLAttributes["class"]
    }
  >(),
  { status: "done", open: undefined },
)
const emits = defineEmits<CollapsibleRootEmits>()

const delegated = computed(() => {
  const { class: _class, name: _name, status: _status, meta: _meta, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <Trace data-slot="subagent" variant="card" :status="status" v-bind="forwarded" :class="props.class">
    <TraceTrigger :meta="meta">
      <template #icon><Bot /></template>
      <slot name="name">{{ name }}</slot>
      <template v-if="$slots.meta" #meta><slot name="meta" /></template>
    </TraceTrigger>
    <TraceContent>
      <slot />
    </TraceContent>
  </Trace>
</template>
