"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { Kbd } from "@/components/ui/Kbd";
import { popupClassName } from "@/components/ui/styles";
import { useToastManager } from "@/components/ui/Toast";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

export type PaletteItem = { name: string; slug: string };

const PREFIX = "npx @aloneday/lumenui@latest add ";

function search(items: PaletteItem[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return items.slice(0, 5);

  const slugQuery = q.replace(/\s+/g, "-");
  const hit = (item: PaletteItem) =>
    item.name.toLowerCase().includes(q) || item.slug.includes(slugQuery);
  const first = (item: PaletteItem) =>
    item.name.toLowerCase().startsWith(q) || item.slug.startsWith(slugQuery);

  return items
    .filter(hit)
    .sort((a, b) => Number(first(b)) - Number(first(a)))
    .slice(0, 5);
}

/**
 * The one live element of the hero: a real Command that copies the real
 * `add` command. It floats, so it is the only hero element with a shadow.
 */
export function HeroPalette({ items }: { items: PaletteItem[] }) {
  const [query, setQuery] = useState("dia");
  const [active, setActive] = useState("dialog");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToastManager();
  const { copy } = useCopy();

  const results = useMemo(() => search(items, query), [items, query]);
  const current =
    results.find((item) => item.slug === active)?.slug ??
    results[0]?.slug ??
    "";

  async function run(item: PaletteItem) {
    const command = PREFIX + item.slug;
    const ok = await copy(command);
    toast.add({
      title: ok ? "Copied" : "Could not copy",
      description: command,
    });
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) return;
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") {
        return;
      }

      const target = document.activeElement;
      if (
        target !== inputRef.current &&
        target instanceof HTMLElement &&
        (target.matches("input, textarea, select") || target.isContentEditable)
      ) {
        return;
      }

      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;

      event.preventDefault();
      inputRef.current?.focus();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        popupClassName,
        "absolute z-10 overflow-hidden p-0",
        "-inset-x-3 -bottom-3",
        "sm:inset-x-auto sm:right-5 sm:w-80",
        "lg:top-14 lg:-right-8 lg:bottom-auto",
        "animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-300 fill-mode-backwards lg:slide-in-from-top-2 motion-reduce:animate-none",
        "focus-within:ring-3 focus-within:ring-ring/30"
      )}
    >
      <Command
        label="Add a component"
        shouldFilter={false}
        loop
        value={current}
        onValueChange={setActive}
        className="h-auto rounded-none bg-transparent"
      >
        <CommandInput
          ref={inputRef}
          value={query}
          onValueChange={setQuery}
          placeholder="Add a component…"
          onFocus={(event) => event.currentTarget.select()}
        />
        <CommandList className="max-h-52">
          {results.length === 0 ? (
            <CommandEmpty>No component matches.</CommandEmpty>
          ) : null}
          {results.length > 0 ? (
            <CommandGroup heading="Components">
              {results.map((item) => (
                <CommandItem
                  key={item.slug}
                  value={item.slug}
                  data-active={item.slug === current}
                  onSelect={() => run(item)}
                  className="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
        <div className="flex h-9 items-center justify-between gap-3 border-t border-foreground/5 px-3 text-xs text-muted-foreground max-sm:hidden dark:border-foreground/10">
          <span>Copy add command</span>
          <Kbd size="sm" variant="outline">
            ↵
          </Kbd>
        </div>
      </Command>
    </div>
  );
}
