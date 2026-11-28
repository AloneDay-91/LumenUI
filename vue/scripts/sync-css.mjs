// Writes src/globals.css from the one stylesheet the React docs and the CLI share,
// so the playground never drifts from LUMEN_GLOBAL_CSS.
import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const source = readFileSync(path.join(here, "../../src/lib/lumen-css.ts"), "utf8")
const css = source.match(/LUMEN_GLOBAL_CSS = `([\s\S]*)`\s*$/)?.[1]
if (!css) {
  throw new Error("Could not read LUMEN_GLOBAL_CSS")
}
writeFileSync(path.join(here, "../src/globals.css"), css.endsWith("\n") ? css : `${css}\n`)
