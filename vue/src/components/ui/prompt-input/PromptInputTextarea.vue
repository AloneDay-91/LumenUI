<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { usePromptInput } from "./context"

const props = withDefaults(
  defineProps<{
    placeholder?: string
    /** Height cap before the field scrolls. */
    maxRows?: number
    class?: HTMLAttributes["class"]
  }>(),
  { placeholder: "Ask anything…", maxRows: 8 }
)

const emit = defineEmits<{ keydown: [event: KeyboardEvent] }>()

const { value, setValue, submit, submitOn, disabled } = usePromptInput()

function onKeydown(event: KeyboardEvent) {
  // Your @keydown runs first and can preventDefault() to keep Enter.
  emit("keydown", event)
  if (event.defaultPrevented || event.key !== "Enter" || event.isComposing) return
  const mod = event.metaKey || event.ctrlKey
  const send = submitOn.value === "enter" ? !event.shiftKey : mod
  if (send) {
    event.preventDefault()
    submit()
  }
}
</script>

<template>
  <textarea
    data-slot="prompt-input-textarea"
    rows="1"
    :value="value"
    :disabled="disabled"
    :placeholder="placeholder"
    :style="{ maxHeight: `calc(${maxRows} * 1.5rem + 1rem)` }"
    :class="
      cn(
        'field-sizing-content min-h-10 w-full resize-none bg-transparent px-2.5 py-2 text-sm leading-6 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
    @input="setValue(($event.target as HTMLTextAreaElement).value)"
    @keydown="onKeydown"
  />
</template>
