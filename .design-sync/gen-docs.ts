// Bundled + run by .design-sync/build.mjs (cwd = repo root). Renders each
// component's docs page through the site's own markdown generator
// (src/lib/docs-markdown.ts - the same text served at /docs/components/<slug>.md)
// into <out>/<ExportName>.md with a `category` frontmatter from the docs nav.
// Drops the copy-paste sections (Installation, Source) - the design agent uses
// the compiled bundle, not the files.
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"

import { getDocsMarkdown } from "@/lib/docs-markdown"
import { componentGroups } from "@/lib/docs-nav"

const out = process.argv[2]
mkdirSync(out, { recursive: true })

function dropSection(md: string, heading: string) {
  const lines = md.split("\n")
  const kept: string[] = []
  let skipping = false
  let fence = false
  for (const line of lines) {
    if (line.startsWith("```")) fence = !fence
    if (!fence && /^## /.test(line)) skipping = line.trim() === `## ${heading}`
    if (!skipping) kept.push(line)
  }
  return kept.join("\n")
}

// Docs pages whose title isn't an export name.
const EXPORT_NAME: Record<string, string> = { Toast: "ToastProvider" }

const index: Record<string, { slug: string; category: string }> = {}
for (const group of componentGroups) {
  for (const item of group.items) {
    const title = item.name.replace(/\s+/g, "")
    const name = EXPORT_NAME[title] ?? title
    const md = await getDocsMarkdown(item.href, "https://lumenui.dev")
    if (!md) throw new Error(`no docs markdown for ${item.href}`)
    let body = dropSection(dropSection(md, "Installation"), "Source")
    body = body
      .split("\n")
      .filter((l) => !/^- (Documentation|Markdown): /.test(l))
      .filter((l) => !/is a copy-paste system/.test(l))
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
    writeFileSync(
      path.join(out, `${name}.md`),
      `---\ncategory: ${group.title}\n---\n\n${body}\n`
    )
    index[name] = { slug: item.href.split("/").pop()!, category: group.title }
  }
}
writeFileSync(path.join(out, "index.json"), JSON.stringify(index, null, 2) + "\n")
console.log(`gen-docs: ${Object.keys(index).length} component docs`)
