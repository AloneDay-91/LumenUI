import { readFile } from "node:fs/promises"
import path from "node:path"

import { getDocsMarkdown } from "@/lib/docs-markdown"
import { docsNav, docsSections } from "@/lib/docs-nav"
import { SITE_NAME, SITE_VERSION } from "@/lib/site"

const indexCache = new Map<string, string>()
const fullCache = new Map<string, string>()

export async function getLlmsIndex(origin: string) {
  const cached = indexCache.get(origin)
  if (cached) {
    return cached
  }

  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_NAME} ${SITE_VERSION} is a copy-paste design system. Behavior comes from Base UI. Style lives in your repo. You do not install a component package: copy the source, the CSS tokens, and the \`cn()\` helper.`,
    "",
    "Each link below is a Markdown page with the description, a usage example, the component API, and the source files to copy. Append `.md` to any `/docs` URL for the same page.",
    "",
    `- [Full documentation](${origin}/llms-full.txt): every page, usage, API, and source in one file.`,
    `- [Examples](${origin}/examples): composed cards outside the docs.`,
    "",
    "Conventions agents should keep:",
    "",
    "- Product copy is English.",
    "- Visual language is paper, pills, Inter, no interactive blue, cards with `ring-1 ring-foreground/5`, no shadow.",
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
  indexCache.set(origin, body)
  return body
}

export async function getLlmsFull(origin: string) {
  const cached = fullCache.get(origin)
  if (cached) {
    return cached
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
  fullCache.set(origin, body)
  return body
}

export function getRequestOrigin(request: Request) {
  const url = new URL(request.url)
  const forwardedHost = request.headers.get("x-forwarded-host")
  const forwardedProto = request.headers.get("x-forwarded-proto")
  const host = forwardedHost ?? request.headers.get("host") ?? url.host
  const protocol = forwardedProto ?? url.protocol.replace(":", "")

  return `${protocol}://${host}`
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
