"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type KanbanColumn = {
  id: string
  title: React.ReactNode
  /** Plain-text name, for announcements. Defaults to the title when it is a string. */
  label?: string
}

type KanbanValue<T> = Record<string, T[]>

type Messages = {
  card: (label: string) => string
  picked: (label: string, column: string, position: number, total: number) => string
  moved: (label: string, column: string, position: number, total: number) => string
  dropped: (label: string, column: string, position: number, total: number) => string
  cancelled: (label: string) => string
}

const defaultMessages: Messages = {
  card: (label) => `${label}. Press Space to move.`,
  picked: (label, column, position, total) =>
    `Picked up ${label} in ${column}, position ${position} of ${total}. Arrows move it, Space drops, Escape cancels.`,
  moved: (label, column, position, total) => `${label}, ${column}, position ${position} of ${total}.`,
  dropped: (label, column, position, total) =>
    `Dropped ${label} in ${column}, position ${position} of ${total}.`,
  cancelled: (label) => `Move cancelled. ${label} is back in place.`,
}

type Location = { column: string; index: number }

function locate<T>(value: KanbanValue<T>, key: string, getKey: (item: T) => string): Location | null {
  for (const [column, items] of Object.entries(value)) {
    const index = items.findIndex((item) => getKey(item) === key)
    if (index !== -1) return { column, index }
  }
  return null
}

function moveCard<T>(value: KanbanValue<T>, from: Location, to: Location): KanbanValue<T> {
  const next = { ...value }
  const source = [...(next[from.column] ?? [])]
  const [item] = source.splice(from.index, 1)
  next[from.column] = source
  const target = from.column === to.column ? source : [...(next[to.column] ?? [])]
  target.splice(Math.min(to.index, target.length), 0, item)
  next[to.column] = target
  return next
}

/**
 * Columns of cards you move by dragging, or from the keyboard: focus a card,
 * Space to pick it up, arrows to move it within and across columns, Space to
 * drop, Escape to cancel. Each move is announced.
 */
