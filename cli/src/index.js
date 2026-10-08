import { spawnSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { buildRegistry } from "./registry-build.js"

const cliRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")

const HELP = `lumenui — copy Lumen UI components into your project

Usage
  lumenui init [--css]
  lumenui add <component>...
  lumenui add all
  lumenui preset <file.css>
  lumenui rm <component>...
  lumenui list

Options
  --cwd <dir>     Project directory (default: the current directory)
  --force         Remove a component even when others still import it
  --dry-run       Print the files and packages without writing
  --css           With init, write globals.css when it is missing
`

export async function run(argv) {
  const { command, positionals, flags } = parseArgs(argv)
  if (!command || command === "help" || flags.help) {
    console.log(HELP.trim())
    return
  }

  const cwd = path.resolve(flags.cwd ?? process.cwd())
  const registry = loadRegistry()

  switch (command) {
    case "init":
      init(cwd, registry, flags)
      return
    case "list":
      list(cwd, registry)
      return
    case "add":
      add(cwd, registry, positionals, flags)
      return
    case "preset":
      applyPreset(cwd, positionals[0], flags)
      return
    case "rm":
    case "remove":
      remove(cwd, registry, positionals, flags)
      return
    default:
      throw new Error(`Unknown command "${command}".\n\n${HELP.trim()}`)
  }
}

function init(cwd, registry, flags) {
  const project = resolveProject(cwd)
  const config = readConfig(project) ?? defaultConfig(project)

  const utils = registry.items.utils
  if (!utils) {
    throw new Error("Registry is missing utils")
  }
  writeItem(project, config, utils, flags)
  if (!config.installed.includes("utils")) {
    config.installed.push("utils")
  }
  if (!flags["dry-run"]) {
    writeConfig(project, config)
  }
  installPackages(project, missingPackages(project, utils.dependencies), flags)

  if (flags.css) {
    writeTokens(project, registry.css, flags)
  }

  console.log("Ready. Add a component with lumenui add button")
}

function list(cwd, registry) {
  const project = findProject(cwd)
  const installed = new Set(project ? (readConfig(project)?.installed ?? []) : [])
  const names = publicNames(registry)
  for (const name of names) {
    const mark = installed.has(name) ? "installed" : "available"
    console.log(`${name.padEnd(24)} ${mark}`)
  }
}

function add(cwd, registry, names, flags) {
  const requested = resolveNames(registry, names)
  const project = resolveProject(cwd)
  const config = readConfig(project) ?? defaultConfig(project)
  const closure = closureOf(registry, requested)
  const packages = new Set()

  for (const item of closure) {
    writeItem(project, config, item, flags)
    for (const dependency of item.dependencies) {
      packages.add(dependency)
    }
    if (!config.installed.includes(item.name)) {
      config.installed.push(item.name)
    }
  }

  config.installed.sort()
  if (!flags["dry-run"]) {
    writeConfig(project, config)
  }
  installPackages(project, missingPackages(project, [...packages]), flags)
}

function remove(cwd, registry, names, flags) {
  const requested = resolveNames(registry, names.filter((name) => name !== "all"))
  if (requested.length === 0) {
    throw new Error("Name the component to remove. Example: lumenui rm button")
  }

  const project = resolveProject(cwd)
  const config = readConfig(project) ?? defaultConfig(project)
  const removing = new Set(requested)
  const blockers = []

  for (const name of requested) {
    const item = registry.items[name]
    for (const other of Object.values(registry.items)) {
      if (removing.has(other.name) || other.internal) {
        continue
      }
      if (!other.registryDependencies.includes(name)) {
        continue
      }
      if (diskHasItem(project, config, other) || config.installed.includes(other.name)) {
        blockers.push(`${other.name} uses ${name}`)
      }
    }
  }

  if (blockers.length > 0 && !flags.force) {
    throw new Error(
      `These components still depend on what you are removing:\n${blockers
        .map((line) => `  ${line}`)
        .join("\n")}\nRemove them first, or pass --force.`
    )
  }

  for (const name of requested) {
    deleteItem(project, config, registry.items[name], flags)
    config.installed = config.installed.filter((item) => item !== name)
  }

  for (const name of [...config.installed]) {
    const item = registry.items[name]
    if (!item?.internal) {
      continue
    }
    if (internalStillUsed(registry, config.installed, name)) {
      continue
    }
    deleteItem(project, config, item, flags)
    config.installed = config.installed.filter((itemName) => itemName !== name)
  }

  if (!flags["dry-run"]) {
    writeConfig(project, config)
  }
}

function writeItem(project, config, item, flags) {
  for (const file of item.files) {
    const destination = fileDestination(project, config, file.name)
    const next = rewriteImports(file.content, config)
    if (flags["dry-run"]) {
      console.log(`write ${path.relative(project, destination)}`)
      continue
    }
    mkdirSync(path.dirname(destination), { recursive: true })
    const verb = existsSync(destination) ? "overwrite" : "add"
    writeFileSync(destination, next)
    console.log(`${verb} ${path.relative(project, destination)}`)
  }
}

function deleteItem(project, config, item, flags) {
  if (!item) {
    return
  }
  for (const file of item.files) {
    const destination = fileDestination(project, config, file.name)
    if (flags["dry-run"]) {
      console.log(`remove ${path.relative(project, destination)}`)
      continue
    }
    if (!existsSync(destination)) {
      continue
    }
    rmSync(destination)
    console.log(`remove ${path.relative(project, destination)}`)
  }
}

const PRESET_START = "/* lumen-preset:start */"
const PRESET_END = "/* lumen-preset:end */"

function applyPreset(cwd, file, flags) {
  if (!file) {
    throw new Error("Pass the preset file. Example: lumenui preset lumen-preset.css")
  }
  const project = resolveProject(cwd)
  const sourcePath = path.resolve(cwd, file)
  if (!existsSync(sourcePath)) {
    throw new Error(`Could not read ${file}`)
  }
  const source = readFileSync(sourcePath, "utf8").trim()
  const block = source.includes(PRESET_START)
    ? `${source}\n`
    : `${PRESET_START}\n${source}\n${PRESET_END}\n`
  const destination = existsSync(path.join(project, "src"))
    ? path.join(project, "src/app/globals.css")
    : path.join(project, "app/globals.css")
  if (!existsSync(destination)) {
    throw new Error(
      `No ${path.relative(project, destination)}. Run lumenui init --css first.`
    )
  }
  const current = readFileSync(destination, "utf8")
  const pattern = new RegExp(`${escapeRegExp(PRESET_START)}[\\s\\S]*?${escapeRegExp(PRESET_END)}\\n?`)
  const next = pattern.test(current)
    ? current.replace(pattern, block)
    : `${current.trimEnd()}\n\n${block}`
  if (flags["dry-run"]) {
    console.log(`update ${path.relative(project, destination)}`)
    return
  }
  writeFileSync(destination, next.endsWith("\n") ? next : `${next}\n`)
  console.log(`update ${path.relative(project, destination)}`)
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function writeTokens(project, css, flags) {
  const destination = existsSync(path.join(project, "src"))
    ? path.join(project, "src/app/globals.css")
    : path.join(project, "app/globals.css")
  if (existsSync(destination)) {
    console.log(`skip ${path.relative(project, destination)} (already exists)`)
    return
  }
  if (flags["dry-run"]) {
    console.log(`write ${path.relative(project, destination)}`)
    return
  }
  mkdirSync(path.dirname(destination), { recursive: true })
  writeFileSync(destination, css)
  console.log(`add ${path.relative(project, destination)}`)
}

function fileDestination(project, config, fileName) {
  if (fileName === "utils.ts") {
    return path.join(project, config.paths.lib, "utils.ts")
  }
  return path.join(project, config.paths.ui, fileName)
}

function rewriteImports(content, config) {
  return content
    .replaceAll("@/components/ui", config.aliases.ui.replace(/\/$/, ""))
    .replaceAll("@/lib", config.aliases.lib.replace(/\/$/, ""))
}

function closureOf(registry, names) {
  const seen = new Set()
  const order = []

  function visit(name) {
    if (seen.has(name)) {
      return
    }
    const item = registry.items[name]
    if (!item) {
      throw new Error(unknownComponent(registry, name))
    }
    seen.add(name)
    for (const dependency of item.registryDependencies) {
      visit(dependency)
    }
    order.push(item)
  }

  for (const name of names) {
    visit(name)
  }
  return order
}

function resolveNames(registry, names) {
  if (names.length === 0) {
    throw new Error("Name a component, or use lumenui add all")
  }
  if (names.includes("all")) {
    if (names.length > 1) {
      throw new Error("all cannot be combined with other components")
    }
    return publicNames(registry)
  }
  for (const name of names) {
    if (!registry.items[name]) {
      throw new Error(unknownComponent(registry, name))
    }
  }
  return names
}

function unknownComponent(registry, name) {
  const close = publicNames(registry).filter(
    (item) => item.includes(name) || name.includes(item)
  )
  const hint = close.length > 0 ? `\nDid you mean ${close.slice(0, 5).join(", ")}?` : ""
  return `Unknown component "${name}".${hint}\nRun lumenui list to see them.`
}

function publicNames(registry) {
  return Object.values(registry.items)
    .filter((item) => !item.internal)
    .map((item) => item.name)
    .sort()
}

function internalStillUsed(registry, installed, name) {
  return installed.some((itemName) => {
    if (itemName === name) {
      return false
    }
    return registry.items[itemName]?.registryDependencies.includes(name)
  })
}

function diskHasItem(project, config, item) {
  return item.files.some((file) => existsSync(fileDestination(project, config, file.name)))
}

function resolveProject(cwd) {
  return findProject(cwd) ?? cwd
}

function findProject(start) {
  let dir = path.resolve(start)
  while (true) {
    if (existsSync(path.join(dir, "package.json"))) {
      return dir
    }
    const parent = path.dirname(dir)
    if (parent === dir) {
      return undefined
    }
    dir = parent
  }
}

function readConfig(project) {
  const file = path.join(project, "lumen.json")
  if (!existsSync(file)) {
    return undefined
  }
  const config = JSON.parse(readFileSync(file, "utf8"))
  config.installed ??= []
  config.aliases ??= defaultConfig(project).aliases
  config.paths ??= defaultConfig(project).paths
  return config
}

function defaultConfig(project) {
  const src = existsSync(path.join(project, "src"))
  return {
    aliases: {
      ui: "@/components/ui",
      lib: "@/lib",
    },
    paths: {
      ui: src ? "src/components/ui" : "components/ui",
      lib: src ? "src/lib" : "lib",
    },
    installed: [],
  }
}

function writeConfig(project, config) {
  writeFileSync(
    path.join(project, "lumen.json"),
    `${JSON.stringify(
      {
        aliases: config.aliases,
        paths: config.paths,
        installed: [...config.installed].sort(),
      },
      null,
      2
    )}\n`
  )
}

function missingPackages(project, packages) {
  const file = path.join(project, "package.json")
  if (!existsSync(file)) {
    return packages
  }
  const manifest = JSON.parse(readFileSync(file, "utf8"))
  const present = new Set([
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.devDependencies ?? {}),
  ])
  return packages.filter((name) => !present.has(name))
}

function installPackages(project, packages, flags) {
  if (packages.length === 0) {
    return
  }
  const manager = packageManager(project)
  const args = installArgs(manager, packages)
  if (flags["dry-run"]) {
    console.log(`${manager} ${args.join(" ")}`)
    return
  }
  const result = spawnSync(manager, args, { cwd: project, stdio: "inherit" })
  if (result.status !== 0) {
    throw new Error(
      `Could not install ${packages.join(" ")}. Run ${manager} ${args.join(" ")} in ${project}.`
    )
  }
}

function packageManager(project) {
  if (existsSync(path.join(project, "pnpm-lock.yaml"))) {
    return "pnpm"
  }
  if (existsSync(path.join(project, "yarn.lock"))) {
    return "yarn"
  }
  if (
    existsSync(path.join(project, "bun.lock")) ||
    existsSync(path.join(project, "bun.lockb"))
  ) {
    return "bun"
  }
  return "npm"
}

function installArgs(manager, packages) {
  if (manager === "npm") {
    return ["install", ...packages]
  }
  return ["add", ...packages]
}

function loadRegistry() {
  const uiDir = path.join(cliRoot, "../src/components/ui")
  const utilsFile = path.join(cliRoot, "../src/lib/utils.ts")
  const cssFile = path.join(cliRoot, "../src/lib/lumen-css.ts")
  if (existsSync(uiDir) && existsSync(utilsFile) && existsSync(cssFile)) {
    return buildRegistry({ uiDir, utilsFile, cssFile })
  }
  return JSON.parse(readFileSync(path.join(cliRoot, "registry/registry.json"), "utf8"))
}

function parseArgs(argv) {
  const positionals = []
  const flags = {}
  let command
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index] ?? ""
    if (token === "--help" || token === "-h") {
      flags.help = true
      continue
    }
    if (token === "--force") {
      flags.force = true
      continue
    }
    if (token === "--dry-run") {
      flags["dry-run"] = true
      continue
    }
    if (token === "--css") {
      flags.css = true
      continue
    }
    if (token === "--cwd") {
      flags.cwd = argv[index + 1]
      index += 1
      continue
    }
    if (token.startsWith("--")) {
      throw new Error(`Unknown option ${token}`)
    }
    if (!command) {
      command = token
      continue
    }
    positionals.push(token)
  }
  return { command, positionals, flags }
}
