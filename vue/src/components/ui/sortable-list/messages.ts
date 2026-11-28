export type Messages = {
  handle: (label: string) => string
  picked: (label: string, position: number, total: number) => string
  moved: (label: string, position: number, total: number) => string
  dropped: (label: string, position: number, total: number) => string
  cancelled: (label: string) => string
}

export const defaultMessages: Messages = {
  handle: (label) => `Reorder ${label}`,
  picked: (label, position, total) =>
    `Picked up ${label}, position ${position} of ${total}. Use the arrow keys to move, Space to drop, Escape to cancel.`,
  moved: (label, position, total) => `${label}, position ${position} of ${total}.`,
  dropped: (label, position, total) => `Dropped ${label} at position ${position} of ${total}.`,
  cancelled: (label) => `Reorder cancelled. ${label} is back in place.`,
}

export function move<T>(list: T[], from: number, to: number) {
  const next = [...list]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item as T)
  return next
}
