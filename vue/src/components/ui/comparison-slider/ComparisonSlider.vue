<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue"
import { SliderRoot, SliderThumb, SliderTrack } from "reka-ui"
import { ChevronsLeftRight } from "@lucide/vue"

import { cn } from "@/lib/utils"

/**
 * Two layers stacked, with a handle that wipes between them: before on the
 * start side, after on the end. Drag anywhere, or focus the handle and use
 * the arrows, Home, and End.
 */
const props = withDefaults(
  defineProps<{
    /** Text on the start side; the `before-label` slot takes markup instead. */
    beforeLabel?: string
    /** Text on the end side; the `after-label` slot takes markup instead. */
    afterLabel?: string
    defaultValue?: number
    ariaLabel?: string
    class?: HTMLAttributes["class"]
  }>(),
  { defaultValue: 50, ariaLabel: "Comparison position" }
)

defineSlots<{
  /** Shown on the start side of the handle: an img, a video, any node. */
  before?: () => unknown
  /** Shown on the end side. Sets the size of the frame. */
  after?: () => unknown
  "before-label"?: () => unknown
  "after-label"?: () => unknown
}>()

/** Controlled position, 0 to 100. */
const model = defineModel<number>()

const uncontrolled = ref(props.defaultValue)
const position = computed(() => model.value ?? uncontrolled.value)
const sliderValue = computed(() => [position.value])

function onValueChange(next: number[] | undefined) {
  const v = next?.[0]
  if (v === undefined) return
  uncontrolled.value = v
  model.value = v
}

const frameClass = cn(
  "relative isolate w-full overflow-hidden rounded-[min(var(--radius-4xl),24px)] bg-muted ring-1 ring-foreground/5 select-none dark:ring-foreground/10",
  "[&_img]:pointer-events-none [&_img]:block [&_img]:size-full [&_img]:object-cover [&_video]:block [&_video]:size-full [&_video]:object-cover"
)
const labelClass =
  "pointer-events-none absolute top-3 rounded-2xl bg-background/85 px-2 py-0.5 text-[11px] font-medium text-foreground ring-1 ring-foreground/5 backdrop-blur-sm"
const lineClass =
  "absolute inset-y-0 w-0.5 bg-background shadow-[0_0_0_1px_color-mix(in_oklch,var(--foreground)_10%,transparent)]"
const knobClass =
  "relative flex size-8 items-center justify-center rounded-full bg-background text-foreground ring-1 ring-foreground/10 transition-[scale] group-hover/handle:scale-105 group-focus-visible/handle:ring-3 group-focus-visible/handle:ring-ring/50"
</script>

<template>
  <div data-slot="comparison-slider" :class="cn(frameClass, props.class)">
    <div class="relative">
      <slot name="after" />
      <span v-if="$slots['after-label'] || afterLabel" aria-hidden="true" :class="cn(labelClass, 'end-3')">
        <slot name="after-label">{{ afterLabel }}</slot>
      </span>
    </div>
    <div class="absolute inset-0" :style="{ clipPath: `inset(0 calc(100% - ${position}%) 0 0)` }">
      <slot name="before" />
      <span v-if="$slots['before-label'] || beforeLabel" aria-hidden="true" :class="cn(labelClass, 'start-3')">
        <slot name="before-label">{{ beforeLabel }}</slot>
      </span>
    </div>

    <!-- The clip runs left to right; keep the handle on the same axis in RTL. -->
    <SliderRoot
      :model-value="sliderValue"
      :min="0"
      :max="100"
      :step="1"
      thumb-alignment="overflow"
      dir="ltr"
      class="absolute inset-0 cursor-ew-resize touch-none"
      @update:model-value="onValueChange"
    >
      <SliderTrack class="relative block size-full">
        <SliderThumb
          :aria-label="ariaLabel"
          :aria-valuetext="`${Math.round(position)}%`"
          class="group/handle flex h-full w-8 items-center justify-center outline-none"
        >
          <span aria-hidden="true" :class="lineClass" />
          <span aria-hidden="true" :class="knobClass">
            <ChevronsLeftRight class="size-4" />
          </span>
        </SliderThumb>
      </SliderTrack>
    </SliderRoot>
  </div>
</template>
