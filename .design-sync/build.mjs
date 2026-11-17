// design-sync build step (cfg.buildCmd). Run from the repo root:
//   node .design-sync/build.mjs
//
// Lumen UI is copy-paste source (no published dist/), so this synthesizes the
// "built package" the converter consumes, under .design-sync/.cache/pkg/:
//   index.mjs   - barrel re-exporting every src/components/ui/*.tsx (esbuild
//                 bundles the real source; `@/` resolves via tsconfig.json)
//   index.d.ts  - barrel over tsc-emitted declarations (types/), with `@/`
//                 aliases rewritten to relative paths so ts-morph resolves them
//   lumen.css   - .design-sync/lumen.css compiled by Tailwind v4
import { execFileSync } from "node:child_process"
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

import tailwind from "@tailwindcss/postcss"
import postcss from "postcss"

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(here, "..")
const uiDir = path.join(root, "src/components/ui")
const pkg = path.join(here, ".cache/pkg")
const types = path.join(pkg, "types")

rmSync(pkg, { recursive: true, force: true })
mkdirSync(pkg, { recursive: true })

// 1. Component modules (PascalCase .tsx files are the public components).
const modules = readdirSync(uiDir)
  .filter((f) => /^[A-Z].*\.tsx$/.test(f))
  .map((f) => f.replace(/\.tsx$/, ""))
  .sort()

// 2. Declarations via tsc.
const tsconfig = path.join(pkg, "tsconfig.json")
writeFileSync(
  tsconfig,
  JSON.stringify(
    {
      extends: path.join(root, "tsconfig.json"),
      compilerOptions: {
        noEmit: false,
        declaration: true,
        emitDeclarationOnly: true,
        incremental: false,
        allowImportingTsExtensions: false,
        rootDir: path.join(root, "src"),
        outDir: types,
        plugins: [],
      },
      include: [
        path.join(uiDir, "*.ts"),
        path.join(uiDir, "*.tsx"),
        path.join(root, "src/lib/utils.ts"),
      ],
    },
    null,
    2
  )
)
execFileSync(path.join(root, "node_modules/.bin/tsc"), ["-p", tsconfig], {
  stdio: "inherit",
})

// Rewrite `@/x` -> relative path inside the emitted .d.ts tree.
function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}
for (const file of walk(types).filter((f) => f.endsWith(".d.ts"))) {
  const src = readFileSync(file, "utf8")
  const out = src.replace(/(["'])@\/([^"']+)\1/g, (_, q, spec) => {
    let rel = path.relative(path.dirname(file), path.join(types, spec))
    if (!rel.startsWith(".")) rel = `./${rel}`
    return `${q}${rel.split(path.sep).join("/")}${q}`
  })
  if (out !== src) writeFileSync(file, out)
}

// 3. Per-component docs from the site's own markdown generator. esbuild comes
// from the staged converter deps (.ds-sync/node_modules) - stage them first.
const docsDir = path.join(pkg, "docs")
const { build } = await import(
  pathToFileURL(path.join(root, ".ds-sync/node_modules/esbuild/lib/main.js")).href
)
const genDocs = path.join(pkg, "gen-docs.mjs")
await build({
  entryPoints: [path.join(here, "gen-docs.ts")],
  outfile: genDocs,
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  tsconfig: path.join(root, "tsconfig.json"),
  logLevel: "warning",
})
execFileSync(process.execPath, [genDocs, docsDir], { cwd: root, stdio: "inherit" })
const docsIndex = JSON.parse(readFileSync(path.join(docsDir, "index.json"), "utf8"))

// 4. Barrels + package.json. The JS barrel exports everything (subparts like
// CardHeader stay importable from window.LumenUI); the types barrel exports
// only the docs-nav components, so the converter emits one card + contract
// per documented component - subparts are covered by the parent's docs/API.
const rel = (p) => path.relative(pkg, p).split(path.sep).join("/")
writeFileSync(
  path.join(pkg, "index.mjs"),
  `import "./${rel(path.join(here, "head.css"))}"\n` +
    modules.map((m) => `export * from "./${rel(path.join(uiDir, `${m}.tsx`))}"`).join("\n") +
    // Chart.tsx wraps recharts but doesn't re-export its primitives (BarChart,
    // Bar, Area, Pie...). Expose the bundle's single copy as a namespace so
    // previews and designs share it (a second copy breaks the wrappers' context).
    // Namespaced, not merged: recharts' Label/Tooltip/Legend would clobber Lumen's.
    `\nexport * as Recharts from "recharts"\n`
)
const exportsOf = (m) => {
  const dts = readFileSync(path.join(types, "components/ui", `${m}.d.ts`), "utf8")
  const names = new Set()
  for (const [, list] of dts.matchAll(/^export \{([^}]*)\}/gm))
    for (const part of list.split(","))
      names.add(part.trim().replace(/^type\s+/, "").split(/\s+as\s+/).pop())
  for (const [, n] of dts.matchAll(/^export declare (?:function|const) (\w+)/gm)) names.add(n)
  return names
}
const roots = Object.keys(docsIndex)
const typeLines = roots.map((name) => {
  const m = modules.find((mod) => exportsOf(mod).has(name))
  if (!m) throw new Error(`docs component ${name} is not exported by src/components/ui`)
  return `export { ${name} } from "./types/components/ui/${m}"`
})
writeFileSync(path.join(pkg, "index.d.ts"), typeLines.join("\n") + "\n")
writeFileSync(
  path.join(pkg, "package.json"),
  JSON.stringify(
    { name: "lumen-ui", version: JSON.parse(readFileSync(path.join(root, "package.json"), "utf8")).version, module: "index.mjs", types: "index.d.ts" },
    null,
    2
  ) + "\n"
)

// 5. Stylesheet.
const from = path.join(here, "lumen.css")
const to = path.join(pkg, "lumen.css")
const result = await postcss([tailwind({ base: root, optimize: false })]).process(
  readFileSync(from, "utf8"),
  { from, to }
)
writeFileSync(to, result.css)

console.log(
  `design-sync build: ${modules.length} modules, lumen.css ${(result.css.length / 1024).toFixed(1)} KB -> ${path.relative(root, pkg)}`
)
