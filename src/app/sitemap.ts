import type { MetadataRoute } from "next"

import { blockCategories } from "@/lib/block-categories"
import { componentItems, docsNav } from "@/lib/docs-nav"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/customize",
    "/blocks",
    ...blockCategories.map((category) => `/blocks/${category.slug}`),
    "/docs/components",
    ...docsNav.map((item) => item.href),
    ...componentItems.map((item) => item.href),
  ]

  return [...new Set(paths)].map((pathname) => ({
    url: pathname === "/" ? SITE_URL : `${SITE_URL}${pathname}`,
  }))
}
