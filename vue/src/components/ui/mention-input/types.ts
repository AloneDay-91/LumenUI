import type { Component } from "vue"

export type MentionItem = {
  id: string
  /** Inserted after the trigger: "@Alex Martin". */
  label: string
  /** Second line under the label. */
  description?: string
  /** Rendered before the label: a lucide icon, or a component that renders an Avatar. */
  icon?: Component
}

export type MentionTrigger = {
  /** One character that opens the list: "@", "/", "#". */
  char: string
  /** Items, or a function of the typed query that returns them. */
  items: MentionItem[] | ((query: string) => MentionItem[])
  /** Heading above the list, e.g. "People". */
  label?: string
}

export type Mention = { trigger: string; id: string; label: string }

export type MentionActive = { trigger: MentionTrigger; start: number; query: string }

export function defaultFilter(items: MentionItem[], query: string) {
  const q = query.toLowerCase()
  return items.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 8)
}

export function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/** The picked mentions still written in the text, once each. */
export function mentionsIn(text: string, picked: Mention[]) {
  const seen = new Set<string>()
  return picked.filter((mention) => {
    const key = `${mention.trigger}${mention.label}`
    if (seen.has(key)) return false
    const found = new RegExp(`(^|\\s)${escapeRegExp(key)}(?=$|[\\s.,;:!?])`).test(text)
    if (found) seen.add(key)
    return found
  })
}
