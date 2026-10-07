import { access, readFile, readdir } from "node:fs/promises"
import path from "node:path"

import {
  changelog,
  changelogKindLabel,
  formatChangelogDate,
  type ChangelogKind,
} from "@/lib/changelog"
import { getComponentApi } from "@/lib/component-api"
import { getDocsLocation } from "@/lib/docs-nav"
import { LUMEN_GLOBAL_CSS } from "@/lib/lumen-css"
import { formatDocsVersion, SITE_NAME } from "@/lib/site"

const UI_DIR = path.join(process.cwd(), "src/components/ui")
const SKIP_PACKAGES = new Set(["react", "react-dom", "next"])

const UI_FILE_ALIASES: Record<string, string> = {
  "otp-field": "OTPField.tsx",
  "toggle-group": "Toggle.tsx",
}

export async function getDocsMarkdown(pathname: string, origin: string) {
  const location = getDocsLocation(pathname)
  if (!location) {
    return undefined
  }

  const pageSource = await readPageSource(pathname)
  const title = extractQuotedProp(pageSource, "title") ?? location.item.name
  const description =
    extractQuotedProp(pageSource, "description") ?? title
  const usage = extractTemplateProp(pageSource, "usage")
  const componentSlug = pathname.startsWith("/docs/components/")
    ? pathname.slice("/docs/components/".length)
    : undefined
  const entryFile = componentSlug
    ? await findUiFile(componentSlug)
    : undefined
  const sources = entryFile ? await collectLocalFiles(entryFile) : new Map<string, string>()
  const packages = collectPackages(sources.values())

  const pageUrl = `${origin}${pathname}`
  const markdownUrl = `${origin}${pathname}.md`
  const lines = [
    `# ${title}`,
    "",
    description,
    "",
    `- Documentation: ${pageUrl}`,
    `- Markdown: ${markdownUrl}`,
    "",
    `${SITE_NAME} is a copy-paste system. Behavior comes from Base UI. Style lives in your repo.`,
    "",
  ]

  if (packages.length > 0 || sources.size > 0) {
    lines.push("## Installation", "")
    if (packages.length > 0) {
      lines.push("npm dependencies:", "", "```bash", `npm install ${packages.join(" ")}`, "```", "")
    }
    lines.push(
      "Copy `src/lib/utils.ts` (`cn`) and the CSS tokens from the Styles page, then the source files below.",
      ""
    )
  }

  if (usage) {
    lines.push("## Usage", "", "```tsx", usage.trim(), "```", "")
  }

  if (pathname === "/docs/changelog") {
    appendChangelog(lines, origin)
  } else {
    const related = await readRelatedExampleSources(pageSource)
    appendDocBlocks(lines, [pageSource, ...related].flatMap(extractDocBlocks))
  }

  if (componentSlug) {
    const api = getComponentApi(componentSlug)
    if (api) {
      lines.push("## API", "")
      if (api.primitive) {
        lines.push(
          `Behavior comes from \`${api.primitive}\`. Source: \`${api.source}\`.`,
          ""
        )
      } else {
        lines.push(`Source: \`${api.source}\`.`, "")
      }
      for (const item of api.parts) {
        lines.push(`### ${item.name}`, "")
        if (item.description) {
          lines.push(item.description, "")
        }
        if (item.props.length > 0) {
          lines.push("| Prop | Type | Default | Description |", "| --- | --- | --- | --- |")
          for (const prop of item.props) {
            const type = escapeTableCell(prop.type)
            const fallback = prop.default ? `\`${escapeTableCell(prop.default)}\`` : "—"
            lines.push(
              `| \`${prop.name}\` | \`${type}\` | ${fallback} | ${escapeTableCell(prop.description)} |`
            )
          }
          lines.push("")
        }
      }
    }
  }

  if (sources.size > 0) {
    lines.push("## Source", "")
    const ordered = orderSourceFiles(entryFile, [...sources.keys()])
    for (const file of ordered) {
      const source = sources.get(file)
      if (!source) {
        continue
      }
      const repoPath = toRepoPath(file)
      const lang = file.endsWith(".ts") ? "ts" : "tsx"
      lines.push(`### \`${repoPath}\``, "", `\`\`\`${lang}`, source.trimEnd(), "```", "")
    }
  }

  return `${lines.join("\n").trim()}\n`
}

