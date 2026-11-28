<script setup lang="ts">
import { computed, nextTick, ref, useId, watch, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import {
  defaultFilter,
  escapeRegExp,
  mentionsIn,
  type Mention,
  type MentionActive,
  type MentionItem,
  type MentionTrigger,
} from "./types"

/**
 * A text area where a trigger character opens a list: @ for people, / for
 * commands, or your own. Picked items are inserted as text and tinted in
 * place; the value stays plain text, and the mentions it contains come with
 * every change.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    defaultValue?: string
    triggers: MentionTrigger[]
    placeholder?: string
    disabled?: boolean
    /** Minimum height in lines. The field grows with its content. */
    rows?: number
    name?: string
    id?: string
    labels?: { empty?: string }
    ariaLabel?: string
    ariaDescribedby?: string
  }>(),
  { defaultValue: "", rows: 3, labels: () => ({}) },
)

const emit = defineEmits<{
  /** The text, and the mentions still present in it. */
  valueChange: [value: string, mentions: Mention[]]
  /** Runs after the list's own keys, e.g. to send on ⌘Enter. */
  keydown: [event: KeyboardEvent]
}>()

/** The text. Works with or without v-model; `defaultValue` seeds it when uncontrolled. */
const model = defineModel<string>()
const value = computed(() => model.value ?? props.defaultValue)

// Every item ever picked; only those still in the text count as mentions.
const picked = ref<Mention[]>([])
const active = ref<MentionActive | null>(null)
const highlighted = ref(0)
const caret = ref({ top: 0, left: 0 })
const caretAt = ref(0)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const mirrorRef = ref<HTMLDivElement | null>(null)
const listId = useId()

const options = computed<MentionItem[]>(() => {
  if (!active.value) return []
  const { items } = active.value.trigger
  return typeof items === "function"
    ? items(active.value.query).slice(0, 8)
    : defaultFilter(items, active.value.query)
})

function emitValue(text: string, pickedNow = picked.value) {
  model.value = text
  emit("valueChange", text, mentionsIn(text, pickedNow))
}

/** The trigger and query just before the caret, if any. */
function detect(text: string, position: number): MentionActive | null {
  const before = text.slice(0, position)
  for (const trigger of props.triggers) {
    const at = before.lastIndexOf(trigger.char)
    if (at === -1) continue
    if (at > 0 && !/\s/.test(before[at - 1])) continue
    const query = before.slice(at + 1)
    if (/[\s]/.test(query) || query.length > 40) continue
    return { trigger, start: at, query }
  }
  return null
}

function measureCaret() {
  const mirror = mirrorRef.value
  const textarea = textareaRef.value
  if (!mirror || !textarea) return
  const marker = mirror.querySelector<HTMLElement>("[data-caret]")
  if (!marker) return
  caret.value = {
    top: marker.offsetTop - textarea.scrollTop + marker.offsetHeight + 4,
    left: Math.min(marker.offsetLeft, textarea.clientWidth - 224),
  }
}

function sync(text: string, position: number) {
  const next = detect(text, position)
  active.value = next
  if (next) {
    highlighted.value = 0
    caretAt.value = position
  }
}

// The mirror renders up to the caret marker; measure once it has.
watch(
  [active, caretAt, value],
  () => {
    if (active.value) measureCaret()
  },
  { flush: "post" },
)

function choose(item: MentionItem) {
  const textarea = textareaRef.value
  const current = active.value
  if (!current || !textarea) return
  const before = value.value.slice(0, current.start)
  const after = value.value.slice(current.start + 1 + current.query.length)
  const inserted = `${current.trigger.char}${item.label} `
  const text = `${before}${inserted}${after.replace(/^ /, "")}`
  const mention = { trigger: current.trigger.char, id: item.id, label: item.label }
  const nextPicked = [
    ...picked.value.filter((m) => !(m.trigger === mention.trigger && m.label === mention.label)),
    mention,
  ]
  picked.value = nextPicked
  active.value = null
  emitValue(text, nextPicked)
  const caretPosition = before.length + inserted.length
  requestAnimationFrame(() => {
    textarea.focus()
    textarea.setSelectionRange(caretPosition, caretPosition)
  })
}

type MirrorPart = { kind: "text" | "mark" | "caret"; text: string; key: string }

// The tinted copy of the text that sits behind the transparent field.
const mirror = computed<MirrorPart[]>(() => {
  const text = value.value
  const mentions = mentionsIn(text, picked.value)
  const until = active.value ? caretAt.value : -1
  const keys = mentions.map((m) => escapeRegExp(`${m.trigger}${m.label}`))
  const pattern = keys.length ? new RegExp(`(^|\\s)(${keys.join("|")})(?=$|[\\s.,;:!?])`, "g") : null
  const parts: MirrorPart[] = []
  const pushText = (chunk: string, offset: number) => {
    if (until >= offset && until <= offset + chunk.length) {
      parts.push({ kind: "text", text: chunk.slice(0, until - offset), key: `t${offset}` })
      parts.push({ kind: "caret", text: "​", key: "caret" })
      parts.push({ kind: "text", text: chunk.slice(until - offset), key: `t${offset}b` })
    } else parts.push({ kind: "text", text: chunk, key: `t${offset}` })
  }
  let last = 0
  if (pattern) {
    for (const match of text.matchAll(pattern)) {
      const start = (match.index ?? 0) + match[1].length
      pushText(text.slice(last, start), last)
      parts.push({ kind: "mark", text: match[2], key: `m${start}` })
      last = start + match[2].length
    }
  }
  pushText(text.slice(last), last)
  // A trailing newline needs a character after it to take up a line.
  parts.push({ kind: "text", text: "​", key: "end" })
  return parts
})

