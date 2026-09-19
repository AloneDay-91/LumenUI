"use client"

import type { ComponentProps } from "react"
import Link from "next/link"
import { XIcon } from "lucide-react"

import { SiteLogo } from "@/components/marketing/SiteLogo"
import { ThemeToggle } from "@/components/docs/ThemeToggle"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import { GITHUB_URL, SITE_NAME } from "@/lib/site"

const mobileLinks = [
  { title: "Home", href: "/" },
  { title: "Examples", href: "/examples" },
  { title: "Documentation", href: "/docs" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Components", href: "/docs/components/button" },
  { title: "Styles", href: "/docs/styles" },
  { title: "GitHub", href: GITHUB_URL, target: "_blank" as const },
]

function ListIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
    </svg>
  )
}

export function MarketingMobileNav() {
  return (
    <div className="flex w-full items-center justify-between py-6 md:hidden">
      <SiteLogo />
      <Drawer swipeDirection="left">
        <DrawerTrigger
          className="inline-flex size-9 items-center justify-center text-muted-foreground outline-none hover:text-foreground focus-visible:text-foreground"
          aria-label="Open menu"
        >
          <ListIcon className="size-5" />
        </DrawerTrigger>
        <DrawerPopup className="relative rounded-none p-0 ring-0 data-[swipe-direction=left]:rounded-none">
          <DrawerContent className="max-w-none">
            <DrawerHeader className="flex flex-row items-center justify-between pt-4">
              <DrawerTitle className="sr-only">{SITE_NAME}</DrawerTitle>
              <DrawerClose nativeButton={false} render={<SiteLogo />} />
              <DrawerClose
                className="inline-flex size-8 shrink-0 items-center justify-center text-muted-foreground outline-none hover:text-foreground"
                aria-label="Close menu"
              >
                <XIcon className="size-4" />
              </DrawerClose>
            </DrawerHeader>
            <nav className="flex flex-col gap-1 py-2">
              {mobileLinks.map((item) =>
                item.target === "_blank" ? (
                  <DrawerClose
                    key={item.title}
                    nativeButton={false}
                    render={
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="py-1 text-lg tracking-tight text-foreground"
                      />
                    }
                  >
                    {item.title}
                  </DrawerClose>
                ) : (
                  <DrawerClose
                    key={item.title}
                    nativeButton={false}
                    render={
                      <Link
                        href={item.href}
                        className="py-1 text-lg tracking-tight text-foreground"
                      />
                    }
                  >
                    {item.title}
                  </DrawerClose>
                )
              )}
            </nav>
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </DrawerContent>
        </DrawerPopup>
      </Drawer>
    </div>
  )
}
