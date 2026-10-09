import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { preload } from "react-dom";

import { CopyCommand } from "@/components/marketing/CopyCommand";
import { FeatureCarousel } from "@/components/marketing/FeatureCarousel";
import { FeatureCli } from "@/components/marketing/FeatureCli";
import { FeatureTokens } from "@/components/marketing/FeatureTokens";
import { HeroProduct } from "@/components/marketing/HeroProduct";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card } from "@/components/ui/Card";
import { changelog } from "@/lib/changelog";
import { docsSections } from "@/lib/docs-nav";
import { getHeroRows } from "@/lib/hero-registry";
import { StackMark } from "@/components/marketing/StackMarks";
import { HERO_BACKGROUND, LANDING_MAX_WIDTH, STACK } from "@/lib/site";
import { cn } from "@/lib/utils";

const componentItems =
  docsSections.find((section) => section.title === "Components")?.items ?? [];

const paletteItems = componentItems.map((item) => ({
  name: item.name,
  slug: item.href.split("/").pop() ?? item.href,
}));

const container = cn("mx-auto w-full px-6 md:px-12", LANDING_MAX_WIDTH);

const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

/** The three latest releases, oldest first, straight from the changelog. */
const releases = changelog
  .slice(0, 3)
  .reverse()
  .map((release, index, list) => ({
    version: `v${release.version}`,
    date: release.date,
    label: shortDate.format(new Date(release.date)),
    latest: index === list.length - 1,
  }));

export default function Home() {
  preload(HERO_BACKGROUND, { as: "image", fetchPriority: "low" });

  const tableRows = getHeroRows().filter((row) =>
    ["button", "card", "tabs"].includes(row.slug),
  );

  return (
    <main id="content" className="w-full flex-1">
      <div className="relative">
        {/* Painting: gone behind the headline, peaks behind the product, gone
            again before the product's own fade starts. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent,transparent_25rem,black_33rem,black_35rem,transparent_42rem)] motion-safe:animate-[lumen-paint_900ms_ease-out_both] md:mask-[linear-gradient(to_bottom,transparent,transparent_16rem,black_30rem,black_32rem,transparent_40rem)] dark:opacity-40"
          style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
        />

        <section
          className={cn(container, "relative pt-10 md:pt-16")}
        >
          {/* Same width as the product below, so the left edges line up. */}
          <div className="mx-auto flex w-full max-w-5xl flex-col items-start text-left">
            <h1 className="max-w-2xl text-4xl leading-[1.1] font-medium tracking-tight text-balance md:text-5xl">
              The code lives in your repo.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-pretty text-muted-foreground">
              {componentItems.length} React components built on Base UI and
              Tailwind CSS 4. The CLI copies the source into your project, so
              every file is yours to edit.
            </p>
            <div className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
              <CopyCommand />
              <Link
                href="/docs/components"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full sm:w-auto",
                )}
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
                  {item.id ? <StackMark id={item.id} /> : null}
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className={cn(container, "relative pt-12 pb-12 md:pt-14")}>
          <HeroProduct items={paletteItems} />
        </div>
      </div>

      <div className={cn(container, "pb-16 md:pb-24")}>
        <FeatureCli />
        <FeatureCarousel tableRows={tableRows} releases={releases} />
        <FeatureTokens />

        <section className="reveal mt-24 md:mt-32">
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

        <Card
          variant="secondary"
          className="mt-24 gap-0 py-0 md:mt-32"
        >
          <div className="flex flex-col gap-8 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-8 md:py-10">
            <div className="max-w-xl">
              <p className="font-mono text-xs tracking-widest text-muted-foreground">
                Next
              </p>
              <h2 className="mt-3 text-3xl leading-[1.1] font-medium tracking-tight text-balance md:text-4xl">
                Copy the first file.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                Dependencies, tokens, then Button. Everything else is copied on
                demand.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <Link
                href="/docs/installation"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Installation
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
              <Link
                href="/docs/components"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                Browse components
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
