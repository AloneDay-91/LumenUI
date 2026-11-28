import type { MetadataRoute } from "next"

import { componentItems, docsNav } from "@/lib/docs-nav"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/shaders",
    "/customize",
    "/docs/components",
    ...docsNav.map((item) => item.href),
    ...componentItems.map((item) => item.href),
  ]

  return [...new Set(paths)].map((pathname) => ({
    url: pathname === "/" ? SITE_URL : `${SITE_URL}${pathname}`,
  }))
}
