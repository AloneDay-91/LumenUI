import { Menu, MessageSquare, Search } from "lucide-react"
import Link from "next/link"

import { LumenWordmark } from "@/components/blocks/lumen/brand"
import { Button } from "@/components/ui/Button"
import { Kbd } from "@/components/ui/Kbd"

/** The bar over a docs page: logo, section label, version, Ask, search, and the menu. */
export function DocsHeader() {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/" aria-label="Lumen UI" className="inline-flex items-center">
            <LumenWordmark />
          </Link>
          <span className="hidden text-xs text-muted-foreground lg:inline">Documentation</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="mr-1 hidden font-mono text-[11px] text-muted-foreground sm:inline">v1.2.0</span>
          <Button variant="ghost" size="icon-sm" aria-label="Ask Lumen" className="text-muted-foreground">
            <MessageSquare className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hidden gap-2 text-muted-foreground sm:inline-flex">
            <Search className="size-4" />
            Search
            <Kbd size="sm">⌘K</Kbd>
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Search" className="text-muted-foreground sm:hidden">
            <Search className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Menu" className="text-muted-foreground">
            <Menu className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
