import type { Metadata } from "next"

import { ExamplesBento } from "@/components/marketing/ExamplesBento"
import { LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Exemples",
  description: "Usages composés des composants Lumen UI, en bento.",
}

export default function ExamplesPage() {
  return (
    <main
      id="contenu"
      className={cn(
        "mx-auto w-full flex-1 px-6 pt-2 pb-16 md:px-12 md:py-10",
        LANDING_MAX_WIDTH
      )}
    >
      <h1 className="sr-only">Exemples</h1>
      <ExamplesBento />
    </main>
  )
}
