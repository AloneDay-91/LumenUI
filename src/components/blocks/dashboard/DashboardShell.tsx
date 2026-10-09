"use client"

import type { ReactNode } from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar"

import { AppHeader } from "./AppHeader"
import { AppSidebar } from "./AppSidebar"

/** Sidebar, header and a padded content column. The page grows with its content. */
export function DashboardShell({
  active,
  crumbs,
  children,
}: {
  active: string
  crumbs: string[]
  children: ReactNode
}) {
  return (
    <SidebarProvider className="h-auto min-h-svh overflow-visible">
      <AppSidebar active={active} className="h-auto self-stretch" />
      <SidebarInset>
        <AppHeader crumbs={crumbs} />
        <div className="@container flex flex-col gap-6 p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
