import Link from "next/link"

import { LandingShowcase } from "@/components/marketing/LandingShowcase"
import { Badge } from "@/components/ui/Badge"
import { buttonVariants } from "@/components/ui/button-variants"
import { docsSections } from "@/lib/docs-nav"
import { formatDocsVersion, LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

const principles = [
  {
    period: "01",
    title: "Copy-paste",
    body: "You copy the file. It lives in your repo. No package to version.",
  },
  {
    period: "02",
    title: "Base UI",
    body: "Focus, keyboard, portals: behavior comes from the primitives. The chrome is Lumen.",
  },
  {
    period: "03",
    title: "Same paper",
    body: "Warm tokens, pills, Inter. Fraunces on the wordmark only.",
  },
  {
    period: "04",
    title: "Keyboard first",
    body: "Visible focus, disabled states, native composition. Nothing decorative at the expense of the keyboard.",
  },
]

const componentItems =
  docsSections.find((section) => section.title === "Components")?.items ?? []

export default function Home() {
  return (
    <main
      id="content"
      className={cn(
        "mx-auto w-full flex-1 px-6 pt-10 pb-16 md:px-12 md:pt-20 md:pb-24",
        LANDING_MAX_WIDTH
      )}
    >
      <section className="flex flex-col items-center text-center">
        <Badge variant="outline">{formatDocsVersion()}</Badge>
        <h1 className="mt-6 max-w-2xl text-4xl leading-[1.1] font-medium tracking-tight text-pretty md:text-5xl">
          The code lives in your repo.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
          Lumen UI is a copy-paste system. Base UI handles focus, keyboard, and
          portals. The chrome — warm paper, pills, no blue — stays yours.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <Link href="/docs" className={cn(buttonVariants({ size: "lg" }))}>
            Documentation
          </Link>
          <Link
            href="/examples"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            Examples
          </Link>
        </div>

        <div className="relative mt-14 w-full md:mt-16">
          <div className="max-h-110 overflow-hidden mask-[linear-gradient(to_bottom,black_68%,transparent)] md:max-h-160">
            <LandingShowcase />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-px h-2/5 bg-linear-to-t from-background from-5% via-background/50 to-transparent"
          />
        </div>
      </section>

      <section className="mt-24 md:mt-32">
        <h2 className="mb-10 text-sm font-medium tracking-tight text-muted-foreground">
          Principles
        </h2>
        <ul className="grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {principles.map((item) => (
            <li key={item.period}>
              <p className="font-mono text-xs text-muted-foreground">
                {item.period}
              </p>
              <p className="mt-3 text-sm font-medium">{item.title}</p>
              <p className="mt-1 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 md:mt-32">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2
            id="components"
            className="text-sm font-medium tracking-tight text-muted-foreground"
          >
            Components
          </h2>
          <p className="font-mono text-xs text-muted-foreground">
            {String(componentItems.length).padStart(2, "0")}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
          {componentItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 border-t border-border pt-12 md:mt-32 md:pt-16">
        <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
          Copy the first file
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Dependencies, tokens, then Button. Everything else is copied on
          demand.
        </p>
        <Link
          href="/docs/installation"
          className={cn(buttonVariants({ size: "lg" }), "mt-8")}
        >
          Installation
        </Link>
      </section>
    </main>
  )
}
