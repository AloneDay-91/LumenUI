<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue"
import { ChevronsUpDown } from "@lucide/vue"

import { CopyButton } from "@/components/ui/copy-button"
import { cn } from "@/lib/utils"
import { diffLines, highlight, pairUp, type DiffLine } from "./diff"

/**
 * Two versions of a text, compared line by line. Unified or side by side,
 * with line numbers, counts in the header, the changed part of each edited
 * line marked, and long unchanged stretches folded behind a button.
 * The `#title` slot replaces the `title` text in the header.
 */
const props = withDefaults(
  defineProps<{
    oldValue: string
    newValue: string
    /** File name or label in the header. */
    title?: string
    view?: "unified" | "split"
    /** Unchanged lines kept around each change. Infinity shows everything. */
    context?: number
    /** Any CSS length. The body scrolls past it. */
    maxHeight?: string
    /** A button that copies the new text. */
    copyable?: boolean
    labels?: {
      expand?: (count: number) => string
      added?: (count: number) => string
      removed?: (count: number) => string
      copy?: string
      /** Read before each added line; colour and the + sign are not announced. */
      addedLine?: string
      removedLine?: string
    }
    class?: HTMLAttributes["class"]
  }>(),
  { view: "unified", context: 3, copyable: true, labels: () => ({}) },
)

type Row = { kind: "line"; line: DiffLine; pair?: string } | { kind: "fold"; id: number; lines: DiffLine[] }
type FoldRow = Extract<Row, { kind: "fold" }>

type Entry =
  | { kind: "fold"; key: string; row: FoldRow; span: string }
  | { kind: "number"; key: string; line: DiffLine }
  | {
      kind: "cell"
      key: string
      line?: DiffLine
      side: "old" | "new"
      marks: ReturnType<typeof highlight>
    }

const lines = computed(() => diffLines(props.oldValue, props.newValue))
const pairs = computed(() => pairUp(lines.value))
const expanded = ref<Set<number>>(new Set())

const added = computed(() => lines.value.filter((line) => line.type === "added").length)
const removed = computed(() => lines.value.filter((line) => line.type === "removed").length)

const rows = computed(() => {
  const all = lines.value
  // Clamped so `Infinity` does not loop forever.
  const context = Math.min(props.context, all.length)
  const near = all.map(() => false)
  all.forEach((line, k) => {
    if (line.type === "same") return
    for (let d = -context; d <= context; d++) if (all[k + d]) near[k + d] = true
  })
  const out: Row[] = []
  let fold: DiffLine[] = []
  let id = 0
  const flush = () => {
    if (!fold.length) return
    if (expanded.value.has(id) || fold.length <= 2) fold.forEach((line) => out.push({ kind: "line", line }))
    else out.push({ kind: "fold", id, lines: fold })
    id++
    fold = []
  }
  all.forEach((line, k) => {
    if (line.type === "same" && !near[k]) fold.push(line)
    else {
      flush()
      out.push({ kind: "line", line, pair: pairs.value.get(line) })
    }
  })
  flush()
  return out
})

function cell(key: string, line: DiffLine | undefined, side: "old" | "new", pair?: string): Entry {
  const marks = line && line.type !== "same" ? highlight(line.text, pair, line.type) : null
  return { kind: "cell", key, line, side, marks }
}

const entries = computed<Entry[]>(() => {
  const out: Entry[] = []
  const list = rows.value
  if (props.view !== "split") {
    list.forEach((row, k) => {
      if (row.kind === "fold") out.push({ kind: "fold", key: `f${row.id}`, row, span: "col-span-4" })
      else {
        out.push({ kind: "number", key: `${k}n`, line: row.line })
        out.push(cell(`${k}c`, row.line, "new", row.pair))
      }
    })
    return out
  }
  // Side by side: walk each change, removed lines on the left, added on the right.
  for (let k = 0; k < list.length; ) {
    const row = list[k]!
    if (row.kind === "fold") {
      out.push({ kind: "fold", key: `f${row.id}`, row, span: "col-span-6" })
      k++
      continue
    }
    if (row.line.type === "same") {
      out.push(cell(`${k}o`, row.line, "old"))
      out.push(cell(`${k}n`, row.line, "new"))
      k++
      continue
    }
    const left: Extract<Row, { kind: "line" }>[] = []
    const right: Extract<Row, { kind: "line" }>[] = []
    while (k < list.length) {
      const r = list[k]!
      if (r.kind !== "line" || r.line.type === "same") break
      ;(r.line.type === "removed" ? left : right).push(r)
      k++
    }
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      out.push(cell(`c${k}-${i}o`, left[i]?.line, "old", left[i]?.pair))
      out.push(cell(`c${k}-${i}n`, right[i]?.line, "new", right[i]?.pair))
    }
  }
  return out
})

