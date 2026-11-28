<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, type SliderRootProps } from "reka-ui"

import { cn } from "@/lib/utils"

type SliderValue = number | number[]

interface Props extends Omit<SliderRootProps, "modelValue" | "defaultValue"> {
  /** A number for one thumb, an array for a range. Can be bound with `v-model`. */
  modelValue?: SliderValue | null
  defaultValue?: SliderValue
  /** Accessible name, put on the thumb (not the root) like the React version. */
  ariaLabel?: string
  ariaLabelledby?: string
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  "update:modelValue": [value: SliderValue]
  valueCommit: [value: SliderValue]
}>()

const toArray = (value: SliderValue | null | undefined) =>
  value == null ? undefined : Array.isArray(value) ? value : [value]

// A number in gives a number back, like Base UI.
const scalar = computed(() => typeof (props.modelValue ?? props.defaultValue ?? 0) === "number")
const fromArray = (value: number[]): SliderValue => (scalar.value ? (value[0] ?? 0) : value)

const delegated = computed(() => {
  const {
    class: _class,
    modelValue: _modelValue,
    defaultValue: _defaultValue,
    ariaLabel: _ariaLabel,
    ariaLabelledby: _ariaLabelledby,
    ...rest
  } = props
  return rest
})

const rekaModel = computed(() => toArray(props.modelValue))
const rekaDefault = computed(() => toArray(props.defaultValue) ?? [props.min ?? 0])

function onUpdate(value: number[] | undefined) {
  if (value) emit("update:modelValue", fromArray(value))
}

const thumbClass =
  "absolute top-1/2 block -translate-y-1/2 size-4 cursor-pointer rounded-full bg-background ring-1 dark:bg-foreground ring-foreground/10 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/30 [&_input]:cursor-pointer"
</script>

<template>
  <SliderRoot
    v-slot="slotProps"
    data-slot="slider"
    v-bind="delegated"
    :model-value="rekaModel"
    :default-value="rekaDefault"
    :class="cn('flex w-full flex-col gap-2', props.class)"
    @update:model-value="onUpdate"
    @value-commit="(value) => emit('valueCommit', fromArray(value))"
  >
    <slot v-bind="slotProps">
      <div class="flex w-full items-center">
        <SliderTrack class="relative h-1 w-full rounded-full bg-muted select-none">
          <SliderRange class="absolute h-full rounded-full bg-primary select-none" />
          <SliderThumb
            v-for="(_, index) in slotProps.modelValue ?? rekaDefault"
            :key="index"
            :aria-label="ariaLabel"
            :aria-labelledby="ariaLabelledby"
            :class="thumbClass"
          />
        </SliderTrack>
      </div>
    </slot>
  </SliderRoot>
</template>
