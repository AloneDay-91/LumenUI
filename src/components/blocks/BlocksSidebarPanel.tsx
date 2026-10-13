"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  blockCount,
  kitCategories,
  listedGroups,
} from "@/components/blocks/BlocksGallery"
import { KitSwitcher, useKit } from "@/components/blocks/KitProvider"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/Sidebar"

function Count({ value }: { value: number }) {
  return (
    <span className="font-mono text-[11px] font-normal text-muted-foreground">
      {String(value).padStart(2, "0")}
    </span>
  )
}

/** Flush nav on the tinted ground. Height comes from the fixed Blocks shell. */
export function BlocksSidebar() {
  const pathname = usePathname()
  const { active } = useKit()
  const categories = kitCategories(active.id)

  return (
    <Sidebar variant="inset" className="h-full">
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
                  <Count value={categories.length} />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {listedGroups(active.id).map((group) => (
            <SidebarGroup key={group}>
              <SidebarGroupLabel>{group}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {categories
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
    </Sidebar>
  )
}
