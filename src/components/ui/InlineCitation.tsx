"use client"

import * as React from "react"

import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from "@/components/ui/PreviewCard"
import { SiteMark, hostOf } from "@/components/ui/Sources"
import { cn } from "@/lib/utils"

/**
 * A source in the sentence: a small pill with the site name that opens a
 * preview on hover or focus, with the title, the excerpt, and the link.
 */
function InlineCitation({
  href,
  title,
  excerpt,
  index,
  className,
}: {
  href: string
  title: React.ReactNode
  excerpt?: React.ReactNode
  /** Shows "[1]" style numbering instead of the site name. */
  index?: number
  className?: string
}) {
  const host = hostOf(href)

  return (
    <PreviewCard>
      <PreviewCardTrigger
        href={href}
        target="_blank"
        rel="noreferrer"
        data-slot="inline-citation"
        className={cn(
          "mx-0.5 inline-flex h-[1.125rem] translate-y-[-1px] items-center rounded-full bg-secondary px-1.5 align-middle font-mono text-[10px] font-medium text-secondary-foreground no-underline outline-none hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)] focus-visible:ring-3 focus-visible:ring-ring/30",
          className
        )}
      >
        {index !== undefined ? index : host}
      </PreviewCardTrigger>
      <PreviewCardContent className="flex w-80 flex-col gap-2">
        <span className="flex items-center gap-2 text-muted-foreground">
          <SiteMark href={href} />
          {host}
        </span>
        <span className="text-sm leading-5 font-medium text-foreground">{title}</span>
        {excerpt ? <span className="line-clamp-3 leading-5 text-muted-foreground">{excerpt}</span> : null}
      </PreviewCardContent>
    </PreviewCard>
  )
}

export { InlineCitation }
