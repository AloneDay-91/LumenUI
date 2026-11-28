<script setup lang="ts" generic="T">
import { computed, ref, shallowRef, type HTMLAttributes } from "vue"
import { GripVertical } from "@lucide/vue"

import { cn } from "@/lib/utils"
import { defaultMessages, move, type Messages } from "./messages"

/**
 * A list you reorder by dragging the grip, or from the keyboard: focus the
 * grip, Space to pick up, arrows to move, Space to drop, Escape to cancel.
 */
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  items: T[]
  getKey: (item: T) => string
  /** Plain-text name of an item, for the grip label and announcements. */
  getLabel: (item: T) => string
  class?: HTMLAttributes["class"]
  messages?: Partial<Messages>
  ariaLabel?: string
}>()

const emit = defineEmits<{
  "update:items": [items: T[]]
  reorder: [items: T[]]
}>()

defineSlots<{
  default?: (props: { item: T; index: number }) => unknown
}>()

const messages = computed<Messages>(() => ({ ...defaultMessages, ...props.messages }))
const announcement = ref("")
// Keyboard: the list as it was when the item was picked up, for Escape.
const picked = shallowRef<{ key: string; original: T[] } | null>(null)
// Pointer: the dragged key and the index it would land at.
const drag = ref<{ key: string; over: number } | null>(null)
const rowRefs = new Map<string, HTMLLIElement>()
const handleRefs = new Map<string, HTMLButtonElement>()

const total = computed(() => props.items.length)

function reorder(next: T[]) {
  emit("update:items", next)
  emit("reorder", next)
}

function focusHandle(key: string) {
  requestAnimationFrame(() => handleRefs.get(key)?.focus())
}

function setRow(key: string, node: unknown) {
  if (node) rowRefs.set(key, node as HTMLLIElement)
  else rowRefs.delete(key)
}
function setHandle(key: string, node: unknown) {
  if (node) handleRefs.set(key, node as HTMLButtonElement)
  else handleRefs.delete(key)
}

function onHandleKeyDown(event: KeyboardEvent, item: T, index: number) {
  const key = props.getKey(item)
  const label = props.getLabel(item)
  const count = total.value

  if (event.key === " " || event.key === "Enter") {
    event.preventDefault()
    if (picked.value?.key === key) {
      picked.value = null
      announcement.value = messages.value.dropped(label, index + 1, count)
    } else {
      picked.value = { key, original: props.items }
      announcement.value = messages.value.picked(label, index + 1, count)
    }
    return
  }

  const current = picked.value
  if (current?.key !== key) return

  if (event.key === "Escape") {
    event.preventDefault()
    reorder(current.original)
    picked.value = null
    announcement.value = messages.value.cancelled(label)
    focusHandle(key)
    return
  }

  const target =
    event.key === "ArrowUp"
      ? index - 1
      : event.key === "ArrowDown"
        ? index + 1
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? count - 1
            : null
  if (target === null) return
  event.preventDefault()
  const to = Math.max(0, Math.min(count - 1, target))
  if (to === index) return
  reorder(move(props.items, index, to))
  announcement.value = messages.value.moved(label, to + 1, count)
  focusHandle(key)
}

function onHandleBlur(key: string) {
  if (picked.value?.key !== key) return
  // Moving the row in the DOM blurs it for a frame; drop only if focus really left.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      if (document.activeElement !== handleRefs.get(key)) picked.value = null
    }),
  )
}

function onPointerDown(event: PointerEvent, item: T, index: number) {
  if (event.button !== 0) return
  event.preventDefault()
  const key = props.getKey(item)
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  drag.value = { key, over: index }
  const items = props.items
  const count = total.value

  // The index the item lands at: how many of the other rows sit above the pointer.
  const overIndex = (y: number) =>
    items.filter((candidate) => {
      if (props.getKey(candidate) === key) return false
      const rect = rowRefs.get(props.getKey(candidate))?.getBoundingClientRect()
      return rect ? y > rect.top + rect.height / 2 : false
    }).length

  const onMove = (moveEvent: PointerEvent) => {
    drag.value = { key, over: overIndex(moveEvent.clientY) }
  }
  const onUp = (upEvent: PointerEvent) => {
    window.removeEventListener("pointermove", onMove)
    window.removeEventListener("pointerup", onUp)
    const to = overIndex(upEvent.clientY)
    drag.value = null
    if (to !== index) {
      reorder(move(items, index, to))
      announcement.value = messages.value.dropped(props.getLabel(item), to + 1, count)
    }
  }
  window.addEventListener("pointermove", onMove)
  window.addEventListener("pointerup", onUp)
}

const dragIndex = computed(() => {
  const current = drag.value
  return current ? props.items.findIndex((item) => props.getKey(item) === current.key) : -1
})

const rows = computed(() =>
  props.items.map((item, index) => {
    const key = props.getKey(item)
    const isPicked = picked.value?.key === key
    const isDragged = drag.value?.key === key
    const d = drag.value
    const showLineBefore = !!d && !isDragged && d.over === index && d.over < dragIndex.value
    const showLineAfter = !!d && !isDragged && d.over === index && d.over > dragIndex.value
    return { item, index, key, isPicked, isDragged, showLineBefore, showLineAfter }
  }),
)

const rowClass =
  "relative flex items-center gap-2 rounded-2xl bg-card py-2 ps-1.5 pe-3 text-xs ring-1 ring-foreground/5 transition-[box-shadow,opacity] dark:ring-foreground/10"
const rowStateClass = "data-picked:ring-2 data-picked:ring-ring/50 data-dragging:opacity-50"
const lineBeforeClass =
  "before:absolute before:inset-x-2 before:-top-1 before:h-0.5 before:rounded-full before:bg-ring"
const lineAfterClass =
  "after:absolute after:inset-x-2 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-ring"
</script>

<template>
  <!-- Two roots, like the React fragment: other attributes go on the list. -->
  <ul
    v-bind="$attrs"
    data-slot="sortable-list"
    :aria-label="ariaLabel"
    :class="cn('m-0 flex list-none flex-col gap-1.5 p-0', props.class)"
  >
    <li
      v-for="state in rows"
      :key="state.key"
      :ref="(node) => setRow(state.key, node)"
      data-slot="sortable-list-item"
      :data-picked="state.isPicked ? '' : undefined"
      :data-dragging="state.isDragged ? '' : undefined"
      :class="
        cn(
          rowClass,
          rowStateClass,
          state.showLineBefore && lineBeforeClass,
          state.showLineAfter && lineAfterClass,
        )
      "
    >
      <button
        :ref="(node) => setHandle(state.key, node)"
        type="button"
        :aria-label="messages.handle(getLabel(state.item))"
        :aria-pressed="state.isPicked"
        class="flex size-6 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 active:cursor-grabbing"
        @keydown="onHandleKeyDown($event, state.item, state.index)"
        @blur="onHandleBlur(state.key)"
        @pointerdown="onPointerDown($event, state.item, state.index)"
      >
        <GripVertical aria-hidden="true" class="size-3.5" />
      </button>
      <div class="min-w-0 flex-1">
        <slot :item="state.item" :index="state.index">{{ getLabel(state.item) }}</slot>
      </div>
    </li>
  </ul>
  <div role="status" aria-live="assertive" class="sr-only">
    {{ announcement }}
  </div>
</template>
