<script setup lang="ts">
import { computed, ref, useSlots, type HTMLAttributes } from "vue"
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from "reka-ui"
import { Check, ChevronDown, X } from "@lucide/vue"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import ChecklistNode from "./ChecklistNode.vue"
import type { ChecklistStep, OnboardingChecklistLabels } from "./types"

/**
 * The first things to do in a product, with a progress bar. One step is open
 * at a time, done steps are struck through, and the whole list folds into its
 * header. When every step is done, it says so and can be dismissed.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    title?: string
    description?: string
    steps: ChecklistStep[]
    /** Controlled ids of done steps (v-model:completed). */
    completed?: string[]
    defaultCompleted?: string[]
    /** Start unfolded. */
    defaultOpen?: boolean
    /** Shows a close button that emits dismiss. Defaults to on when a @dismiss listener is set. */
    dismissible?: boolean
    /** The circles toggle steps. Turn off when your app marks them done. */
    allowManualCheck?: boolean
    labels?: OnboardingChecklistLabels
  }>(),
  {
    title: "Get started",
    description: undefined,
    completed: undefined,
    defaultCompleted: () => [],
    defaultOpen: true,
    dismissible: undefined,
    allowManualCheck: true,
    labels: () => ({}),
    // Vue casts a missing boolean to false; keep it undefined so the listener can decide.
  }
)

const emit = defineEmits<{
  "update:completed": [completed: string[]]
  /** Hide the checklist here. */
  dismiss: []
}>()

defineSlots<{
  title?: () => unknown
  description?: () => unknown
  "all-done"?: () => unknown
  "step-title"?: (props: { step: ChecklistStep; done: boolean; open: boolean }) => unknown
  "step-description"?: (props: { step: ChecklistStep; done: boolean; open: boolean }) => unknown
  "step-action"?: (props: { step: ChecklistStep; done: boolean; open: boolean }) => unknown
}>()
const slots = useSlots()

// A dismiss listener shows the close button, like onDismiss does in React.
const attrsHaveDismiss = computed(() => {
  const instanceProps = getCurrentVNodeProps()
  return !!instanceProps?.onDismiss
})
import { getCurrentInstance } from "vue"
function getCurrentVNodeProps() {
  return currentInstance?.vnode.props as Record<string, unknown> | null | undefined
}
const currentInstance = getCurrentInstance()
const showDismiss = computed(() => props.dismissible ?? attrsHaveDismiss.value)

const uncontrolled = ref<string[]>(props.defaultCompleted)
const completed = computed(() => props.completed ?? uncontrolled.value)
const done = computed(() => props.steps.filter((step) => completed.value.includes(step.id)).length)
const allDone = computed(() => done.value === props.steps.length && props.steps.length > 0)
const expanded = ref<string | null>(props.steps.find((step) => !completed.value.includes(step.id))?.id ?? null)
const open = ref(props.defaultOpen)

const name = (step: ChecklistStep) => step.label ?? (typeof step.title === "string" ? step.title : step.id)

function toggle(step: ChecklistStep) {
  const isDone = completed.value.includes(step.id)
  const next = isDone ? completed.value.filter((id) => id !== step.id) : [...completed.value, step.id]
  uncontrolled.value = next
  emit("update:completed", next)
  // Finishing a step opens the next one left to do.
  if (!isDone) expanded.value = props.steps.find((s) => s.id !== step.id && !next.includes(s.id))?.id ?? null
}

function checkLabel(step: ChecklistStep, isDone: boolean) {
  return isDone
    ? (props.labels.markUndone?.(name(step)) ?? `Mark ${name(step)} as not done`)
    : (props.labels.markDone?.(name(step)) ?? `Mark ${name(step)} as done`)
}

const rootClassName =
  "flex w-full flex-col rounded-[min(var(--radius-4xl),24px)] bg-card text-card-foreground ring-1 ring-foreground/5 dark:ring-foreground/10"
const checkClassName =
  "flex size-5 shrink-0 items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-default"
const stepTitleClassName =
  "min-w-0 flex-1 truncate rounded-lg py-0.5 text-start text-xs font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
</script>

