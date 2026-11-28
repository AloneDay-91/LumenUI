"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/Button"
import {
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command"
import { Kbd } from "@/components/ui/Kbd"
import { docsSections } from "@/lib/docs-nav"

export function DocsCommandMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "k") return
      if (!(event.metaKey || event.ctrlKey)) return
      event.preventDefault()
      setOpen((current) => !current)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground hover:text-foreground"
        aria-label="Search"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Search documentation, components, shaders, and theme customization."
      >
        <CommandInput placeholder="Search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {docsSections.map((section) => (
            <CommandGroup key={section.title} heading={section.title}>
              {section.items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${section.title} ${item.name} ${item.keywords ?? ""}`}
                  onSelect={() => go(item.href)}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
        <CommandFooter>
          <span className="inline-flex items-center gap-1">
            <Kbd size="sm">↑</Kbd>
            <Kbd size="sm">↓</Kbd>
            Navigate
          </span>
          <span className="inline-flex items-center gap-1">
            <Kbd size="sm">↵</Kbd>
            Open
          </span>
          <span className="ms-auto inline-flex items-center gap-1">
            <Kbd size="sm">esc</Kbd>
            Close
          </span>
        </CommandFooter>
      </CommandDialog>
    </>
  )
}
