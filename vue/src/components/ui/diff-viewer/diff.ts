export type DiffLine =
  | { type: "same"; text: string; oldNumber: number; newNumber: number }
  | { type: "removed"; text: string; oldNumber: number }
  | { type: "added"; text: string; newNumber: number }

/** Longest-common-subsequence line diff. Fine for files of a few thousand lines. */
export function diffLines(oldText: string, newText: string): DiffLine[] {
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
      table[i]![j] = midA[i] === midB[j] ? table[i + 1]![j + 1]! + 1 : Math.max(table[i + 1]![j]!, table[i]![j + 1]!)
    }
  }

  const lines: DiffLine[] = []
  for (let k = 0; k < start; k++) lines.push({ type: "same", text: a[k]!, oldNumber: k + 1, newNumber: k + 1 })
  let i = 0
  let j = 0
  while (i < n || j < m) {
    if (i < n && j < m && midA[i] === midB[j]) {
      lines.push({ type: "same", text: midA[i]!, oldNumber: start + i + 1, newNumber: start + j + 1 })
      i++
      j++
    } else if (j < m && (i === n || table[i]![j + 1]! >= table[i + 1]![j]!)) {
      lines.push({ type: "added", text: midB[j]!, newNumber: start + j + 1 })
      j++
    } else {
      lines.push({ type: "removed", text: midA[i]!, oldNumber: start + i + 1 })
      i++
    }
  }
  // Removed before added within a change, as diffs read.
  for (let k = 0; k < lines.length; k++) {
    if (lines[k]!.type !== "added") continue
    let end = k
    while (end < lines.length && lines[end]!.type !== "same") end++
    const block = lines.slice(k, end)
    block.sort((x, y) => (x.type === y.type ? 0 : x.type === "removed" ? -1 : 1))
    lines.splice(k, block.length, ...block)
    k = end
  }
  for (let k = endA; k < a.length; k++) {
    const offset = k - endA
    lines.push({ type: "same", text: a[k]!, oldNumber: k + 1, newNumber: endB + offset + 1 })
  }
  return lines
}

/** The changed middle of a pair of lines, for the darker inline highlight. */
export function changedRange(from: string, to: string) {
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

/** The text split around its changed middle, or null when there is nothing worth marking. */
export function highlight(text: string, other: string | undefined, type: "added" | "removed") {
  if (other === undefined) return null
  const { head, tail } = changedRange(type === "removed" ? text : other, type === "removed" ? other : text)
  const middle = text.slice(head, text.length - tail)
  // A rewritten line has nothing worth pointing at.
  if (!middle || middle.length > text.length * 0.8) return null
  return { before: text.slice(0, head), middle, after: text.slice(text.length - tail) }
}

/** Pairs each removed line with the added line in the same position of its change. */
export function pairUp(lines: DiffLine[]) {
  const pairs = new Map<DiffLine, string>()
  for (let k = 0; k < lines.length; ) {
    if (lines[k]!.type === "same") {
      k++
      continue
    }
    const removed: DiffLine[] = []
    const added: DiffLine[] = []
    while (k < lines.length && lines[k]!.type !== "same") {
      ;(lines[k]!.type === "removed" ? removed : added).push(lines[k]!)
      k++
    }
    removed.forEach((line, i) => {
      if (added[i]) {
        pairs.set(line, added[i]!.text)
        pairs.set(added[i]!, line.text)
      }
    })
  }
  return pairs
}
