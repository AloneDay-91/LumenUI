import type { Component, ComputedRef, InjectionKey } from "vue"

export type TreeItem = {
  id: string
  label: string
  /** Plain text for typeahead when the rendered label differs from `label`. */
  textValue?: string
  /** A component, e.g. an icon from @lucide/vue. */
  icon?: Component
  disabled?: boolean
  children?: TreeItem[]
}

export type VisibleItem = {
  item: TreeItem
  level: number
  parentId: string | null
  posinset: number
  setsize: number
}

export function flatten(
  items: TreeItem[],
  expanded: Set<string>,
  level = 1,
  parentId: string | null = null,
  out: VisibleItem[] = [],
) {
  items.forEach((item, index) => {
    out.push({ item, level, parentId, posinset: index + 1, setsize: items.length })
    if (item.children?.length && expanded.has(item.id)) {
      flatten(item.children, expanded, level + 1, item.id, out)
    }
  })
  return out
}

export type TreeViewContext = {
  visible: ComputedRef<VisibleItem[]>
  open: ComputedRef<Set<string>>
  selected: ComputedRef<string | null>
  tabStop: ComputedRef<string | undefined>
  register: (id: string, node: HTMLLIElement | null) => void
  setFocused: (id: string) => void
  onKeydown: (event: KeyboardEvent, entry: VisibleItem) => void
  onRowClick: (item: TreeItem) => void
}

export const TreeViewContextKey: InjectionKey<TreeViewContext> = Symbol("TreeView")
