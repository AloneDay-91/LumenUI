import type { Metadata } from "next"
import Link from "next/link"
import { preload } from "react-dom"

import { Footer } from "@/components/docs/Footer"
import { MarketingMobileNav } from "@/components/marketing/MarketingMobileNav"
import { MarketingNav } from "@/components/marketing/MarketingNav"
import { buttonVariants } from "@/components/ui/button-variants"
import { HERO_BACKGROUND, LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
}

export default function NotFound() {
  preload(HERO_BACKGROUND, { as: "image", fetchPriority: "high" })

  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-background">
      <MarketingNav />
      <div className={cn("mx-auto w-full px-6 md:hidden", LANDING_MAX_WIDTH)}>
        <MarketingMobileNav />
      </div>
      <main
        id="content"
        className="relative flex w-full flex-1 items-center justify-center overflow-hidden px-6 py-24 md:px-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent,black_18%,black_72%,transparent)] motion-safe:animate-[lumen-paint_900ms_ease-out_both] dark:opacity-40"
          style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,black_0%,black_28%,transparent_62%)]"
        />
        <div className="relative flex max-w-lg flex-col items-center text-center">
          <p className="font-mono text-xs tracking-widest text-muted-foreground">
            404
          </p>
          <h1 className="mt-4 text-4xl leading-[1.1] font-medium tracking-tight text-balance md:text-5xl">
            This page does not exist.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-pretty text-muted-foreground">
            The link is broken or the page moved.
          </p>
          <div className="mt-8 flex w-full flex-col items-center gap-2.5 sm:w-auto sm:flex-row">
            <Link href="/" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              Back home
            </Link>
            <Link
              href="/docs"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "w-full sm:w-auto",
              )}
            >
              Documentation
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
