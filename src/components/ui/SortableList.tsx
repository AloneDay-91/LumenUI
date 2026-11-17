"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function move<T>(list: T[], from: number, to: number) {
  const next = [...list]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

type Messages = {
  handle: (label: string) => string
  picked: (label: string, position: number, total: number) => string
  moved: (label: string, position: number, total: number) => string
  dropped: (label: string, position: number, total: number) => string
  cancelled: (label: string) => string
}

const defaultMessages: Messages = {
  handle: (label) => `Reorder ${label}`,
  picked: (label, position, total) =>
    `Picked up ${label}, position ${position} of ${total}. Use the arrow keys to move, Space to drop, Escape to cancel.`,
  moved: (label, position, total) => `${label}, position ${position} of ${total}.`,
  dropped: (label, position, total) => `Dropped ${label} at position ${position} of ${total}.`,
  cancelled: (label) => `Reorder cancelled. ${label} is back in place.`,
}

/**
 * A list you reorder by dragging the grip, or from the keyboard: focus the
 * grip, Space to pick up, arrows to move, Space to drop, Escape to cancel.
 */
function SortableList<T>({
  items,
  getKey,
  getLabel,
  onReorder,
  renderItem,
  className,
  messages: messagesProp,
  "aria-label": ariaLabel,
}: {
  items: T[]
  getKey: (item: T) => string
  /** Plain-text name of an item, for the grip label and announcements. */
  getLabel: (item: T) => string
  onReorder: (items: T[]) => void
  renderItem: (item: T) => React.ReactNode
  className?: string
  messages?: Partial<Messages>
  "aria-label"?: string
}) {
  const messages = { ...defaultMessages, ...messagesProp }
  const [announcement, setAnnouncement] = React.useState("")
  // Keyboard: the list as it was when the item was picked up, for Escape.
  const [picked, setPicked] = React.useState<{ key: string; original: T[] } | null>(null)
  // Pointer: the dragged key and the index it would land at.
  const [drag, setDrag] = React.useState<{ key: string; over: number } | null>(null)
  const rowRefs = React.useRef(new Map<string, HTMLLIElement>())
  const handleRefs = React.useRef(new Map<string, HTMLButtonElement>())

  const total = items.length

  function focusHandle(key: string) {
    requestAnimationFrame(() => handleRefs.current.get(key)?.focus())
  }

  function onHandleKeyDown(event: React.KeyboardEvent, item: T, index: number) {
    const key = getKey(item)
    const label = getLabel(item)

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault()
      if (picked?.key === key) {
        setPicked(null)
        setAnnouncement(messages.dropped(label, index + 1, total))
      } else {
        setPicked({ key, original: items })
        setAnnouncement(messages.picked(label, index + 1, total))
      }
      return
    }

    if (picked?.key !== key) return

    if (event.key === "Escape") {
      event.preventDefault()
      onReorder(picked.original)
      setPicked(null)
      setAnnouncement(messages.cancelled(label))
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
              ? total - 1
              : null
    if (target === null) return
    event.preventDefault()
    const to = Math.max(0, Math.min(total - 1, target))
    if (to === index) return
    onReorder(move(items, index, to))
    setAnnouncement(messages.moved(label, to + 1, total))
    focusHandle(key)
  }

  function onPointerDown(event: React.PointerEvent<HTMLButtonElement>, item: T, index: number) {
    if (event.button !== 0) return
    event.preventDefault()
    const key = getKey(item)
    event.currentTarget.setPointerCapture(event.pointerId)
    setDrag({ key, over: index })

    // The index the item lands at: how many of the other rows sit above the pointer.
    const overIndex = (y: number) =>
      items.filter((candidate) => {
        if (getKey(candidate) === key) return false
        const rect = rowRefs.current.get(getKey(candidate))?.getBoundingClientRect()
        return rect ? y > rect.top + rect.height / 2 : false
      }).length

    const onMove = (moveEvent: PointerEvent) => {
      setDrag({ key, over: overIndex(moveEvent.clientY) })
    }
    const onUp = (upEvent: PointerEvent) => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      const to = overIndex(upEvent.clientY)
      setDrag(null)
      if (to !== index) {
        onReorder(move(items, index, to))
        setAnnouncement(messages.dropped(getLabel(item), to + 1, total))
      }
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }

  const dragIndex = drag ? items.findIndex((item) => getKey(item) === drag.key) : -1

  return (
    <>
      <ul
        data-slot="sortable-list"
        aria-label={ariaLabel}
        className={cn("m-0 flex list-none flex-col gap-1.5 p-0", className)}
      >
        {items.map((item, index) => {
          const key = getKey(item)
          const isPicked = picked?.key === key
          const isDragged = drag?.key === key
          const showLineBefore =
            drag && !isDragged && drag.over === index && drag.over < dragIndex
          const showLineAfter =
            drag && !isDragged && drag.over === index && drag.over > dragIndex

          return (
            <li
              key={key}
              ref={(node) => {
                if (node) rowRefs.current.set(key, node)
                else rowRefs.current.delete(key)
              }}
              data-slot="sortable-list-item"
              data-picked={isPicked ? "" : undefined}
              data-dragging={isDragged ? "" : undefined}
              className={cn(
                "relative flex items-center gap-2 rounded-2xl bg-card py-2 ps-1.5 pe-3 text-xs ring-1 ring-foreground/5 transition-[box-shadow,opacity] dark:ring-foreground/10",
                "data-picked:ring-2 data-picked:ring-ring/50 data-dragging:opacity-50",
                showLineBefore && "before:absolute before:inset-x-2 before:-top-1 before:h-0.5 before:rounded-full before:bg-ring",
                showLineAfter && "after:absolute after:inset-x-2 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-ring"
              )}
            >
              <button
                type="button"
                ref={(node) => {
                  if (node) handleRefs.current.set(key, node)
                  else handleRefs.current.delete(key)
                }}
                aria-label={messages.handle(getLabel(item))}
                aria-pressed={isPicked}
                onKeyDown={(event) => onHandleKeyDown(event, item, index)}
                onBlur={() => {
                  if (!isPicked) return
                  // Moving the row in the DOM blurs it for a frame; drop only if focus really left.
                  requestAnimationFrame(() =>
                    requestAnimationFrame(() => {
                      if (document.activeElement !== handleRefs.current.get(key)) setPicked(null)
                    })
                  )
                }}
                onPointerDown={(event) => onPointerDown(event, item, index)}
                className="flex size-6 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 active:cursor-grabbing"
              >
                <GripVerticalIcon aria-hidden className="size-3.5" />
              </button>
              <div className="min-w-0 flex-1">{renderItem(item)}</div>
            </li>
          )
        })}
      </ul>
      <div role="status" aria-live="assertive" className="sr-only">
        {announcement}
      </div>
    </>
  )
}

export { SortableList }
