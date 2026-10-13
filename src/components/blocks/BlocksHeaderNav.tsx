"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, type ReactNode } from "react"

import { MegaMenuPanel } from "@/components/marketing/MegaMenuPanel"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/NavigationMenu"
import { navMenus } from "@/lib/nav-menus"

/** Wraps the page header so the navbar menu spans it. */
export function BlocksHeaderNav({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const actionsRef = useRef<{ unmount: () => void } | null>(null)

  useEffect(() => {
    actionsRef.current?.unmount()
  }, [pathname])

  return (
    <NavigationMenu actionsRef={actionsRef}>
      {children}
      <NavigationMenuPortal>
        <NavigationMenuPositioner>
          <NavigationMenuPopup>
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  )
}

/** System, Components, Blocks and Customize, sitting beside the logo. */
export function BlocksHeaderLinks() {
  return (
    <NavigationMenuList className="hidden gap-6 md:flex">
      {navMenus.map((menu) => (
        <NavigationMenuItem key={menu.id} value={menu.id}>
          <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MegaMenuPanel menu={menu} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      ))}
      <NavigationMenuItem>
        <NavigationMenuLink render={<Link href="/customize" />} variant="muted">
          Customize
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  )
}
