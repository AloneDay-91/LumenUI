import { readFileSync } from "node:fs"
import path from "node:path"

import registry from "../../cli/registry/registry.json"

import { componentInstallCommand } from "@/lib/component-api"
import { componentGroups } from "@/lib/docs-nav"

/**
 * Server-only. The registry JSON embeds every component's source (~180 KB),
 * so never import this module from a client component.
 */
export const HERO_SLUGS = [
  "button",
  "card",
  "input",
  "tabs",
  "table",
  "badge",
  "toast",
  "select",
  "tooltip",
] as const

export type HeroRow = {
  slug: string
  file: string
  client: boolean
  packages: string[]
}

type RegistryItem = {
  files: { name: string; content: string }[]
  dependencies?: string[]
}

export function getHeroRows(): HeroRow[] {
  const items = registry.items as unknown as Record<
    string,
    RegistryItem | undefined
  >

  return HERO_SLUGS.map((slug) => {
    const item = items[slug]
    const file = item?.files[0]

    if (!item || !file) {
      throw new Error(
        `[hero] "${slug}" is missing from cli/registry/registry.json. Run "npm run registry" or update HERO_SLUGS.`
      )
    }

    return {
      slug,
      file: file.name,
      client: /^\s*["']use client["']/.test(file.content),
      packages: item.dependencies ?? [],
    }
  })
}

/** The docs page the hero shows, read from its real route at build time. */
export const HERO_DOC_SLUG = "button"

export type HeroDoc = {
  name: string
  href: string
  group: string
  description: string
  install: string
  /** "On this page": Installation, Usage, then the page's own sections. */
  headings: string[]
}

export function getHeroDoc(): HeroDoc {
  const href = `/docs/components/${HERO_DOC_SLUG}`
  const group = componentGroups.find((section) =>
    section.items.some((item) => item.href === href)
  )
  const item = group?.items.find((entry) => entry.href === href)
  const source = readFileSync(
    path.join(/* turbopackIgnore: true */ process.cwd(), "src/app/(docs)", href, "page.tsx"),
    "utf8"
  )
  const description = source.match(/description="([^"]+)"/)?.[1]

  if (!group || !item || !description) {
    throw new Error(`[hero] ${href} is missing from docs-nav or has no description.`)
  }

  return {
    name: item.name,
    href,
    group: group.title,
    description,
    install: componentInstallCommand(HERO_DOC_SLUG),
    headings: [
      "Installation",
      "Usage",
      ...Array.from(
        source.matchAll(/\{ id: "[^"]+", text: "([^"]+)", level: 2 \}/g),
        (match) => match[1]
      ),
    ],
  }
}
