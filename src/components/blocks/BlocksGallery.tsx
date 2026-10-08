"use client"

import Link from "next/link"

import { BlockView } from "@/components/blocks/BlockView"
import { useKit } from "@/components/blocks/KitProvider"
import { lumenBlocks } from "@/components/blocks/lumen-blocks"
import {
  blockCategories,
  type BlockCategorySlug,
} from "@/lib/block-categories"

export function blockCount(slug: BlockCategorySlug) {
  const listed = lumenBlocks.filter((block) => block.kit === slug).length
  return slug === "heroes" ? listed + 1 : listed
}

export function BlocksGallery({ kit }: { kit: BlockCategorySlug }) {
  const { active } = useKit()
  const visible =
    active.id === "lumen" ? lumenBlocks.filter((block) => block.kit === kit) : []

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

export function CategoryIndex() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {blockCategories.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/blocks/${category.slug}`}
            className="flex h-full flex-col rounded-[min(var(--radius-4xl),24px)] border border-border p-5 transition-colors hover:border-foreground/25"
          >
            <p className="text-xs text-muted-foreground">{category.group}</p>
            <h2 className="mt-1 text-sm font-medium">{category.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              {String(blockCount(category.slug)).padStart(2, "0")}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
