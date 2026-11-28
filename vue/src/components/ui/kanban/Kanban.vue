<script setup lang="ts" generic="T">
import { computed, ref, type ComponentPublicInstance, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import {
  defaultKanbanMessages,
  locate,
  moveCard,
  type KanbanColumn,
  type KanbanLocation,
  type KanbanMessages,
  type KanbanValue,
} from "."

/**
 * Columns of cards you move by dragging, or from the keyboard: focus a card,
 * Space to pick it up, arrows to move it within and across columns, Space to
 * drop, Escape to cancel. Each move is announced.
 */
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    columns: KanbanColumn[]
    getKey: (item: T) => string
    /** Plain-text name of a card, for announcements. */
    getLabel: (item: T) => string
    messages?: Partial<KanbanMessages>
    ariaLabel?: string
  }>(),
  { ariaLabel: "Board" }
)

/** Cards per column id, in order. */
const model = defineModel<KanbanValue<T>>({ required: true })

defineSlots<{
  /** One card. */
  card(props: { item: T }): unknown
  /** The column header title. Defaults to `column.title`. */
  "column-title"?(props: { column: KanbanColumn }): unknown
  /** Under each column's cards: an add button, a total. */
  "column-footer"?(props: { column: KanbanColumn }): unknown
}>()

const messages = computed<KanbanMessages>(() => ({ ...defaultKanbanMessages, ...props.messages }))
const announcement = ref("")
const picked = ref<{ key: string; original: KanbanValue<T> } | null>(null)
const drag = ref<{ key: string; over: KanbanLocation } | null>(null)
const columnRefs = new Map<string, HTMLElement>()
const cardRefs = new Map<string, HTMLElement>()

function setRef(map: Map<string, HTMLElement>, key: string, el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLElement) {
    map.set(key, el)
    return
  }
  // A card moved to an earlier column mounts its new element before the old one
  // unmounts, so only forget the key once the patch is over and nothing replaced it.
  queueMicrotask(() => {
    if (map.get(key)?.isConnected === false) map.delete(key)
  })
}

const columnLabel = (id: string) => {
  const column = props.columns.find((c) => c.id === id)
  return column?.label ?? column?.title ?? id
}

// A keyboard move remounts the card in its new column, which blurs it.
// While that happens, the blur must not drop the card.
let moving = false
const focusCard = (key: string) => {
  moving = true
  requestAnimationFrame(() => {
    cardRefs.get(key)?.focus()
    moving = false
  })
}

function onCardKeyDown(event: KeyboardEvent, item: T) {
  if (event.target !== event.currentTarget) return
  const value = model.value
  const key = props.getKey(item)
  const label = props.getLabel(item)
  const at = locate(value, key, props.getKey)
  if (!at) return
  const total = (column: string) => value[column]?.length ?? 0

  if (event.key === " " || event.key === "Enter") {
    event.preventDefault()
    if (picked.value?.key === key) {
      picked.value = null
      announcement.value = messages.value.dropped(label, columnLabel(at.column), at.index + 1, total(at.column))
    } else {
      picked.value = { key, original: value }
      announcement.value = messages.value.picked(label, columnLabel(at.column), at.index + 1, total(at.column))
    }
    return
  }
  if (picked.value?.key !== key) return

  if (event.key === "Escape") {
    event.preventDefault()
    model.value = picked.value.original
    picked.value = null
    announcement.value = messages.value.cancelled(label)
    focusCard(key)
    return
  }

  const rtl = getComputedStyle(event.currentTarget as HTMLElement).direction === "rtl"
  const columnIndex = props.columns.findIndex((c) => c.id === at.column)
  let to: KanbanLocation | null = null
  if (event.key === "ArrowUp") to = { column: at.column, index: at.index - 1 }
  else if (event.key === "ArrowDown") to = { column: at.column, index: at.index + 1 }
  else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    const step = (event.key === "ArrowRight") !== rtl ? 1 : -1
    const column = props.columns[columnIndex + step]
    if (column) to = { column: column.id, index: Math.min(at.index, total(column.id)) }
  }
  if (!to) return
  event.preventDefault()
  const sameColumn = to.column === at.column
  const max = sameColumn ? total(to.column) - 1 : total(to.column)
  to.index = Math.max(0, Math.min(max, to.index))
  if (sameColumn && to.index === at.index) return
  model.value = moveCard(value, at, to)
  announcement.value = messages.value.moved(
    label,
    columnLabel(to.column),
    to.index + 1,
    total(to.column) + (sameColumn ? 0 : 1)
  )
  focusCard(key)
}

