"use client"

import { Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

function ThemeChoice({
  label,
  value,
  active,
  onSelect,
}: {
  label: string
  value: "light" | "dark"
  active: boolean
  onSelect: (value: "light" | "dark") => void
}) {
  return (
    <DropdownMenuItem onClick={() => onSelect(value)}>
      <span className="flex size-3.5 items-center justify-center" aria-hidden>
        {active ? <span className="size-1.5 rounded-full bg-foreground" /> : null}
      </span>
      {label}
    </DropdownMenuItem>
  )
}

function ThemeChoices() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const active = mounted ? resolvedTheme : null

  return (
    <>
      <p className="px-2 pt-2 pb-1 text-xs text-muted-foreground">Theme</p>
      <ThemeChoice
        label="Light"
        value="light"
        active={active === "light"}
        onSelect={setTheme}
      />
      <ThemeChoice
        label="Dark"
        value="dark"
        active={active === "dark"}
        onSelect={setTheme}
      />
    </>
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
        <DropdownMenuSeparator />
        <ThemeChoices />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
