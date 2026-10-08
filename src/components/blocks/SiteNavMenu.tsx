"use client"

import { Menu } from "lucide-react"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { navMenus, type NavMenuLink, type NavMenuSection } from "@/lib/nav-menus"
import { GITHUB_URL } from "@/lib/site"

function SectionLinks({ section }: { section: NavMenuSection }) {
  return (
    <div className="flex flex-col">
      <p className="px-2 pt-2 pb-1 text-xs text-muted-foreground">
        {section.title}
      </p>
      {section.items.map((item) => (
        <NavLink key={`${item.href}-${item.label}`} item={item} />
      ))}
    </div>
  )
}

function NavLink({ item }: { item: NavMenuLink }) {
  const external = item.target === "_blank"

  return (
    <DropdownMenuLinkItem
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {item.label}
    </DropdownMenuLinkItem>
  )
}

export function SiteNavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Open site menu"
          >
            <Menu className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-44">
        {navMenus.map((menu) => (
          <DropdownMenuSub key={menu.id}>
            <DropdownMenuSubTrigger>{menu.title}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              align="start"
              side="left"
              className="w-52"
            >
              <SectionLinks section={menu.featured} />
              {menu.sections.map((section) => (
                <SectionLinks key={section.title} section={section} />
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLinkItem href={GITHUB_URL} target="_blank" rel="noreferrer">
          GitHub
        </DropdownMenuLinkItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
