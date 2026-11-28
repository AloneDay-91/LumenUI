<script setup lang="ts">
import { computed, nextTick, ref, type HTMLAttributes } from "vue"
import { Check, ChevronDown } from "@lucide/vue"
import {
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
import { flag, formatPhoneNumber, parsePhoneNumber, phoneCountries, type PhoneCountry } from "."

/**
 * A country picker with flags and calling codes next to a phone field. It
 * formats the number as you type and reports it in E.164 ("+33612345678").
 * Pasting an international number picks the country.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    /** E.164, "+33612345678". Empty string when cleared. Use with v-model. */
    modelValue?: string
    defaultValue?: string
    /** Controlled ISO code. Use with v-model:country. */
    country?: string
    defaultCountry?: string
    countries?: PhoneCountry[]
    /** Language for country names. Defaults to the page's. */
    locale?: string
    /** Posts the E.164 value in a hidden input. */
    name?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
    id?: string
    labels?: { country?: string }
    ariaLabel?: string
    ariaInvalid?: boolean
    ariaDescribedby?: string
  }>(),
  {
    modelValue: undefined,
    defaultValue: "",
    country: undefined,
    defaultCountry: "FR",
    countries: () => phoneCountries,
    labels: () => ({}),
    ariaInvalid: undefined,
  }
)

const emit = defineEmits<{
  "update:modelValue": [value: string, details: { country: PhoneCountry; national: string }]
  "update:country": [code: string]
}>()

const uncontrolledValue = ref(props.defaultValue)
const value = computed(() => props.modelValue ?? uncontrolledValue.value)
const uncontrolledCountry = ref(
  parsePhoneNumber(props.defaultValue, props.countries, props.defaultCountry)?.country.code ?? props.defaultCountry
)
const country = computed(() => {
  const code = props.country ?? uncontrolledCountry.value
  return props.countries.find((c) => c.code === code) ?? props.countries[0]
})

const national = computed(() => {
  const parsed = parsePhoneNumber(value.value, props.countries, country.value.code)
  return parsed && parsed.country.dial === country.value.dial ? parsed.national : ""
})
const formatted = computed(() => formatPhoneNumber(national.value, country.value.pattern))

const names = computed(() => {
  try {
    return new Intl.DisplayNames(props.locale ? [props.locale] : undefined, { type: "region" })
  } catch {
    return null
  }
})
const countryName = (code: string) => names.value?.of(code) ?? code

function emitValue(nextCountry: PhoneCountry, nextNational: string) {
  const e164 = nextNational ? `+${nextCountry.dial}${nextNational}` : ""
  uncontrolledValue.value = e164
  emit("update:modelValue", e164, { country: nextCountry, national: nextNational })
}

function setCountry(code: string) {
  uncontrolledCountry.value = code
  emit("update:country", code)
}

function pickCountry(code: unknown) {
  if (typeof code !== "string") return
  const next = props.countries.find((c) => c.code === code)
  if (!next) return
  const keep = national.value
  setCountry(code)
  emitValue(next, keep)
}

function onInput(event: Event) {
  const input = event.target as HTMLInputElement
  const raw = input.value
  const current = country.value
  let handled = false
  // A pasted international number chooses the country.
  if (raw.trim().startsWith("+") || raw.trim().startsWith("00")) {
    const found = parsePhoneNumber(`+${raw.replace(/\D/g, "").replace(/^00/, "")}`, props.countries, current.code)
    if (found) {
      if (found.country.code !== current.code) setCountry(found.country.code)
      emitValue(found.country, found.national)
      handled = true
    }
  }
  if (!handled) {
    let digits = raw.replace(/\D/g, "")
    if (current.trunkZero) digits = digits.replace(/^0/, "")
    emitValue(current, digits.slice(0, 15 - current.dial.length))
  }
  // Keep the field formatted even when the value did not change (a letter typed, say).
  nextTick(() => {
    if (input.value !== formatted.value) input.value = formatted.value
  })
}

const placeholderText = computed(
  () => props.placeholder ?? formatPhoneNumber("6".repeat(9), country.value.pattern).replace(/\d/g, "0")
)

const rootClassName =
  "group/phone relative flex h-8 w-full min-w-0 items-center rounded-2xl border border-border bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20"
const popupClassName =
  "relative isolate z-50 flex max-h-72 min-w-56 origin-(--reka-popper-transform-origin) flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 dark:ring-foreground/10"
const itemClassName =
  "relative flex min-h-7 cursor-pointer items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
</script>

<template>
  <div
    data-slot="phone-input"
    role="group"
    :aria-label="ariaLabel"
    :class="cn(rootClassName, disabled && 'pointer-events-none opacity-50', props.class)"
  >
    <SelectRoot :model-value="country.code" :disabled="disabled" @update:model-value="pickCountry">
      <SelectTrigger
        :aria-label="labels.country ?? `Country: ${countryName(country.code)}`"
        class="flex h-full shrink-0 items-center gap-1 rounded-s-2xl ps-3 pe-2 text-xs outline-none hover:bg-muted/60 focus-visible:bg-muted"
      >
        <span aria-hidden="true" class="text-sm leading-none">{{ flag(country.code) }}</span>
        <span class="font-mono text-[11px] text-muted-foreground tabular-nums">+{{ country.dial }}</span>
        <ChevronDown aria-hidden="true" class="size-3.5 text-muted-foreground" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent position="popper" side="bottom" align="start" :side-offset="6" :class="popupClassName">
          <SelectViewport class="min-h-0 flex-1 scroll-fade overflow-y-auto p-1">
            <SelectItem
              v-for="c in countries"
              :key="c.code"
              :value="c.code"
              :text-value="`${countryName(c.code)} +${c.dial}`"
              :class="itemClassName"
            >
              <span aria-hidden="true" class="text-sm leading-none">{{ flag(c.code) }}</span>
              <SelectItemText class="flex-1 truncate">{{ countryName(c.code) }}</SelectItemText>
              <span class="font-mono text-[11px] text-muted-foreground tabular-nums">+{{ c.dial }}</span>
              <SelectItemIndicator class="absolute end-2 flex size-4 items-center justify-center">
                <Check class="size-3.5" />
              </SelectItemIndicator>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <span aria-hidden="true" class="h-4 w-px shrink-0 bg-border" />

    <input
      :id="id"
      type="tel"
      inputmode="tel"
      autocomplete="tel-national"
      data-slot="input"
      :value="formatted"
      :placeholder="placeholderText"
      :disabled="disabled"
      :required="required"
      :aria-label="ariaLabel"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedby"
      class="h-full min-w-0 flex-1 bg-transparent ps-2.5 pe-3 text-xs tabular-nums outline-none placeholder:text-muted-foreground/70"
      @input="onInput"
    />
    <input v-if="name" type="hidden" :name="name" :value="value" />
  </div>
</template>
