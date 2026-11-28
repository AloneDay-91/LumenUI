<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      value: number
      min?: number
      max?: number
      /** One locale on the server and in the browser, so "60%" does not become "60 %". */
      locale?: Intl.LocalesArgument
      /** Options for Intl.NumberFormat. Defaults to a percentage of the range. */
      format?: Intl.NumberFormatOptions
      /** Text read by screen readers in place of the formatted value. */
      getAriaValueText?: (formattedValue: string, value: number) => string
      class?: HTMLAttributes["class"]
    }
  >(),
  { min: 0, max: 100, locale: "en-US", as: "div" }
)

const percentage = computed(() => {
  const range = props.max - props.min
  if (range <= 0 || Number.isNaN(props.value)) return 0
  return Math.min(100, Math.max(0, ((props.value - props.min) / range) * 100))
})

// Clamped like Base UI, so the text, aria-valuenow and the fill stay in sync.
const clampedValue = computed(() =>
  Number.isNaN(props.value) ? props.min : Math.min(props.max, Math.max(props.min, props.value))
)

const formattedValue = computed(() => {
  if (props.format) return new Intl.NumberFormat(props.locale, props.format).format(clampedValue.value)
  return new Intl.NumberFormat(props.locale, { style: "percent" }).format(percentage.value / 100)
})

const ariaValueText = computed(() =>
  props.getAriaValueText ? props.getAriaValueText(formattedValue.value, props.value) : formattedValue.value
)
</script>

<template>
  <Primitive
    data-slot="meter"
    :as="as"
    :as-child="asChild"
    role="meter"
    :aria-valuenow="clampedValue"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuetext="ariaValueText"
    :class="cn('flex flex-col gap-1.5', props.class)"
  >
    <slot :value="value" :percentage="percentage" :formatted-value="formattedValue">
      <div data-slot="meter-track" class="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          data-slot="meter-indicator"
          class="h-full bg-primary"
          :style="{ insetInlineStart: 0, height: 'inherit', width: `${percentage}%` }"
        />
      </div>
    </slot>
    <!-- Same as Base UI: gives Safari a text node to read the meter. -->
    <span role="presentation" class="sr-only">x</span>
  </Primitive>
</template>
