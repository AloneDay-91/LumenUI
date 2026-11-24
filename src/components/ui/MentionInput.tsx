"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type MentionItem = {
  id: string
  /** Inserted after the trigger: "@Alex Martin". */
  label: string
  description?: React.ReactNode
  icon?: React.ReactNode
}

type MentionTrigger = {
  /** One character that opens the list: "@", "/", "#". */
  char: string
  /** Items, or a function of the typed query that returns them. */
  items: MentionItem[] | ((query: string) => MentionItem[])
  /** Heading above the list, e.g. "People". */
  label?: string
}

type Mention = { trigger: string; id: string; label: string }

type Active = { trigger: MentionTrigger; start: number; query: string }

const defaultFilter = (items: MentionItem[], query: string) => {
  const q = query.toLowerCase()
  return items.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 8)
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/** The picked mentions still written in the text, once each. */
function mentionsIn(text: string, picked: Mention[]) {
  const seen = new Set<string>()
  return picked.filter((mention) => {
    const key = `${mention.trigger}${mention.label}`
    if (seen.has(key)) return false
    const found = new RegExp(`(^|\\s)${escapeRegExp(key)}(?=$|[\\s.,;:!?])`).test(text)
    if (found) seen.add(key)
    return found
  })
}

/**
 * A text area where a trigger character opens a list: @ for people, / for
 * commands, or your own. Picked items are inserted as text and tinted in
 * place; the value stays plain text, and the mentions it contains come with
 * every change.
 */
