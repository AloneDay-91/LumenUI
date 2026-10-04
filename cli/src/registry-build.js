import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"

const INTERNAL = new Set(["utils", "styles", "button-variants"])
const SKIP_PACKAGES = new Set(["react", "react-dom"])

export function buildRegistry({ uiDir, utilsFile, cssFile }) {
  const items = new Map()

  for (const fileName of readdirSync(uiDir)) {
    if (!/\.(tsx|ts|css)$/.test(fileName)) {
      continue
    }
    const fullPath = path.join(uiDir, fileName)
    const content = readFileSync(fullPath, "utf8")
    const slug = slugForFile(fileName)
    const item = ensure(items, slug)
    item.files.push({ name: fileName, content })
    if (fileName.endsWith(".css")) {
      continue
    }
    collectImports(item, content)
  }

  const utils = ensure(items, "utils")
  utils.files.push({
    name: "utils.ts",
    content: readFileSync(utilsFile, "utf8"),
  })
  collectImports(utils, utils.files[0].content)

  const cssSource = readFileSync(cssFile, "utf8")
  const css = cssSource.match(/LUMEN_GLOBAL_CSS = `([\s\S]*)`\s*$/)?.[1]
  if (!css) {
    throw new Error("Could not read LUMEN_GLOBAL_CSS")
  }

  const serialized = {}
  for (const item of items.values()) {
    serialized[item.name] = {
      name: item.name,
      title: titleFromSlug(item.name),
      type: "registry:ui",
      internal: INTERNAL.has(item.name),
      dependencies: [...item.dependencies].sort(),
      registryDependencies: [...item.registryDependencies].sort(),
      files: item.files,
    }
  }

  return {
    name: "lumen",
    css,
    items: serialized,
  }
}

function ensure(items, slug) {
  const existing = items.get(slug)
  if (existing) {
    return existing
  }
  const item = {
    name: slug,
    files: [],
    dependencies: new Set(),
    registryDependencies: new Set(),
  }
  items.set(slug, item)
  return item
}

function slugForFile(fileName) {
  const base = fileName.replace(/\.(tsx|ts|css)$/, "")
  if (base === "button-variants" || base === "styles") {
    return base
  }
  return base
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
}

function titleFromSlug(slug) {
  const words = { otp: "OTP", ui: "UI" }
  return slug
    .split("-")
    .map((word) => words[word] ?? `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ")
}

function collectImports(item, content) {
  const specs = new Set()
  for (const match of content.matchAll(/from\s+["']([^"']+)["']/g)) {
    specs.add(match[1] ?? "")
  }
  for (const match of content.matchAll(/import\s+["']([^"']+)["']/g)) {
    specs.add(match[1] ?? "")
  }

  for (const spec of specs) {
    if (spec.startsWith(".")) {
      continue
    }
    if (spec === "@/lib/utils") {
      if (item.name !== "utils") {
        item.registryDependencies.add("utils")
      }
      continue
    }
    if (spec.startsWith("@/components/ui/")) {
      const base = spec.slice("@/components/ui/".length)
      const slug = slugForFile(base)
      if (slug !== item.name) {
        item.registryDependencies.add(slug)
      }
      continue
    }
    if (spec.startsWith("@/")) {
      continue
    }
    const packageName = npmPackageName(spec)
    if (packageName && !SKIP_PACKAGES.has(packageName)) {
      item.dependencies.add(packageName)
    }
  }
}

function npmPackageName(spec) {
  if (spec.startsWith("@")) {
    const [scope, name] = spec.split("/")
    return scope && name ? `${scope}/${name}` : undefined
  }
  return spec.split("/")[0]
}
