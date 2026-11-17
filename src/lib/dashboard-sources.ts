import { readFileSync } from "node:fs"
import path from "node:path"

import { DASHBOARD_BLOCKS_DIR, dashboardBlockMeta } from "@/lib/dashboard-blocks"
import { LUMEN_BLOCKS_DIR, lumenBlockMeta } from "@/lib/lumen-blocks"

function readBlockFile(dir: string, name: string) {
  // Read at build time: the category pages are static, so the project is not traced.
  return readFileSync(path.join(/* turbopackIgnore: true */ process.cwd(), dir, name), "utf8")
}

function sourcesFor(
  dir: string,
  blocks: { id: string; kit: string; files: string[] }[],
  category: string,
) {
  const sources: Record<string, string> = {}
  for (const block of blocks) {
    if (block.kit !== category) continue
    sources[block.id] =
      block.files.length === 1
        ? readBlockFile(dir, block.files[0])
        : block.files
            .map((file) => `// ${file}\n\n${readBlockFile(dir, file).trim()}`)
            .join("\n\n")
  }
  return sources
}

/** The Code tab of each block in a category: the real source files, read at build time. */
export function blockSources(category: string) {
  return {
    ...sourcesFor(DASHBOARD_BLOCKS_DIR, dashboardBlockMeta, category),
    ...sourcesFor(LUMEN_BLOCKS_DIR, lumenBlockMeta, category),
  }
}
