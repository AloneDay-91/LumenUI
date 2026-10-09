import type { ReactNode } from "react"

import { DocsSearchProvider } from "@/components/docs/DocsSearchContext"
import { DocsShell } from "@/components/docs/DocsShell"
import { DocsTOCProvider } from "@/components/docs/DocsTOCContext"
import { SITE_NAME } from "@/lib/site"

// A plain `title` here would drop the root template for everything below.
export const metadata = {
  title: { default: "Docs", template: `%s · ${SITE_NAME}` },
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
