import { readFileSync } from "node:fs"
import path from "node:path"

import { DASHBOARD_BLOCKS_DIR, dashboardBlockMeta } from "@/lib/dashboard-blocks"

function readBlockFile(name: string) {
  // Read at build time: the category pages are static, so the project is not traced.
  const file = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    DASHBOARD_BLOCKS_DIR,
    name,
  )
  return readFileSync(file, "utf8")
}

/** The Code tab of each dashboard block in a category: the real source, read at build time. */
export function dashboardSources(category: string) {
  const sources: Record<string, string> = {}
  for (const block of dashboardBlockMeta) {
    if (block.kit !== category) continue
    sources[block.id] =
      block.files.length === 1
        ? readBlockFile(block.files[0])
        : block.files
            .map((file) => `// ${file}\n\n${readBlockFile(file).trim()}`)
            .join("\n\n")
  }
  return sources
}
