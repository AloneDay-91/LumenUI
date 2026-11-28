<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue"
import { Check, ChevronDown } from "@lucide/vue"
import {
  NumberFieldInput,
  NumberFieldRoot,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectViewport,
} from "reka-ui"

import { cn } from "@/lib/utils"

/**
 * A number field for money. The amount is formatted for the locale as you
 * leave the field ("1 234,50 €", "$1,234.50") and stays a plain number in
 * code. With `currencies`, a picker sits at the end. Arrows step, Shift
 * (or Page Up / Page Down) steps by ten.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    /** The amount (v-model). */
    modelValue?: number | null
    defaultValue?: number
    /** Controlled ISO 4217 code (v-model:currency). */
    currency?: string
    defaultCurrency?: string
    /** Codes offered in the picker. Without it, the currency is fixed. */
    currencies?: string[]
    /** Format locale. Defaults to the page's. */
    locale?: string
    min?: number
    max?: number
    step?: number
    /** Decimal places. Defaults to the currency's: 2 for EUR, 0 for JPY. */
    fractionDigits?: number
    /** Posts the amount. */
    name?: string
    /** Posts the currency code. */
    currencyName?: string
    disabled?: boolean
    required?: boolean
    id?: string
    placeholder?: string
    labels?: { currency?: string }
    ariaLabel?: string
    ariaInvalid?: boolean
    ariaDescribedby?: string
  }>(),
  {
    modelValue: undefined,
    currency: undefined,
    defaultCurrency: "EUR",
    min: 0,
    step: 1,
    labels: () => ({}),
    ariaInvalid: undefined,
  },
)

const emit = defineEmits<{
  "update:modelValue": [value: number | null]
  "update:currency": [currency: string]
}>()

const locale = computed(
  () => props.locale ?? (typeof navigator === "undefined" ? "en-US" : navigator.language),
)

const uncontrolledCurrency = ref(props.defaultCurrency)
const currency = computed(() => props.currency ?? uncontrolledCurrency.value)

const format = computed<Intl.NumberFormatOptions>(() => ({
  style: "currency",
  currency: currency.value,
  ...(props.fractionDigits === undefined
    ? {}
    : {
        minimumFractionDigits: props.fractionDigits,
        maximumFractionDigits: props.fractionDigits,
      }),
}))

const names = computed(() => {
  try {
    return new Intl.DisplayNames([locale.value], { type: "currency" })
  } catch {
    return null
  }
})

function symbol(code: string) {
  return (
    new Intl.NumberFormat(locale.value, {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
    })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value ?? code
  )
}

const placeholderText = computed(
  () => props.placeholder ?? new Intl.NumberFormat(locale.value, format.value).format(0),
)

function onValue(next: number | undefined) {
  emit("update:modelValue", next ?? null)
}

function onCurrency(code: unknown) {
  if (typeof code !== "string" || !code) return
  uncontrolledCurrency.value = code
  emit("update:currency", code)
}

// Reka steps by ten on Page Up / Page Down; Shift + arrow does the same here, like Base UI.
function onShiftArrow(event: KeyboardEvent) {
  if (!event.shiftKey || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) return
  event.preventDefault()
  event.stopImmediatePropagation()
  event.target?.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: event.key === "ArrowUp" ? "PageUp" : "PageDown",
      bubbles: true,
      cancelable: true,
    }),
  )
}

const groupClassName = [
  "relative flex h-8 w-full min-w-0 items-center rounded-2xl border border-border bg-transparent transition-colors",
  "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
  "has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
]
</script>

<template>
  <NumberFieldRoot
    data-slot="currency-input"
    :model-value="modelValue"
    :default-value="defaultValue"
    :min="min"
    :max="max"
    :step="step"
    :format-options="format"
    :locale="locale"
    :name="name"
    :disabled="disabled"
    :required="required"
    :id="id"
    class="w-full"
    @update:model-value="onValue"
  >
    <div :data-disabled="disabled ? '' : undefined" :class="cn(groupClassName, props.class)">
      <NumberFieldInput
        :aria-label="ariaLabel"
        :aria-invalid="ariaInvalid"
        :aria-describedby="ariaDescribedby"
        :placeholder="placeholderText"
        class="h-full min-w-0 flex-1 bg-transparent px-3 text-xs tabular-nums outline-none placeholder:text-muted-foreground/70"
        @keydown.capture="onShiftArrow"
      />
      <template v-if="currencies?.length">
        <span aria-hidden="true" class="h-4 w-px shrink-0 bg-border" />
        <SelectRoot
          :model-value="currency"
          :disabled="disabled"
          :name="currencyName"
          @update:model-value="onCurrency"
        >
          <SelectTrigger
            :aria-label="labels.currency ?? `Currency: ${names?.of(currency) ?? currency}`"
            class="flex h-full shrink-0 items-center gap-1 rounded-e-2xl ps-2 pe-2.5 font-mono text-[11px] text-muted-foreground outline-none hover:bg-muted/60 hover:text-foreground focus-visible:bg-muted"
          >
            {{ currency }}
            <ChevronDown aria-hidden="true" class="size-3.5" />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent
              position="popper"
              side="bottom"
              align="end"
              :side-offset="6"
              class="relative isolate z-50 flex max-h-72 min-w-52 origin-(--reka-select-content-transform-origin) flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 dark:ring-foreground/10"
            >
              <SelectViewport class="min-h-0 flex-1 scroll-fade overflow-y-auto p-1">
                <SelectItem
                  v-for="code in currencies"
                  :key="code"
                  :value="code"
                  class="relative flex min-h-7 cursor-pointer items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                >
                  <span class="w-6 shrink-0 text-center text-muted-foreground">{{ symbol(code) }}</span>
                  <SelectItemText class="flex-1 truncate">{{ names?.of(code) ?? code }}</SelectItemText>
                  <span class="font-mono text-[11px] text-muted-foreground">{{ code }}</span>
                  <SelectItemIndicator class="absolute end-2 flex size-4 items-center justify-center">
                    <Check class="size-3.5" />
                  </SelectItemIndicator>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </template>
      <input v-else-if="currencyName" type="hidden" :name="currencyName" :value="currency" />
    </div>
  </NumberFieldRoot>
</template>
