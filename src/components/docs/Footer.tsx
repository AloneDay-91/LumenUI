import Link from "next/link"

import { FooterWordmark } from "@/components/marketing/FooterWordmark"
import { SiteLogo } from "@/components/marketing/SiteLogo"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { buttonVariants } from "@/components/ui/button-variants"
import { formatDocsVersion, GITHUB_URL, LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

const columns = [
  {
    title: "Start",
    links: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/frameworks", label: "Frameworks" },
      { href: "/shaders", label: "Shaders" },
      { href: "/customize", label: "Customize" },
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
]

const linkClass = "w-fit text-foreground transition-colors hover:text-muted-foreground"

export function Footer() {
  return (
    <footer className="relative mt-16">
      <div
        className={cn(
          "mx-auto flex w-full flex-col justify-between gap-12 px-6 py-14 md:px-12 lg:flex-row lg:gap-16",
          LANDING_MAX_WIDTH,
        )}
      >
        <div className="flex max-w-sm flex-col items-start gap-4">
          <SiteLogo />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Copy-paste components. The files live in your repo.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link href="/docs" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Documentation
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "ghost", size: "lg" })}
            >
              GitHub
            </a>
          </div>
        </div>
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-[repeat(3,11rem)]"
        >
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3.5 text-sm">
              <p className="mb-1 text-[13px] text-muted-foreground">{column.title}</p>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className={cn("mx-auto w-full px-6 md:px-12", LANDING_MAX_WIDTH)}>
        <FooterWordmark />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 px-4 pb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Lumen UI</span>
          <span className="font-mono">{formatDocsVersion()}</span>
        </span>
        <ThemeToggle />
      </div>
    </footer>
  )
}
