import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { BlockPreviewSizer } from "@/components/blocks/BlockPreviewBody"
import { BlockView } from "@/components/blocks/BlockView"
import { CopyCommand } from "@/components/marketing/CopyCommand"
import { HeroProduct } from "@/components/marketing/HeroProduct"
import { StackMark } from "@/components/marketing/StackMarks"
import { buttonVariants } from "@/components/ui/button-variants"
import { docsSections } from "@/lib/docs-nav"
import { HERO_BACKGROUND, STACK } from "@/lib/site"
import { cn } from "@/lib/utils"

const componentItems =
  docsSections.find((section) => section.title === "Components")?.items ?? []

const paletteItems = componentItems.map((item) => ({
  name: item.name,
  slug: item.href.split("/").pop() ?? item.href,
}))

const code = `import { HeroProduct } from "@/components/marketing/HeroProduct"
import { HERO_BACKGROUND } from "@/lib/site"

export function SiteHero() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent,transparent_16rem,black_30rem,black_32rem,transparent_40rem)] dark:opacity-40"
        style={{ backgroundImage: \`url(\${HERO_BACKGROUND})\` }}
      />
      <section className="relative px-6 pt-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start text-left">
          <h1 className="max-w-2xl text-4xl font-medium tracking-tight md:text-5xl">
            The code lives in your repo.
          </h1>
        </div>
      </section>
      <div className="relative px-6 pt-14 pb-12">
        <HeroProduct items={[]} />
      </div>
    </div>
  )
}`

export function SiteHero() {
  return (
    <>
      <BlockPreviewSizer />
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent,transparent_25rem,black_33rem,black_35rem,transparent_42rem)] motion-safe:animate-[lumen-paint_900ms_ease-out_both] md:mask-[linear-gradient(to_bottom,transparent,transparent_16rem,black_30rem,black_32rem,transparent_40rem)] dark:opacity-40"
          style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
        />
        <section className="relative px-6 pt-10 md:pt-16">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-start text-left">
            <h3 className="max-w-2xl text-4xl leading-[1.1] font-medium tracking-tight text-balance md:text-5xl">
              The code lives in your repo.
            </h3>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-pretty text-muted-foreground">
              {componentItems.length} React components built on Base UI and Tailwind CSS 4. The CLI copies
              the source into your project, so every file is yours to edit.
            </p>
            <div className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
              <CopyCommand />
              <Link
                href="/docs/components"
                className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
              >
                Browse components
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </div>
            <ul
              aria-label="Built on"
              className="mt-6 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-xs text-muted-foreground"
            >
              {STACK.map((item) => (
                <li key={item.label} className="inline-flex items-center gap-1.5">
                  <StackMark id={item.id} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div className="relative px-6 pt-12 pb-12 md:pt-14">
          <HeroProduct items={paletteItems} />
        </div>
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
      description="The landing hero. The painting stays behind the components screen."
      command="npx @aloneday/lumenui@latest add button badge table command kbd"
      code={code}
    />
  )
}
