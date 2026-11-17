"use client"

import { ArrowRight, ArrowUpRight, MessageSquare } from "lucide-react"
import Link from "next/link"

import { LumenWordmark } from "@/components/blocks/lumen/brand"
import { MenuFigure } from "@/components/blocks/lumen/menu-figures"
import { Button } from "@/components/ui/Button"
import { buttonVariants } from "@/components/ui/button-variants"
import {
  NavigationMenu,
  NavigationMenuBackdrop,
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPanel,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/NavigationMenu"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { cn } from "@/lib/utils"

type MenuLink = { href: string; label: string; external?: boolean }
type Menu = {
  id: string
  title: string
  featured: { title: string; items: MenuLink[] }
  sections: { title: string; items: MenuLink[] }[]
  more?: MenuLink
  card: {
    href: string
    eyebrow: string
    title: string
    description: string
    tag: string
    figure: "palette" | "scan" | "compare"
  }
}

const GITHUB = "https://github.com/AloneDay-91/LumenUI"

/** The three menus of the landing as they stood in 1.2. */
const menus: Menu[] = [
  {
    id: "system",
    title: "System",
    featured: {
      title: "Get started",
      items: [
        { href: "/docs", label: "Introduction" },
        { href: "/docs/installation", label: "Installation" },
        { href: "/docs/choose", label: "Choose a component" },
        { href: "/docs/shadcn", label: "From shadcn" },
        { href: "/docs/frameworks", label: "Frameworks" },
      ],
    },
    sections: [
      {
        title: "Foundations",
        items: [
          { href: "/docs/styles", label: "Tokens and type" },
          { href: "/docs/accessibility", label: "Accessibility" },
          { href: "/customize", label: "Customize" },
        ],
      },
      {
        title: "Recipes",
        items: [
          { href: "/docs/recipes/form", label: "Form" },
          { href: "/docs/recipes/settings", label: "Settings" },
        ],
      },
      {
        title: "Resources",
        items: [
          { href: "/docs/changelog", label: "Changelog" },
          { href: "/docs/llms", label: "LLMs" },
          { href: GITHUB, label: "GitHub", external: true },
        ],
      },
    ],
    card: {
      href: "/customize",
      eyebrow: "Theme",
      title: "Customize",
      description: "Pick the ink, the radius, and the type. Copy the CSS.",
      tag: "Open Customize",
      figure: "palette",
    },
  },
  {
    id: "components",
    title: "Components",
    featured: {
      title: "Most used",
      items: [
        { href: "/docs/components/button", label: "Button" },
        { href: "/docs/components/input", label: "Input" },
        { href: "/docs/components/dialog", label: "Dialog" },
        { href: "/docs/components/table", label: "Table" },
      ],
    },
    sections: [
      {
        title: "Forms",
        items: [
          { href: "/docs/components/select", label: "Select" },
          { href: "/docs/components/combobox", label: "Combobox" },
          { href: "/docs/components/checkbox", label: "Checkbox" },
          { href: "/docs/components/date-picker", label: "Date Picker" },
        ],
      },
      {
        title: "Overlays",
        items: [
          { href: "/docs/components/drawer", label: "Drawer" },
          { href: "/docs/components/popover", label: "Popover" },
          { href: "/docs/components/tooltip", label: "Tooltip" },
          { href: "/docs/components/toast", label: "Toast" },
        ],
      },
      {
        title: "Display",
        items: [
          { href: "/docs/components/sidebar", label: "Sidebar" },
          { href: "/docs/components/tabs", label: "Tabs" },
          { href: "/docs/components/chart", label: "Chart" },
          { href: "/docs/components/timeline", label: "Timeline" },
        ],
      },
    ],
    more: { href: "/docs/components", label: "All 115 components" },
    card: {
      href: "/docs/components/command",
      eyebrow: "Search",
      title: "Command",
      description: "A palette with groups, shortcuts, and a footer.",
      tag: "See Command",
      figure: "scan",
    },
  },
  {
    id: "blocks",
    title: "Blocks",
    featured: {
      title: "Kits",
      items: [
        { href: "/blocks", label: "All blocks" },
        { href: "/blocks/heroes", label: "Marketing" },
        { href: "/blocks/pages", label: "Dashboard" },
      ],
    },
    sections: [
      {
        title: "Marketing",
        items: [
          { href: "/blocks/headers", label: "Headers" },
          { href: "/blocks/heroes", label: "Heroes" },
          { href: "/blocks/features", label: "Features" },
          { href: "/blocks/footers", label: "Footers" },
        ],
      },
      {
        title: "Site",
        items: [
          { href: "/blocks/docs-layout", label: "Docs layout" },
          { href: "/blocks/search", label: "Search and ask" },
          { href: "/blocks/errors", label: "Error pages" },
        ],
      },
      {
        title: "Dashboard",
        items: [
          { href: "/blocks/sidebars", label: "Sidebars" },
          { href: "/blocks/stats", label: "Stats" },
          { href: "/blocks/charts", label: "Charts" },
          { href: "/blocks/tables", label: "Tables" },
        ],
      },
    ],
    more: { href: "/blocks", label: "Browse every block" },
    card: {
      href: "/blocks/pages",
      eyebrow: "Kit",
      title: "Dashboard",
      description: "Sidebar, stats, charts, and tables on one layout.",
      tag: "Browse the kit",
      figure: "compare",
    },
  },
]

function PanelLink({ item, featured }: { item: MenuLink; featured?: boolean }) {
  const variant = featured ? "featured" : "default"
  if (item.external) {
    return (
      <NavigationMenuLink href={item.href} target="_blank" rel="noreferrer" variant={variant}>
        {item.label}
        {featured ? <ArrowUpRight className="size-5" aria-hidden /> : null}
      </NavigationMenuLink>
    )
  }
  return (
    <NavigationMenuLink variant={variant} render={<Link href={item.href} />}>
      {item.label}
    </NavigationMenuLink>
  )
}

function Panel({ menu }: { menu: Menu }) {
  return (
    <NavigationMenuPanel className="max-w-6xl md:grid-cols-[minmax(10rem,13rem)_minmax(0,1fr)] lg:grid-cols-[minmax(10rem,13rem)_minmax(0,1fr)_minmax(17rem,20rem)]">
      <NavigationMenuGroup title={menu.featured.title}>
        <div className="flex flex-col items-start gap-4">
          {menu.featured.items.map((item) => (
            <PanelLink key={item.href + item.label} item={item} featured />
          ))}
        </div>
      </NavigationMenuGroup>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-3 gap-x-8">
          {menu.sections.map((section) => (
            <NavigationMenuGroup key={section.title} title={section.title}>
              <ul className="flex flex-col items-start gap-2.5">
                {section.items.map((item) => (
                  <li key={item.href + item.label}>
                    <PanelLink item={item} />
                  </li>
                ))}
              </ul>
            </NavigationMenuGroup>
          ))}
        </div>
        {menu.more ? (
          <NavigationMenuLink variant="muted" className="mt-auto self-start" render={<Link href={menu.more.href} />}>
            {menu.more.label}
            <ArrowRight className="size-3.5" aria-hidden />
          </NavigationMenuLink>
        ) : null}
      </div>
      <div className="relative hidden flex-col gap-3 self-stretch overflow-hidden rounded-md border border-border p-6 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none -mx-2 h-24 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
        >
          <div className={cn("flex h-full items-start", menu.card.figure === "compare" ? "justify-start" : "justify-center")}>
            <MenuFigure
              name={menu.card.figure}
              className={menu.card.figure === "compare" ? "h-20 w-full max-w-xs" : "h-20 w-20"}
            />
          </div>
        </div>
        <p className="relative text-xs text-muted-foreground">{menu.card.eyebrow}</p>
        <p className="relative font-heading text-lg leading-tight">{menu.card.title}</p>
        <p className="relative text-sm leading-relaxed text-pretty text-muted-foreground">{menu.card.description}</p>
        <NavigationMenuLink
          render={<Link href={menu.card.href} />}
          className={cn(
            buttonVariants({ size: "lg" }),
            "relative self-start hover:text-primary-foreground focus-visible:text-primary-foreground",
          )}
        >
          {menu.card.tag}
          <ArrowRight aria-hidden />
        </NavigationMenuLink>
      </div>
    </NavigationMenuPanel>
  )
}

export function MegaHeader() {
  return (
    <header className="relative z-50 bg-background">
      <NavigationMenu>
        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between bg-background px-6 py-6 md:px-12">
          <div className="flex items-center gap-16">
            <Link href="/" aria-label="Lumen UI" className="inline-flex items-center">
              <LumenWordmark />
            </Link>
            <NavigationMenuList className="hidden md:flex">
              {menus.map((menu) => (
                <NavigationMenuItem key={menu.id} value={menu.id}>
                  <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Panel menu={menu} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/customize" />} variant="muted">
                  Customize
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href={GITHUB} target="_blank" rel="noreferrer" variant="muted">
                  GitHub
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Ask Lumen">
              <MessageSquare />
            </Button>
            <ThemeToggle />
            <Link href="/docs" className={buttonVariants()}>
              Documentation
            </Link>
          </div>
        </div>
        <NavigationMenuPortal>
          <NavigationMenuBackdrop />
          <NavigationMenuPositioner>
            <NavigationMenuPopup>
              <NavigationMenuViewport />
            </NavigationMenuPopup>
          </NavigationMenuPositioner>
        </NavigationMenuPortal>
      </NavigationMenu>
    </header>
  )
}
