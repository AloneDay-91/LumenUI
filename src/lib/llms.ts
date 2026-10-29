import { readFile } from "node:fs/promises"
import path from "node:path"

import { getDocsMarkdown } from "@/lib/docs-markdown"
import { docsNav, docsSections } from "@/lib/docs-nav"
import { SITE_NAME, SITE_URL, SITE_VERSION } from "@/lib/site"

let indexCache: string | undefined
let fullCache: string | undefined

export async function getLlmsIndex(origin = SITE_URL) {
  if (indexCache) {
    return indexCache
  }

  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_NAME} ${SITE_VERSION} is a copy-paste design system. Behavior comes from Base UI. Style lives in your repo. You do not install a component package: copy the source, the CSS tokens, and the \`cn()\` helper.`,
    "",
    "Each link below is a Markdown page with the description, a usage example, the component API, and the source files to copy. Append `.md` to any `/docs` URL for the same page.",
    "",
    `- [Full documentation](${origin}/llms-full.txt): every page, usage, API, and source in one file.`,
    "",
    "Conventions agents should keep:",
    "",
    "- Product copy is English.",
    "- Visual language is paper, pills, and Inter. Primary actions stay black. Hue is opt-in: gray, indigo, cyan, orange, crimson, and jade. Cards use `ring-1 ring-foreground/5`, no shadow.",
    "- Compose with existing components. Prefer `render` on Base UI triggers, and `cn()` for classes.",
    "- Tailwind v4: use `data-[orientation=horizontal]:` (Base UI sets `data-orientation`), `bg-linear-to-*`, and `mask-[...]`.",
    "",
  ]

  for (const section of docsSections) {
    lines.push(`## ${section.title}`, "")
    for (const item of section.items) {
      const description = await readPageDescription(item.href)
      lines.push(`- [${item.name}](${origin}${item.href}.md): ${description}`)
    }
    lines.push("")
  }

  const body = `${lines.join("\n").trim()}\n`
  indexCache = body
  return body
}

export async function getLlmsFull(origin = SITE_URL) {
  if (fullCache) {
    return fullCache
  }

  const parts = [
    `# ${SITE_NAME}`,
    "",
    `Version ${SITE_VERSION}. This file concatenates the documentation, usage, API, and source for every page in the design system.`,
    "",
    `Index: ${origin}/llms.txt`,
    "",
  ]

  for (const item of docsNav) {
    const markdown = await getDocsMarkdown(item.href, origin)
    if (!markdown) {
      continue
    }
    parts.push(markdown.trimEnd(), "", "---", "")
  }

  const body = `${parts.join("\n").trim()}\n`
  fullCache = body
  return body
}

/** Canonical public origin. Never trust request Host / X-Forwarded-* for links. */
export function getRequestOrigin() {
  return SITE_URL
}

async function readPageDescription(pathname: string) {
  const pagePath = path.join(process.cwd(), "src/app/(docs)", pathname, "page.tsx")
  try {
    const source = await readFile(pagePath, "utf8")
    return source.match(/description="([^"]+)"/)?.[1] ?? pathname
  } catch {
    return pathname
  }
}
