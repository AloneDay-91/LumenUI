import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { buildRegistry, buildVueRegistry } from "../cli/src/registry-build.js"

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

const graph = {}
for (const item of Object.values(registry.items)) {
  graph[item.name] = {
    title: item.title,
    internal: item.internal,
    files: item.files.map((file) => file.name),
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
  }
}
writeFileSync(path.join(cliRegistry, "graph.json"), `${JSON.stringify(graph, null, 2)}\n`)

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

// Vue: the same layout under registry-vue.json and public/r/vue.
const vueRegistry = buildVueRegistry({
  uiDir: path.join(root, "vue/src/components/ui"),
  utilsFile: path.join(root, "vue/src/lib/utils.ts"),
  cssFile: path.join(root, "src/lib/lumen-css.ts"),
})
writeFileSync(path.join(cliRegistry, "registry-vue.json"), `${JSON.stringify(vueRegistry)}\n`)

const publicVue = path.join(publicRegistry, "vue")
mkdirSync(publicVue, { recursive: true })
const vueIndex = {
  name: vueRegistry.name,
  framework: "vue",
  items: Object.values(vueRegistry.items)
    .filter((item) => !item.internal)
    .map((item) => ({
      name: item.name,
      title: item.title,
      dependencies: item.dependencies,
      registryDependencies: item.registryDependencies,
    })),
}
writeFileSync(path.join(publicVue, "registry.json"), `${JSON.stringify(vueIndex, null, 2)}\n`)
for (const item of Object.values(vueRegistry.items)) {
  writeFileSync(path.join(publicVue, `${item.name}.json`), `${JSON.stringify(item, null, 2)}\n`)
}

console.log(
  `Wrote ${index.items.length} React and ${vueIndex.items.length} Vue components to cli/registry and public/r`
)
