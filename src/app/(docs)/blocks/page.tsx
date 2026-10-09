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
        <header className="max-w-lg">
          <h1 className="text-xl leading-tight font-medium tracking-tight md:text-2xl">
            Blocks
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Pick a type in the sidebar. Each section scrolls through its
            blocks, with the source and the CLI command.
          </p>
        </header>
      }
    />
  )
}
