"use client"

import { useState, type ReactNode } from "react"

import { CopyPageButton } from "@/components/docs/CopyPageButton"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

export function PageIntro({
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description: string
}) {
  return (
    <header className="mb-8">
      <div className="flex flex-row items-start justify-between gap-4">
        <h1 id={title.toLowerCase().replace(/\s+/g, "-")}>{title}</h1>
        <CopyPageButton />
      </div>
      <p className="mt-3">{description}</p>
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
    <Card className="flex w-full max-w-none flex-col gap-4 px-6 py-6">
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
