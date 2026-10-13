"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { kitCategories, listedGroups } from "@/components/blocks/BlocksGallery"
import { useKit } from "@/components/blocks/KitProvider"
import { cn } from "@/lib/utils"

export function BlocksNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { active } = useKit()
  const categories = kitCategories(active.id)

  return (
    <nav aria-label="Blocks" className="flex flex-col gap-6">
      {listedGroups(active.id).map((group) => (
        <div key={group}>
          <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
            {group}
          </p>
          <ul className="flex flex-col gap-0.5">
            {categories
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
