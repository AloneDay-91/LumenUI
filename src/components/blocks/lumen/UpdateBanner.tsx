"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/Button"

/** The bar above every page of the site, naming the latest release. Dismissing it hides it. */
export function UpdateBanner() {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div className="w-full border-b border-border bg-muted text-xs">
      <div className="relative flex h-9 items-center justify-center gap-2 px-10">
        <span className="size-1.5 shrink-0 rounded-full bg-new" aria-hidden />
        <p className="m-0 min-w-0 truncate text-center">
          <span className="font-medium text-foreground">v1.2.0 · Components for AI apps</span>
          <span className="hidden text-muted-foreground sm:inline">
            {" — "}Form, data, and layout components, AI patterns built on one Trace, a loading Button,
            and status toasts.
          </span>
        </p>
        <Button
          variant="link"
          nativeButton={false}
          className="shrink-0 text-xs text-foreground"
          render={<Link href="/docs/changelog" />}
        >
          Changelog
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
          aria-label="Dismiss update banner"
          onClick={() => setOpen(false)}
        >
          <X />
        </Button>
      </div>
    </div>
  )
}
