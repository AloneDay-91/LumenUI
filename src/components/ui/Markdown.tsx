import * as React from "react"

import { CodeBlock } from "@/components/ui/CodeBlock"
import { Typography } from "@/components/ui/Typography"
import { cn } from "@/lib/utils"

/* ---------------------------------------------------------------------------
   A small Markdown reader: CommonMark's everyday blocks plus GFM tables, task
   lists, and strikethrough. It builds React nodes, never HTML strings, so
   text is always escaped. Unclosed code fences render as code, which keeps a
   streaming reply readable while it arrives.
   --------------------------------------------------------------------------- */

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "quote"; blocks: Block[] }
  | { type: "list"; ordered: boolean; start: number; items: { checked: boolean | null; blocks: Block[] }[] }
  | { type: "table"; align: ("left" | "center" | "right" | null)[]; head: string[]; rows: string[][] }
  | { type: "rule" }

const LIST_ITEM = /^(\s{0,3})([-*+]|\d{1,9}[.)])\s+(.*)$/
const FENCE = /^\s{0,3}(`{3,}|~{3,})\s*([\w+-]*)/

function splitRow(line: string) {
  let row = line.trim()
  if (row.startsWith("|")) row = row.slice(1)
  if (row.endsWith("|") && !row.endsWith("\\|")) row = row.slice(0, -1)
  return row.split(/(?<!\\)\|/).map((cell) => cell.trim().replace(/\\\|/g, "|"))
}

function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, "\n").replace(/\t/g, "  ").split("\n")
  const blocks: Block[] = []
  let i = 0

  const isBlank = (line: string | undefined) => line === undefined || line.trim() === ""
  const startsBlock = (line: string) =>
    /^\s{0,3}#{1,6}\s/.test(line) ||
    FENCE.test(line) ||
    /^\s{0,3}>/.test(line) ||
    LIST_ITEM.test(line) ||
    /^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(line)

  while (i < lines.length) {
    const line = lines[i]
    if (isBlank(line)) {
      i++
      continue
    }

    const fence = line.match(FENCE)
    if (fence) {
      const marker = fence[1]
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith(marker)) code.push(lines[i++])
      i++ // the closing fence, if there is one
      blocks.push({ type: "code", lang: fence[2], code: code.join("\n") })
      continue
    }

    const heading = line.match(/^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/)
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2] })
      i++
      continue
    }

    if (/^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(line)) {
      blocks.push({ type: "rule" })
      i++
      continue
    }

    if (/^\s{0,3}>/.test(line)) {
      const inner: string[] = []
      while (i < lines.length && !isBlank(lines[i]) && (/^\s{0,3}>/.test(lines[i]) || !startsBlock(lines[i]))) {
        inner.push(lines[i].replace(/^\s{0,3}>\s?/, ""))
        i++
      }
      blocks.push({ type: "quote", blocks: parseBlocks(inner.join("\n")) })
      continue
    }

    const item = line.match(LIST_ITEM)
    if (item) {
      const ordered = /\d/.test(item[2])
      const indent = item[1].length
      const items: { checked: boolean | null; blocks: Block[] }[] = []
      while (i < lines.length) {
        const current = lines[i].match(LIST_ITEM)
        if (!current || current[1].length !== indent || /\d/.test(current[2]) !== ordered) break
        const content = [current[3]]
        const childIndent = indent + current[2].length + 1
        i++
        // Continuation lines: indented under the marker, or lazy paragraph text.
        while (i < lines.length) {
          const next = lines[i]
          if (isBlank(next)) {
            const after = lines[i + 1]
            if (after !== undefined && after.search(/\S/) >= childIndent) {
              content.push("")
              i++
              continue
            }
            break
          }
          const lead = next.search(/\S/)
          if (lead >= childIndent || (lead > indent && LIST_ITEM.test(next))) {
            content.push(next.slice(Math.min(lead, childIndent)))
            i++
          } else if (!startsBlock(next) && !LIST_ITEM.test(next)) {
            content.push(next.trim())
            i++
          } else break
        }
        let text = content.join("\n")
        let checked: boolean | null = null
        const task = text.match(/^\[([ xX])\]\s+/)
        if (task) {
          checked = task[1] !== " "
          text = text.slice(task[0].length)
        }
        items.push({ checked, blocks: parseBlocks(text) })
        while (i < lines.length && isBlank(lines[i]) && lines[i + 1]?.match(LIST_ITEM)?.[1].length === indent) i++
      }
      blocks.push({ type: "list", ordered, start: ordered ? Number.parseInt(item[2], 10) : 1, items })
      continue
    }

    // GFM table: a row, then a delimiter row.
    if (line.includes("|") && /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(lines[i + 1] ?? "")) {
      const head = splitRow(line)
      const align = splitRow(lines[i + 1]).map((cell) =>
        cell.startsWith(":") && cell.endsWith(":") ? "center" : cell.endsWith(":") ? "right" : cell.startsWith(":") ? "left" : null
      )
      i += 2
      const rows: string[][] = []
      while (i < lines.length && !isBlank(lines[i]) && lines[i].includes("|")) rows.push(splitRow(lines[i++]))
      blocks.push({ type: "table", align, head, rows })
      continue
    }

    const paragraph: string[] = []
    while (i < lines.length && !isBlank(lines[i]) && (paragraph.length === 0 || !startsBlock(lines[i]))) {
      paragraph.push(lines[i++])
    }
    blocks.push({ type: "paragraph", text: paragraph.join("\n") })
  }
  return blocks
}

/* ---------------------------------------------------------------------------
   Inline
   --------------------------------------------------------------------------- */

function safeUrl(url: string) {
  const trimmed = url.trim()
  if (/^(https?:|mailto:|tel:)/i.test(trimmed) || /^[/#?.]/.test(trimmed)) return trimmed
  return /^[\w-]+:/.test(trimmed) ? null : trimmed
}

const INLINE =
  /(`+)([\s\S]*?[^`])\1(?!`)|!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)|\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)|<(https?:\/\/[^>\s]+)>|(https?:\/\/[^\s<]+[^\s<.,:;"')\]])|(\*\*|__)(?=\S)([\s\S]+?\S)\11|(\*|_)(?=\S)([\s\S]+?\S)\13(?![\w*])|~~(?=\S)([\s\S]+?\S)~~|(\\)([\\`*_{}[\]()#+\-.!|~>])|( {2,}|\\)\n/

function renderInline(text: string, key = "i"): React.ReactNode[] {
  const out: React.ReactNode[] = []
  let rest = text
  let n = 0
  while (rest) {
    const match = rest.match(INLINE)
    if (!match || match.index === undefined) {
      out.push(rest)
      break
    }
    if (match.index > 0) out.push(rest.slice(0, match.index))
    const k = `${key}-${n++}`
    const [all] = match
    if (match[1]) {
      out.push(<code key={k}>{match[2].replace(/^ (.*) $/, "$1")}</code>)
    } else if (match[4] !== undefined) {
      const src = safeUrl(match[4])
      out.push(
        src ? (
          // eslint-disable-next-line @next/next/no-img-element -- Markdown images come from anywhere
          <img key={k} src={src} alt={match[3]} title={match[5]} loading="lazy" />
        ) : (
          match[3]
        )
      )
    } else if (match[7] !== undefined) {
      const href = safeUrl(match[7])
      const external = href ? /^https?:/i.test(href) : false
      out.push(
        href ? (
          <a key={k} href={href} title={match[8]} {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
            {renderInline(match[6], k)}
          </a>
        ) : (
          <React.Fragment key={k}>{renderInline(match[6], k)}</React.Fragment>
        )
      )
    } else if (match[9] || match[10]) {
      const href = match[9] ?? match[10]
      out.push(
        <a key={k} href={href} target="_blank" rel="noreferrer noopener">
          {href}
        </a>
      )
    } else if (match[11]) {
      out.push(<strong key={k}>{renderInline(match[12], k)}</strong>)
    } else if (match[13]) {
      out.push(<em key={k}>{renderInline(match[14], k)}</em>)
    } else if (match[15] !== undefined) {
      out.push(<del key={k}>{renderInline(match[15], k)}</del>)
    } else if (match[16]) {
      out.push(match[17])
    } else {
      out.push(<br key={k} />)
    }
    rest = rest.slice(match.index + all.length)
  }
  return out
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")
}

/* ---------------------------------------------------------------------------
   Render
   --------------------------------------------------------------------------- */

function renderBlocks(blocks: Block[], options: RenderOptions, key = "b", tight = false): React.ReactNode[] {
  return blocks.map((block, index) => {
    const k = `${key}-${index}`
    switch (block.type) {
      case "heading": {
        const Tag = `h${Math.min(6, block.level + options.headingOffset)}` as "h2"
        return (
          <Tag key={k} id={options.headingIds ? slugify(block.text) : undefined}>
            {renderInline(block.text, k)}
          </Tag>
        )
      }
      case "paragraph":
        return tight ? (
          <React.Fragment key={k}>{renderInline(block.text, k)}</React.Fragment>
        ) : (
          <p key={k}>{renderInline(block.text, k)}</p>
        )
      case "code":
        return (
          <CodeBlock
            key={k}
            code={block.code}
            language={block.lang || undefined}
            copyable={options.copyCode}
            className="not-prose my-(--type-flow)"
          />
        )
      case "quote":
        return <blockquote key={k}>{renderBlocks(block.blocks, options, k)}</blockquote>
      case "rule":
        return <hr key={k} />
      case "list": {
        const List = block.ordered ? "ol" : "ul"
        const tasks = block.items.some((item) => item.checked !== null)
        // A list whose items are one short paragraph each renders without <p>.
        const isTight = block.items.every((item) => item.blocks.length <= 1 || item.blocks[0].type === "paragraph")
        return (
          <List
            key={k}
            start={block.ordered && block.start !== 1 ? block.start : undefined}
            data-task-list={tasks ? "" : undefined}
            className={tasks ? "list-none ps-0" : undefined}
          >
            {block.items.map((item, itemIndex) => (
              <li
                key={`${k}-${itemIndex}`}
                className={item.checked !== null ? "flex items-start gap-2" : undefined}
              >
                {item.checked !== null ? (
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    disabled
                    aria-label={item.checked ? "Done" : "Not done"}
                    className="mt-[0.35em] size-3.5 shrink-0 accent-primary"
                  />
                ) : null}
                {item.checked !== null ? (
                  <span className="min-w-0">{renderBlocks(item.blocks, options, `${k}-${itemIndex}`, isTight)}</span>
                ) : (
                  renderBlocks(item.blocks, options, `${k}-${itemIndex}`, isTight)
                )}
              </li>
            ))}
          </List>
        )
      }
      case "table":
        return (
          <div key={k} className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  {block.head.map((cell, c) => (
                    <th key={c} style={block.align[c] ? { textAlign: block.align[c]! } : undefined}>
                      {renderInline(cell, `${k}-h${c}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {block.head.map((_, c) => (
                      <td key={c} style={block.align[c] ? { textAlign: block.align[c]! } : undefined}>
                        {renderInline(row[c] ?? "", `${k}-${r}-${c}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
    }
  })
}

type RenderOptions = { headingOffset: number; headingIds: boolean; copyCode: boolean }

/**
 * Markdown rendered with Lumen's Typography: headings, lists and task lists,
 * tables, quotes, code blocks with a copy button, links, and images. Text is
 * escaped, raw HTML is shown as text, and only safe link schemes are kept.
 */
function Markdown({
  children,
  className,
  variant = "article",
  headingOffset = 0,
  headingIds = false,
  copyCode = true,
}: {
  /** The Markdown source. */
  children: string
  className?: string
  /** `article` for pages, `compact` for chat replies and cards. */
  variant?: "article" | "compact"
  /** Shift heading levels down, e.g. 1 turns # into h2 inside a page that has its h1. */
  headingOffset?: number
  /** Give headings ids from their text, for anchor links. */
  headingIds?: boolean
  /** A copy button on code blocks. */
  copyCode?: boolean
}) {
  const blocks = React.useMemo(() => parseBlocks(children ?? ""), [children])
  return (
    <Typography data-markdown="" variant={variant} className={cn("[&_img]:max-w-full [&_img]:rounded-xl", className)}>
      {renderBlocks(blocks, { headingOffset, headingIds, copyCode })}
    </Typography>
  )
}

export { Markdown, parseBlocks as parseMarkdown }
