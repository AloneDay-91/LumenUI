<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue"
import { Clock } from "@lucide/vue"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import TimePickerColumn from "./TimePickerColumn.vue"
import { formatTime, pad, parseTime, toValue, type Time, type TimeOption } from "./utils"

const props = withDefaults(
  defineProps<{
    /** "HH:mm", 24-hour, like a native time input. Used when v-model is not bound. */
    defaultValue?: string
    /** Minutes between two options. */
    step?: number
    hourCycle?: 12 | 24
    placeholder?: string
    disabled?: boolean
    name?: string
    id?: string
    class?: HTMLAttributes["class"]
    ariaLabel?: string
    labels?: { hours?: string; minutes?: string; period?: string }
  }>(),
  {
    step: 15,
    hourCycle: 24,
    placeholder: "Pick a time",
    labels: () => ({}),
  },
)

/** "HH:mm", 24-hour. */
const model = defineModel<string>()

const open = ref(false)
const uncontrolled = ref(props.defaultValue)
const time = computed(() => parseTime(model.value ?? uncontrolled.value))

function commit(next: Time, close: boolean) {
  const formatted = toValue(next)
  uncontrolled.value = formatted
  model.value = formatted
  if (close) open.value = false
}

const current = computed<Time>(() => time.value ?? { hours: 9, minutes: 0 })
const isPm = computed(() => current.value.hours >= 12)

const hourOptions = computed<TimeOption[]>(() =>
  props.hourCycle === 24
    ? Array.from({ length: 24 }, (_, h) => ({ value: h, label: pad(h) }))
    : Array.from({ length: 12 }, (_, i) => {
        const display = i === 0 ? 12 : i
        return { value: isPm.value ? i + 12 : i, label: String(display) }
      }),
)

const minuteOptions = computed<TimeOption[]>(() =>
  Array.from({ length: Math.ceil(60 / Math.max(1, props.step)) }, (_, i) => ({
    value: i * props.step,
    label: pad(i * props.step),
  })).filter((option) => option.value < 60),
)

const periodOptions: TimeOption[] = [
  { value: 0, label: "AM" },
  { value: 1, label: "PM" },
]

const display = computed(() => (time.value ? formatTime(time.value, props.hourCycle) : props.placeholder))
// Keep the time in the name: a bare aria-label would hide the value.
const triggerLabel = computed(() => (props.ariaLabel ? `${props.ariaLabel}, ${display.value}` : undefined))
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        :id="id"
        variant="outline"
        :disabled="disabled"
        :aria-label="triggerLabel"
        data-slot="time-picker"
        :class="cn('min-w-36 justify-start font-normal tabular-nums', !time && 'text-muted-foreground', props.class)"
      >
        <Clock data-icon="inline-start" />
        {{ display }}
      </Button>
    </PopoverTrigger>
    <input v-if="name" type="hidden" :name="name" :value="time ? toValue(time) : ''" />
    <PopoverContent align="start" class="flex w-auto gap-1 p-1" @open-auto-focus.prevent>
      <TimePickerColumn
        auto-focus
        :label="labels.hours ?? 'Hours'"
        :options="hourOptions"
        :selected="time ? current.hours : undefined"
        @select="(hours) => commit({ hours, minutes: current.minutes }, false)"
      />
      <div aria-hidden="true" class="w-px self-stretch bg-border" />
      <TimePickerColumn
        :label="labels.minutes ?? 'Minutes'"
        :options="minuteOptions"
        :selected="time ? current.minutes : undefined"
        @select="(minutes, close) => commit({ hours: current.hours, minutes }, close)"
      />
      <template v-if="hourCycle === 12">
        <div aria-hidden="true" class="w-px self-stretch bg-border" />
        <TimePickerColumn
          :label="labels.period ?? 'AM or PM'"
          :options="periodOptions"
          :selected="time ? (isPm ? 1 : 0) : undefined"
          @select="(period) => commit({ hours: (current.hours % 12) + (period ? 12 : 0), minutes: current.minutes }, false)"
        />
      </template>
    </PopoverContent>
  </Popover>
</template>
