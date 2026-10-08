import registry from "../../cli/registry/registry.json"

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