function onCardPointerDown(event: PointerEvent, item: T) {
  if (event.button !== 0) return
  // Leave links, buttons, and fields inside a card alone.
  if ((event.target as HTMLElement).closest("a, button, input, textarea, select, [role=button]")) return
  const key = props.getKey(item)
  const start = { x: event.clientX, y: event.clientY }
  let dragging = false

  const target = (x: number, y: number): KanbanLocation | null => {
    for (const column of props.columns) {
      const rect = columnRefs.get(column.id)?.getBoundingClientRect()
      if (!rect || x < rect.left || x > rect.right) continue
      const index = (model.value[column.id] ?? []).filter((candidate) => {
        if (props.getKey(candidate) === key) return false
        const card = cardRefs.get(props.getKey(candidate))?.getBoundingClientRect()
        return card ? y > card.top + card.height / 2 : false
      }).length
      return { column: column.id, index }
    }
    return null
  }

  const cleanup = () => {
    window.removeEventListener("pointermove", onMove)
    window.removeEventListener("pointerup", onUp)
    window.removeEventListener("pointercancel", onCancel)
    drag.value = null
  }
  const onMove = (move: PointerEvent) => {
    if (!dragging) {
      // A few pixels of travel before it counts as a drag, so clicks stay clicks.
      if (Math.hypot(move.clientX - start.x, move.clientY - start.y) < 5) return
      dragging = true
    }
    const over = target(move.clientX, move.clientY)
    if (over) drag.value = { key, over }
  }
  const onUp = (up: PointerEvent) => {
    cleanup()
    if (!dragging) return
    const value = model.value
    const from = locate(value, key, props.getKey)
    const to = target(up.clientX, up.clientY)
    if (!from || !to || (from.column === to.column && from.index === to.index)) return
    model.value = moveCard(value, from, to)
    const total = (value[to.column]?.length ?? 0) + (from.column === to.column ? 0 : 1)
    announcement.value = messages.value.dropped(props.getLabel(item), columnLabel(to.column), to.index + 1, total)
  }
  const onCancel = () => cleanup()
  window.addEventListener("pointermove", onMove)
  window.addEventListener("pointerup", onUp)
  window.addEventListener("pointercancel", onCancel)
}

function onCardBlur(key: string) {
  if (picked.value?.key !== key || moving) return
  // Moving the card in the DOM blurs it for a frame; drop only if focus really left.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      if (moving) return
      if (document.activeElement !== cardRefs.get(key)) picked.value = null
    })
  )
}

const board = computed(() =>
  props.columns.map((column) => {
    const items = model.value[column.id] ?? []
    const over = drag.value?.over.column === column.id
    // Where the drop line goes: before the card at `over.index`, skipping the dragged one.
    const others = items.filter((item) => props.getKey(item) !== drag.value?.key)
    const lineBefore = over && drag.value ? others[drag.value.over.index] : undefined
    return {
      column,
      items,
      over,
      lineBeforeKey: lineBefore === undefined ? undefined : props.getKey(lineBefore),
    }
  })
)

const cardClassName =
  "relative cursor-grab touch-none rounded-2xl bg-card p-3 text-xs text-card-foreground ring-1 ring-foreground/5 transition-[box-shadow,opacity] outline-none select-none active:cursor-grabbing dark:ring-foreground/10 focus-visible:ring-3 focus-visible:ring-ring/30 data-picked:ring-2 data-picked:ring-ring/60 data-dragging:opacity-40"
const lineClassName =
  "before:absolute before:inset-x-2 before:-top-1 before:h-0.5 before:rounded-full before:bg-ring"
</script>

<template>
  <div
    v-bind="$attrs"
    role="group"
    :aria-label="ariaLabel"
    data-slot="kanban"
    :class="cn('flex w-full gap-3 overflow-x-auto pb-1', props.class)"
  >
    <section
      v-for="entry in board"
      :key="entry.column.id"
      :ref="(el) => setRef(columnRefs, entry.column.id, el)"
      data-slot="kanban-column"
      :data-over="entry.over ? '' : undefined"
      :aria-label="columnLabel(entry.column.id)"
      class="flex w-64 shrink-0 flex-col gap-2 rounded-[min(var(--radius-4xl),24px)] bg-muted/50 p-2 transition-colors data-over:bg-muted"
    >
      <header class="flex items-center justify-between gap-2 px-1.5 pt-1">
        <h3 class="m-0 truncate text-xs font-medium">
          <slot name="column-title" :column="entry.column">{{ entry.column.title }}</slot>
        </h3>
        <span class="font-mono text-[11px] text-muted-foreground tabular-nums">{{ entry.items.length }}</span>
      </header>
      <ul class="m-0 flex min-h-12 list-none flex-col gap-1.5 p-0">
        <li
          v-for="item in entry.items"
          :key="getKey(item)"
          :ref="(el) => setRef(cardRefs, getKey(item), el)"
          tabindex="0"
          aria-roledescription="card"
          :aria-label="messages.card(getLabel(item))"
          data-slot="kanban-card"
          :data-picked="picked?.key === getKey(item) ? '' : undefined"
          :data-dragging="drag?.key === getKey(item) ? '' : undefined"
          :class="cn(cardClassName, entry.lineBeforeKey === getKey(item) && lineClassName)"
          @keydown="onCardKeyDown($event, item)"
          @pointerdown="onCardPointerDown($event, item)"
          @blur="onCardBlur(getKey(item))"
        >
          <slot name="card" :item="item" />
        </li>
        <li v-if="entry.over && entry.lineBeforeKey === undefined" aria-hidden="true" class="mx-2 h-0.5 rounded-full bg-ring" />
      </ul>
      <slot name="column-footer" :column="entry.column" />
    </section>
  </div>
  <span class="sr-only" aria-live="assertive">{{ announcement }}</span>
</template>
