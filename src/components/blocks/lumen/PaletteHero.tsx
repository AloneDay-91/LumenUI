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
import { popupClassName } from "@/components/ui/styles";
import { useToastManager } from "@/components/ui/Toast";
import { useCopy } from "@/components/blocks/lumen/use-copy";
import { useQuietCommand } from "@/components/blocks/lumen/use-quiet-command";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Kbd, KbdGroup } from "@/components/ui/Kbd";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { buttonVariants } from "@/components/ui/button-variants";

type HeroRow = { slug: string; file: string; client: boolean; packages: string[] };

/** The files and packages the 1.0 hero listed, read from the registry when the block was frozen. */
const rows: HeroRow[] = [
  {
    "slug": "button",
    "file": "Button.tsx",
    "client": true,
    "packages": [
      "@base-ui/react"
    ]
  },
  {
    "slug": "card",
    "file": "Card.tsx",
    "client": false,
    "packages": [
      "class-variance-authority"
    ]
  },
  {
    "slug": "input",
    "file": "Input.tsx",
    "client": true,
    "packages": [
      "@base-ui/react"
    ]
  },
  {
    "slug": "tabs",
    "file": "Tabs.tsx",
    "client": true,
    "packages": [
      "@base-ui/react"
    ]
  },
  {
    "slug": "table",
    "file": "Table.tsx",
    "client": false,
    "packages": []
  },
  {
    "slug": "badge",
    "file": "Badge.tsx",
    "client": true,
    "packages": [
      "@base-ui/react",
      "class-variance-authority"
    ]
  },
  {
    "slug": "toast",
    "file": "Toast.tsx",
    "client": true,
    "packages": [
      "@base-ui/react",
      "lucide-react"
    ]
  },
  {
    "slug": "select",
    "file": "Select.tsx",
    "client": true,
    "packages": [
      "@base-ui/react",
      "lucide-react"
    ]
  },
  {
    "slug": "tooltip",
    "file": "Tooltip.tsx",
    "client": true,
    "packages": [
      "@base-ui/react"
    ]
  }
];

/** The 1.0 catalog the palette searches. */
const paletteItems = [
  {
    "name": "Accordion",
    "slug": "accordion"
  },
  {
    "name": "Alert",
    "slug": "alert"
  },
  {
    "name": "Alert Dialog",
    "slug": "alert-dialog"
  },
  {
    "name": "Aspect Ratio",
    "slug": "aspect-ratio"
  },
  {
    "name": "Autocomplete",
    "slug": "autocomplete"
  },
  {
    "name": "Avatar",
    "slug": "avatar"
  },
  {
    "name": "Badge",
    "slug": "badge"
  },
  {
    "name": "Breadcrumb",
    "slug": "breadcrumb"
  },
  {
    "name": "Button",
    "slug": "button"
  },
  {
    "name": "Button Group",
    "slug": "button-group"
  },
  {
    "name": "Calendar",
    "slug": "calendar"
  },
  {
    "name": "Card",
    "slug": "card"
  },
  {
    "name": "Carousel",
    "slug": "carousel"
  },
  {
    "name": "Chart",
    "slug": "chart"
  },
  {
    "name": "Checkbox",
    "slug": "checkbox"
  },
  {
    "name": "Checkbox Group",
    "slug": "checkbox-group"
  },
  {
    "name": "Collapsible",
    "slug": "collapsible"
  },
  {
    "name": "Combobox",
    "slug": "combobox"
  },
  {
    "name": "Command",
    "slug": "command"
  },
  {
    "name": "Context Menu",
    "slug": "context-menu"
  },
  {
    "name": "Date Picker",
    "slug": "date-picker"
  },
  {
    "name": "Dialog",
    "slug": "dialog"
  },
  {
    "name": "Drawer",
    "slug": "drawer"
  },
  {
    "name": "Empty",
    "slug": "empty"
  },
  {
    "name": "Field",
    "slug": "field"
  },
  {
    "name": "Fieldset",
    "slug": "fieldset"
  },
  {
    "name": "Form",
    "slug": "form"
  },
  {
    "name": "Input",
    "slug": "input"
  },
  {
    "name": "Input Group",
    "slug": "input-group"
  },
  {
    "name": "Item",
    "slug": "item"
  },
  {
    "name": "Kbd",
    "slug": "kbd"
  },
  {
    "name": "Label",
    "slug": "label"
  },
  {
    "name": "Menu",
    "slug": "menu"
  },
  {
    "name": "Menubar",
    "slug": "menubar"
  },
  {
    "name": "Meter",
    "slug": "meter"
  },
  {
    "name": "Navigation Menu",
    "slug": "navigation-menu"
  },
  {
    "name": "Number Field",
    "slug": "number-field"
  },
  {
    "name": "OTP Field",
    "slug": "otp-field"
  },
  {
    "name": "Pagination",
    "slug": "pagination"
  },
  {
    "name": "Popover",
    "slug": "popover"
  },
  {
    "name": "Preview Card",
    "slug": "preview-card"
  },
  {
    "name": "Progress",
    "slug": "progress"
  },
  {
    "name": "Radio Group",
    "slug": "radio-group"
  },
  {
    "name": "Rating",
    "slug": "rating"
  },
  {
    "name": "Scroll Area",
    "slug": "scroll-area"
  },
  {
    "name": "Select",
    "slug": "select"
  },
  {
    "name": "Separator",
    "slug": "separator"
  },
  {
    "name": "Sidebar",
    "slug": "sidebar"
  },
  {
    "name": "Skeleton",
    "slug": "skeleton"
  },
  {
    "name": "Slider",
    "slug": "slider"
  },
  {
    "name": "Spinner",
    "slug": "spinner"
  },
  {
    "name": "Stepper",
    "slug": "stepper"
  },
  {
    "name": "Switch",
    "slug": "switch"
  },
  {
    "name": "Table",
    "slug": "table"
  },
  {
    "name": "Tabs",
    "slug": "tabs"
  },
  {
    "name": "Textarea",
    "slug": "textarea"
  },
  {
    "name": "Timeline",
    "slug": "timeline"
  },
  {
    "name": "Toast",
    "slug": "toast"
  },
  {
    "name": "Toggle",
    "slug": "toggle"
  },
  {
    "name": "Toggle Group",
    "slug": "toggle-group"
  },
  {
    "name": "Toolbar",
    "slug": "toolbar"
  },
  {
    "name": "Tooltip",
    "slug": "tooltip"
  },
  {
    "name": "Typography",
    "slug": "typography"
  }
];

