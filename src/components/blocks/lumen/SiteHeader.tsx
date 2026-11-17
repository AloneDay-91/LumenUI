import Link from "next/link"

import { LumenWordmark } from "@/components/blocks/lumen/brand"
import { buttonVariants } from "@/components/ui/button-variants"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

const links = [
  { href: "/docs", label: "System" },
  { href: "/docs/components", label: "Components" },
  { href: "/blocks", label: "Blocks" },
  { href: "https://github.com/AloneDay-91/LumenUI", label: "GitHub" },
]

export function SiteHeader() {
  return (
    <header className="flex w-full items-center justify-between gap-6 bg-background px-6 py-6">
      <div className="flex min-w-0 items-center gap-10">
        <Link href="/" aria-label="Lumen UI" className="inline-flex items-center">
          <LumenWordmark />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link href="/docs" className={buttonVariants()}>
          Documentation
        </Link>
      </div>
    </header>
  )
}
