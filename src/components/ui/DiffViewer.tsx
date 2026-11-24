"use client"

import * as React from "react"
import { ChevronsUpDownIcon } from "lucide-react"

import { CopyButton } from "@/components/ui/CopyButton"
import { cn } from "@/lib/utils"

type DiffLine =
  | { type: "same"; text: string; oldNumber: number; newNumber: number }
  | { type: "removed"; text: string; oldNumber: number }
  | { type: "added"; text: string; newNumber: number }

/** Longest-common-subsequence line diff. Fine for files of a few thousand lines. */
function diffLines(oldText: string, newText: string): DiffLine[] {
  const a = oldText.replace(/\n$/, "").split("\n")
  const b = newText.replace(/\n$/, "").split("\n")
  // Trim the shared head and tail first: most edits are small.
  let start = 0
  while (start < a.length && start < b.length && a[start] === b[start]) start++
  let endA = a.length
  let endB = b.length
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--
    endB--
  }
  const midA = a.slice(start, endA)
  const midB = b.slice(start, endB)
  const n = midA.length
  const m = midB.length
  const table = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      table[i][j] = midA[i] === midB[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1])
    }
  }

  const lines: DiffLine[] = []
  for (let k = 0; k < start; k++) lines.push({ type: "same", text: a[k], oldNumber: k + 1, newNumber: k + 1 })
  let i = 0
  let j = 0
  while (i < n || j < m) {
    if (i < n && j < m && midA[i] === midB[j]) {
      lines.push({ type: "same", text: midA[i], oldNumber: start + i + 1, newNumber: start + j + 1 })
      i++
      j++
    } else if (j < m && (i === n || table[i][j + 1] >= table[i + 1][j])) {
      lines.push({ type: "added", text: midB[j], newNumber: start + j + 1 })
      j++
    } else {
      lines.push({ type: "removed", text: midA[i], oldNumber: start + i + 1 })
      i++
    }
  }
  // Removed before added within a change, as diffs read.
  for (let k = 0; k < lines.length; k++) {
    if (lines[k].type !== "added") continue
    let end = k
    while (end < lines.length && lines[end].type !== "same") end++
    const block = lines.slice(k, end)
    block.sort((x, y) => (x.type === y.type ? 0 : x.type === "removed" ? -1 : 1))
    lines.splice(k, block.length, ...block)
    k = end
  }
  for (let k = endA; k < a.length; k++) {
    const offset = k - endA
    lines.push({ type: "same", text: a[k], oldNumber: k + 1, newNumber: endB + offset + 1 })
  }
  return lines
}

/** The changed middle of a pair of lines, for the darker inline highlight. */
function changedRange(from: string, to: string) {
  let head = 0
  while (head < from.length && head < to.length && from[head] === to[head]) head++
  let tail = 0
  while (
    tail < from.length - head &&
    tail < to.length - head &&
    from[from.length - 1 - tail] === to[to.length - 1 - tail]
  )
    tail++
  return { head, tail }
}

function Highlighted({ text, other, type }: { text: string; other?: string; type: "added" | "removed" }) {
  if (other === undefined) return <>{text || " "}</>
  const { head, tail } = changedRange(type === "removed" ? text : other, type === "removed" ? other : text)
  const middle = text.slice(head, text.length - tail)
  // A rewritten line has nothing worth pointing at.
  if (!middle || middle.length > text.length * 0.8) return <>{text || " "}</>
  return (
    <>
      {text.slice(0, head)}
      <mark
        className={cn(
          "rounded-[3px] text-inherit",
          type === "added" ? "bg-jade-panel" : "bg-crimson-panel"
        )}
      >
        {middle}
      </mark>
      {text.slice(text.length - tail)}
    </>
  )
}

type Row =
  | { kind: "line"; line: DiffLine; pair?: string }
  | { kind: "fold"; id: number; lines: DiffLine[] }

/** Pairs each removed line with the added line in the same position of its change. */
function pairUp(lines: DiffLine[]) {
  const pairs = new Map<DiffLine, string>()
  for (let k = 0; k < lines.length; ) {
    if (lines[k].type === "same") {
      k++
      continue
    }
    const removed: DiffLine[] = []
    const added: DiffLine[] = []
    while (k < lines.length && lines[k].type !== "same") {
      ;(lines[k].type === "removed" ? removed : added).push(lines[k])
      k++
    }
    removed.forEach((line, i) => {
      if (added[i]) {
        pairs.set(line, added[i].text)
        pairs.set(added[i], line.text)
      }
    })
  }
  return pairs
}

/**
 * Two versions of a text, compared line by line. Unified or side by side,
 * with line numbers, counts in the header, the changed part of each edited
 * line marked, and long unchanged stretches folded behind a button.
 */
