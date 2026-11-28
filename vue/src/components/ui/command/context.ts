import type { ComputedRef, InjectionKey, Ref } from "vue"

/** Scores an item against the search: 0 hides it, higher is a better match. */
export type CommandFilter = (value: string, search: string, keywords?: string[]) => number

export type CommandItemEntry = {
  value: string
  keywords: string[]
  groupId?: string
  forceMount: boolean
}

export type CommandContext = {
  search: Ref<string>
  shouldFilter: ComputedRef<boolean>
  register: (id: string, entry: CommandItemEntry) => void
  unregister: (id: string) => void
  isItemVisible: (id: string) => boolean
  isGroupVisible: (groupId: string) => boolean
  visibleCount: ComputedRef<number>
}

export const commandContextKey: InjectionKey<CommandContext> = Symbol("Command")
export const commandGroupKey: InjectionKey<string> = Symbol("CommandGroup")

/**
 * The default filter: a prefix or word start scores highest, then a substring,
 * then the search letters in order (fuzzy). Case and accents are ignored.
 */
export const defaultCommandFilter: CommandFilter = (value, search, keywords) => {
  const normalize = (text: string) =>
    text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim()
  const query = normalize(search)
  if (!query) return 1
  const haystack = normalize([value, ...(keywords ?? [])].join(" "))
  if (haystack.startsWith(query)) return 1
  if (new RegExp(`(^|[\\s\\-_/])${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(haystack)) return 0.9
  if (haystack.includes(query)) return 0.8
  let index = 0
  let gaps = 0
  for (const char of query) {
    const found = haystack.indexOf(char, index)
    if (found === -1) return 0
    gaps += found - index
    index = found + 1
  }
  return Math.max(0.1, 0.6 - gaps * 0.02)
}
