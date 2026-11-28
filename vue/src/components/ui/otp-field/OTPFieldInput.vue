<script setup lang="ts">
import { computed, inject, onMounted, ref, type HTMLAttributes } from "vue"
import { PinInputInput, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { OTPFieldKey, filterOTPValue } from "./context"

const props = defineProps<
  PrimitiveProps & {
    /** Position of the cell. Optional: inputs number themselves in order. */
    index?: number
    disabled?: boolean
    class?: HTMLAttributes["class"]
  }
>()

const context = inject(OTPFieldKey, null)
const autoIndex = ref(context ? context.nextIndex() : 0)
const inputRef = ref<{ $el?: HTMLElement } | null>(null)

// Setup order can drift when inputs mount later: the DOM order is the truth.
onMounted(() => {
  const el = inputRef.value?.$el
  const root = el?.closest('[data-slot="otp-field"]')
  if (!el || !root) return
  const position = Array.from(root.querySelectorAll('[data-slot="otp-field-input"]')).indexOf(el)
  if (position !== -1) autoIndex.value = position
})

const index = computed(() => props.index ?? autoIndex.value)

const id = computed(() => {
  const base = context?.id.value
  if (!base) return undefined
  return index.value === 0 ? base : `${base}-${index.value + 1}`
})

// Base UI rejects letters in numeric mode and digits in alpha mode before they land.
function onBeforeInput(event: Event) {
  const data = (event as InputEvent).data
  if (!context || !data) return
  if (filterOTPValue(data, context.validationType.value).length === 0) event.preventDefault()
}
</script>

<template>
  <PinInputInput
    ref="inputRef"
    data-slot="otp-field-input"
    :index="index"
    :disabled="disabled"
    :as="as"
    :as-child="asChild"
    :id="id"
    :class="
      cn(
        'size-9 rounded-xl border border-border bg-transparent text-center text-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:opacity-50',
        props.class,
      )
    "
    @beforeinput="onBeforeInput"
  />
</template>