<template>
  <CollapsibleRoot v-model:open="open" data-slot="onboarding-checklist" :class="cn(rootClassName, props.class)">
    <div class="flex items-start gap-2 p-4">
      <div class="flex min-w-0 flex-1 flex-col gap-2.5">
        <div class="flex items-baseline justify-between gap-3">
          <h3 class="m-0 truncate text-sm font-medium"><slot name="title">{{ title }}</slot></h3>
          <span class="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">{{ done }}/{{ steps.length }}</span>
        </div>
        <p v-if="description || slots.description" class="m-0 text-xs text-muted-foreground">
          <slot name="description">{{ description }}</slot>
        </p>
        <Progress
          :model-value="steps.length ? (done / steps.length) * 100 : 0"
          :aria-label="labels.progress?.(done, steps.length) ?? `${done} of ${steps.length} steps done`"
        />
      </div>
      <div class="-me-1.5 -mt-1.5 flex shrink-0 items-center">
        <CollapsibleTrigger as-child>
          <Button
            variant="ghost"
            size="icon-sm"
            :aria-label="open ? 'Fold the checklist' : 'Unfold the checklist'"
            class="text-muted-foreground"
          >
            <ChevronDown :class="cn('transition-transform duration-200', !open && '-rotate-90')" />
          </Button>
        </CollapsibleTrigger>
        <Button
          v-if="showDismiss"
          variant="ghost"
          size="icon-sm"
          :aria-label="labels.dismiss ?? 'Dismiss'"
          class="text-muted-foreground"
          @click="emit('dismiss')"
        >
          <X />
        </Button>
      </div>
    </div>

    <CollapsibleContent
      class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
    >
      <div
        v-if="allDone"
        class="mx-4 mb-4 flex items-center gap-2 rounded-2xl bg-jade-wash px-3 py-2.5 text-xs text-jade-ink"
      >
        <Check class="size-4 shrink-0" aria-hidden="true" />
        <slot name="all-done">{{ labels.allDone ?? "All set. You can dismiss this checklist." }}</slot>
      </div>
      <ol class="m-0 flex list-none flex-col gap-0.5 px-2 pb-2">
        <li
          v-for="step in steps"
          :key="step.id"
          :data-done="completed.includes(step.id) ? '' : undefined"
          :data-open="expanded === step.id ? '' : undefined"
          class="rounded-2xl transition-colors data-open:bg-muted/60"
        >
          <div class="flex items-center gap-2.5 px-2 py-1.5">
            <button
              type="button"
              :disabled="!allowManualCheck"
              :aria-pressed="completed.includes(step.id)"
              :aria-label="checkLabel(step, completed.includes(step.id))"
              :class="
                cn(
                  checkClassName,
                  completed.includes(step.id)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-dashed border-muted-foreground/50 hover:border-solid hover:border-foreground/60',
                )
              "
              @click="toggle(step)"
            >
              <Check v-if="completed.includes(step.id)" class="size-3" />
            </button>
            <button
              type="button"
              :aria-expanded="expanded === step.id"
              :aria-controls="`${step.id}-panel`"
              :class="
                cn(
                  stepTitleClassName,
                  completed.includes(step.id) && 'text-muted-foreground line-through decoration-muted-foreground/50',
                )
              "
              @click="expanded = expanded === step.id ? null : step.id"
            >
              <slot name="step-title" :step="step" :done="completed.includes(step.id)" :open="expanded === step.id">
                <ChecklistNode :content="step.title" />
              </slot>
            </button>
          </div>
          <div
            v-if="expanded === step.id && (step.description || step.action || slots['step-description'] || slots['step-action'])"
            :id="`${step.id}-panel`"
            class="flex flex-col items-start gap-2.5 ps-9.5 pe-3 pb-3"
          >
            <slot name="step-description" :step="step" :done="completed.includes(step.id)" :open="true">
              <p v-if="step.description" class="m-0 text-xs text-muted-foreground">
                <ChecklistNode :content="step.description" />
              </p>
            </slot>
            <slot name="step-action" :step="step" :done="completed.includes(step.id)" :open="true">
              <ChecklistNode v-if="step.action" :content="step.action" />
            </slot>
          </div>
        </li>
      </ol>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
