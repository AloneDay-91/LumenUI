import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { BlockPreviewSizer } from "@/components/blocks/BlockPreviewBody"
import { BlockView } from "@/components/blocks/BlockView"
import { CopyCommand } from "@/components/marketing/CopyCommand"
import { HeroProduct } from "@/components/marketing/HeroProduct"
import { buttonVariants } from "@/components/ui/button-variants"
import { componentItems } from "@/lib/docs-nav"
import { cn } from "@/lib/utils"

const code = `export function SiteHero() {
  return (
    <section className="px-6 pt-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start text-left">
        <h1 className="max-w-4xl font-heading text-[1.75rem] leading-[1.15] font-normal tracking-[-0.02em] md:text-[2.125rem]">
          A React design system that copies into your repo.
        </h1>
        <p className="mt-5 max-w-4xl text-base text-muted-foreground">
          React components for forms, data, overlays, and AI apps. The CLI copies the source into your project.
        </p>
      </div>
    </section>
  )
}`

export function SiteHero() {
  return (
    <>
      <BlockPreviewSizer />
      <section className="px-6 pt-10 md:pt-16">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-start text-left">
            <h3 className="max-w-4xl font-heading text-[1.75rem] leading-[1.15] font-normal tracking-[-0.02em] text-balance md:text-[2.125rem]">
              A React design system that copies into your repo.
            </h3>
            <p className="mt-5 max-w-4xl text-base text-pretty text-muted-foreground">
              Lumen UI is {componentItems.length} components for forms, data, overlays, and AI apps. The CLI
              writes the source into your project, on Base UI and Tailwind.
            </p>
            <div className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
              <CopyCommand />
              <Link
                href="/docs/components"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full sm:w-auto")}
              >
                Browse components
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </div>
          </div>
        </section>
        <div className="px-6 pt-12 pb-12">
          <HeroProduct />
        </div>
    </>
  )
}

export function CurrentHeroBlock() {
  return (
    <BlockView
      id="site-hero"
      kit="heroes"
      title="Site hero"
      description="The landing hero. The title, the sentence, and the actions share one left edge."
      command="npx @aloneday/lumenui@latest add button badge table command kbd"
      code={code}
    />
  )
}
