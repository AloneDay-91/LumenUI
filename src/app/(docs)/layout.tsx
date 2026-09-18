import type { ReactNode } from "react"

import DocsAside from "@/components/docs/DocsAside"
import { DocsBreadcrumb } from "@/components/docs/DocsBreadcrumb"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { DocsPager } from "@/components/docs/DocsPager"
import { DocsSearchProvider } from "@/components/docs/DocsSearchContext"
import { DocsSidebar } from "@/components/docs/DocsSidebar"
import { DocsTOCProvider } from "@/components/docs/DocsTOCContext"
import { Footer } from "@/components/docs/Footer"

export const metadata = {
  title: "Documentation",
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsSearchProvider>
      <DocsTOCProvider>
        <div className="flex min-h-dvh flex-col bg-background">
          <DocsHeader />
          <div className="flex min-h-0 w-full flex-1">
            <DocsSidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="sticky top-14 z-30 border-b border-border bg-background">
                <div className="mx-auto flex h-11 w-full max-w-3xl items-center px-4 sm:px-6 lg:px-8">
                  <DocsBreadcrumb />
                </div>
              </div>
              <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
                <article id="contenu" className="docs-article">
                  {children}
                  <DocsPager />
                </article>
              </div>
              <Footer />
            </div>
            <DocsAside />
          </div>
        </div>
      </DocsTOCProvider>
    </DocsSearchProvider>
  )
}
