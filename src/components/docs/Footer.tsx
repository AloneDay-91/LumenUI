import Link from "next/link";

import { ScrollToTop } from "@/components/docs/ScrollToTop";
import { CopyCommand } from "@/components/marketing/CopyCommand";
import { SiteLogo } from "@/components/marketing/SiteLogo";
import { StackMark } from "@/components/marketing/StackMarks";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  formatDocsVersion,
  GITHUB_URL,
  HERO_BACKGROUND,
  LANDING_MAX_WIDTH,
  STACK,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const columns = [
  {
    title: "Start",
    links: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/frameworks", label: "Frameworks" },
      { href: "/customize", label: "Customize" },
      { href: "/examples", label: "Examples" },
      { href: "/docs/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Components",
    links: [
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/input", label: "Input" },
      { href: "/docs/components/dialog", label: "Dialog" },
      { href: "/docs/components/table", label: "Table" },
      { href: "/docs/components", label: "All components" },
    ],
  },
  {
    title: "Blocks",
    links: [
      { href: "/blocks", label: "All blocks" },
      { href: "/blocks/headers", label: "Headers" },
      { href: "/blocks/heroes", label: "Heroes" },
      { href: "/blocks/features", label: "Features" },
      { href: "/blocks/footers", label: "Footers" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-50 mt-auto overflow-hidden pt-12 md:pt-16">
      {/* The painting from the hero, back at the bottom of the page: gone at the
          top, full at the bottom. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-bottom opacity-70 mask-[linear-gradient(to_bottom,transparent,black_80%)] dark:opacity-30"
        style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
      />
      <div
        className={cn(
          "relative mx-auto w-full px-6 pt-10 pb-6 md:px-12 md:pt-14",
          LANDING_MAX_WIDTH,
        )}
      >
        <div className="flex w-full flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="flex w-full max-w-xs shrink-0 flex-col items-start gap-4">
            <SiteLogo />
            <p className="max-w-xs text-sm leading-relaxed text-foreground/70">
              Copy-paste components. The files live in your repo.
            </p>
            <div className="mt-2 flex w-full">
              <CopyCommand />
            </div>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:contents"
          >
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col">
                <p className="text-sm font-medium">{column.title}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4  pt-5 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-foreground/70">
            <p>© {new Date().getFullYear()} Lumen UI</p>
            <Badge variant="outline" className="font-mono text-[10px]">
              {formatDocsVersion()}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <ul
              aria-label="Built on"
              className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs text-foreground/70"
            >
              {STACK.map((item) => (
                <li
                  key={item.label}
                  className="inline-flex items-center gap-1.5"
                >
                  <StackMark id={item.id} />
                  {item.label}
                </li>
              ))}
            </ul>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <svg
                viewBox="0 0 16 16"
                className="size-3.5 fill-current"
                aria-hidden
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>
            <ScrollToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
