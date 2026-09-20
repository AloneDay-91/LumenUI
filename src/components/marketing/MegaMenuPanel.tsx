"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import {
  NavigationMenuGroup,
  NavigationMenuLink,
  NavigationMenuPanel,
} from "@/components/ui/NavigationMenu"
import { type NavMenu, type NavMenuLink } from "@/lib/nav-menus"
import { LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

export function MegaMenuPanel({
  menu,
  className,
}: {
  menu: NavMenu
  className?: string
}) {
  return (
    <NavigationMenuPanel
      className={cn(
        LANDING_MAX_WIDTH,
        "md:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)]",
        className
      )}
    >
      <NavigationMenuGroup title={menu.featured.title}>
        <div className="flex flex-col items-start gap-4">
          {menu.featured.items.map((item) => (
            <PanelLink key={item.href + item.label} item={item} featured />
          ))}
        </div>
      </NavigationMenuGroup>
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-3">
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
