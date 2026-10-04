import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const site = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"))
const cliPath = path.join(root, "cli/package.json")
const cli = JSON.parse(readFileSync(cliPath, "utf8"))

if (cli.version === site.version) {
  console.log(`@aloneday/lumenui@${cli.version}`)
  process.exit(0)
}

cli.version = site.version
writeFileSync(cliPath, `${JSON.stringify(cli, null, 2)}\n`)
console.log(`@aloneday/lumenui@${cli.version}`)
