export { default as Kanban } from "./Kanban.vue"

export type KanbanColumn = {
  id: string
  /** Shown in the column header. Use the `column-title` slot for richer content. */
  title: string
  /** Plain-text name, for announcements. Defaults to the title. */
  label?: string
}

export type KanbanValue<T> = Record<string, T[]>

export type KanbanMessages = {
  card: (label: string) => string
  picked: (label: string, column: string, position: number, total: number) => string
  moved: (label: string, column: string, position: number, total: number) => string
  dropped: (label: string, column: string, position: number, total: number) => string
  cancelled: (label: string) => string
}

export const defaultKanbanMessages: KanbanMessages = {
  card: (label) => `${label}. Press Space to move.`,
  picked: (label, column, position, total) =>
    `Picked up ${label} in ${column}, position ${position} of ${total}. Arrows move it, Space drops, Escape cancels.`,
  moved: (label, column, position, total) => `${label}, ${column}, position ${position} of ${total}.`,
  dropped: (label, column, position, total) =>
    `Dropped ${label} in ${column}, position ${position} of ${total}.`,
  cancelled: (label) => `Move cancelled. ${label} is back in place.`,
}

export type KanbanLocation = { column: string; index: number }

export function locate<T>(
  value: KanbanValue<T>,
  key: string,
  getKey: (item: T) => string
): KanbanLocation | null {
  for (const [column, items] of Object.entries(value)) {
    const index = items.findIndex((item) => getKey(item) === key)
    if (index !== -1) return { column, index }
  }
  return null
}

export function moveCard<T>(value: KanbanValue<T>, from: KanbanLocation, to: KanbanLocation): KanbanValue<T> {
  const next = { ...value }
  const source = [...(next[from.column] ?? [])]
  const [item] = source.splice(from.index, 1)
  next[from.column] = source
  const target = from.column === to.column ? source : [...(next[to.column] ?? [])]
  target.splice(Math.min(to.index, target.length), 0, item)
  next[to.column] = target
  return next
}
