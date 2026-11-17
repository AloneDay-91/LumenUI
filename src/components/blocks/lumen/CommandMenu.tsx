"use client"

import {
  Command,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/Command"
import { Kbd } from "@/components/ui/Kbd"

const groups = [
  { title: "Getting started", items: ["Introduction", "Installation", "Frameworks", "Components", "Changelog"] },
  { title: "Actions", items: ["Button", "Button Group", "Copy Button", "Split Button", "Toggle"] },
  { title: "Overlays", items: ["Dialog", "Drawer", "Menu", "Popover", "Toast", "Tooltip"] },
]

const blocks = ["All blocks", "Headers", "Heroes", "Features", "Footers"]

/** The ⌘K palette of the docs, open in place. */
export function CommandMenu() {
  return (
    <div className="flex w-full justify-center px-6 py-12">
      <Command className="h-auto w-full max-w-lg rounded-2xl shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10">
        <CommandInput placeholder="Search…" />
        <CommandList className="max-h-80">
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((item) => (
                <CommandItem key={item} value={`${group.title} ${item}`}>
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Blocks">
            {blocks.map((item) => (
              <CommandItem key={item} value={`Blocks ${item}`}>
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
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
      </Command>
    </div>
  )
}
