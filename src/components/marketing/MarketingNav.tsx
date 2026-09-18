"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

import { SiteLogo } from "@/components/marketing/SiteLogo"
import { ThemeToggle } from "@/components/docs/ThemeToggle"
import { buttonVariants } from "@/components/ui/button-variants"
import {
  NavigationMenu,
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
import { type NavMenu, type NavMenuLink, navMenus } from "@/lib/nav-menus"
import { GITHUB_URL, LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

export function MarketingNav() {
  const pathname = usePathname()
  const actionsRef = useRef<{ unmount: () => void } | null>(null)

  useEffect(() => {
    actionsRef.current?.unmount()
  }, [pathname])

  return (
    <header className="relative z-50 hidden bg-background md:block">
      <NavigationMenu actionsRef={actionsRef}>
        <div
          className={cn(
            "mx-auto flex w-full items-center justify-between px-6 py-6 md:px-12",
            LANDING_MAX_WIDTH
          )}
        >
          <div className="flex items-center gap-16">
            <SiteLogo />
            <NavigationMenuList>
              {navMenus.map((menu) => (
                <NavigationMenuItem key={menu.id} value={menu.id}>
                  <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaMenuPanel menu={menu} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  variant="muted"
                >
                  GitHub
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/docs" className={cn(buttonVariants(), "rounded-full")}>
              Documentation
            </Link>
          </div>
        </div>

        <NavigationMenuPortal>
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

function MegaMenuPanel({ menu }: { menu: NavMenu }) {
  return (
    <NavigationMenuPanel className={LANDING_MAX_WIDTH}>
      <NavigationMenuGroup title={menu.featured.title}>
        <div className="flex flex-col items-start gap-4">
          {menu.featured.items.map((item) => (
            <PanelLink key={item.href + item.label} item={item} featured />
          ))}
        </div>
      </NavigationMenuGroup>
      <div className="grid grid-cols-2 gap-x-8 gap-y-10">
        {menu.sections.map((section) => (
          <NavigationMenuGroup key={section.title} title={section.title}>
            <ul className="flex flex-col items-start gap-3">
              {section.items.map((item) => (
                <li key={item.href + item.label}>
                  <PanelLink item={item} />
                </li>
              ))}
            </ul>
          </NavigationMenuGroup>
        ))}
      </div>
    </NavigationMenuPanel>
  )
}

function PanelLink({
  item,
  featured,
}: {
  item: NavMenuLink
  featured?: boolean
}) {
  const external = item.target === "_blank" || item.href.startsWith("http")
  const label = (
    <>
      {item.label}
      {featured && external ? (
        <ArrowUpRight className="size-5" aria-hidden />
      ) : null}
    </>
  )

  if (external) {
    return (
      <NavigationMenuLink
        href={item.href}
        target="_blank"
        rel="noreferrer"
        variant={featured ? "featured" : "default"}
      >
        {label}
      </NavigationMenuLink>
    )
  }

  return (
    <NavigationMenuLink
      variant={featured ? "featured" : "default"}
      render={<Link href={item.href} />}
    >
      {label}
    </NavigationMenuLink>
  )
}