type PaletteItem = { name: string; slug: string };

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
function HeroPalette({ items }: { items: PaletteItem[] }) {
  const [query, setQuery] = useState("dia");
  const { active, engaged, idleValue, commandProps } =
    useQuietCommand("dialog");
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
        "lg:top-14 lg:right-4 lg:bottom-auto xl:-right-8",
        "animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-300 fill-mode-backwards lg:slide-in-from-top-2 motion-reduce:animate-none",
        "focus-within:ring-3 focus-within:ring-ring/30"
      )}
    >
      <Command
        label="Add a component"
        shouldFilter={false}
        loop
        {...commandProps}
        value={engaged ? current : idleValue}
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

/**
 * Decorative app window. The table lists real Lumen files with their real
 * npm packages, read from the CLI registry at build time.
 */
function HeroScreen({ rows }: { rows: HeroRow[] }) {
  return (
    <Card className="gap-0 bg-background py-0">
      <div className="flex h-12 items-center justify-between gap-3 border-b border-border px-4 sm:px-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<span />}>my-app</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button
          type="button"
          variant="outline"
          tabIndex={-1}
          aria-expanded="true"
          className="shrink-0 gap-2 max-sm:w-8 max-sm:px-0"
        >
          <span className="max-sm:hidden">Add component</span>
          <PlusIcon className="sm:hidden" />
          <KbdGroup size="sm" className="max-sm:hidden">
            <Kbd variant="outline">⌘</Kbd>
            <Kbd variant="outline">K</Kbd>
          </KbdGroup>
        </Button>
      </div>

      <div className="px-4 py-5 sm:px-5 lg:pe-76">
        <p className="text-sm font-medium">Components</p>
        <p className="mt-0.5 mb-4 truncate font-mono text-xs text-muted-foreground">
          src/components/ui
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-9 px-3 sm:px-4">File</TableHead>
              <TableHead className="h-9 px-3 max-sm:hidden sm:px-4">
                Directive
              </TableHead>
              <TableHead className="h-9 px-3 sm:px-4">Packages</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.slug}>
                <TableCell className="px-3 py-2.5 font-mono text-xs sm:px-4">
                  {row.file}
                </TableCell>
                <TableCell className="px-3 py-2.5 max-sm:hidden sm:px-4">
                  {row.client ? (
                    <Badge variant="outline" className="font-mono text-[11px]">
                      use client
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="px-3 py-2.5 sm:px-4">
                  {row.packages.length ? (
                    <div className="flex flex-wrap gap-x-2 font-mono text-[11px] text-muted-foreground">
                      {row.packages.map((pkg) => (
                        <span
                          key={pkg}
                          className="whitespace-nowrap max-sm:nth-[n+2]:hidden"
                        >
                          {pkg}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

/** The 1.0 landing hero: the sentence over the painting, a product screen, and a live palette. */
export function PaletteHero() {
  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center mask-[linear-gradient(to_bottom,transparent,transparent_16rem,black_30rem,black_32rem,transparent_40rem)] dark:opacity-40"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
      />
      <section className="relative flex flex-col items-center px-6 pt-10 text-center md:pt-16">
        <h1 className="max-w-2xl text-4xl leading-[1.1] font-medium tracking-tight text-balance md:text-5xl">
          The code lives in your repo.
        </h1>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-pretty text-muted-foreground">
          {paletteItems.length} React components built on Base UI and Tailwind CSS 4. The CLI copies the
          source into your project, so every file is yours to edit.
        </p>
        <div className="mt-7 flex w-full flex-col items-center gap-2.5 sm:w-auto sm:flex-row">
          <span className={cn(buttonVariants(), "font-mono")}>
            <span aria-hidden className="text-primary-foreground/60">$</span>
            npx @aloneday/lumenui@latest init
          </span>
          <a href="/docs/components" className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}>
            Browse components
          </a>
        </div>
      </section>
      <div className="relative px-6 pt-12 pb-12 md:pt-14">
        <figure className="relative mx-auto max-w-5xl">
          <div
            aria-hidden
            inert
            className="max-h-96 overflow-hidden mask-[linear-gradient(to_bottom,black_66%,transparent)] md:max-h-120"
          >
            <HeroScreen rows={rows} />
          </div>
          <HeroPalette items={paletteItems} />
        </figure>
      </div>
    </div>
  );
}
