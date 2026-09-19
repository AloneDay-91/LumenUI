"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { getDocsLocation } from "@/lib/docs-nav"

export function DocsBreadcrumb() {
  const pathname = usePathname()
  const location = getDocsLocation(pathname)

  if (!location) {
    return null
  }

  const sectionHref = location.section.items[0]?.href

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 items-center gap-1.5 text-xs"
    >
      {sectionHref ? (
        <Link
          href={sectionHref}
          className="truncate text-muted-foreground transition-colors hover:text-foreground"
        >
          {location.section.title}
        </Link>
      ) : (
        <span className="truncate text-muted-foreground">
          {location.section.title}
        </span>
      )}
      <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="truncate font-medium text-foreground">
        {location.item.name}
      </span>
    </nav>
  )
}