function MentionInput({
  className,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  triggers,
  placeholder,
  disabled,
  rows = 3,
  name,
  id,
  onKeyDown,
  labels = {},
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: {
  className?: string
  value?: string
  defaultValue?: string
  /** The text, and the mentions still present in it. */
  onValueChange?: (value: string, mentions: Mention[]) => void
  triggers: MentionTrigger[]
  placeholder?: string
  disabled?: boolean
  /** Minimum height in lines. The field grows with its content. */
  rows?: number
  name?: string
  id?: string
  /** Runs after the list's own keys, e.g. to send on ⌘Enter. */
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
  labels?: { empty?: string }
  "aria-label"?: string
  "aria-describedby"?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const value = valueProp ?? uncontrolled
  // Every item ever picked; only those still in the text count as mentions.
  const [picked, setPicked] = React.useState<Mention[]>([])
  const [active, setActive] = React.useState<Active | null>(null)
  const [highlighted, setHighlighted] = React.useState(0)
  const [caret, setCaret] = React.useState({ top: 0, left: 0 })
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const mirrorRef = React.useRef<HTMLDivElement>(null)
  const listId = React.useId()

  const options = React.useMemo(() => {
    if (!active) return []
    const { items } = active.trigger
    return typeof items === "function" ? items(active.query).slice(0, 8) : defaultFilter(items, active.query)
  }, [active])

  const emit = (text: string, pickedNow = picked) => {
    setUncontrolled(text)
    onValueChange?.(text, mentionsIn(text, pickedNow))
  }

  /** The trigger and query just before the caret, if any. */
  const detect = (text: string, position: number): Active | null => {
    const before = text.slice(0, position)
    for (const trigger of triggers) {
      const at = before.lastIndexOf(trigger.char)
      if (at === -1) continue
      if (at > 0 && !/\s/.test(before[at - 1])) continue
      const query = before.slice(at + 1)
      if (/[\s]/.test(query) || query.length > 40) continue
      return { trigger, start: at, query }
    }
    return null
  }

  const measureCaret = () => {
    const mirror = mirrorRef.current
    const textarea = textareaRef.current
    if (!mirror || !textarea) return
    const marker = mirror.querySelector<HTMLElement>("[data-caret]")
    if (!marker) return
    setCaret({
      top: marker.offsetTop - textarea.scrollTop + marker.offsetHeight + 4,
      left: Math.min(marker.offsetLeft, textarea.clientWidth - 224),
    })
  }

  const sync = (text: string, position: number) => {
    const next = detect(text, position)
    setActive(next)
    if (next) {
      setHighlighted(0)
      setCaretAt(position)
    }
  }

  // The mirror renders up to the caret marker; measure once it has.
  const [caretAt, setCaretAt] = React.useState(0)
  React.useLayoutEffect(() => {
    if (active) measureCaret()
  }, [active, caretAt, value])

  const choose = (item: MentionItem) => {
    const textarea = textareaRef.current
    if (!active || !textarea) return
    const before = value.slice(0, active.start)
    const after = value.slice(active.start + 1 + active.query.length)
    const inserted = `${active.trigger.char}${item.label} `
    const text = `${before}${inserted}${after.replace(/^ /, "")}`
    const mention = { trigger: active.trigger.char, id: item.id, label: item.label }
    const nextPicked = [...picked.filter((m) => !(m.trigger === mention.trigger && m.label === mention.label)), mention]
    setPicked(nextPicked)
    setActive(null)
    emit(text, nextPicked)
    const caretPosition = before.length + inserted.length
    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(caretPosition, caretPosition)
    })
  }

  // The tinted copy of the text that sits behind the transparent field.
  const mentions = mentionsIn(value, picked)
  const mirror = React.useMemo(() => {
    const until = active ? caretAt : -1
    const keys = mentions.map((m) => escapeRegExp(`${m.trigger}${m.label}`))
    const pattern = keys.length ? new RegExp(`(^|\\s)(${keys.join("|")})(?=$|[\\s.,;:!?])`, "g") : null
    const parts: React.ReactNode[] = []
    const pushText = (text: string, offset: number) => {
      if (until >= offset && until <= offset + text.length) {
        parts.push(text.slice(0, until - offset), <span key="caret" data-caret="">{"​"}</span>, text.slice(until - offset))
      } else parts.push(text)
    }
    let last = 0
    if (pattern) {
      for (const match of value.matchAll(pattern)) {
        const start = (match.index ?? 0) + match[1].length
        pushText(value.slice(last, start), last)
        parts.push(
          <mark key={start} className="rounded-md bg-primary/12 text-transparent shadow-[0_0_0_2px_color-mix(in_oklch,var(--primary)_12%,transparent)]">
            {match[2]}
          </mark>
        )
        last = start + match[2].length
      }
    }
    pushText(value.slice(last), last)
    // A trailing newline needs a character after it to take up a line.
    parts.push("​")
    return parts
  }, [value, mentions, active, caretAt])

  const open = Boolean(active)
  const field =
    "col-start-1 row-start-1 w-full px-3 py-2.5 text-xs leading-5 whitespace-pre-wrap break-words [overflow-wrap:anywhere]"

  return (
    <div
      data-slot="mention-input"
      className={cn(
        "relative grid w-full rounded-2xl border border-border bg-transparent transition-colors",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <div ref={mirrorRef} aria-hidden className={cn(field, "pointer-events-none overflow-hidden text-transparent")}>
        {mirror}
      </div>
      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        rows={rows}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && options[highlighted] ? `${listId}-${highlighted}` : undefined}
        onChange={(event) => {
          emit(event.target.value)
          sync(event.target.value, event.target.selectionStart)
        }}
        onSelect={(event) => {
          const target = event.currentTarget
          if (target.selectionStart === target.selectionEnd) sync(target.value, target.selectionStart)
          else setActive(null)
        }}
        onScroll={(event) => {
          if (mirrorRef.current) mirrorRef.current.scrollTop = event.currentTarget.scrollTop
        }}
        onBlur={() => setActive(null)}
        onKeyDown={(event) => {
          if (open && options.length) {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              setHighlighted((i) => (i + 1) % options.length)
              return
            }
            if (event.key === "ArrowUp") {
              event.preventDefault()
              setHighlighted((i) => (i - 1 + options.length) % options.length)
              return
            }
            if (event.key === "Enter" || event.key === "Tab") {
              event.preventDefault()
              choose(options[highlighted])
              return
            }
          }
          if (open && event.key === "Escape") {
            event.preventDefault()
            setActive(null)
            return
          }
          onKeyDown?.(event)
        }}
        className={cn(
          field,
          "field-sizing-content resize-none overflow-auto bg-transparent text-foreground caret-foreground outline-none placeholder:text-muted-foreground"
        )}
      />

      {open ? (
        <div
          className="absolute z-50 w-56 overflow-hidden rounded-2xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10"
          style={{ top: caret.top, left: Math.max(caret.left, 4) }}
        >
          {active?.trigger.label ? (
            <p className="m-0 px-2 pt-1.5 pb-1 text-[11px] font-medium text-muted-foreground">{active.trigger.label}</p>
          ) : null}
          <ul id={listId} role="listbox" aria-label={active?.trigger.label ?? "Suggestions"} className="m-0 max-h-60 list-none overflow-y-auto p-0">
            {options.length ? (
              options.map((item, index) => (
                <li
                  key={item.id}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={index === highlighted}
                  // mousedown keeps focus in the field.
                  onMouseDown={(event) => {
                    event.preventDefault()
                    choose(item)
                  }}
                  onMouseMove={() => setHighlighted(index)}
                  className="flex min-h-8 cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-xs aria-selected:bg-accent aria-selected:text-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground"
                >
                  {item.icon}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{item.label}</span>
                    {item.description ? (
                      <span className="block truncate text-[11px] text-muted-foreground">{item.description}</span>
                    ) : null}
                  </span>
                </li>
              ))
            ) : (
              <li role="presentation" className="px-2 py-1.5 text-xs text-muted-foreground">
                {labels.empty ?? "No match"}
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export { MentionInput }
export type { Mention, MentionItem, MentionTrigger }
