"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

import { BlocksSidebar } from "@/components/blocks/BlocksSidebar"
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
import { getBlockCategory } from "@/lib/block-categories"

export function BlocksShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const category = getBlockCategory(pathname.split("/")[2] ?? "")

  return (
    <KitProvider>
    <div className="flex min-h-dvh flex-col bg-background">
      <DocsHeader />
      <div className="flex min-h-0 w-full flex-1">
        <BlocksSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="sticky top-[calc(var(--update-banner-height)+3.5rem)] z-30 border-b border-border bg-background">
            <div className="mx-auto flex h-11 w-full max-w-5xl items-center px-4 sm:px-6 lg:px-8">
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
          </div>
          <div
            id="content"
            className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
    </KitProvider>
  )
}
