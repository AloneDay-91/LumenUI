<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ListTree } from "@lucide/vue"
import { useForwardPropsEmits, type CollapsibleRootEmits, type CollapsibleRootProps } from "reka-ui"

import { Trace, TraceContent, TraceSteps, TraceTrigger, type TraceStatus } from "@/components/ui/trace"

/**
 * A one-line summary that unfolds into the steps the agent took. While a step
 * runs, the summary shimmers; when all are done it reads as a past tense line.
 * The `#summary` slot takes rich content in place of the `summary` prop.
 */
const props = withDefaults(
  defineProps<
    CollapsibleRootProps & {
      summary?: string
      status?: TraceStatus
      class?: HTMLAttributes["class"]
    }
  >(),
  { status: "done" },
)
const emits = defineEmits<CollapsibleRootEmits>()

const delegated = computed(() => {
  const { summary: _summary, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <Trace data-slot="chain-of-thought" v-bind="forwarded">
    <TraceTrigger :label="summary">
      <template #icon><ListTree /></template>
      <slot name="summary">{{ summary }}</slot>
    </TraceTrigger>
    <TraceContent>
      <TraceSteps class="py-1">
        <slot />
      </TraceSteps>
    </TraceContent>
  </Trace>
</template>
