<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Brain } from "@lucide/vue"
import type { CollapsibleTriggerProps } from "reka-ui"

import { TraceTrigger, type TraceStatus } from "@/components/ui/trace"
import { useReasoning } from "./context"

const props = withDefaults(
  defineProps<
    CollapsibleTriggerProps & {
      thinkingLabel?: string
      doneLabel?: (duration?: number) => string
      meta?: string
      showStatus?: boolean
      statusLabels?: Record<TraceStatus, string>
      class?: HTMLAttributes["class"]
    }
  >(),
  {
    thinkingLabel: "Thinking…",
    doneLabel: (duration?: number) =>
      duration === undefined ? "Thought" : `Thought for ${Math.max(1, Math.round(duration))}s`,
    showStatus: undefined,
    statusLabels: undefined,
  },
)

const delegated = computed(() => {
  const { thinkingLabel: _t, doneLabel: _d, showStatus, statusLabels, ...rest } = props
  return {
    ...rest,
    ...(showStatus === undefined ? {} : { showStatus }),
    ...(statusLabels === undefined ? {} : { statusLabels }),
  }
})

const reasoning = useReasoning()
const label = computed(() =>
  reasoning.value.streaming ? props.thinkingLabel : props.doneLabel(reasoning.value.duration),
)
</script>

<template>
  <TraceTrigger v-bind="delegated" :label="label">
    <template #icon><slot name="icon"><Brain /></slot></template>
    <template v-if="$slots.meta" #meta><slot name="meta" /></template>
    <slot>{{ label }}</slot>
  </TraceTrigger>
</template>
