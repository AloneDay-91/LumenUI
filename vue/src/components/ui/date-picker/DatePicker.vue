<script setup lang="ts">
import { computed, ref, shallowRef } from "vue"
import { format } from "date-fns"
import { getLocalTimeZone, isSameDay, type DateValue } from "@internationalized/date"
import type { DateRange } from "reka-ui"
import { Calendar as CalendarIcon } from "@lucide/vue"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { DatePickerProps } from "."

const dateFormat = "MMM d, yyyy"

/**
 * A button that opens a Calendar in a Popover. `mode="single"` takes a DateValue,
 * `mode="range"` a DateRange ({ start, end }), both through v-model.
 */
const props = withDefaults(
  defineProps<DatePickerProps>(),
  { mode: "single", modelValue: undefined, defaultValue: undefined },
)

const emit = defineEmits<{
  "update:modelValue": [value: DateValue | DateRange | undefined]
}>()

const open = ref(false)
const internal = shallowRef<DateValue | DateRange | undefined>(props.defaultValue)
const current = computed(() => (props.modelValue !== undefined ? props.modelValue : internal.value))

function isRange(value: unknown): value is DateRange {
  return typeof value === "object" && value !== null && "start" in value
}

function toText(date: DateValue) {
  return format(date.toDate(getLocalTimeZone()), dateFormat)
}

const range = computed(() => (isRange(current.value) ? current.value : undefined))
const single = computed(() => (current.value && !isRange(current.value) ? current.value : undefined))
const empty = computed(() => (props.mode === "range" ? !range.value?.start : !single.value))

const label = computed(() => {
  if (props.mode === "range") {
    const value = range.value
    if (!value?.start) return props.placeholder ?? "Pick a range"
    if (!value.end || isSameDay(value.start, value.end)) return toText(value.start)
    return `${toText(value.start)} – ${toText(value.end)}`
  }
  return single.value ? toText(single.value) : (props.placeholder ?? "Pick a date")
})

function onSelect(next: unknown) {
  const value = (next ?? undefined) as DateValue | DateRange | undefined
  internal.value = value
  emit("update:modelValue", value)
  if (props.mode === "range") {
    if (isRange(value) && value.start && value.end && !isSameDay(value.start, value.end)) open.value = false
  } else {
    open.value = false
  }
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child :disabled="disabled">
      <Button
        :id="id"
        variant="outline"
        :disabled="disabled"
        :class="cn('min-w-52 justify-start font-normal', empty && 'text-muted-foreground', props.class)"
      >
        <CalendarIcon data-icon="inline-start" />
        {{ label }}
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" class="w-auto p-3">
      <Calendar
        v-if="mode === 'range'"
        initial-focus
        mode="range"
        :model-value="range"
        :default-placeholder="range?.start"
        @update:model-value="onSelect"
      />
      <Calendar
        v-else
        initial-focus
        mode="single"
        :model-value="single"
        :default-placeholder="single"
        @update:model-value="onSelect"
      />
    </PopoverContent>
  </Popover>
</template>
