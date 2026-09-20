"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { getDocsLocation } from "@/lib/docs-nav"

export function DocsBreadcrumb() {
  const pathname = usePathname()
  const location = getDocsLocation(pathname)

  if (!location) {
    return null
  }

  const sectionHref = location.section.items[0]?.href

  return (
    <Breadcrumb className="min-w-0">
      <BreadcrumbList className="flex-nowrap">
        <BreadcrumbItem>
          {sectionHref ? (
            <BreadcrumbLink render={<Link href={sectionHref} />}>
              {location.section.title}
            </BreadcrumbLink>
          ) : (
            <span className="truncate">{location.section.title}</span>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{location.item.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
