import type { Metadata } from "next"

import { ExamplesGallery } from "@/components/marketing/ExamplesGallery"
import { LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Examples",
  description: "The same composed examples as the card gallery: charts, forms, empty states, and account flows.",
}

export default function ExamplesPage() {
  return (
    <main
      id="content"
      className={cn(
        "mx-auto w-full flex-1 px-6 pt-2 pb-16 md:px-12 md:py-10",
        LANDING_MAX_WIDTH
      )}
    >
      <h1 className="sr-only">Examples</h1>
      <ExamplesGallery />
    </main>
  )
}
