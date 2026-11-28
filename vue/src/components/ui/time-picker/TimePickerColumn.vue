<script setup lang="ts">
import { computed, nextTick, onMounted } from "vue"

import { cn } from "@/lib/utils"
import type { TimeOption } from "./utils"

/** One scrolling column. A listbox with roving focus: arrows, Home, End. */
const props = defineProps<{
  label: string
  options: TimeOption[]
  selected: number | undefined
  autoFocus?: boolean
}>()

const emit = defineEmits<{ select: [value: number, commit: boolean] }>()

const refs: (HTMLButtonElement | null)[] = []

const tabIndex = computed(() => {
  const index = props.options.findIndex((option) => option.value === props.selected)
  return index === -1 ? 0 : index
})

onMounted(async () => {
  await nextTick()
  // Only on open: later selections keep the column where the user left it.
  const node = refs[tabIndex.value]
  node?.scrollIntoView({ block: "center" })
  if (props.autoFocus) node?.focus({ preventScroll: true })
})

function move(index: number) {
  const next = Math.max(0, Math.min(props.options.length - 1, index))
  refs[next]?.focus()
  refs[next]?.scrollIntoView({ block: "nearest" })
}

function onKeydown(event: KeyboardEvent, index: number, value: number) {
  const keys: Record<string, number> = {
    ArrowDown: index + 1,
    ArrowUp: index - 1,
    Home: 0,
    End: props.options.length - 1,
  }
  if (event.key in keys) {
    event.preventDefault()
    move(keys[event.key]!)
  } else if (event.key === "Enter" || event.key === " ") {
    event.preventDefault()
    emit("select", value, event.key === "Enter")
  }
}

const optionClass = cn(
  "flex h-7 shrink-0 items-center justify-center rounded-xl font-mono text-xs tabular-nums outline-none",
  "hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30",
)
const selectedClass = "bg-primary text-primary-foreground hover:bg-primary/90"
</script>

<template>
  <div
    role="listbox"
    :aria-label="label"
    data-slot="time-picker-column"
    class="flex max-h-56 w-14 flex-col gap-0.5 scroll-fade overflow-y-auto overscroll-contain p-1 [scrollbar-width:none]"
  >
    <button
      v-for="(option, index) in options"
      :key="option.value"
      :ref="(node) => { refs[index] = node as HTMLButtonElement | null }"
      type="button"
      role="option"
      :aria-selected="option.value === selected"
      :tabindex="index === tabIndex ? 0 : -1"
      :class="cn(optionClass, option.value === selected && selectedClass)"
      @click="emit('select', option.value, true)"
      @keydown="onKeydown($event, index, option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
