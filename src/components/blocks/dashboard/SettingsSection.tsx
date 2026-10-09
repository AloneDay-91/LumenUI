import type { ReactNode } from "react"

/** Label column on the left, the form on the right. Stacks below 48rem. */
export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="@container border-b border-border py-8 first:pt-0 last:border-b-0 last:pb-0">
      <div className="grid gap-5 @3xl:grid-cols-[240px_1fr] @3xl:gap-10">
        <div>
          <h2 className="text-sm font-medium">{title}</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-4">{children}</div>
      </div>
    </section>
  )
}
