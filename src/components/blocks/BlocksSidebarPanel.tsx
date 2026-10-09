"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { blockCount, listedCategories } from "@/components/blocks/BlocksGallery"
import { KitSwitcher } from "@/components/blocks/KitProvider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/Sidebar"
import { formatDocsVersion } from "@/lib/site"

const groups = ["Marketing", "Account"] as const

function Count({ value }: { value: number }) {
  return (
    <span className="font-mono text-[11px] font-normal text-muted-foreground">
      {String(value).padStart(2, "0")}
    </span>
  )
}

/** Floating cards on a tinted ground. Sticky, so it runs to the bottom of the screen. */
export function BlocksSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      variant="inset"
      className="sticky top-[calc(var(--update-banner-height)+3.5rem)] h-[calc(100dvh-var(--update-banner-height)-3.5rem)] self-start [&_[data-slot=sidebar-inner]]:rounded-[24px]"
    >
      <SidebarHeader className="p-2">
        <KitSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/blocks"}
                  render={
                    <Link
                      href="/blocks"
                      aria-current={pathname === "/blocks" ? "page" : undefined}
                    />
                  }
                >
                  <span className="flex-1 truncate">All blocks</span>
                  <Count value={listedCategories.length} />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {groups
          .filter((group) =>
            listedCategories.some((category) => category.group === group),
          )
          .map((group) => (
            <SidebarGroup key={group}>
              <SidebarGroupLabel>{group}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {listedCategories
                    .filter((category) => category.group === group)
                    .map((category) => {
                      const href = `/blocks/${category.slug}`
                      const active = pathname === href
                      return (
                        <SidebarMenuItem key={category.slug}>
                          <SidebarMenuButton
                            isActive={active}
                            render={
                              <Link
                                href={href}
                                aria-current={active ? "page" : undefined}
                              />
                            }
                          >
                            <span className="flex-1 truncate">
                              {category.title}
                            </span>
                            <Count value={blockCount(category.slug)} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-foreground/5 px-5 py-3">
        <p className="font-mono text-[11px] text-muted-foreground">
          {formatDocsVersion()}
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
