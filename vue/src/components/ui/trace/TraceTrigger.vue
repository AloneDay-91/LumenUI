<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ChevronDown } from "@lucide/vue"
import { CollapsibleTrigger, type CollapsibleTriggerProps } from "reka-ui"

import { cn } from "@/lib/utils"
import TraceStatusIcon from "./TraceStatusIcon.vue"
import { statusLabel, useTrace, type TraceStatus } from "./context"

/**
 * The row: icon, label, optional meta, status, chevron. The label shimmers
 * while the step runs. The default slot replaces the label; `#icon` and
 * `#meta` slots take rich content.
 */
const props = withDefaults(
  defineProps<
    CollapsibleTriggerProps & {
      label?: string
      /** Right-aligned detail: a duration, a count, a model. */
      meta?: string
      showStatus?: boolean
      statusLabels?: Record<TraceStatus, string>
      class?: HTMLAttributes["class"]
    }
  >(),
  { showStatus: true, statusLabels: () => statusLabel },
)

const delegated = computed(() => {
  const { class: _class, label: _label, meta: _meta, showStatus: _s, statusLabels: _l, ...rest } = props
  return rest
})

const trace = useTrace()

const svgSize = "[&_svg:not([class*='size-'])]:size-3.5"
</script>

<template>
  <CollapsibleTrigger
    data-slot="trace-trigger"
    v-bind="delegated"
    :class="
      cn(
        'group/trace-trigger flex items-center gap-2 text-start text-muted-foreground outline-none',
        trace.variant === 'card'
          ? 'w-full px-3 py-2 text-foreground hover:bg-muted/50 focus-visible:bg-muted/50'
          : 'w-fit rounded-lg hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30',
        svgSize,
        props.class,
      )
    "
  >
    <span v-if="$slots.icon" aria-hidden="true" class="flex shrink-0 text-muted-foreground">
      <slot name="icon" />
    </span>
    <span
      :class="
        cn(
          'min-w-0 truncate',
          trace.variant === 'card' && 'flex-1 font-medium',
          trace.status === 'running' && 'shimmer',
        )
      "
    >
      <slot>{{ label }}</slot>
    </span>
    <span v-if="$slots.meta || meta" class="shrink-0 text-muted-foreground tabular-nums">
      <slot name="meta">{{ meta }}</slot>
    </span>
    <span v-if="showStatus && trace.variant === 'card'" class="flex shrink-0 items-center gap-1.5 text-muted-foreground">
      <TraceStatusIcon :status="trace.status" />
      <span>{{ statusLabels[trace.status] }}</span>
    </span>
    <ChevronDown
      aria-hidden="true"
      class="size-3.5! shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/trace-trigger:rotate-180"
    />
  </CollapsibleTrigger>
</template>
