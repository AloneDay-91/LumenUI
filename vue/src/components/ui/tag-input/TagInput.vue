<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue"
import { X } from "@lucide/vue"

import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    defaultValue?: string[]
    max?: number
    allowDuplicates?: boolean
    removeLabel?: (tag: string) => string
    placeholder?: string
    disabled?: boolean
    id?: string
    name?: string
    ariaInvalid?: boolean
    ariaLabel?: string
    ariaLabelledby?: string
    ariaDescribedby?: string
  }>(),
  {
    defaultValue: () => [],
    allowDuplicates: false,
    removeLabel: (tag: string) => `Remove ${tag}`,
    ariaInvalid: undefined,
  },
)

const emit = defineEmits<{ valueChange: [value: string[]] }>()

/** The tags. Works with or without v-model; `defaultValue` seeds it when uncontrolled. */
const model = defineModel<string[]>()

const inputRef = ref<HTMLInputElement | null>(null)
const draft = ref("")
const tags = computed(() => model.value ?? props.defaultValue)
const full = computed(() => props.max !== undefined && tags.value.length >= props.max)

function splitTags(text: string) {
  return text
    .split(/[,\n]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function commit(next: string[]) {
  model.value = next
  emit("valueChange", next)
}

function add(candidates: string[]) {
  const next = [...tags.value]
  for (const tag of candidates) {
    if (props.max !== undefined && next.length >= props.max) break
    if (!props.allowDuplicates && next.includes(tag)) continue
    next.push(tag)
  }
  if (next.length !== tags.value.length) commit(next)
}

function remove(index: number) {
  commit(tags.value.filter((_, i) => i !== index))
  inputRef.value?.focus()
}

function onKeyDown(event: KeyboardEvent) {
  if ((event.key === "Enter" || event.key === ",") && draft.value.trim() !== "") {
    event.preventDefault()
    add(splitTags(draft.value))
    draft.value = ""
  } else if (event.key === "Backspace" && draft.value === "" && tags.value.length > 0) {
    event.preventDefault()
    remove(tags.value.length - 1)
  }
}

function onBlur() {
  if (draft.value.trim() !== "") {
    add(splitTags(draft.value))
    draft.value = ""
  }
}

function onPaste(event: ClipboardEvent) {
  const text = event.clipboardData?.getData("text") ?? ""
  if (/[,\n]/.test(text)) {
    event.preventDefault()
    add(splitTags(draft.value + text))
    draft.value = ""
  }
}

function onRootClick(event: MouseEvent) {
  if (event.target === event.currentTarget) inputRef.value?.focus()
}

defineExpose({ input: inputRef })
</script>

<template>
  <div
    data-slot="tag-input"
    :data-disabled="disabled ? '' : undefined"
    :aria-invalid="ariaInvalid"
    :class="
      cn(
        'flex min-h-8 w-full min-w-0 flex-wrap items-center gap-1 rounded-2xl border border-border bg-transparent px-1.5 py-1 text-xs transition-colors',
        'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30',
        'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        props.class,
      )
    "
    @click="onRootClick"
  >
    <span
      v-for="(tag, index) in tags"
      :key="`${tag}-${index}`"
      data-slot="tag-input-tag"
      class="inline-flex h-5 max-w-full items-center gap-0.5 rounded-2xl bg-background ps-2 pe-0.5 font-medium ring-1 ring-foreground/5 dark:bg-secondary"
    >
      <span class="truncate">{{ tag }}</span>
      <button
        type="button"
        :aria-label="removeLabel(tag)"
        :disabled="disabled"
        class="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
        @click="remove(index)"
      >
        <X class="size-3" />
      </button>
      <input v-if="name" type="hidden" :name="name" :value="tag" />
    </span>
    <input
      :id="id"
      ref="inputRef"
      v-model="draft"
      data-slot="tag-input-input"
      :disabled="disabled || full"
      :placeholder="tags.length === 0 ? placeholder : undefined"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="ariaInvalid"
      class="h-6 min-w-16 flex-1 bg-transparent px-1.5 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      @keydown="onKeyDown"
      @blur="onBlur"
      @paste="onPaste"
    />
  </div>
</template>
