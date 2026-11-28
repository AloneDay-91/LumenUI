<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue"
import { Upload } from "@lucide/vue"

import { cn } from "@/lib/utils"
import { matchesAccept, type FileRejection } from "./utils"

const props = withDefaults(
  defineProps<{
    accept?: string
    multiple?: boolean
    /** Largest accepted file, in bytes. */
    maxSize?: number
    disabled?: boolean
    name?: string
    id?: string
    class?: HTMLAttributes["class"]
  }>(),
  { multiple: false },
)

const emit = defineEmits<{
  filesChange: [files: File[]]
  reject: [rejections: FileRejection[]]
}>()

const dragging = ref(false)
let depth = 0

function handle(list: FileList | null | undefined) {
  if (!list || props.disabled) return
  const accepted: File[] = []
  const rejected: FileRejection[] = []
  for (const file of Array.from(list)) {
    if (!matchesAccept(file, props.accept)) rejected.push({ file, reason: "type" })
    else if (props.maxSize !== undefined && file.size > props.maxSize) rejected.push({ file, reason: "size" })
    else accepted.push(file)
  }
  const files = props.multiple ? accepted : accepted.slice(0, 1)
  if (files.length > 0) emit("filesChange", files)
  if (rejected.length > 0) emit("reject", rejected)
}

function onDragEnter(event: DragEvent) {
  event.preventDefault()
  depth += 1
  if (!props.disabled) dragging.value = true
}

function onDragLeave() {
  depth -= 1
  if (depth <= 0) {
    depth = 0
    dragging.value = false
  }
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  depth = 0
  dragging.value = false
  handle(event.dataTransfer?.files)
}

function onChange(event: Event) {
  const input = event.target as HTMLInputElement
  handle(input.files)
  input.value = ""
}
</script>

<template>
  <label
    data-slot="file-upload"
    :data-dragging="dragging ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :class="
      cn(
        'flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[min(var(--radius-4xl),24px)] border border-dashed border-border bg-input/20 px-6 py-8 text-center text-xs text-muted-foreground transition-colors',
        'hover:bg-input/40 has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/30',
        'data-dragging:border-ring data-dragging:bg-input/50',
        'data-disabled:pointer-events-none data-disabled:opacity-50 dark:bg-input/10',
        props.class,
      )
    "
    @dragenter="onDragEnter"
    @dragover.prevent
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <input
      :id="id"
      type="file"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="sr-only"
      @change="onChange"
    />
    <slot>
      <Upload aria-hidden="true" class="size-5 text-foreground" />
      <span><span class="font-medium text-foreground">Click to upload</span> or drag and drop</span>
    </slot>
  </label>
</template>
