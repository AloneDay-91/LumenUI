"use client"

import { ChevronDownIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, type ReactNode } from "react"

import { MegaMenuPanel } from "@/components/marketing/MegaMenuPanel"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuArrow,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/NavigationMenu"
import { navMenus } from "@/lib/nav-menus"

/** Wraps the page header so the navbar menu spans it. */
export function DocsHeaderNav({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const actionsRef = useRef<{ unmount: () => void } | null>(null)

  useEffect(() => {
    actionsRef.current?.unmount()
  }, [pathname])

  return (
    <NavigationMenu variant="panel" actionsRef={actionsRef}>
      {children}
      <NavigationMenuPortal>
        <NavigationMenuPositioner>
          <NavigationMenuPopup>
            <NavigationMenuArrow />
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  )
}

/** System, Components, Shaders and Customize, sitting beside the logo. */
export function DocsHeaderLinks() {
  return (
    <NavigationMenuList className="hidden gap-1 md:flex">
      {navMenus.map((menu) => (
        <NavigationMenuItem key={menu.id} value={menu.id}>
          <NavigationMenuTrigger>
            {menu.title}
            <NavigationMenuIcon>
              <ChevronDownIcon className="size-3" />
            </NavigationMenuIcon>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <MegaMenuPanel menu={menu} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      ))}
      <NavigationMenuItem>
        <NavigationMenuLink render={<Link href="/shaders" />} variant="pill">
          Shaders
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink render={<Link href="/customize" />} variant="pill">
          Customize
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  )
}
