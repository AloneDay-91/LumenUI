<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch, type CSSProperties } from "vue"
import { X } from "@lucide/vue"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TourLabels, TourStep } from "."

type Rect = { top: number; left: number; width: number; height: number }

const PADDING = 6
const CARD_WIDTH = 288
const GAP = 12

const props = withDefaults(
  defineProps<{
    steps: TourStep[]
    /** Controlled step index (v-model:step). Without it, the tour keeps its own. */
    step?: number
    labels?: TourLabels
  }>(),
  { step: undefined, labels: () => ({}) },
)

const emit = defineEmits<{
  "update:step": [step: number]
  finish: []
}>()

/** v-model:open */
const open = defineModel<boolean>("open", { required: true })

defineSlots<{
  title?: (props: { step: TourStep; index: number }) => unknown
  description?: (props: { step: TourStep; index: number }) => unknown
}>()

const uncontrolledStep = ref(0)
const index = computed(() => props.step ?? uncontrolledStep.value)
const current = computed<TourStep | undefined>(() => props.steps[index.value])
const last = computed(() => index.value === props.steps.length - 1)
const rect = ref<Rect | null>(null)
const card = ref<HTMLDivElement>()
const titleId = useId()
const descriptionId = useId()

function measure(selector?: string): Rect | null {
  if (!selector) return null
  const element = document.querySelector(selector)
  if (!element) return null
  const box = element.getBoundingClientRect()
  return {
    top: box.top - PADDING,
    left: box.left - PADDING,
    width: box.width + PADDING * 2,
    height: box.height + PADDING * 2,
  }
}

function setStep(next: number) {
  if (props.step === undefined) uncontrolledStep.value = next
  emit("update:step", next)
}

function close() {
  open.value = false
  setStep(0)
}

function next() {
  if (last.value) {
    emit("finish")
    close()
  } else {
    setStep(index.value + 1)
  }
}

// Remember the trigger, and give focus back when the tour ends.
let returnFocus: Element | null = null
watch(
  open,
  (isOpen, wasOpen) => {
    if (typeof document === "undefined") return
    if (isOpen) returnFocus = document.activeElement
    else if (wasOpen) (returnFocus as HTMLElement | null)?.focus?.()
  },
  { immediate: true },
)
onBeforeUnmount(() => {
  if (open.value) (returnFocus as HTMLElement | null)?.focus?.()
})

// Scroll the target into view, then follow it on scroll and resize.
watch(
  [open, current],
  ([isOpen, step], _previous, onCleanup) => {
    if (!isOpen || !step || typeof window === "undefined") return
    const element = step.target ? document.querySelector(step.target) : null
    element?.scrollIntoView({ block: "center", behavior: "smooth" })
    const update = () => {
      rect.value = measure(step.target)
    }
    update()
    const settle = setTimeout(update, 350)
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)
    onCleanup(() => {
      clearTimeout(settle)
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    })
  },
  { immediate: true, flush: "post" },
)

watch(
  [open, index],
  async ([isOpen]) => {
    if (!isOpen) return
    await nextTick()
    card.value?.focus()
  },
  { immediate: true, flush: "post" },
)

const cardStyle = computed<CSSProperties>(() => {
  const box = rect.value
  if (!box) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  const below = box.top + box.height + GAP
  const fitsBelow = below + 180 < window.innerHeight
  const left = Math.min(
    Math.max(16, box.left + box.width / 2 - CARD_WIDTH / 2),
    window.innerWidth - CARD_WIDTH - 16,
  )
  return fitsBelow
    ? { top: `${below}px`, left: `${left}px` }
    : { top: `${Math.max(16, box.top - GAP)}px`, left: `${left}px`, transform: "translateY(-100%)" }
})

const progress = computed(
  () =>
    props.labels.progress?.(index.value + 1, props.steps.length) ??
    `${index.value + 1} of ${props.steps.length}`,
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault()
    close()
  }
  // Keep Tab inside the card.
  if (event.key === "Tab" && card.value) {
    const focusable = card.value.querySelectorAll<HTMLElement>("button")
    const first = focusable[0]
    const lastButton = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      lastButton?.focus()
    } else if (!event.shiftKey && document.activeElement === lastButton) {
      event.preventDefault()
      first?.focus()
    }
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open && current" data-slot="tour" class="fixed inset-0 z-[110]">
      <!-- The dim layer: a huge shadow around the cut-out, so the target stays sharp. -->
      <div
        v-if="rect"
        aria-hidden="true"
        class="pointer-events-none fixed rounded-2xl transition-all duration-300 ease-out"
        :style="{
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          boxShadow: '0 0 0 9999px rgb(0 0 0 / 0.45)',
        }"
      />
      <div v-else aria-hidden="true" class="fixed inset-0 bg-black/45" />
      <!-- Clicks outside the card do nothing, so a stray click does not end the tour. -->
      <div aria-hidden="true" class="fixed inset-0" />

      <div
        ref="card"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="current.description || $slots.description ? descriptionId : undefined"
        tabindex="-1"
        data-slot="tour-card"
        class="fixed flex w-72 flex-col gap-3 rounded-[min(var(--radius-4xl),24px)] bg-popover p-4 text-popover-foreground shadow-lg ring-1 ring-foreground/5 outline-none transition-[top,left] duration-300 ease-out dark:ring-foreground/10"
        :style="cardStyle"
        @keydown="onKeydown"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-1">
            <p class="m-0 font-mono text-[11px] text-muted-foreground tabular-nums">
              {{ progress }}
            </p>
            <h2 :id="titleId" class="m-0 text-sm font-medium">
              <slot name="title" :step="current" :index="index">{{ current.title }}</slot>
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            :aria-label="labels.skip ?? 'Skip tour'"
            class="-me-1 text-muted-foreground"
            @click="close"
          >
            <X />
          </Button>
        </div>
        <p
          v-if="current.description || $slots.description"
          :id="descriptionId"
          class="m-0 text-xs leading-5 text-muted-foreground"
        >
          <slot name="description" :step="current" :index="index">{{ current.description }}</slot>
        </p>
        <div class="flex items-center gap-2">
          <span aria-hidden="true" class="flex flex-1 gap-1">
            <span
              v-for="(_, i) in steps"
              :key="i"
              :class="
                cn(
                  'h-1 rounded-full transition-all',
                  i === index ? 'w-4 bg-foreground' : 'w-1 bg-foreground/20',
                )
              "
            />
          </span>
          <Button v-if="index > 0" variant="ghost" size="sm" @click="setStep(index - 1)">
            {{ labels.back ?? "Back" }}
          </Button>
          <Button size="sm" @click="next">
            {{ last ? (labels.finish ?? "Done") : (labels.next ?? "Next") }}
          </Button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
