<script setup lang="ts">
import { computed, provide, ref, watch, type HTMLAttributes } from "vue"
import { PinInputRoot, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { OTPFieldKey, filterOTPValue, type OTPValidationType } from "./context"

interface Props extends PrimitiveProps {
  /** Number of cells. The value is clamped to it and is complete at this length. */
  length: number
  /** The code as one string. Can be bound with `v-model`. */
  modelValue?: string
  defaultValue?: string
  /** Characters allowed in a cell. */
  validationType?: OTPValidationType
  /** Runs after filtering; its result is filtered again and clamped to `length`. */
  normalizeValue?: (value: string) => string
  /** Hides the characters like a password field. */
  mask?: boolean
  /** Sets `autocomplete="one-time-code"` so phones offer the code from a message. */
  otp?: boolean
  /** Submits the owning form once the code is complete. */
  autoSubmit?: boolean
  placeholder?: string
  disabled?: boolean
  required?: boolean
  name?: string
  /** Id of the first input; the next ones get `{id}-2`, `{id}-3`… */
  id?: string
  dir?: "ltr" | "rtl"
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  validationType: "numeric",
  otp: true,
  placeholder: "",
  modelValue: undefined,
})

const emit = defineEmits<{
  "update:modelValue": [value: string]
  /** Fires when the code reaches `length`. */
  complete: [value: string]
  /** Fires with the attempted text when characters were rejected. */
  invalid: [value: string]
}>()

function normalize(raw: string) {
  let value = filterOTPValue(raw, props.validationType)
  if (props.normalizeValue) value = filterOTPValue(props.normalizeValue(value), props.validationType)
  return value.slice(0, props.length)
}

const local = ref(normalize(props.modelValue ?? props.defaultValue ?? ""))
watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined) local.value = normalize(value)
  },
)

const cells = computed(() => local.value.split(""))

const rootEl = ref<{ $el?: HTMLElement } | null>(null)

function onUpdate(value: (string | number | undefined)[]) {
  const raw = value.map((cell) => (cell == null ? "" : String(cell))).join("")
  const next = normalize(raw)
  if (next.length < raw.replace(/\s/g, "").slice(0, props.length).length) emit("invalid", raw)
  if (next === local.value) return
  local.value = next
  emit("update:modelValue", next)
  if (next.length === props.length) {
    emit("complete", next)
    if (props.autoSubmit) rootEl.value?.$el?.closest("form")?.requestSubmit()
  }
}

let counter = 0
provide(OTPFieldKey, {
  id: computed(() => props.id),
  validationType: computed(() => props.validationType),
  nextIndex: () => counter++,
})
</script>

<template>
  <PinInputRoot
    ref="rootEl"
    data-slot="otp-field"
    :as="as"
    :as-child="asChild"
    :model-value="cells"
    :type="validationType === 'numeric' ? 'number' : 'text'"
    :mask="mask"
    :otp="otp"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :name="name"
    :dir="dir"
    :data-complete="local.length === length ? '' : undefined"
    :class="cn('flex items-center gap-2', props.class)"
    @update:model-value="onUpdate"
  >
    <slot :model-value="local" />
  </PinInputRoot>
</template>
