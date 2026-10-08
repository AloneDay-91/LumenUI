import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { blockPreviewIds } from "@/components/blocks/block-ids"
import { BlockPreviewBody } from "@/components/blocks/BlockPreviewBody"
import { SiteHero } from "@/components/blocks/CurrentHero"

export function generateStaticParams() {
  return blockPreviewIds.map((id) => ({ id }))
}

export const metadata: Metadata = {
  title: "Block preview",
}

export default async function BlockPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!blockPreviewIds.includes(id as (typeof blockPreviewIds)[number])) notFound()
  if (id === "site-hero") return <SiteHero />
  return <BlockPreviewBody id={id} />
}
