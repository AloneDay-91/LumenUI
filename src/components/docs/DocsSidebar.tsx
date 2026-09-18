import { DocsContents } from "@/components/docs/DocsContents"

export function DocsSidebar() {
  return (
    <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-border md:block">
      <div className="px-3 py-5">
        <DocsContents />
      </div>
    </aside>
  )
}
