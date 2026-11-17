import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlocksGallery } from "@/components/blocks/BlocksGallery"
import { blockCategories, getBlockCategory } from "@/lib/block-categories"
import { blockSources } from "@/lib/dashboard-sources"

export function generateStaticParams() {
  return blockCategories.map((category) => ({ kit: category.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kit: string }>
}): Promise<Metadata> {
  const { kit } = await params
  const category = getBlockCategory(kit)
  if (!category) return { title: "Blocks" }
  return {
    title: category.title,
    description: category.description,
  }
}

export default async function BlockCategoryPage({
  params,
}: {
  params: Promise<{ kit: string }>
}) {
  const { kit } = await params
  const category = getBlockCategory(kit)
  if (!category) notFound()

  return (
    <>
      <header className="mb-10 max-w-[65ch]">
        <p className="mb-2 text-xs text-muted-foreground">{category.group}</p>
        <h1 className="text-xl leading-tight font-medium tracking-tight md:text-2xl">
          {category.title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {category.description}
        </p>
      </header>
      <div className="flex flex-col gap-10">
        <BlocksGallery
          kit={category.slug}
          sources={blockSources(category.slug)}
        />
      </div>
    </>
  )
}
