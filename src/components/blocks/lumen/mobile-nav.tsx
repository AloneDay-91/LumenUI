"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"

import { LumenWordmark } from "@/components/blocks/lumen/brand"
import { Button } from "@/components/ui/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import { Separator } from "@/components/ui/Separator"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { cn } from "@/lib/utils"

export type MobileNavLink = { href: string; label: string; external?: boolean }
export type MobileNavSection = { title?: string; links: MobileNavLink[] }

/**
 * The menu button that replaces a header's links below a breakpoint: a
 * drawer from the side with the sections, the theme, and the main action.
 * Pass `className` to hide it where the full navigation shows, e.g.
 * "md:hidden".
 */
export function MobileNav({
  sections,
  cta,
  className,
  label = "Menu",
}: {
  sections: MobileNavSection[]
  cta?: MobileNavLink
  className?: string
  label?: string
}) {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button variant="ghost" size="icon" aria-label={label} className={className} />}>
        <Menu />
      </DrawerTrigger>
      <DrawerPopup className="w-[min(20rem,calc(100vw-3rem))]">
        <DrawerContent className="h-full max-w-none gap-4 p-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="sr-only">{label}</DrawerTitle>
            <LumenWordmark />
            <DrawerClose render={<Button variant="ghost" size="icon-sm" aria-label="Close" />}>
              <X />
            </DrawerClose>
          </div>
          <nav aria-label={label} className="-mx-2 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
            {sections.map((section, index) => (
              <div key={section.title ?? index} className="flex flex-col gap-0.5">
                {section.title ? (
                  <p className="m-0 px-3 pb-1 text-xs font-medium text-muted-foreground">{section.title}</p>
                ) : null}
                {section.links.map((link) => (
                  <DrawerClose
                    key={link.href + link.label}
                    nativeButton={false}
                    render={
                      <Button
                        variant="ghost"
                        nativeButton={false}
                        className="h-9 justify-start px-3 text-sm font-normal"
                        render={
                          link.external ? (
                            <a href={link.href} target="_blank" rel="noreferrer" />
                          ) : (
                            <Link href={link.href} />
                          )
                        }
                      />
                    }
                  >
                    {link.label}
                  </DrawerClose>
                ))}
              </div>
            ))}
          </nav>
          <Separator />
          <div className={cn("flex items-center gap-2")}>
            <ThemeToggle />
            {cta ? (
              <Button className="flex-1" nativeButton={false} render={<Link href={cta.href} />}>
                {cta.label}
              </Button>
            ) : null}
          </div>
        </DrawerContent>
      </DrawerPopup>
    </Drawer>
  )
}
