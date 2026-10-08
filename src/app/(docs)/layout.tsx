import type { ReactNode } from "react"

import { DocsSearchProvider } from "@/components/docs/DocsSearchContext"
import { DocsShell } from "@/components/docs/DocsShell"
import { DocsTOCProvider } from "@/components/docs/DocsTOCContext"

export const metadata = {
  title: "Docs",
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsSearchProvider>
      <DocsTOCProvider>
        <DocsShell>{children}</DocsShell>
      </DocsTOCProvider>
    </DocsSearchProvider>
  )
}
