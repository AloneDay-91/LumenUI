<script setup lang="ts">
import { computed, provide, ref, toRef, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { promptInputKey, type PromptStatus } from "./context"

/**
 * The composer: a growing textarea over a toolbar. Enter sends and
 * Shift+Enter breaks a line, or ⌘/Ctrl+Enter sends with `submit-on="mod-enter"`.
 */
const props = withDefaults(
  defineProps<{
    /** v-model. Leave it unbound to let the field keep its own text. */
    modelValue?: string
    defaultValue?: string
    status?: PromptStatus
    submitOn?: "enter" | "mod-enter"
    disabled?: boolean
    /** Listening to `@stop` turns the send button into a stop button while busy. */
    onStop?: () => void
    class?: HTMLAttributes["class"]
  }>(),
  { modelValue: undefined, defaultValue: "", status: "ready", submitOn: "enter", disabled: undefined, onStop: undefined }
)

const emit = defineEmits<{
  "update:modelValue": [value: string]
  /** Called with the trimmed text. The field clears itself after. */
  submit: [value: string]
}>()

const uncontrolled = ref(props.defaultValue)
const value = computed(() => props.modelValue ?? uncontrolled.value)

function setValue(next: string) {
  if (props.modelValue === undefined) uncontrolled.value = next
  emit("update:modelValue", next)
}

function submit() {
  const text = value.value.trim()
  if (!text || props.disabled || props.status === "submitted" || props.status === "streaming") return
  emit("submit", text)
  setValue("")
}

provide(promptInputKey, {
  value,
  setValue,
  submit,
  status: toRef(props, "status"),
  onStop: toRef(props, "onStop"),
  submitOn: toRef(props, "submitOn"),
  disabled: toRef(props, "disabled"),
})
</script>

<template>
  <form
    data-slot="prompt-input"
    :data-status="status"
    :class="
      cn(
        'flex w-full flex-col gap-1 rounded-3xl border border-border bg-card p-2 transition-colors',
        'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30',
        props.class,
      )
    "
    @submit.prevent="submit"
  >
    <slot />
  </form>
</template>
