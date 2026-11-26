import assert from "node:assert/strict"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { afterEach, beforeEach, describe, test } from "node:test"

import { run } from "../src/index.js"

const registry = JSON.parse(
  readFileSync(new URL("../registry/registry.json", import.meta.url), "utf8")
)

// Every package the registry can ask for is already in package.json, so no test spawns npm.
const dependencies = Object.fromEntries(
  Object.values(registry.items)
    .flatMap((item) => item.dependencies)
    .map((name) => [name, "*"])
)
const devDependencies = {
  tailwindcss: "*",
  "@tailwindcss/postcss": "*",
  "tw-animate-css": "*",
}

let project

function file(relative) {
  return path.join(project, relative)
}

function read(relative) {
  return readFileSync(file(relative), "utf8")
}

function lumen(...argv) {
  return run([...argv, "--cwd", project])
}

beforeEach((t) => {
  project = mkdtempSync(path.join(tmpdir(), "lumenui-"))
  mkdirSync(file("src"))
  writeFileSync(
    file("package.json"),
    JSON.stringify({ name: "fixture", dependencies, devDependencies })
  )
  t.mock.method(console, "log", () => {})
})

afterEach(() => {
  rmSync(project, { recursive: true, force: true })
})

describe("init", () => {
  test("writes lumen.json, cn() and the stylesheet", async () => {
    await lumen("init")

    const config = JSON.parse(read("lumen.json"))
    assert.deepEqual(config.paths, { ui: "src/components/ui", lib: "src/lib" })
    assert.deepEqual(config.installed, ["utils"])
    assert.match(read("src/lib/utils.ts"), /export function cn/)
    assert.match(read("src/app/globals.css"), /@import "tailwindcss"/)
    assert.ok(existsSync(file("postcss.config.mjs")))
  })

  test("--dry-run writes nothing", async () => {
    await lumen("init", "--dry-run")

    assert.ok(!existsSync(file("lumen.json")))
    assert.ok(!existsSync(file("src/lib/utils.ts")))
  })
})

describe("add", () => {
  test("copies the component and the local files it imports", async () => {
    await lumen("add", "dialog")

    for (const name of ["Dialog.tsx", "Button.tsx", "Spinner.tsx", "button-variants.ts", "styles.ts"]) {
      assert.ok(existsSync(file(`src/components/ui/${name}`)), name)
    }
    assert.ok(existsSync(file("src/lib/utils.ts")))
    assert.deepEqual(
      JSON.parse(read("lumen.json")).installed,
      ["button", "button-variants", "dialog", "spinner", "styles", "utils"]
    )
  })

  test("rewrites imports to the aliases in lumen.json", async () => {
    writeFileSync(
      file("lumen.json"),
      JSON.stringify({
        aliases: { ui: "~/ui", lib: "~/lib" },
        paths: { ui: "app/ui", lib: "app/lib" },
      })
    )

    await lumen("add", "dialog")

    const source = read("app/ui/Dialog.tsx")
    assert.match(source, /from "~\/lib\/utils"/)
    assert.doesNotMatch(source, /@\/components\/ui|@\/lib/)
  })

  test("keeps a file the user edited", async () => {
    await lumen("add", "button")
    const edited = `${read("src/components/ui/Button.tsx")}\n// mine\n`
    writeFileSync(file("src/components/ui/Button.tsx"), edited)

    await lumen("add", "button")

    assert.equal(read("src/components/ui/Button.tsx"), edited)
  })

  test("--overwrite replaces an edited file", async () => {
    await lumen("add", "button")
    const original = read("src/components/ui/Button.tsx")
    writeFileSync(file("src/components/ui/Button.tsx"), "// mine\n")

    await lumen("add", "button", "--overwrite")

    assert.equal(read("src/components/ui/Button.tsx"), original)
  })

  test("add menu copies DropdownMenu and add dropdown-menu still writes it", async () => {
    await lumen("add", "menu")
    assert.ok(existsSync(file("src/components/ui/Menu.tsx")))
    assert.ok(existsSync(file("src/components/ui/DropdownMenu.tsx")))

    await lumen("rm", "menu")
    await lumen("add", "dropdown-menu")
    assert.ok(existsSync(file("src/components/ui/DropdownMenu.tsx")))
  })

  test("rejects an unknown component", async () => {
    await assert.rejects(lumen("add", "nope"), /nope/)
  })

  test("refuses paths outside the project", async () => {
    writeFileSync(
      file("lumen.json"),
      JSON.stringify({ paths: { ui: "../outside", lib: "src/lib" } })
    )

    await assert.rejects(lumen("add", "button"), /paths\.ui/)
    assert.ok(!existsSync(path.join(project, "..", "outside")))
  })
})

