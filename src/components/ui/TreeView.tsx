"use client"

import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type TreeItem = {
  id: string
  label: React.ReactNode
  /** Plain text for typeahead when `label` is not a string. */
  textValue?: string
  icon?: React.ReactNode
  disabled?: boolean
  children?: TreeItem[]
}

type VisibleItem = {
  item: TreeItem
  level: number
  parentId: string | null
  posinset: number
  setsize: number
}

function flatten(
  items: TreeItem[],
  expanded: Set<string>,
  level = 1,
  parentId: string | null = null,
  out: VisibleItem[] = []
) {
  items.forEach((item, index) => {
    out.push({ item, level, parentId, posinset: index + 1, setsize: items.length })
    if (item.children?.length && expanded.has(item.id)) {
      flatten(item.children, expanded, level + 1, item.id, out)
    }
  })
  return out
}

function TreeView({
  className,
  items,
  value,
  defaultValue,
  onValueChange,
  expanded,
  defaultExpanded = [],
  onExpandedChange,
  ...props
}: Omit<React.ComponentProps<"ul">, "defaultValue" | "onChange"> & {
  items: TreeItem[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (id: string, item: TreeItem) => void
  expanded?: string[]
  defaultExpanded?: string[]
  onExpandedChange?: (expanded: string[]) => void
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? null)
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded)
  const selected = value !== undefined ? value : uncontrolledValue
  const open = React.useMemo(
    () => new Set(expanded ?? uncontrolledExpanded),
    [expanded, uncontrolledExpanded]
  )
  const visible = React.useMemo(() => flatten(items, open), [items, open])
  const [focusedId, setFocusedId] = React.useState<string | null>(null)
  const refs = React.useRef(new Map<string, HTMLLIElement>())

  const tabStop =
    visible.find((entry) => entry.item.id === focusedId)?.item.id ??
    visible.find((entry) => entry.item.id === selected)?.item.id ??
    visible[0]?.item.id

  function setOpen(id: string, next: boolean) {
    const list = new Set(open)
    if (next) list.add(id)
    else list.delete(id)
    const result = Array.from(list)
    if (expanded === undefined) setUncontrolledExpanded(result)
    onExpandedChange?.(result)
  }

  function select(item: TreeItem) {
    if (item.disabled) return
    if (value === undefined) setUncontrolledValue(item.id)
    onValueChange?.(item.id, item)
  }

  function focus(id: string | undefined) {
    if (!id) return
    setFocusedId(id)
    refs.current.get(id)?.focus()
  }

  function onKeyDown(event: React.KeyboardEvent, entry: VisibleItem) {
    const index = visible.indexOf(entry)
    const { item } = entry
    const hasChildren = Boolean(item.children?.length)
    const isOpen = open.has(item.id)
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl"
    const forward = rtl ? "ArrowLeft" : "ArrowRight"
    const back = rtl ? "ArrowRight" : "ArrowLeft"

    switch (event.key) {
      case "ArrowDown":
        focus(visible[index + 1]?.item.id)
        break
      case "ArrowUp":
        focus(visible[index - 1]?.item.id)
        break
      case "Home":
        focus(visible[0]?.item.id)
        break
      case "End":
        focus(visible[visible.length - 1]?.item.id)
        break
      case forward:
        if (hasChildren && !isOpen) setOpen(item.id, true)
        else if (hasChildren) focus(visible[index + 1]?.item.id)
        break
      case back:
        if (hasChildren && isOpen) setOpen(item.id, false)
        else focus(entry.parentId ?? undefined)
        break
      case "Enter":
      case " ":
        select(item)
        if (hasChildren && event.key === "Enter") setOpen(item.id, !isOpen)
        break
      default: {
        if (event.key.length !== 1 || event.metaKey || event.ctrlKey) return
        const char = event.key.toLowerCase()
        const ordered = [...visible.slice(index + 1), ...visible.slice(0, index + 1)]
        const match = ordered.find((candidate) => {
          const text =
            candidate.item.textValue ??
            (typeof candidate.item.label === "string" ? candidate.item.label : "")
          return text.toLowerCase().startsWith(char)
        })
        focus(match?.item.id)
        break
      }
    }
    event.preventDefault()
    event.stopPropagation()
  }

  function renderLevel(levelItems: TreeItem[], level: number): React.ReactNode {
    return levelItems.map((item) => {
      const entry = visible.find((candidate) => candidate.item.id === item.id)
      if (!entry) return null
      const hasChildren = Boolean(item.children?.length)
      const isOpen = open.has(item.id)
      const isSelected = selected === item.id

      return (
        <li
          key={item.id}
          ref={(node) => {
            if (node) refs.current.set(item.id, node)
            else refs.current.delete(item.id)
          }}
          role="treeitem"
          aria-level={level}
          aria-posinset={entry.posinset}
          aria-setsize={entry.setsize}
          aria-expanded={hasChildren ? isOpen : undefined}
          aria-selected={isSelected}
          aria-disabled={item.disabled || undefined}
          tabIndex={item.id === tabStop ? 0 : -1}
          data-slot="tree-view-item"
          onKeyDown={(event) => onKeyDown(event, entry)}
          onFocus={(event) => {
            if (event.target === event.currentTarget) setFocusedId(item.id)
          }}
          className="outline-none [&:focus-visible>[data-slot=tree-view-row]]:ring-3 [&:focus-visible>[data-slot=tree-view-row]]:ring-ring/30"
        >
          <div
            data-slot="tree-view-row"
            data-selected={isSelected ? "" : undefined}
            data-disabled={item.disabled ? "" : undefined}
            onClick={() => {
              focus(item.id)
              select(item)
              if (hasChildren) setOpen(item.id, !isOpen)
            }}
            style={{ paddingInlineStart: `calc(${level - 1} * 1rem + 0.5rem)` }}
            className={cn(
              "flex h-7 cursor-pointer items-center gap-1.5 rounded-xl pe-2 text-xs select-none hover:bg-muted",
              "data-selected:bg-muted data-selected:font-medium",
              "data-disabled:pointer-events-none data-disabled:opacity-50",
              "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5"
            )}
          >
            <ChevronRightIcon
              aria-hidden
              className={cn(
                "text-muted-foreground transition-transform duration-150 rtl:rotate-180",
                isOpen && "rotate-90 rtl:rotate-90",
                !hasChildren && "invisible"
              )}
            />
            {item.icon ? (
              <span aria-hidden className="flex text-muted-foreground">
                {item.icon}
              </span>
            ) : null}
            <span className="min-w-0 truncate">{item.label}</span>
          </div>
          {hasChildren && isOpen ? (
            <ul role="group" className="m-0 list-none p-0">
              {renderLevel(item.children ?? [], level + 1)}
            </ul>
          ) : null}
        </li>
      )
    })
  }

  return (
    <ul
      role="tree"
      data-slot="tree-view"
      className={cn("m-0 flex list-none flex-col p-0", className)}
      {...props}
    >
      {renderLevel(items, 1)}
    </ul>
  )
}

export { TreeView }
export type { TreeItem }
