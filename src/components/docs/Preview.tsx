import type { ReactNode } from "react"

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
  return (
    <Card
      className={cn(
        "min-h-36 flex-row flex-wrap items-center justify-center gap-4 px-6 py-10",
        className
      )}
    >
      {children}
    </Card>
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
