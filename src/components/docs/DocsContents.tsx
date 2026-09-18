"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { useDocsSearch } from "@/components/docs/DocsSearchContext"
import { docsSections, isNavActive } from "@/lib/docs-nav"
import { cn } from "@/lib/utils"

export function DocsContents({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { query } = useDocsSearch()
  const normalized = query.trim().toLowerCase()

  const filteredSections = docsSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.name.toLowerCase().includes(normalized)
      ),
    }))
    .filter((section) => section.items.length > 0)

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6">
      {filteredSections.length === 0 ? (
        <p className="px-2 text-xs text-muted-foreground">Aucun résultat.</p>
      ) : (
        filteredSections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
              {section.title}
            </p>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const active = isNavActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-lg px-2 py-1 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        active && "bg-muted font-medium text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))
      )}
    </nav>
  )
}
