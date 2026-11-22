import { ArrowUpRight, CircleAlert, Code, SquarePen } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { componentItems } from "@/lib/docs-nav"
import { GITHUB_BRANCH, GITHUB_URL } from "@/lib/site"

const COMPONENT_PREFIX = "/docs/components/"

// Slugs whose file name is not the PascalCase of the slug.
const FILE_OVERRIDES: Record<string, string> = {
  "otp-field": "OTPField",
}

type PageLink = { label: string; href: string; icon: LucideIcon }

function componentFile(slug: string) {
  const name =
    FILE_OVERRIDES[slug] ??
    slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")
  return `src/components/ui/${name}.tsx`
}

function getPageLinks(pathname: string): PageLink[] {
  if (!pathname.startsWith("/docs")) return []

  const blob = `${GITHUB_URL}/blob/${GITHUB_BRANCH}`
  const page = `src/app/(docs)${pathname.replace(/\/$/, "")}/page.tsx`
  const component = pathname.startsWith(COMPONENT_PREFIX)
    ? componentItems.find((item) => item.href === pathname)
    : undefined

  const issueTitle = component ? `[${component.name}] ` : `[Docs] ${pathname} `
  const links: PageLink[] = []

  if (component) {
    links.push({
      label: "View source",
      href: `${blob}/${componentFile(pathname.slice(COMPONENT_PREFIX.length))}`,
      icon: Code,
    })
  }

  links.push(
    {
      label: "Edit this page",
      href: `${GITHUB_URL}/edit/${GITHUB_BRANCH}/${page}`,
      icon: SquarePen,
    },
    {
      label: "Report an issue",
      href: `${GITHUB_URL}/issues/new?title=${encodeURIComponent(issueTitle)}`,
      icon: CircleAlert,
    }
  )

  return links
}

export function DocsPageLinks({ pathname }: { pathname: string }) {
  const links = getPageLinks(pathname)
  if (links.length === 0) return null

  return (
    <nav aria-label="Contribute" className="px-3 py-5">
      <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">
        On GitHub
      </p>
      <ul className="flex flex-col">
        {links.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group/link flex items-center gap-2 rounded-md px-1 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
              <span className="flex-1">{label}</span>
              <ArrowUpRight
                className="size-3 shrink-0 opacity-0 transition-opacity group-hover/link:opacity-100"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
