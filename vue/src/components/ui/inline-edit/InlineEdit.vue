<script setup lang="ts">
import { computed, nextTick, ref, type HTMLAttributes } from "vue"
import { Pencil } from "@lucide/vue"

import { cn } from "@/lib/utils"

/**
 * Text that turns into a field when clicked. Enter or leaving the field
 * saves, Escape cancels, and focus goes back to the text either way. Empty
 * values are refused unless `allowEmpty` is set.
 */
const props = withDefaults(
  defineProps<{
    defaultValue?: string
    /** Shown when the value is empty. */
    placeholder?: string
    allowEmpty?: boolean
    disabled?: boolean
    maxLength?: number
    /**
     * Names both the text button and the field, e.g. "Project name". Required
     * in practice: optional in the type only so `aria-label="…"` type-checks.
     */
    ariaLabel?: string
    class?: HTMLAttributes["class"]
    inputClass?: HTMLAttributes["class"]
  }>(),
  { defaultValue: "", placeholder: "Empty", allowEmpty: false, disabled: false }
)

/** Updated once per save, with the new value. Not updated when nothing changed. */
const model = defineModel<string>()

const uncontrolled = ref(props.defaultValue)
const value = computed(() => model.value ?? uncontrolled.value)
const editing = ref(false)
const draft = ref(value.value)
const buttonRef = ref<HTMLButtonElement>()
const inputRef = ref<HTMLInputElement>()
// Escape and Enter both end editing; the blur that follows must not save again.
let done = false

async function start() {
  if (props.disabled) return
  done = false
  draft.value = value.value
  editing.value = true
  await nextTick()
  inputRef.value?.focus()
  inputRef.value?.select()
}

function finish(save: boolean) {
  if (done) return
  done = true
  const next = draft.value.trim()
  if (save && next !== value.value && (props.allowEmpty || next !== "")) {
    uncontrolled.value = next
    model.value = next
  }
  editing.value = false
  requestAnimationFrame(() => buttonRef.value?.focus())
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    event.preventDefault()
    finish(true)
  } else if (event.key === "Escape") {
    event.preventDefault()
    finish(false)
  }
}

const shared = "-mx-1.5 rounded-lg px-1.5 py-0.5 text-[length:inherit] leading-[inherit] font-[inherit]"
</script>

<template>
  <input
    v-if="editing"
    ref="inputRef"
    v-model="draft"
    data-slot="inline-edit-input"
    :aria-label="ariaLabel"
    :maxlength="maxLength"
    :placeholder="placeholder"
    :class="
      cn(
        shared,
        'w-full min-w-0 bg-input/50 text-foreground ring-3 ring-ring/30 outline-none placeholder:text-muted-foreground',
        props.class,
        inputClass,
      )
    "
    @keydown="onKeydown"
    @blur="finish(true)"
  />
  <button
    v-else
    ref="buttonRef"
    type="button"
    data-slot="inline-edit"
    :aria-label="ariaLabel ? `${ariaLabel}: ${value || placeholder}` : undefined"
    :disabled="disabled"
    :class="
      cn(
        shared,
        'group/inline-edit inline-flex max-w-full items-center gap-1.5 text-start outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none',
        !value && 'text-muted-foreground',
        props.class,
      )
    "
    @click="start"
  >
    <span class="min-w-0 truncate">{{ value || placeholder }}</span>
    <Pencil
      aria-hidden="true"
      class="size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/inline-edit:opacity-100 group-focus-visible/inline-edit:opacity-100"
    />
  </button>
</template>
