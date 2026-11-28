<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Map as MapIcon } from "@lucide/vue"
import { useForwardPropsEmits, type CollapsibleRootEmits, type CollapsibleRootProps } from "reka-ui"

import { Trace, TraceContent, TraceStep, TraceSteps, TraceTrigger, type TraceStatus } from "@/components/ui/trace"
import { cn } from "@/lib/utils"
import type { PlanItem } from "./index"

/**
 * The steps the agent intends to take and how far it has got: a card Trace
 * with a progress bar in the header and the steps on a rail.
 */
const props = withDefaults(
  defineProps<
    CollapsibleRootProps & {
      title?: string
      steps: PlanItem[]
      class?: HTMLAttributes["class"]
    }
  >(),
  { title: "Plan", defaultOpen: true, open: undefined },
)
const emits = defineEmits<CollapsibleRootEmits>()

const delegated = computed(() => {
  const { class: _class, title: _title, steps: _steps, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)

const done = computed(() => props.steps.filter((step) => step.status === "done").length)
const failed = computed(() => props.steps.some((step) => step.status === "error"))
const status = computed<TraceStatus>(() => {
  if (failed.value) return "error"
  if (done.value === props.steps.length) return "done"
  return props.steps.some((step) => step.status === "running") ? "running" : "pending"
})
const percent = computed(() => (props.steps.length === 0 ? 0 : Math.round((done.value / props.steps.length) * 100)))
</script>

<template>
  <Trace data-slot="plan" variant="card" :status="status" v-bind="forwarded" :class="props.class">
    <TraceTrigger :show-status="false">
      <template #icon><MapIcon /></template>
      <slot name="title">{{ title }}</slot>
      <template #meta>
        <span class="flex items-center gap-2">
          <span
            role="progressbar"
            aria-label="Plan progress"
            :aria-valuemin="0"
            :aria-valuemax="steps.length"
            :aria-valuenow="done"
            class="h-1 w-16 overflow-hidden rounded-full bg-muted"
          >
            <span
              :class="cn('block h-full rounded-full bg-primary transition-[width] duration-300', failed && 'bg-crimson-solid')"
              :style="{ width: `${percent}%` }"
            />
          </span>
          <span class="font-mono text-[11px]">{{ done }}/{{ steps.length }}</span>
        </span>
      </template>
    </TraceTrigger>
    <TraceContent>
      <TraceSteps class="px-3 py-3">
        <TraceStep
          v-for="step in steps"
          :key="step.id"
          :status="step.status"
          :title="step.title"
          :description="step.description"
        />
      </TraceSteps>
    </TraceContent>
  </Trace>
</template>
