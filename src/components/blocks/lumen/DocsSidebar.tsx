import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { cn } from "@/lib/utils"

const sections = [
  {
    title: "Getting started",
    items: [
      { href: "/docs", name: "Introduction" },
      { href: "/docs/installation", name: "Installation", isNew: true },
      { href: "/docs/frameworks", name: "Frameworks", isNew: true },
      { href: "/docs/components", name: "Components" },
      { href: "/docs/changelog", name: "Changelog" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { href: "/docs/styles", name: "Styles" },
      { href: "/docs/accessibility", name: "Accessibility", isNew: true },
      { href: "/shaders", name: "Shaders", isNew: true },
      { href: "/customize", name: "Customize" },
    ],
  },
  {
    title: "Actions",
    items: [
      { href: "/docs/components/button", name: "Button" },
      { href: "/docs/components/button-group", name: "Button Group" },
      { href: "/docs/components/copy-button", name: "Copy Button", isNew: true },
      { href: "/docs/components/split-button", name: "Split Button", isNew: true },
    ],
  },
]

const ACTIVE = "/docs/components/button"

/** The docs sidebar next to the top of an article, with the breadcrumb bar. */
export function DocsSidebar() {
  return (
    <div className="flex min-h-[32rem] w-full bg-background">
      <aside className="flex w-60 shrink-0 flex-col border-r border-border">
        <nav aria-label="Documentation" className="flex flex-1 flex-col gap-6 px-3 py-5">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">{section.title}</p>
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const active = item.href === ACTIVE
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                          active && "bg-muted font-medium text-foreground",
                        )}
                      >
                        <span className="truncate">{item.name}</span>
                        {item.isNew ? <span className="size-1.5 shrink-0 rounded-full bg-new" aria-hidden /> : null}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
        <p className="border-t border-border px-5 py-3 font-mono text-[11px] text-muted-foreground">v1.2.0</p>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="flex h-11 items-center border-b border-border px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/docs/components" />}>Actions</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Button</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <article className="max-w-3xl px-6 py-8">
          <h1 className="text-xl leading-tight font-medium tracking-tight md:text-2xl">Button</h1>
          <p className="mt-3 max-w-[65ch] text-sm leading-6 text-muted-foreground">
            Pill button, built on @base-ui/react/button. Variants via CVA. Composition via the render prop.
          </p>
        </article>
      </div>
    </div>
  )
}
