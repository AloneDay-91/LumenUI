import { readFile } from "node:fs/promises"
import path from "node:path"

import type { Metadata } from "next"

import { getDocsLocation } from "@/lib/docs-nav"
import { SITE_NAME } from "@/lib/site"

/**
 * Title and description for a docs route. The title is the nav label, the
 * description is the one already written on the page. The title is absolute:
 * a title set in a nested layout does not pick up the root template.
 */
export async function docsMetadata(pathname: string): Promise<Metadata> {
  const title = getDocsLocation(pathname)?.item.name

  let description: string | undefined
  try {
    const source = await readFile(
      path.join(process.cwd(), "src/app/(docs)", pathname, "page.tsx"),
      "utf8",
    )
    description = source.match(/description="([^"]+)"/)?.[1]
  } catch {
    description = undefined
  }

  return {
    ...(title ? { title: { absolute: `${title} · ${SITE_NAME}` } } : {}),
    ...(description ? { description } : {}),
  }
}
