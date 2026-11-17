"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { BlocksNav } from "@/components/blocks/BlocksSidebar";
import { KitProvider, KitSwitcher } from "@/components/blocks/KitProvider";
import DocsAside from "@/components/docs/DocsAside";
import { DocsHeader } from "@/components/docs/DocsHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { getBlockCategory } from "@/lib/block-categories";
import { formatDocsVersion } from "@/lib/site";

const stickyTop = "top-[calc(var(--update-banner-height)+3.5rem)]";

/**
 * The Blocks chrome, on the same frame as the docs: a sticky header, a fixed
 * sidebar, a breadcrumb bar, a centered column, and "On this page" at the end.
 * The column is much wider than a docs article so a block preview has room.
 */
export function BlocksShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const category = getBlockCategory(pathname.split("/")[2] ?? "");

  return (
    <KitProvider>
      <div className="flex min-h-dvh flex-col bg-background">
        <DocsHeader />
        <div className="flex min-h-0 w-full flex-1">
          <aside
            className={`sticky ${stickyTop} hidden h-[calc(100dvh-var(--update-banner-height)-3.5rem)] w-60 shrink-0 flex-col border-r border-border md:flex`}
          >
            <div className="shrink-0 px-3 pt-4 pb-2">
              <KitSwitcher />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-3 pt-3 pb-5">
              <BlocksNav />
            </div>
            <p className="shrink-0 border-t border-border px-5 py-3 font-mono text-[11px] text-muted-foreground">
              {formatDocsVersion()}
            </p>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <div
              className={`sticky ${stickyTop} z-30 border-b border-border bg-background`}
            >
              <div className="mx-auto flex h-11 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
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
            <main
              id="content"
              className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
            >
              {children}
            </main>
          </div>

          {/* Below xl the previews need the room more than the outline does. */}
          <div className="hidden xl:flex">
            <DocsAside />
          </div>
        </div>
      </div>
    </KitProvider>
  );
}
