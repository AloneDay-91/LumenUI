import { ArrowRightIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { Fragment } from "react"

import { Footer } from "@/components/docs/Footer"
import { MarketingMobileNav } from "@/components/marketing/MarketingMobileNav"
import { MarketingNav } from "@/components/marketing/MarketingNav"
import { buttonVariants } from "@/components/ui/button-variants"
import { Card } from "@/components/ui/Card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/Item"
import { changelog } from "@/lib/changelog"
import { componentItems } from "@/lib/docs-nav"
import { HERO_BACKGROUND, LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
}

const container = cn("mx-auto w-full px-6 md:px-12", LANDING_MAX_WIDTH)

const componentCount = componentItems.length

const destinations = [
  {
    name: "Introduction",
    href: "/docs",
    description: "What Lumen is, and why the code lives in your repo.",
  },
  {
    name: "Installation",
    href: "/docs/installation",
    description: "The CLI, the dependencies, the tokens, and cn().",
  },
  {
    name: "Components",
    href: "/docs/components",
    description: `${componentCount} components, each with a live preview and its API.`,
  },
  {
    name: "Blocks",
    href: "/blocks",
    description: "Headers, heroes, pricing, and the screens around them.",
  },
  {
    name: "Changelog",
    href: "/docs/changelog",
    description: `Latest release: v${changelog[0]?.version}.`,
  },
]

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-background">
      <MarketingNav />
      <div className="flex min-h-0 flex-1 flex-col overflow-x-clip">
        <div className={container}>
          <MarketingMobileNav />
        </div>
        <main id="content" className="relative w-full flex-1">
          {/* Same painting as the home hero: gone behind the headline, peaks
              behind the card, gone again below it. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent,transparent_22rem,black_30rem,black_34rem,transparent_42rem)] motion-safe:animate-[lumen-paint_900ms_ease-out_both] md:mask-[linear-gradient(to_bottom,transparent,transparent_14rem,black_24rem,black_28rem,transparent_36rem)] dark:opacity-40"
            style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
          />

          <section className={cn(container, "relative pt-10 pb-16 md:pt-16 md:pb-24")}>
            <div className="mx-auto flex w-full max-w-5xl flex-col items-start text-left">
              <p className="font-mono text-xs tracking-widest text-muted-foreground">
                404
              </p>
              <h1 className="mt-3 max-w-2xl text-4xl leading-[1.1] font-medium tracking-tight text-balance md:text-5xl">
                This page does not exist.
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-pretty text-muted-foreground">
                The link is broken, or the page moved. The docs and every
                component are still one click away.
              </p>
              <div className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
                <Link href="/" className={cn(buttonVariants(), "w-full sm:w-auto")}>
                  Back home
                </Link>
                <Link
                  href="/docs/components"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full sm:w-auto"
                  )}
                >
                  Browse components
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </div>

              <Card className="mt-12 w-full max-w-2xl gap-0 py-2 md:mt-16">
                <div className="flex items-baseline justify-between gap-4 px-5 pt-3 pb-2">
                  <h2 className="text-sm font-medium tracking-tight text-muted-foreground">
                    Where to next
                  </h2>
                  <p className="font-mono text-xs text-muted-foreground">
                    {String(destinations.length).padStart(2, "0")}
                  </p>
                </div>
                <ItemGroup className="px-2">
                  {destinations.map((destination, index) => (
                    <Fragment key={destination.href}>
                      {index > 0 ? <ItemSeparator className="mx-3 data-[orientation=horizontal]:w-auto" /> : null}
                      <Item render={<Link href={destination.href} />}>
                        <ItemContent>
                          <ItemTitle>{destination.name}</ItemTitle>
                          <ItemDescription>{destination.description}</ItemDescription>
                        </ItemContent>
                        <ItemActions className="text-muted-foreground transition-[color,translate] group-hover/item:translate-x-0.5 group-hover/item:text-foreground">
                          <ArrowRightIcon />
                        </ItemActions>
                      </Item>
                    </Fragment>
                  ))}
                </ItemGroup>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
