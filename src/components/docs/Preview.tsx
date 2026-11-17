"use client"

import Link from "next/link"
import { useState, type ReactNode } from "react"

import { CopyPageButton } from "@/components/docs/CopyPageButton"
import { Card } from "@/components/ui/Card"
import { minorOf } from "@/lib/doc-versions"
import { cn } from "@/lib/utils"

export function PageIntro({
  title,
  description,
  versions,
}: {
  eyebrow?: string
  title: string
  description: string
  /** Release that added the page, and the last minor that changed it. */
  versions?: { added?: string; updated?: string }
}) {
  return (
    <header className="mb-8">
      <div className="flex flex-row items-start justify-between gap-4">
        <h1 id={title.toLowerCase().replace(/\s+/g, "-")}>{title}</h1>
        <CopyPageButton />
      </div>
      <p className="mt-3">{description}</p>
      {versions?.added || versions?.updated ? (
        <p data-slot="page-versions" className="mt-3 flex flex-wrap items-center gap-1.5">
          {versions.added ? (
            <Link
              href={`/docs/changelog#${versions.added}`}
              className="inline-flex h-5 items-center rounded-full border border-border px-2 font-mono text-[11px] text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              Since v{minorOf(versions.added)}
            </Link>
          ) : null}
          {versions.updated ? (
            <Link
              href={`/docs/changelog#${versions.updated}`}
              className="inline-flex h-5 items-center rounded-full bg-secondary px-2 font-mono text-[11px] text-secondary-foreground no-underline transition-colors hover:text-foreground"
            >
              Updated in v{minorOf(versions.updated)}
            </Link>
          ) : null}
        </p>
      ) : null}
    </header>
  )
}

export function Preview({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const [both, setBoth] = useState(false)
  const frame = cn(
    "flex min-h-24 w-full flex-row flex-wrap items-center justify-center gap-4",
    className
  )

  return (
    <Card data-docs-preview className="flex w-full max-w-none flex-col gap-4 px-6 py-6">
      <div className="flex justify-end">
        <button
          type="button"
          aria-pressed={both}
          onClick={() => setBoth((value) => !value)}
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {both ? "Site theme" : "Light and dark"}
        </button>
      </div>
      {both ? (
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <ThemePane mode="light" className={frame}>
            {children}
          </ThemePane>
          <ThemePane mode="dark" className={frame}>
            {children}
          </ThemePane>
        </div>
      ) : (
        <div className={cn(frame, "min-h-36")}>{children}</div>
      )}
    </Card>
  )
}

function ThemePane({
  mode,
  className,
  children,
}: {
  mode: "light" | "dark"
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-background p-6 text-foreground",
        mode
      )}
      style={{ colorScheme: mode }}
    >
      <span className="mb-4 block text-xs text-muted-foreground">
        {mode === "light" ? "Light" : "Dark"}
      </span>
      <div className={className}>{children}</div>
    </div>
  )
}

export function DocsHeading({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  return <h2 id={id}>{children}</h2>
}
