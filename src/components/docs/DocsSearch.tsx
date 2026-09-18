"use client"

import { Search } from "lucide-react"
import { useEffect, useId } from "react"

import { useDocsSearch } from "@/components/docs/DocsSearchContext"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

export function DocsSearch({ className }: { className?: string }) {
  const { query, setQuery } = useDocsSearch()
  const id = useId()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        document.getElementById(id)?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [id])

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        id={id}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Rechercher…"
        aria-label="Rechercher dans la documentation"
        className="pr-14 pl-8"
      />
      <Badge
        variant="outline"
        className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 sm:inline-flex"
      >
        ⌘K
      </Badge>
    </div>
  )
}
