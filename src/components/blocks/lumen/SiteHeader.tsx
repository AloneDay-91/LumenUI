import Link from "next/link"

import { LumenWordmark } from "@/components/blocks/lumen/brand"
import { MobileNav } from "@/components/blocks/lumen/mobile-nav"
import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

const links = [
  { href: "/docs", label: "System" },
  { href: "/docs/components", label: "Components" },
  { href: "/blocks", label: "Blocks" },
  { href: "https://github.com/AloneDay-91/LumenUI", label: "GitHub", external: true },
]

export function SiteHeader() {
  return (
    <header className="flex w-full items-center justify-between gap-6 bg-background px-4 py-4 sm:px-6 sm:py-6">
      <div className="flex min-w-0 items-center gap-8">
        <Link href="/" aria-label="Lumen UI" className="inline-flex shrink-0 items-center">
          <LumenWordmark />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              nativeButton={false}
              className="text-sm font-normal text-muted-foreground"
              render={
                link.external ? (
                  <a href={link.href} target="_blank" rel="noreferrer" />
                ) : (
                  <Link href={link.href} />
                )
              }
            >
              {link.label}
            </Button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <ThemeToggle className="hidden md:inline-flex" />
        <Button nativeButton={false} className="hidden sm:inline-flex" render={<Link href="/docs" />}>
          Documentation
        </Button>
        <MobileNav sections={[{ links }]} cta={{ href: "/docs", label: "Documentation" }} className="md:hidden" />
      </div>
    </header>
  )
}
