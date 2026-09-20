import { DocsContents } from "@/components/docs/DocsContents"
import { formatDocsVersion } from "@/lib/site"

export function DocsSidebar() {
  return (
    <aside className="sticky top-[calc(var(--update-banner-height)+3.5rem)] hidden h-[calc(100dvh-var(--update-banner-height)-3.5rem)] w-60 shrink-0 flex-col border-r border-border md:flex">
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
        <DocsContents />
      </div>
      <p className="shrink-0 border-t border-border px-5 py-3 font-mono text-[11px] text-muted-foreground">
        {formatDocsVersion()}
      </p>
    </aside>
  )
}