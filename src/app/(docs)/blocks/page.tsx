import type { Metadata } from "next"

import { CategoryIndex } from "@/components/blocks/BlocksGallery"

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Kits for product screens. Headers, heroes, pricing, and the pages around them.",
}

export default function BlocksPage() {
  return (
    <CategoryIndex
      header={
        <header className="max-w-[65ch]">
          <h1 className="text-xl leading-tight font-medium tracking-tight md:text-2xl">
            Blocks
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Whole sections built from Lumen components: headers, heroes,
            pricing, dashboards. Pick a type to see each block live, read its
            source, and copy it with one command.
          </p>
        </header>
      }
    />
  )
}
