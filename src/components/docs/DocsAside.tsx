"use client"

import { usePathname } from "next/navigation"
import * as React from "react"

import { useDocsTOC } from "@/components/docs/DocsTOCContext"
import { cn } from "@/lib/utils"

type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

const HEADING_OFFSET = 152

function scrapeHeadings(): TocItem[] {
  const article = document.getElementById("content")
  if (!article) {
    return []
  }

  const nextItems: TocItem[] = []
  for (const heading of article.querySelectorAll("h2[id], h3[id]")) {
    const id = heading.id
    const text = heading.textContent?.trim() ?? ""
    if (!id || !text) {
      continue
    }
    nextItems.push({
      id,
      text,
      level: heading.tagName === "H3" ? 3 : 2,
    })
  }
  return nextItems
}

export default function DocsAside() {
  const pathname = usePathname()
  const { headings } = useDocsTOC()
  const [scraped, setScraped] = React.useState<TocItem[]>([])
  const [activeId, setActiveId] = React.useState("")
  const lockRef = React.useRef<string | null>(null)

  const items = React.useMemo<TocItem[]>(() => {
    if (headings.length > 0) {
      return headings.map((heading) => ({
        id: heading.id,
        text: heading.text,
        level: heading.level === 3 ? 3 : 2,
      }))
    }
    return scraped
  }, [headings, scraped])

  React.useLayoutEffect(() => {
    if (headings.length > 0) {
      setScraped([])
      return
    }
    setScraped(scrapeHeadings())
  }, [pathname, headings.length])

  React.useEffect(() => {
    if (items.length === 0) {
      return
    }

    const hash = window.location.hash.replace(/^#/, "")
    if (items.some((item) => item.id === hash)) {
      setActiveId(hash)
    } else {
      setActiveId(items[0]?.id ?? "")
    }

    const updateActive = () => {
      if (lockRef.current) {
        return
      }

      const lastId = items[items.length - 1]?.id ?? ""
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
      if (reachedBottom && lastId) {
        setActiveId(lastId)
        return
      }

      let current = items[0]?.id ?? ""
      let passed = false
      for (const item of items) {
        const heading = document.getElementById(item.id)
        if (!heading) {
          continue
        }
        if (heading.getBoundingClientRect().top <= HEADING_OFFSET) {
          current = item.id
          passed = true
        }
      }
      if (!passed) {
        let nearest = items[0]
        let nearestTop = Infinity
        for (const item of items) {
          const heading = document.getElementById(item.id)
          if (!heading) {
            continue
          }
          const top = heading.getBoundingClientRect().top
          if (top < nearestTop) {
            nearest = item
            nearestTop = top
          }
        }
        current = nearest?.id ?? current
      }
      setActiveId(current)
    }

    updateActive()
    window.addEventListener("scroll", updateActive, { passive: true })
    window.addEventListener("hashchange", updateActive)
    return () => {
      window.removeEventListener("scroll", updateActive)
      window.removeEventListener("hashchange", updateActive)
    }
  }, [items, pathname])

  const selectHeading = (id: string) => {
    lockRef.current = id
    setActiveId(id)
    window.setTimeout(() => {
      if (lockRef.current === id) {
        lockRef.current = null
      }
    }, 600)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-52 shrink-0 self-start overflow-y-auto border-l border-border bg-background lg:block">
      <nav aria-label="On this page" className="px-3 py-5">
        <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">
          On this page
        </p>
        <ul className="border-l border-border">
          {items.map((heading) => {
            const active = heading.id === activeId
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  aria-current={active ? "location" : undefined}
                  onClick={() => selectHeading(heading.id)}
                  className={cn(
                    "-ml-px block border-l-2 py-1 text-xs transition-colors",
                    heading.level === 3 ? "pl-4" : "pl-3",
                    active
                      ? "border-foreground font-medium text-foreground"
                      : "border-transparent text-muted-foreground hover:border-foreground/25 hover:text-foreground"
                  )}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
