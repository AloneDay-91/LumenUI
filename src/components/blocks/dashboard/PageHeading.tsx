import type { ReactNode } from "react"

/** Page title, one line of context, and the page actions on the right. */
export function PageHeading({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 @3xl:flex-row @3xl:items-end">
      <div className="min-w-0 flex-1">
        <h1 className="font-heading text-xl font-medium tracking-tight md:text-2xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {children ? (
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      ) : null}
    </div>
  )
}