async function readPageSource(pathname: string) {
  const pagePath = path.join(process.cwd(), "src/app/(docs)", pathname, "page.tsx")
  try {
    return await readFile(pagePath, "utf8")
  } catch {
    return ""
  }
}

function escapeTableCell(value: string) {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ")
}

function extractQuotedProp(source: string, name: string) {
  return source.match(new RegExp(`${name}="([^"]+)"`))?.[1]
}

function extractTemplateProp(source: string, name: string) {
  return source.match(new RegExp(`${name}=\\{\`([\\s\\S]*?)\`\\}`))?.[1]
}

type DocBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "code"; filename?: string; language?: string; code: string }

function extractDocBlocks(source: string) {
  const blocks: (DocBlock & { index: number })[] = []

  for (const match of source.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)) {
    const text = inlineText(match[1] ?? "")
    if (text) {
      blocks.push({ kind: "heading", text, index: match.index ?? 0 })
    }
  }

  for (const match of source.matchAll(/<p(?![^>]*\bclassName=)\b[^>]*>([\s\S]*?)<\/p>/g)) {
    const text = inlineText(match[1] ?? "")
    if (text) {
      blocks.push({ kind: "paragraph", text, index: match.index ?? 0 })
    }
  }

  for (const match of source.matchAll(/<CodeBlock\b([^>]*?)code=\{\`([\s\S]*?)\`\}/g)) {
    const attrs = match[1] ?? ""
    blocks.push({
      kind: "code",
      filename: attrs.match(/filename="([^"]+)"/)?.[1],
      language: attrs.match(/language="([^"]+)"/)?.[1],
      code: match[2] ?? "",
      index: match.index ?? 0,
    })
  }

  for (const match of source.matchAll(/<CodeBlock\b([^>]*?)code=\{LUMEN_GLOBAL_CSS\}/g)) {
    const attrs = match[1] ?? ""
    blocks.push({
      kind: "code",
      filename: attrs.match(/filename="([^"]+)"/)?.[1] ?? "app/globals.css",
      language: attrs.match(/language="([^"]+)"/)?.[1] ?? "css",
      code: LUMEN_GLOBAL_CSS,
      index: match.index ?? 0,
    })
  }

  return blocks.sort((a, b) => a.index - b.index)
}

function appendDocBlocks(lines: string[], blocks: DocBlock[]) {
  for (const block of blocks) {
    switch (block.kind) {
      case "heading":
        lines.push(`## ${block.text}`, "")
        break
      case "paragraph":
        lines.push(block.text, "")
        break
      case "code": {
        if (block.filename) {
          lines.push(`### \`${block.filename}\``, "")
        }
        const lang = block.language ?? "tsx"
        lines.push(`\`\`\`${lang}`, block.code.trim(), "```", "")
        break
      }
      default: {
        const exhaustive: never = block
        return exhaustive
      }
    }
  }
}

function inlineText(value: string) {
  return value
    .replace(/<code>([\s\S]*?)<\/code>/g, "`$1`")
    .replace(/<[^>]+>/g, "")
    .replace(/\{`([^`]+)`\}/g, "$1")
    .replace(/\{[A-Za-z0-9_.]+\}/g, "")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&")
    .replace(/\s+/g, " ")
    .trim()
}

function docsComponentName(spec: string) {
  const prefix = "@/components/docs/"
  if (!spec.startsWith(prefix)) {
    return undefined
  }

  const name = spec.slice(prefix.length)
  if (!/^[A-Za-z0-9_-]+$/.test(name)) {
    return undefined
  }

  return name
}

async function readRelatedExampleSources(pageSource: string) {
  const extraNames = new Set(
    [...pageSource.matchAll(/extra=\{<([A-Z]\w*)/g)].map((match) => match[1] ?? "")
  )
  if (extraNames.size === 0) {
    return []
  }

  const sources: string[] = []
  for (const match of pageSource.matchAll(/import\s+\{([^}]+)\}\s+from\s+["'](@\/[^"']+)["']/g)) {
    const names = (match[1] ?? "").split(",").map((part) => {
      const bits = part.trim().split(/\s+/)
      return bits.at(-1) ?? ""
    })
    if (!names.some((name) => extraNames.has(name))) {
      continue
    }

    const name = docsComponentName(match[2] ?? "")
    if (!name) {
      continue
    }
    const tsx = path.join(process.cwd(), "src/components/docs", `${name}.tsx`)
    const ts = path.join(process.cwd(), "src/components/docs", `${name}.ts`)
    if (await exists(tsx)) {
      sources.push(await readFile(tsx, "utf8"))
    } else if (await exists(ts)) {
      sources.push(await readFile(ts, "utf8"))
    }
  }

  return sources
}

const changelogKinds: ChangelogKind[] = ["added", "changed", "fixed"]

function appendChangelog(lines: string[], origin: string) {
  for (const release of changelog) {
    lines.push(
      `## ${formatDocsVersion(release.version)}`,
      "",
      release.summary,
      "",
      formatChangelogDate(release.date),
      ""
    )

    for (const kind of changelogKinds) {
      const items = release.items.filter((item) => item.kind === kind)
      if (items.length === 0) {
        continue
      }

      lines.push(`### ${changelogKindLabel(kind)}`, "")
      for (const item of items) {
        const href = item.href ? ` (${origin}${item.href})` : ""
        lines.push(`- ${item.text}${href}`)
        for (const link of item.links ?? []) {
          lines.push(`  - [${link.name}](${origin}${link.href})`)
        }
      }
      lines.push("")
    }
  }
}