describe("rm", () => {
  test("deletes the component", async () => {
    await lumen("add", "button")

    await lumen("rm", "button")

    assert.ok(!existsSync(file("src/components/ui/Button.tsx")))
    assert.ok(!JSON.parse(read("lumen.json")).installed.includes("button"))
  })

  test("keeps a component another one imports, unless --force", async () => {
    await lumen("add", "dialog")

    await assert.rejects(lumen("rm", "button"), /dialog/i)
    assert.ok(existsSync(file("src/components/ui/Button.tsx")))

    await lumen("rm", "button", "--force")
    assert.ok(!existsSync(file("src/components/ui/Button.tsx")))
  })
})

test("dropdown-menu stays internal behind menu", () => {
  assert.equal(registry.items.menu.internal, false)
  assert.equal(registry.items["dropdown-menu"].internal, true)
  assert.ok(registry.items.menu.registryDependencies.includes("dropdown-menu"))
})

test("the bundled registry matches the site sources", async () => {
  const { buildRegistry } = await import("../src/registry-build.js")
  const root = fileURLToPath(new URL("../../", import.meta.url))
  const fresh = buildRegistry({
    uiDir: path.join(root, "src/components/ui"),
    utilsFile: path.join(root, "src/lib/utils.ts"),
    cssFile: path.join(root, "src/lib/lumen-css.ts"),
  })

  assert.deepEqual(fresh, registry, "Run npm run registry")
})

describe("vue", () => {
  const vueRegistry = JSON.parse(
    readFileSync(new URL("../registry/registry-vue.json", import.meta.url), "utf8")
  )
  const vueDependencies = Object.fromEntries(
    Object.values(vueRegistry.items)
      .flatMap((item) => item.dependencies)
      .map((name) => [name, "*"])
  )

  beforeEach(() => {
    writeFileSync(
      file("package.json"),
      JSON.stringify({
        name: "fixture",
        dependencies: { vue: "*", ...vueDependencies },
        devDependencies,
      })
    )
  })

  test("init detects vue and writes into the stylesheet main.ts imports", async () => {
    mkdirSync(file("src/assets"))
    writeFileSync(file("src/assets/main.css"), "body { color: red; }\n")

    await lumen("init")

    const config = JSON.parse(read("lumen.json"))
    assert.equal(config.framework, "vue")
    assert.equal(config.paths.css, "src/assets/main.css")
    assert.match(read("src/assets/main.css"), /@import "tailwindcss"/)
    assert.match(read("src/assets/main.css.bak"), /color: red/)
    assert.match(read("src/lib/utils.ts"), /export function cn/)
  })

  test("add copies component folders and the folders they import", async () => {
    await lumen("add", "dialog")

    for (const name of [
      "dialog/DialogContent.vue",
      "dialog/index.ts",
      "button/Button.vue",
      "button/index.ts",
      "spinner/Spinner.vue",
      "styles.ts",
    ]) {
      assert.ok(existsSync(file(`src/components/ui/${name}`)), name)
    }
    assert.ok(!existsSync(file("src/components/ui/Dialog.tsx")))
  })

  test("--framework vue wins over the package.json guess", async () => {
    // A React-looking project: no vue dependency, so only the flag picks Vue.
    writeFileSync(
      file("package.json"),
      JSON.stringify({
        name: "fixture",
        dependencies: { ...dependencies, ...vueDependencies },
        devDependencies,
      })
    )

    await lumen("add", "button", "--framework", "vue")

    assert.ok(existsSync(file("src/components/ui/button/Button.vue")))
    assert.equal(JSON.parse(read("lumen.json")).framework, "vue")
  })

  test("refuses to switch a configured project", async () => {
    await lumen("init")

    await assert.rejects(lumen("add", "button", "--framework", "react"), /set up for vue/)
  })

  test("rm deletes the whole component folder", async () => {
    await lumen("add", "card")

    await lumen("rm", "card")

    assert.ok(!existsSync(file("src/components/ui/card/Card.vue")))
    assert.ok(!existsSync(file("src/components/ui/card/index.ts")))
  })

  test("the bundled Vue registry matches the vue sources", async () => {
    const { buildVueRegistry } = await import("../src/registry-build.js")
    const root = fileURLToPath(new URL("../../", import.meta.url))
    const fresh = buildVueRegistry({
      uiDir: path.join(root, "vue/src/components/ui"),
      utilsFile: path.join(root, "vue/src/lib/utils.ts"),
      cssFile: path.join(root, "src/lib/lumen-css.ts"),
    })

    assert.deepEqual(fresh, vueRegistry, "Run npm run registry")
  })
})
