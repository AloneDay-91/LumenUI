<script setup lang="ts">
import { computed, inject } from "vue"
import { ChevronRight } from "@lucide/vue"

import { cn } from "@/lib/utils"
import { TreeViewContextKey, type TreeItem } from "./context"

defineOptions({ name: "TreeViewNode" })

const props = defineProps<{ item: TreeItem; level: number }>()

const tree = inject(TreeViewContextKey)!

const entry = computed(() => tree.visible.value.find((candidate) => candidate.item.id === props.item.id))
const hasChildren = computed(() => Boolean(props.item.children?.length))
const isOpen = computed(() => tree.open.value.has(props.item.id))
const isSelected = computed(() => tree.selected.value === props.item.id)

const rowClass = cn(
  "flex h-7 cursor-pointer items-center gap-1.5 rounded-xl pe-2 text-xs select-none hover:bg-muted",
  "data-selected:bg-muted data-selected:font-medium",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
)
const itemClass =
  "outline-none [&:focus-visible>[data-slot=tree-view-row]]:ring-3 [&:focus-visible>[data-slot=tree-view-row]]:ring-ring/30"
</script>

<template>
  <li
    v-if="entry"
    :ref="(node) => tree.register(item.id, node as HTMLLIElement | null)"
    role="treeitem"
    :aria-level="level"
    :aria-posinset="entry.posinset"
    :aria-setsize="entry.setsize"
    :aria-expanded="hasChildren ? isOpen : undefined"
    :aria-selected="isSelected"
    :aria-disabled="item.disabled || undefined"
    :tabindex="item.id === tree.tabStop.value ? 0 : -1"
    data-slot="tree-view-item"
    :class="itemClass"
    @keydown="tree.onKeydown($event, entry)"
    @focus="tree.setFocused(item.id)"
  >
    <div
      data-slot="tree-view-row"
      :data-selected="isSelected ? '' : undefined"
      :data-disabled="item.disabled ? '' : undefined"
      :style="{ paddingInlineStart: `calc(${level - 1} * 1rem + 0.5rem)` }"
      :class="rowClass"
      @click="tree.onRowClick(item)"
    >
      <ChevronRight
        aria-hidden="true"
        :class="
          cn(
            'text-muted-foreground transition-transform duration-150 rtl:rotate-180',
            isOpen && 'rotate-90 rtl:rotate-90',
            !hasChildren && 'invisible',
          )
        "
      />
      <span v-if="item.icon" aria-hidden="true" class="flex text-muted-foreground">
        <component :is="item.icon" />
      </span>
      <span class="min-w-0 truncate">{{ item.label }}</span>
    </div>
    <ul v-if="hasChildren && isOpen" role="group" class="m-0 list-none p-0">
      <TreeViewNode v-for="child in item.children" :key="child.id" :item="child" :level="level + 1" />
    </ul>
  </li>
</template>
