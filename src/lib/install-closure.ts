import graph from "../../cli/registry/graph.json"

type GraphItem = {
  title: string
  internal: boolean
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
}

const items = graph as Record<string, GraphItem>

export type InstallPiece = {
  label: string
  href?: string
}

export type InstallPlan = {
  also: InstallPiece[]
  packages: string[]
}

const internalLabel: Record<string, string> = {
  utils: "cn()",
  styles: "styles.ts",
  "button-variants": "button variants",
  "dropdown-menu": "DropdownMenu.tsx",
}

export function installPlan(slug: string): InstallPlan | undefined {
  if (!items[slug]) return undefined

  const seen = new Set<string>()
  const order: string[] = []

  function visit(name: string) {
    if (seen.has(name)) return
    const item = items[name]
    if (!item) return
    seen.add(name)
    for (const dependency of item.registryDependencies) visit(dependency)
    order.push(name)
  }

  visit(slug)

  const packages = new Set<string>()
  const also: InstallPiece[] = []

  for (const name of order) {
    const item = items[name]
    if (!item || name === slug) {
      for (const dependency of item?.dependencies ?? []) packages.add(dependency)
      continue
    }
    for (const dependency of item.dependencies) packages.add(dependency)
    also.push(
      item.internal
        ? { label: internalLabel[name] ?? item.title }
        : { label: item.title, href: `/docs/components/${name}` }
    )
  }

  also.sort((left, right) => {
    const leftInternal = left.href ? 0 : 1
    const rightInternal = right.href ? 0 : 1
    if (leftInternal !== rightInternal) return leftInternal - rightInternal
    return left.label.localeCompare(right.label)
  })

  for (const dependency of items[slug]?.dependencies ?? []) packages.add(dependency)

  return {
    also,
    packages: [...packages].sort(),
  }
}

export function joinList(values: string[]) {
  if (values.length <= 1) return values[0] ?? ""
  if (values.length === 2) return `${values[0]} and ${values[1]}`
  return `${values.slice(0, -1).join(", ")}, and ${values.at(-1)}`
}
