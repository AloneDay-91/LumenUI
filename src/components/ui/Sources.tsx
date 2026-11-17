"use client"

import * as React from "react"
import { LibraryIcon } from "lucide-react"

import { Trace, TraceContent, TraceTrigger } from "@/components/ui/Trace"

type Source = { href: string; title: React.ReactNode }

function hostOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "")
  } catch {
    return href
  }
}

/** A letter tile for a site, so the list needs no favicon requests. */
function SiteMark({ href }: { href: string }) {
  const host = hostOf(href)
  return (
    <span
      aria-hidden
      className="flex size-4 shrink-0 items-center justify-center rounded-[5px] bg-secondary font-mono text-[9px] font-medium text-secondary-foreground uppercase"
    >
      {host[0]}
    </span>
  )
}

/** The links the agent used for a reply, folded under “Used n sources”. */
function Sources({
  sources,
  label = (count: number) => `Used ${count} source${count === 1 ? "" : "s"}`,
  ...props
}: Omit<React.ComponentProps<typeof Trace>, "variant" | "status" | "children"> & {
  sources: Source[]
  label?: (count: number) => string
}) {
  return (
    <Trace data-slot="sources" {...props}>
      <TraceTrigger icon={<LibraryIcon />} label={label(sources.length)} />
      <TraceContent>
        <ul className="m-0 flex list-none flex-col gap-1.5 p-0 py-0.5">
          {sources.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="group/source flex items-center gap-2 rounded-md text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
              >
                <SiteMark href={source.href} />
                <span className="min-w-0 truncate group-hover/source:underline group-hover/source:underline-offset-4">
                  {source.title}
                </span>
                <span className="shrink-0 text-muted-foreground">{hostOf(source.href)}</span>
              </a>
            </li>
          ))}
        </ul>
      </TraceContent>
    </Trace>
  )
}

export { Sources, SiteMark, hostOf }
export type { Source }
