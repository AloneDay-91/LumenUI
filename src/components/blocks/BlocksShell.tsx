"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

import { BlocksSidebar } from "@/components/blocks/BlocksSidebarPanel"
import { KitProvider } from "@/components/blocks/KitProvider"
import { DocsHeader } from "@/components/docs/DocsHeader"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { Separator } from "@/components/ui/Separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/Sidebar"
import { getBlockCategory } from "@/lib/block-categories"

export function BlocksShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const category = getBlockCategory(pathname.split("/")[2] ?? "")

  return (
    <KitProvider>
      <div className="flex min-h-dvh flex-col bg-background">
        <DocsHeader />
        {/* The page scrolls, not the wrapper: the sidebar is sticky instead. */}
        <SidebarProvider className="h-auto min-h-0 flex-1 overflow-visible has-data-[variant=inset]:bg-muted/60">
          <BlocksSidebar />
          <SidebarInset
            id="content"
            className="md:peer-data-[variant=inset]:rounded-[24px] md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2!"
          >
            <div className="flex h-13 shrink-0 items-center gap-2 border-b border-foreground/5 px-3">
              <SidebarTrigger className="hidden md:inline-flex" />
              <Separator
                orientation="vertical"
                className="hidden h-4 self-center md:block"
              />
              <Breadcrumb className="min-w-0">
                <BreadcrumbList className="flex-nowrap">
                  {category ? (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink render={<Link href="/blocks" />}>
                          Blocks
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{category.title}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage>Blocks</BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </KitProvider>
  )
}
