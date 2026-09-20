import type { Metadata } from "next"
import Link from "next/link"

import { Footer } from "@/components/docs/Footer"
import { MarketingNav } from "@/components/marketing/MarketingNav"
import { buttonVariants } from "@/components/ui/button-variants"
import { LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-background">
      <MarketingNav />
      <main
        id="content"
        className={cn(
          "mx-auto flex w-full flex-1 items-center px-6 py-24 md:px-12",
          LANDING_MAX_WIDTH
        )}
      >
        <div className="max-w-md">
          <p
            aria-hidden="true"
            className="mb-4 font-mono text-xs tracking-widest text-muted-foreground"
          >
            404
          </p>
          <h1 className="mb-4 text-3xl leading-[1.15] font-medium tracking-tight text-pretty md:text-4xl">
            This page does not exist.
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            The link is broken or the page moved.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
              Back home
            </Link>
            <Link
              href="/docs"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
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
