import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { preload } from "react-dom";
import type { ReactNode } from "react";

import { CopyCommand } from "@/components/marketing/CopyCommand";
import { FeatureAlso } from "@/components/marketing/FeatureAlso";
import { FeatureCarousel } from "@/components/marketing/FeatureCarousel";
import { FeatureCli } from "@/components/marketing/FeatureCli";
import { FrameworkMark } from "@/components/marketing/FrameworkMarks";
import { PaintBackdrop } from "@/components/marketing/PaintBackdrop";
import { HeroProduct } from "@/components/marketing/HeroProduct";
import { StackMark } from "@/components/marketing/StackMarks";
import { buttonVariants } from "@/components/ui/button-variants";
import { changelog } from "@/lib/changelog";
import { componentItems } from "@/lib/docs-nav";
import { getHeroRows } from "@/lib/hero-registry";
import { FRAMEWORKS, HERO_BACKGROUND, LANDING_MAX_WIDTH, STACK } from "@/lib/site";
import { cn } from "@/lib/utils";

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

const marks: { key: string; label: string; icon: ReactNode }[] = [
  ...STACK.map((item) => ({
    key: item.id,
    label: item.label,
    icon: <StackMark id={item.id} className="size-7" />,
  })),
  ...FRAMEWORKS.map((item) => ({
    key: item.id,
    label: item.name,
    icon: <FrameworkMark id={item.id} className="size-7" />,
  })),
];

function Hairline() {
  return (
    <div className={container}>
      <div className="h-px bg-border" />
    </div>
  );
}

export default function Home() {
  preload(HERO_BACKGROUND, { as: "image", fetchPriority: "low" });

  const tableRows = getHeroRows().filter((row) =>
    ["button", "card", "tabs"].includes(row.slug),
  );

  return (
    <main id="content" className="w-full flex-1">
      <section className="pt-12 md:pt-20">
        <div className={container}>
          <div className="mx-auto flex w-full max-w-5xl flex-col items-start text-left">
            <h1 className="max-w-4xl font-heading text-[1.75rem] leading-[1.15] font-normal tracking-[-0.02em] text-balance md:text-[2.125rem] lg:text-[2.5rem]">
              A React design system that copies into your repo.
            </h1>
            <p className="mt-5 max-w-4xl text-base text-pretty text-muted-foreground md:text-lg">
              Lumen UI is {componentItems.length} components for forms, data,
              overlays, and AI apps. The CLI writes the source into your
              project, on Base UI and Tailwind, so you edit the file instead of
              waiting on a package.
            </p>
            <div className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
              <CopyCommand />
              <Link
                href="/docs/components"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                Browse components
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </div>
          </div>

          <div
            className="mx-auto mt-12 w-full max-w-5xl max-h-[34rem] overflow-hidden md:mt-16 md:max-h-[40rem]"
            style={{
              WebkitMaskImage: "linear-gradient(180deg, #000 40%, transparent 92%)",
              maskImage: "linear-gradient(180deg, #000 40%, transparent 92%)",
            }}
          >
            <div className="relative overflow-hidden rounded-t-2xl border border-b-0 border-border px-3 pt-4 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10">
              <PaintBackdrop />
              <div className="relative">
                <HeroProduct fade={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Built with" className={cn(container, "pt-4")}>
        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          <ul className="landing-marquee flex w-max">
            {[...marks, ...marks].map((mark, index) => (
              <li
                key={`${mark.key}-${index}`}
                aria-hidden={index >= marks.length ? true : undefined}
                className="flex items-center gap-2.5 pr-14 text-muted-foreground"
              >
                {mark.icon}
                <span className="font-mono text-base font-medium tracking-tight">
                  {mark.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={cn(container, "py-16 md:py-24")}>
        <p className="reveal max-w-3xl font-heading text-xl leading-snug font-normal tracking-[-0.015em] text-balance md:text-[1.75rem] md:leading-[1.38]">
          Init sets up the project. Add copies one component when a screen
          needs it, and the file stays in your repo.
        </p>
      </section>
      <Hairline />

      <section id="copy" className={cn(container, "scroll-mt-28 py-16 md:py-24")}>
        <FeatureCli />
      </section>
      <Hairline />

      <section className={cn(container, "py-16 md:py-24")}>
        <FeatureCarousel tableRows={tableRows} releases={releases} />
      </section>
      <Hairline />

      <section className={cn(container, "py-16 md:py-24")}>
        <FeatureAlso />
      </section>
      <Hairline />

      <section className={cn(container, "py-16 md:py-24")}>
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <h2
            id="components"
            className="font-heading text-2xl leading-tight font-normal tracking-[-0.02em]"
          >
            The catalog
          </h2>
          <p className="font-mono text-xs text-muted-foreground">
            {String(componentItems.length).padStart(2, "0")}
          </p>
        </div>
        <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Each name is a page with a preview, the props, and the command that
          copies its source.
        </p>
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
      <Hairline />

      <section className={cn(container, "flex flex-col items-center gap-7 py-24 text-center md:py-36")}>
        <h2 className="max-w-2xl font-heading text-3xl leading-[1.15] font-normal tracking-[-0.025em] text-balance md:text-[2.5rem]">
          Start with Button.
        </h2>
        <p className="max-w-md text-base text-balance text-muted-foreground">
          Init writes the tokens. Add copies the first component. The rest of
          the catalog is there when the screen needs it.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/docs/installation" className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}>
            Installation
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <Link
            href="/docs/components"
            className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}
          >
            Browse components
          </Link>
        </div>
      </section>
    </main>
  );
}
