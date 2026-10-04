import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { buildRegistry } from "../cli/src/registry-build.js"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const registry = buildRegistry({
  uiDir: path.join(root, "src/components/ui"),
  utilsFile: path.join(root, "src/lib/utils.ts"),
  cssFile: path.join(root, "src/lib/lumen-css.ts"),
})

const cliRegistry = path.join(root, "cli/registry")
mkdirSync(cliRegistry, { recursive: true })
writeFileSync(
  path.join(cliRegistry, "registry.json"),
  `${JSON.stringify(registry)}\n`
)

const publicRegistry = path.join(root, "public/r")
mkdirSync(publicRegistry, { recursive: true })

const index = {
  name: registry.name,
  items: Object.values(registry.items)
    .filter((item) => !item.internal)
    .map((item) => ({
      name: item.name,
      title: item.title,
      dependencies: item.dependencies,
      registryDependencies: item.registryDependencies,
    })),
}

writeFileSync(path.join(publicRegistry, "registry.json"), `${JSON.stringify(index, null, 2)}\n`)

for (const item of Object.values(registry.items)) {
  writeFileSync(
    path.join(publicRegistry, `${item.name}.json`),
    `${JSON.stringify(item, null, 2)}\n`
  )
}

console.log(`Wrote ${index.items.length} components to cli/registry and public/r`)
