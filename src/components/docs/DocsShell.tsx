"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

import { BlocksShell } from "@/components/blocks/BlocksShell"
import { CustomizeShell } from "@/components/theme/CustomizeShell"
import DocsAside from "@/components/docs/DocsAside"
import { DocsBreadcrumb } from "@/components/docs/DocsBreadcrumb"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { DocsPager } from "@/components/docs/DocsPager"
import { DocsSidebar } from "@/components/docs/DocsSidebar"

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith("/blocks")) {
    return <BlocksShell>{children}</BlocksShell>
  }

  if (pathname === "/customize") {
    return <CustomizeShell>{children}</CustomizeShell>
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <DocsHeader />
      <div className="flex min-h-0 w-full flex-1">
        <DocsSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="sticky top-[calc(var(--update-banner-height)+3.5rem)] z-30 border-b border-border bg-background">
            <div className="mx-auto flex h-11 w-full max-w-3xl items-center px-4 sm:px-6 lg:px-8">
              <DocsBreadcrumb />
            </div>
          </div>
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
            <article id="content" className="docs-article">
              {children}
              <DocsPager />
            </article>
          </main>
        </div>
        <DocsAside />
      </div>
    </div>
  )
}