function Kanban<T>({
  className,
  columns,
  value,
  onValueChange,
  getKey,
  getLabel,
  renderCard,
  renderColumnFooter,
  messages: messagesProp,
  "aria-label": ariaLabel = "Board",
}: {
  className?: string
  columns: KanbanColumn[]
  /** Cards per column id, in order. */
  value: KanbanValue<T>
  onValueChange: (value: KanbanValue<T>) => void
  getKey: (item: T) => string
  /** Plain-text name of a card, for announcements. */
  getLabel: (item: T) => string
  renderCard: (item: T) => React.ReactNode
  /** Under each column's cards: an add button, a total. */
  renderColumnFooter?: (column: KanbanColumn) => React.ReactNode
  messages?: Partial<Messages>
  "aria-label"?: string
}) {
  const messages = { ...defaultMessages, ...messagesProp }
  const [announcement, setAnnouncement] = React.useState("")
  const [picked, setPicked] = React.useState<{ key: string; original: KanbanValue<T> } | null>(null)
  const [drag, setDrag] = React.useState<{ key: string; over: Location } | null>(null)
  const columnRefs = React.useRef(new Map<string, HTMLElement>())
  const cardRefs = React.useRef(new Map<string, HTMLElement>())

  const columnLabel = (id: string) => {
    const column = columns.find((c) => c.id === id)
    return column?.label ?? (typeof column?.title === "string" ? column.title : id)
  }
  // A keyboard move remounts the card in its new column, which blurs it.
  // While that happens, the blur must not drop the card.
  const moving = React.useRef(false)
  const focusCard = (key: string) => {
    moving.current = true
    requestAnimationFrame(() => {
      cardRefs.current.get(key)?.focus()
      moving.current = false
    })
  }

  function onCardKeyDown(event: React.KeyboardEvent, item: T) {
    if (event.target !== event.currentTarget) return
    const key = getKey(item)
    const label = getLabel(item)
    const at = locate(value, key, getKey)
    if (!at) return
    const total = (column: string) => value[column]?.length ?? 0

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault()
      if (picked?.key === key) {
        setPicked(null)
        setAnnouncement(messages.dropped(label, columnLabel(at.column), at.index + 1, total(at.column)))
      } else {
        setPicked({ key, original: value })
        setAnnouncement(messages.picked(label, columnLabel(at.column), at.index + 1, total(at.column)))
      }
      return
    }
    if (picked?.key !== key) return

    if (event.key === "Escape") {
      event.preventDefault()
      onValueChange(picked.original)
      setPicked(null)
      setAnnouncement(messages.cancelled(label))
      focusCard(key)
      return
    }

    const rtl = getComputedStyle(event.currentTarget).direction === "rtl"
    const columnIndex = columns.findIndex((c) => c.id === at.column)
    let to: Location | null = null
    if (event.key === "ArrowUp") to = { column: at.column, index: at.index - 1 }
    else if (event.key === "ArrowDown") to = { column: at.column, index: at.index + 1 }
    else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const step = (event.key === "ArrowRight") !== rtl ? 1 : -1
      const column = columns[columnIndex + step]
      if (column) to = { column: column.id, index: Math.min(at.index, total(column.id)) }
    }
    if (!to) return
    event.preventDefault()
    const sameColumn = to.column === at.column
    const max = sameColumn ? total(to.column) - 1 : total(to.column)
    to.index = Math.max(0, Math.min(max, to.index))
    if (sameColumn && to.index === at.index) return
    onValueChange(moveCard(value, at, to))
    setAnnouncement(
      messages.moved(label, columnLabel(to.column), to.index + 1, total(to.column) + (sameColumn ? 0 : 1))
    )
    focusCard(key)
  }

  function onCardPointerDown(event: React.PointerEvent<HTMLElement>, item: T) {
    if (event.button !== 0) return
    // Leave links, buttons, and fields inside a card alone.
    if ((event.target as HTMLElement).closest("a, button, input, textarea, select, [role=button]")) return
    const key = getKey(item)
    const start = { x: event.clientX, y: event.clientY }
    let dragging = false

    const target = (x: number, y: number): Location | null => {
      for (const column of columns) {
        const rect = columnRefs.current.get(column.id)?.getBoundingClientRect()
        if (!rect || x < rect.left || x > rect.right) continue
        const index = (value[column.id] ?? []).filter((candidate) => {
          if (getKey(candidate) === key) return false
          const card = cardRefs.current.get(getKey(candidate))?.getBoundingClientRect()
          return card ? y > card.top + card.height / 2 : false
        }).length
        return { column: column.id, index }
      }
      return null
    }

    const onMove = (move: PointerEvent) => {
      if (!dragging) {
        // A few pixels of travel before it counts as a drag, so clicks stay clicks.
        if (Math.hypot(move.clientX - start.x, move.clientY - start.y) < 5) return
        dragging = true
      }
      const over = target(move.clientX, move.clientY)
      if (over) setDrag({ key, over })
    }
    const onUp = (up: PointerEvent) => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onCancel)
      setDrag(null)
      if (!dragging) return
      const from = locate(value, key, getKey)
      const to = target(up.clientX, up.clientY)
      if (!from || !to || (from.column === to.column && from.index === to.index)) return
      onValueChange(moveCard(value, from, to))
      const total = (value[to.column]?.length ?? 0) + (from.column === to.column ? 0 : 1)
      setAnnouncement(messages.dropped(getLabel(item), columnLabel(to.column), to.index + 1, total))
    }
    const onCancel = () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onCancel)
      setDrag(null)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onCancel)
  }

  return (
    <>
      <div
        role="group"
        aria-label={ariaLabel}
        data-slot="kanban"
        className={cn("flex w-full gap-3 overflow-x-auto pb-1", className)}
      >
        {columns.map((column) => {
          const items = value[column.id] ?? []
          const isOver = drag?.over.column === column.id
          // Where the drop line goes: before the card at `over.index`, skipping the dragged one.
          const others = items.filter((item) => getKey(item) !== drag?.key)
          const lineBefore = isOver ? others[drag.over.index] : undefined

          return (
            <section
              key={column.id}
              ref={(node) => {
                if (node) columnRefs.current.set(column.id, node)
                else columnRefs.current.delete(column.id)
              }}
              data-slot="kanban-column"
              data-over={isOver ? "" : undefined}
              aria-label={columnLabel(column.id)}
              className="flex w-64 shrink-0 flex-col gap-2 rounded-[min(var(--radius-4xl),24px)] bg-muted/50 p-2 transition-colors data-over:bg-muted"
            >
              <header className="flex items-center justify-between gap-2 px-1.5 pt-1">
                <h3 className="m-0 truncate text-xs font-medium">{column.title}</h3>
                <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{items.length}</span>
              </header>
              <ul className="m-0 flex min-h-12 list-none flex-col gap-1.5 p-0">
                {items.map((item) => {
                  const key = getKey(item)
                  const isPicked = picked?.key === key
                  const isDragged = drag?.key === key
                  return (
                    <li
                      key={key}
                      ref={(node) => {
                        if (node) cardRefs.current.set(key, node)
                        else cardRefs.current.delete(key)
                      }}
                      tabIndex={0}
                      aria-roledescription="card"
                      aria-label={messages.card(getLabel(item))}
                      data-slot="kanban-card"
                      data-picked={isPicked ? "" : undefined}
                      data-dragging={isDragged ? "" : undefined}
                      onKeyDown={(event) => onCardKeyDown(event, item)}
                      onPointerDown={(event) => onCardPointerDown(event, item)}
                      onBlur={() => {
                        if (!isPicked || moving.current) return
                        // Moving the card in the DOM blurs it for a frame; drop only if focus really left.
                        requestAnimationFrame(() =>
                          requestAnimationFrame(() => {
                            if (moving.current) return
                            if (document.activeElement !== cardRefs.current.get(key)) setPicked(null)
                          })
                        )
                      }}
                      className={cn(
                        "relative cursor-grab touch-none rounded-2xl bg-card p-3 text-xs text-card-foreground ring-1 ring-foreground/5 transition-[box-shadow,opacity] outline-none select-none active:cursor-grabbing dark:ring-foreground/10",
                        "focus-visible:ring-3 focus-visible:ring-ring/30 data-picked:ring-2 data-picked:ring-ring/60 data-dragging:opacity-40",
                        lineBefore && getKey(lineBefore) === key &&
                          "before:absolute before:inset-x-2 before:-top-1 before:h-0.5 before:rounded-full before:bg-ring"
                      )}
                    >
                      {renderCard(item)}
                    </li>
                  )
                })}
                {isOver && !lineBefore ? (
                  <li aria-hidden className="mx-2 h-0.5 rounded-full bg-ring" />
                ) : null}
              </ul>
              {renderColumnFooter?.(column)}
            </section>
          )
        })}
      </div>
      <span className="sr-only" aria-live="assertive">
        {announcement}
      </span>
    </>
  )
}

export { Kanban }
export type { KanbanColumn, KanbanValue }
