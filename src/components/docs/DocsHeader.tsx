"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { DocsContents } from "@/components/docs/DocsContents"
import { DocsSearch } from "@/components/docs/DocsSearch"
import { ThemeToggle } from "@/components/docs/ThemeToggle"
import { SiteLogo } from "@/components/marketing/SiteLogo"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { formatDocsVersion, GITHUB_URL } from "@/lib/site"

export function DocsHeader() {
  const [open, setOpen] = React.useState(false)
  const close = () => setOpen(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="flex h-14 items-center gap-3 px-4 md:grid md:grid-cols-[1fr_minmax(12rem,28rem)_1fr] md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
          <SiteLogo onClick={close} />
          <span className="hidden text-xs text-muted-foreground lg:inline">
            Documentation
          </span>
          <Badge
            variant="outline"
            className="font-mono text-[10px] text-muted-foreground"
          >
            {formatDocsVersion()}
          </Badge>
        </div>
        <div className="hidden md:block">
          <DocsSearch className="max-w-none" />
        </div>
        <div className="ml-auto flex items-center justify-end gap-1 md:ml-0">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
            nativeButton={false}
            render={<a href={GITHUB_URL} target="_blank" rel="noreferrer" />}
          >
            <svg viewBox="0 0 16 16" className="size-3.5 fill-current" aria-hidden>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </div>
      {open ? (
        <div className="space-y-4 border-t border-border px-4 py-4 md:hidden">
          <DocsSearch />
          <DocsContents onNavigate={close} />
        </div>
      ) : null}
    </header>
  )
}