function DiffViewer({
  className,
  oldValue,
  newValue,
  title,
  view = "unified",
  context = 3,
  maxHeight,
  copyable = true,
  labels = {},
}: {
  className?: string
  oldValue: string
  newValue: string
  /** File name or label in the header. */
  title?: React.ReactNode
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
}) {
  const lines = React.useMemo(() => diffLines(oldValue, newValue), [oldValue, newValue])
  const pairs = React.useMemo(() => pairUp(lines), [lines])
  const [expanded, setExpanded] = React.useState<Set<number>>(() => new Set())

  const added = lines.filter((line) => line.type === "added").length
  const removed = lines.filter((line) => line.type === "removed").length

  const rows = React.useMemo(() => {
    const near = lines.map(() => false)
    lines.forEach((line, k) => {
      if (line.type === "same") return
      for (let d = -context; d <= context; d++) if (lines[k + d]) near[k + d] = true
    })
    const out: Row[] = []
    let fold: DiffLine[] = []
    let id = 0
    const flush = () => {
      if (!fold.length) return
      if (expanded.has(id) || fold.length <= 2) fold.forEach((line) => out.push({ kind: "line", line }))
      else out.push({ kind: "fold", id, lines: fold })
      id++
      fold = []
    }
    lines.forEach((line, k) => {
      if (line.type === "same" && !near[k]) fold.push(line)
      else {
        flush()
        out.push({ kind: "line", line, pair: pairs.get(line) })
      }
    })
    flush()
    return out
  }, [lines, pairs, context, expanded])

  const tone = (type: DiffLine["type"]) =>
    type === "added" ? "bg-jade-wash" : type === "removed" ? "bg-crimson-wash" : ""
  const sign = (type: DiffLine["type"]) => (type === "added" ? "+" : type === "removed" ? "−" : " ")
  const number = "w-10 shrink-0 pe-2 text-end text-muted-foreground/60 select-none tabular-nums"

  const foldButton = (row: Extract<Row, { kind: "fold" }>, span: string) => (
    <button
      type="button"
      onClick={() => setExpanded((set) => new Set(set).add(row.id))}
      className={cn(
        "flex w-full items-center gap-2 bg-muted/60 px-3 py-1 text-start text-[11px] text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:bg-muted",
        span
      )}
    >
      <ChevronsUpDownIcon aria-hidden className="size-3" />
      {labels.expand?.(row.lines.length) ?? `Show ${row.lines.length} unchanged lines`}
    </button>
  )

  const cell = (line: DiffLine | undefined, side: "old" | "new", pair?: string) => {
    if (!line) return <div className="col-span-3 bg-muted/30" />
    const n = side === "old" ? ("oldNumber" in line ? line.oldNumber : "") : "newNumber" in line ? line.newNumber : ""
    return (
      <>
        <span className={cn(number, tone(line.type))}>{n}</span>
        <span aria-hidden className={cn("w-4 shrink-0 select-none", tone(line.type), line.type === "added" ? "text-jade-ink" : "text-crimson-ink")}>
          {sign(line.type)}
        </span>
        <span
          className={cn(
            "min-w-0 pe-3",
            view === "split" ? "break-all whitespace-pre-wrap" : "whitespace-pre",
            tone(line.type)
          )}
        >
          {line.type === "same" ? null : (
            <span className="sr-only">
              {line.type === "added" ? (labels.addedLine ?? "Added: ") : (labels.removedLine ?? "Removed: ")}
            </span>
          )}
          {line.type === "same" ? line.text || " " : <Highlighted text={line.text} other={pair} type={line.type} />}
        </span>
      </>
    )
  }

  // Side by side: walk each change, removed lines on the left, added on the right.
  const splitRows = () => {
    const out: React.ReactNode[] = []
    for (let k = 0; k < rows.length; ) {
      const row = rows[k]
      if (row.kind === "fold") {
        out.push(<React.Fragment key={`f${row.id}`}>{foldButton(row, "col-span-6")}</React.Fragment>)
        k++
        continue
      }
      if (row.line.type === "same") {
        out.push(
          <React.Fragment key={k}>
            {cell(row.line, "old")}
            {cell(row.line, "new")}
          </React.Fragment>
        )
        k++
        continue
      }
      const left: Extract<Row, { kind: "line" }>[] = []
      const right: Extract<Row, { kind: "line" }>[] = []
      while (k < rows.length) {
        const r = rows[k]
        if (r.kind !== "line" || r.line.type === "same") break
        ;(r.line.type === "removed" ? left : right).push(r)
        k++
      }
      for (let i = 0; i < Math.max(left.length, right.length); i++) {
        out.push(
          <React.Fragment key={`c${k}-${i}`}>
            {cell(left[i]?.line, "old", left[i]?.pair)}
            {cell(right[i]?.line, "new", right[i]?.pair)}
          </React.Fragment>
        )
      }
    }
    return out
  }

  return (
    <div
      data-slot="diff-viewer"
      className={cn("overflow-hidden rounded-2xl border border-border bg-muted/40 text-xs", className)}
    >
      <div className="flex h-9 items-center gap-3 border-b border-border ps-3 pe-1.5">
        <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">{title}</span>
        <span className="flex shrink-0 gap-2 font-mono text-[11px] tabular-nums">
          <span className="text-jade-ink" aria-label={labels.added?.(added) ?? `${added} added`}>+{added}</span>
          <span className="text-crimson-ink" aria-label={labels.removed?.(removed) ?? `${removed} removed`}>
            −{removed}
          </span>
        </span>
        {copyable ? <CopyButton value={newValue} size="icon-xs" label={labels.copy ?? "Copy new version"} /> : null}
      </div>
      <div
        tabIndex={0}
        role="region"
        aria-label={typeof title === "string" ? `Diff of ${title}` : "Diff"}
        className="overflow-auto py-1 font-mono text-[12px] leading-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:ring-inset"
        style={maxHeight ? { maxHeight } : undefined}
      >
        {view === "split" ? (
          <div className="grid grid-cols-[auto_auto_minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
            {splitRows()}
          </div>
        ) : (
          <div className="grid min-w-max grid-cols-[auto_auto_auto_1fr]">
            {rows.map((row, k) =>
              row.kind === "fold" ? (
                <React.Fragment key={`f${row.id}`}>{foldButton(row, "col-span-4")}</React.Fragment>
              ) : (
                <React.Fragment key={k}>
                  <span className={cn(number, tone(row.line.type))}>
                    {"oldNumber" in row.line ? row.line.oldNumber : ""}
                  </span>
                  {cell(row.line, "new", row.pair)}
                </React.Fragment>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export { DiffViewer, diffLines }
export type { DiffLine }
