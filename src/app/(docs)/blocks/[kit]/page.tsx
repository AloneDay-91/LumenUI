import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlocksGallery } from "@/components/blocks/BlocksGallery"
import { CurrentHeroBlock } from "@/components/blocks/CurrentHero"
import { blockCategories, getBlockCategory } from "@/lib/block-categories"

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
      <header className="mb-10 max-w-lg">
        <h1 className="text-xl leading-tight font-medium tracking-tight md:text-2xl">
          {category.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </header>
      <div className="flex flex-col gap-10">
        {category.slug === "heroes" ? <CurrentHeroBlock /> : null}
        <BlocksGallery kit={category.slug} />
      </div>
    </>
  )
}
