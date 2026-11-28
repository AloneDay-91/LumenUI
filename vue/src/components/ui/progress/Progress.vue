<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from "reka-ui"

import { cn } from "@/lib/utils"

interface Props extends ProgressRootProps {
  /** One locale on the server and in the browser, so "60%" does not become "60 %". */
  locale?: string
  /** Options for the value text read by screen readers (a percent by default). */
  format?: Intl.NumberFormatOptions
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), { locale: "en-US", max: 100 })
const emit = defineEmits<{ "update:max": [value: number] }>()

const delegated = computed(() => {
  const { class: _class, locale: _locale, format: _format, getValueText: _getValueText, ...rest } = props
  return rest
})

// Base UI reads the value as a formatted percent unless a format is given.
function defaultValueText(value: number | null | undefined, max: number) {
  if (value == null) return undefined
  if (props.format) return new Intl.NumberFormat(props.locale, props.format).format(value)
  return new Intl.NumberFormat(props.locale, { style: "percent" }).format(value / max)
}

const getValueText = computed(() => props.getValueText ?? defaultValueText)

// Reka does not size the indicator: Base UI sets its width, so do the same.
const indicatorStyle = computed(() => {
  const value = props.modelValue
  if (value == null) return undefined
  const percent = Math.min(100, Math.max(0, (value / props.max) * 100))
  return { width: `${percent}%` }
})
</script>

<template>
  <ProgressRoot
    v-slot="slotProps"
    data-slot="progress"
    v-bind="delegated"
    :get-value-text="getValueText"
    :class="cn('flex flex-col gap-1.5', props.class)"
    @update:max="(value) => emit('update:max', value)"
  >
    <slot v-bind="slotProps">
      <div class="h-1.5 overflow-hidden rounded-full bg-muted">
        <ProgressIndicator class="h-full bg-primary transition-[width]" :style="indicatorStyle" />
      </div>
    </slot>
  </ProgressRoot>
</template>