const open = computed(() => Boolean(active.value))

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emitValue(target.value)
  sync(target.value, target.selectionStart)
  // Keep the DOM value in step when the parent holds the value and rejects the change.
  void nextTick(() => {
    if (target.value !== value.value) target.value = value.value
  })
}

function onSelect(event: Event) {
  const target = event.currentTarget as HTMLTextAreaElement
  if (target.selectionStart === target.selectionEnd) sync(target.value, target.selectionStart)
  else active.value = null
}

function onScroll(event: Event) {
  if (mirrorRef.value) mirrorRef.value.scrollTop = (event.currentTarget as HTMLTextAreaElement).scrollTop
}

function onKeyDown(event: KeyboardEvent) {
  const list = options.value
  if (open.value && list.length) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      highlighted.value = (highlighted.value + 1) % list.length
      return
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      highlighted.value = (highlighted.value - 1 + list.length) % list.length
      return
    }
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault()
      choose(list[highlighted.value])
      return
    }
  }
  if (open.value && event.key === "Escape") {
    event.preventDefault()
    active.value = null
    return
  }
  emit("keydown", event)
}

const field =
  "col-start-1 row-start-1 w-full px-3 py-2.5 text-xs leading-5 whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
const markClass =
  "rounded-md bg-primary/12 text-transparent shadow-[0_0_0_2px_color-mix(in_oklch,var(--primary)_12%,transparent)]"
const itemClass =
  "flex min-h-8 cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-xs aria-selected:bg-accent aria-selected:text-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground"

defineExpose({ textarea: textareaRef })
</script>

<template>
  <div
    data-slot="mention-input"
    :class="
      cn(
        'relative grid w-full rounded-2xl border border-border bg-transparent transition-colors',
        'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30',
        disabled && 'pointer-events-none opacity-50',
        props.class,
      )
    "
  >
    <div ref="mirrorRef" aria-hidden="true" :class="cn(field, 'pointer-events-none overflow-hidden text-transparent')">
      <template v-for="part in mirror" :key="part.key">
        <mark v-if="part.kind === 'mark'" :class="markClass">{{ part.text }}</mark>
        <span v-else-if="part.kind === 'caret'" data-caret="">{{ part.text }}</span>
        <template v-else>{{ part.text }}</template>
      </template>
    </div>
    <textarea
      :id="id"
      ref="textareaRef"
      :name="name"
      :rows="rows"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :aria-describedby="ariaDescribedby"
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="open"
      :aria-controls="open ? listId : undefined"
      :aria-activedescendant="open && options[highlighted] ? `${listId}-${highlighted}` : undefined"
      :class="
        cn(
          field,
          'field-sizing-content resize-none overflow-auto bg-transparent text-foreground caret-foreground outline-none placeholder:text-muted-foreground',
        )
      "
      @input="onInput"
      @select="onSelect"
      @scroll="onScroll"
      @blur="active = null"
      @keydown="onKeyDown"
    />

    <div
      v-if="open"
      class="absolute z-50 w-56 overflow-hidden rounded-2xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10"
      :style="{ top: `${caret.top}px`, left: `${Math.max(caret.left, 4)}px` }"
    >
      <p v-if="active?.trigger.label" class="m-0 px-2 pt-1.5 pb-1 text-[11px] font-medium text-muted-foreground">
        {{ active.trigger.label }}
      </p>
      <ul
        :id="listId"
        role="listbox"
        :aria-label="active?.trigger.label ?? 'Suggestions'"
        class="m-0 max-h-60 list-none overflow-y-auto p-0"
      >
        <template v-if="options.length">
          <!-- mousedown keeps focus in the field. -->
          <li
            v-for="(item, index) in options"
            :id="`${listId}-${index}`"
            :key="item.id"
            role="option"
            :aria-selected="index === highlighted"
            :class="itemClass"
            @mousedown.prevent="choose(item)"
            @mousemove="highlighted = index"
          >
            <component :is="item.icon" v-if="item.icon" />
            <span class="min-w-0 flex-1">
              <span class="block truncate">{{ item.label }}</span>
              <span v-if="item.description" class="block truncate text-[11px] text-muted-foreground">
                {{ item.description }}
              </span>
            </span>
          </li>
        </template>
        <li v-else role="presentation" class="px-2 py-1.5 text-xs text-muted-foreground">
          {{ labels.empty ?? "No match" }}
        </li>
      </ul>
    </div>
  </div>
</template>
