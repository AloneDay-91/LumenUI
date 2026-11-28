<script setup lang="ts">
import { computed, provide, ref, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import TreeViewNode from "./TreeViewNode.vue"
import { TreeViewContextKey, flatten, type TreeItem, type VisibleItem } from "./context"

const props = withDefaults(
  defineProps<{
    items: TreeItem[]
    /** Selected id when v-model is not bound. */
    defaultValue?: string | null
    /** Open ids when v-model:expanded is not bound. */
    defaultExpanded?: string[]
    class?: HTMLAttributes["class"]
  }>(),
  { defaultValue: null, defaultExpanded: () => [] },
)

const emit = defineEmits<{
  /** Fires with the item on every selection, like React's onValueChange(id, item). */
  select: [id: string, item: TreeItem]
}>()

/** The selected item id. */
const value = defineModel<string | null | undefined>({ default: undefined })
/** The ids of the open branches. */
const expanded = defineModel<string[] | undefined>("expanded", { default: undefined })

const uncontrolledValue = ref<string | null>(props.defaultValue)
const uncontrolledExpanded = ref<string[]>(props.defaultExpanded)

const selected = computed(() => (value.value !== undefined ? value.value : uncontrolledValue.value))
const open = computed(() => new Set(expanded.value ?? uncontrolledExpanded.value))
const visible = computed(() => flatten(props.items, open.value))
const focusedId = ref<string | null>(null)
const refs = new Map<string, HTMLLIElement>()

const tabStop = computed(
  () =>
    visible.value.find((entry) => entry.item.id === focusedId.value)?.item.id ??
    visible.value.find((entry) => entry.item.id === selected.value)?.item.id ??
    visible.value[0]?.item.id,
)

function setOpen(id: string, next: boolean) {
  const list = new Set(open.value)
  if (next) list.add(id)
  else list.delete(id)
  const result = Array.from(list)
  uncontrolledExpanded.value = result
  expanded.value = result
}

function select(item: TreeItem) {
  if (item.disabled) return
  uncontrolledValue.value = item.id
  value.value = item.id
  emit("select", item.id, item)
}

function focus(id: string | undefined | null) {
  if (!id) return
  focusedId.value = id
  refs.get(id)?.focus()
}

function onKeydown(event: KeyboardEvent, entry: VisibleItem) {
  const list = visible.value
  const index = list.findIndex((candidate) => candidate.item.id === entry.item.id)
  const { item } = entry
  const hasChildren = Boolean(item.children?.length)
  const isOpen = open.value.has(item.id)
  const rtl = getComputedStyle(event.currentTarget as Element).direction === "rtl"
  const forward = rtl ? "ArrowLeft" : "ArrowRight"
  const back = rtl ? "ArrowRight" : "ArrowLeft"

  switch (event.key) {
    case "ArrowDown":
      focus(list[index + 1]?.item.id)
      break
    case "ArrowUp":
      focus(list[index - 1]?.item.id)
      break
    case "Home":
      focus(list[0]?.item.id)
      break
    case "End":
      focus(list[list.length - 1]?.item.id)
      break
    case forward:
      if (hasChildren && !isOpen) setOpen(item.id, true)
      else if (hasChildren) focus(list[index + 1]?.item.id)
      break
    case back:
      if (hasChildren && isOpen) setOpen(item.id, false)
      else focus(entry.parentId)
      break
    case "Enter":
    case " ":
      select(item)
      if (hasChildren && event.key === "Enter") setOpen(item.id, !isOpen)
      break
    default: {
      if (event.key.length !== 1 || event.metaKey || event.ctrlKey) return
      const char = event.key.toLowerCase()
      const ordered = [...list.slice(index + 1), ...list.slice(0, index + 1)]
      const match = ordered.find((candidate) =>
        (candidate.item.textValue ?? candidate.item.label).toLowerCase().startsWith(char),
      )
      focus(match?.item.id)
      break
    }
  }
  event.preventDefault()
  event.stopPropagation()
}

provide(TreeViewContextKey, {
  visible,
  open,
  selected,
  tabStop,
  register(id, node) {
    if (node) refs.set(id, node)
    else refs.delete(id)
  },
  setFocused(id) {
    focusedId.value = id
  },
  onKeydown,
  onRowClick(item) {
    focus(item.id)
    select(item)
    if (item.children?.length) setOpen(item.id, !open.value.has(item.id))
  },
})
</script>

<template>
  <ul role="tree" data-slot="tree-view" :class="cn('m-0 flex list-none flex-col p-0', props.class)">
    <TreeViewNode v-for="item in items" :key="item.id" :item="item" :level="1" />
  </ul>
</template>