async function findUiFile(slug: string) {
  const aliased = UI_FILE_ALIASES[slug]
  if (aliased) {
    return path.join(UI_DIR, aliased)
  }

  const files = await readdir(UI_DIR)
  const needle = slug.replaceAll("-", "").toLowerCase()
  const match = files.find(
    (file) => file.replace(/\.(tsx|ts)$/i, "").replaceAll("-", "").toLowerCase() === needle
  )

  return match ? path.join(UI_DIR, match) : undefined
}

async function collectLocalFiles(entry: string) {
  const collected = new Map<string, string>()
  const queue = [entry]

  while (queue.length > 0) {
    const file = queue.pop()
    if (!file || collected.has(file)) {
      continue
    }

    let source: string
    try {
      source = await readFile(file, "utf8")
    } catch {
      continue
    }

    collected.set(file, source)

    for (const spec of source.matchAll(/from\s+["']([^"']+)["']/g)) {
      const resolved = await resolveLocalImport(file, spec[1] ?? "")
      if (resolved) {
        queue.push(resolved)
      }
    }
  }

  return collected
}

async function resolveLocalImport(fromFile: string, spec: string) {
  const candidates: string[] = []

  if (spec === "@/lib/utils") {
    candidates.push(path.join(process.cwd(), "src/lib/utils.ts"))
  } else if (spec.startsWith("@/components/ui/")) {
    const base = path.join(UI_DIR, spec.slice("@/components/ui/".length))
    candidates.push(base, `${base}.tsx`, `${base}.ts`)
  } else if (spec.startsWith("./") || spec.startsWith("../")) {
    const base = path.resolve(path.dirname(fromFile), spec)
    candidates.push(base, `${base}.tsx`, `${base}.ts`)
  } else {
    return undefined
  }

  for (const candidate of candidates) {
    if (await exists(candidate)) {
      return candidate
    }
  }

  return undefined
}

async function exists(file: string) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

function collectPackages(sources: Iterable<string>) {
  const packages = new Set<string>()

  for (const source of sources) {
    for (const match of source.matchAll(/from\s+["']([^"']+)["']/g)) {
      const spec = match[1] ?? ""
      if (spec.startsWith(".") || spec.startsWith("@/")) {
        continue
      }

      const pkg = spec.startsWith("@")
        ? spec.split("/").slice(0, 2).join("/")
        : spec.split("/")[0]

      if (!pkg || SKIP_PACKAGES.has(pkg) || pkg.startsWith("next")) {
        continue
      }

      packages.add(pkg)
    }
  }

  return [...packages].sort()
}

function orderSourceFiles(entry: string | undefined, files: string[]) {
  return [...files].sort((a, b) => {
    if (a === entry) {
      return -1
    }
    if (b === entry) {
      return 1
    }
    return toRepoPath(a).localeCompare(toRepoPath(b))
  })
}

function toRepoPath(file: string) {
  return path.relative(process.cwd(), file).replaceAll("\\", "/")
}
