"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { blockCategories } from "@/lib/block-categories"
import { formatDocsVersion } from "@/lib/site"
import { cn } from "@/lib/utils"

const groups = ["Marketing", "Account"] as const

export function BlocksNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Blocks" className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group}>
          <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
            {group}
          </p>
          <ul className="flex flex-col gap-0.5">
            {blockCategories
              .filter((category) => category.group === group)
              .map((category) => {
                const href = `/blocks/${category.slug}`
                const active = pathname === href
                return (
                  <li key={category.slug}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-lg px-2 py-1 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        active && "bg-muted font-medium text-foreground",
                      )}
                    >
                      {category.title}
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function BlocksSidebar() {
  return (
    <aside className="sticky top-[calc(var(--update-banner-height)+3.5rem)] hidden h-[calc(100dvh-var(--update-banner-height)-3.5rem)] w-60 shrink-0 flex-col border-r border-border md:flex">
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
        <BlocksNav />
      </div>
      <p className="shrink-0 border-t border-border px-5 py-3 font-mono text-[11px] text-muted-foreground">
        {formatDocsVersion()}
      </p>
    </aside>
  )
}
