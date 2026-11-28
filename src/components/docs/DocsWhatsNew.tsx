import Link from "next/link"
import { Sparkles } from "lucide-react"

import { DocsWhatsNewVisual } from "@/components/docs/DocsWhatsNewVisual"
import { getLatestChangelog } from "@/lib/changelog"

export function DocsWhatsNew() {
  const release = getLatestChangelog()

  return (
    <div className="shrink-0 border-t border-border px-3 py-3">
      <div className="group rounded-lg border border-border bg-background p-3">
        <div className="flex flex-col gap-1 text-xs">
          <div className="mb-1 flex items-center gap-1.5 text-[12.5px] text-foreground">
            <Sparkles className="size-3 text-primary" strokeWidth={1.75} aria-hidden />
            <span>What&apos;s new</span>
          </div>
          <p className="line-clamp-3 text-[11.5px] leading-relaxed text-muted-foreground">
            {release.summary}
          </p>
          <DocsWhatsNewVisual version={release.version} />
          {/* Revealed on hover or keyboard focus. */}
          <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <div className="overflow-hidden">
              <div className="mt-2 border-t border-border pt-2">
                <Link
                  href="/docs/changelog"
                  className="text-[11px] text-primary underline-offset-2 hover:underline"
                >
                  Read the changelog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
