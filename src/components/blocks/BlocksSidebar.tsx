"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  blockCount,
  kitCategories,
  listedGroups,
} from "@/components/blocks/BlocksGallery"
import { useKit } from "@/components/blocks/KitProvider"
import { cn } from "@/lib/utils"

const pad = (value: number) => String(value).padStart(2, "0")

function NavLink({
  href,
  label,
  count,
  active,
  onNavigate,
}: {
  href: string
  label: string
  count: number
  active: boolean
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        active && "bg-muted font-medium text-foreground",
      )}
    >
      <span className="truncate">{label}</span>
      <span className="font-mono text-[11px] font-normal text-muted-foreground">
        {pad(count)}
      </span>
    </Link>
  )
}

/** The Blocks nav, styled like the docs contents. Used in the sidebar and the mobile menu. */
export function BlocksNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { active } = useKit()
  const categories = kitCategories(active.id)

  return (
    <nav aria-label="Blocks" className="flex flex-col gap-6">
      <div>
        <ul className="flex flex-col gap-0.5">
          <li>
            <NavLink
              href="/blocks"
              label="All blocks"
              count={categories.length}
              active={pathname === "/blocks"}
              onNavigate={onNavigate}
            />
          </li>
        </ul>
      </div>
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
                return (
                  <li key={category.slug}>
                    <NavLink
                      href={href}
                      label={category.title}
                      count={blockCount(category.slug)}
                      active={pathname === href}
                      onNavigate={onNavigate}
                    />
                  </li>
                )
              })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