function expand(id: number) {
  expanded.value = new Set(expanded.value).add(id)
}

const tone = (type: DiffLine["type"]) =>
  type === "added" ? "bg-jade-wash" : type === "removed" ? "bg-crimson-wash" : ""
const sign = (type: DiffLine["type"]) => (type === "added" ? "+" : type === "removed" ? "−" : " ")
const numberClass = "w-10 shrink-0 pe-2 text-end text-muted-foreground/60 select-none tabular-nums"

function lineNumber(line: DiffLine, side: "old" | "new") {
  if (side === "old") return "oldNumber" in line ? line.oldNumber : ""
  return "newNumber" in line ? line.newNumber : ""
}

const regionLabel = computed(() => (props.title ? `Diff of ${props.title}` : "Diff"))
</script>

<template>
  <div
    data-slot="diff-viewer"
    :class="cn('overflow-hidden rounded-2xl border border-border bg-muted/40 text-xs', props.class)"
  >
    <div class="flex h-9 items-center gap-3 border-b border-border ps-3 pe-1.5">
      <span class="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground"><slot name="title">{{ title }}</slot></span>
      <span class="flex shrink-0 gap-2 font-mono text-[11px] tabular-nums">
        <span class="text-jade-ink" :aria-label="labels.added?.(added) ?? `${added} added`">+{{ added }}</span>
        <span class="text-crimson-ink" :aria-label="labels.removed?.(removed) ?? `${removed} removed`">−{{ removed }}</span>
      </span>
      <CopyButton v-if="copyable" :value="newValue" size="icon-xs" :label="labels.copy ?? 'Copy new version'" />
    </div>
    <div
      tabindex="0"
      role="region"
      :aria-label="regionLabel"
      class="overflow-auto py-1 font-mono text-[12px] leading-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:ring-inset"
      :style="maxHeight ? { maxHeight } : undefined"
    >
      <div
        :class="
          view === 'split'
            ? 'grid grid-cols-[auto_auto_minmax(0,1fr)_auto_auto_minmax(0,1fr)]'
            : 'grid min-w-max grid-cols-[auto_auto_auto_1fr]'
        "
      >
        <template v-for="entry in entries" :key="entry.key">
          <button
            v-if="entry.kind === 'fold'"
            type="button"
            :class="
              cn(
                'flex w-full items-center gap-2 bg-muted/60 px-3 py-1 text-start text-[11px] text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:bg-muted',
                entry.span,
              )
            "
            @click="expand(entry.row.id)"
          >
            <ChevronsUpDown aria-hidden="true" class="size-3" />
            {{ labels.expand?.(entry.row.lines.length) ?? `Show ${entry.row.lines.length} unchanged lines` }}
          </button>
          <span v-else-if="entry.kind === 'number'" :class="cn(numberClass, tone(entry.line.type))">{{ lineNumber(entry.line, "old") }}</span>
          <div v-else-if="!entry.line" class="col-span-3 bg-muted/30" />
          <template v-else>
            <span :class="cn(numberClass, tone(entry.line.type))">{{ lineNumber(entry.line, entry.side) }}</span>
            <span
              aria-hidden="true"
              :class="cn('w-4 shrink-0 select-none', tone(entry.line.type), entry.line.type === 'added' ? 'text-jade-ink' : 'text-crimson-ink')"
            >{{ sign(entry.line.type) }}</span>
            <span :class="cn('min-w-0 pe-3', view === 'split' ? 'break-all whitespace-pre-wrap' : 'whitespace-pre', tone(entry.line.type))"><template v-if="entry.line.type === 'same'">{{ entry.line.text || " " }}</template><template v-else><span class="sr-only">{{ entry.line.type === "added" ? (labels.addedLine ?? "Added: ") : (labels.removedLine ?? "Removed: ") }}</span><template v-if="entry.marks">{{ entry.marks.before }}<mark :class="cn('rounded-[3px] text-inherit', entry.line.type === 'added' ? 'bg-jade-panel' : 'bg-crimson-panel')">{{ entry.marks.middle }}</mark>{{ entry.marks.after }}</template><template v-else>{{ entry.line.text || " " }}</template></template></span>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
