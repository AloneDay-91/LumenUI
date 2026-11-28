import { DocsContents } from "@/components/docs/DocsContents"
import { DocsFrameworkSwitch } from "@/components/docs/DocsFrameworkSwitch"

export function DocsSidebar() {
  return (
    <aside className="sticky top-[calc(var(--update-banner-height)+3.5rem)] hidden h-[calc(100dvh-var(--update-banner-height)-3.5rem)] w-60 shrink-0 flex-col border-r border-border md:flex">
      <div className="min-h-0 flex-1 scroll-fade overflow-y-auto px-3 py-5">
        <DocsContents />
      </div>
      <DocsFrameworkSwitch />
    </aside>
  )
}
