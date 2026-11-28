<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Search } from "@lucide/vue"
import { useForwardPropsEmits, type CollapsibleRootEmits, type CollapsibleRootProps } from "reka-ui"

import { Trace, TraceContent, TraceSteps, TraceTrigger, type TraceStatus } from "@/components/ui/trace"

/**
 * What the agent is doing, as it does it: a plain Trace whose title is the
 * task and whose body lists each action as it happens. The `#title` slot
 * replaces the `title` text, the `#icon` slot replaces the search icon.
 */
const props = withDefaults(
  defineProps<
    CollapsibleRootProps & {
      title?: string
      status?: TraceStatus
      class?: HTMLAttributes["class"]
    }
  >(),
  { status: "running", defaultOpen: true },
)
const emits = defineEmits<CollapsibleRootEmits>()

const delegated = computed(() => {
  const { title: _title, status: _status, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <Trace data-slot="task" :status="status" v-bind="forwarded">
    <TraceTrigger :label="title">
      <template #icon>
        <slot name="icon"><Search /></slot>
      </template>
      <template v-if="$slots.title" #default>
        <slot name="title" />
      </template>
    </TraceTrigger>
    <TraceContent>
      <TraceSteps class="py-1">
        <slot />
      </TraceSteps>
    </TraceContent>
  </Trace>
</template>
