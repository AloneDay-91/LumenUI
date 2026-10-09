"use client"

import Link from "next/link"
import { useState, type ReactNode } from "react"

import { BlockThumb } from "@/components/blocks/BlockThumb"
import { BlockView } from "@/components/blocks/BlockView"
import { useKit } from "@/components/blocks/KitProvider"
import { lumenBlocks } from "@/components/blocks/lumen-blocks"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import { blockCategories, type BlockCategorySlug } from "@/lib/block-categories"

export function blockCount(slug: BlockCategorySlug) {
  const listed = lumenBlocks.filter((block) => block.kit === slug).length
  return slug === "heroes" ? listed + 1 : listed
}

/** Categories with no block yet stay out of the navigation. Their URL still answers. */
export const listedCategories = blockCategories.filter(
  (category) => blockCount(category.slug) > 0,
)

export function BlocksGallery({ kit }: { kit: BlockCategorySlug }) {
  const { active } = useKit()
  const visible =
    active.id === "lumen"
      ? lumenBlocks.filter((block) => block.kit === kit)
      : []

  if (visible.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {active.name} has no blocks in this section yet.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      {visible.map((block) => (
        <BlockView
          key={block.id}
          id={block.id}
          kit={block.kit}
          title={block.title}
          description={block.description}
          command={block.command}
          code={block.code}
        />
      ))}
    </div>
  )
}

type Filter = "all" | (typeof blockCategories)[number]["group"]

const groups = (["Marketing", "Account"] as const).filter((group) =>
  listedCategories.some((category) => category.group === group),
)

const filters: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All" },
  ...groups.map((group) => ({ id: group, label: group })),
]

const pad = (value: number) => String(value).padStart(2, "0")

export function CategoryIndex({ header }: { header: ReactNode }) {
  const [filter, setFilter] = useState<Filter>("all")
  const visible = listedCategories.filter(
    (category) => filter === "all" || category.group === filter,
  )

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        {header}
        {groups.length > 1 ? (
          <ToggleGroup
            aria-label="Filter by group"
            value={[filter]}
            onValueChange={(value) => {
              const next = value[0] as Filter | undefined
              if (next) setFilter(next)
            }}
          >
            {filters.map((item) => (
              <Toggle key={item.id} value={item.id}>
                {item.label}
                <span className="font-mono text-[10px] font-normal opacity-70">
                  {pad(
                    item.id === "all"
                      ? listedCategories.length
                      : listedCategories.filter((c) => c.group === item.id)
                          .length,
                  )}
                </span>
              </Toggle>
            ))}
          </ToggleGroup>
        ) : null}
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/blocks/${category.slug}`}
              className="flex h-full flex-col rounded-[min(var(--radius-4xl),24px)] border border-border p-2 transition-colors hover:border-foreground/25"
            >
              <BlockThumb slug={category.slug} />
              <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-muted-foreground">
                    {category.group}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {pad(blockCount(category.slug))}
                  </p>
                </div>
                <h2 className="mt-1 text-sm font-medium">{category.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
