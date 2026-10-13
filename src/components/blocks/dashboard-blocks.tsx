"use client"

import type { ReactNode } from "react"

import { ActivityFeed } from "@/components/blocks/dashboard/ActivityFeed"
import { AppHeader } from "@/components/blocks/dashboard/AppHeader"
import { AppSidebar } from "@/components/blocks/dashboard/AppSidebar"
import { BillingSettings } from "@/components/blocks/dashboard/BillingSettings"
import { ChurnChart } from "@/components/blocks/dashboard/ChurnChart"
import { DangerZone } from "@/components/blocks/dashboard/DangerZone"
import { EmptyState } from "@/components/blocks/dashboard/EmptyState"
import { NotificationSettings } from "@/components/blocks/dashboard/NotificationSettings"
import { OrdersPage } from "@/components/blocks/dashboard/OrdersPage"
import { OrdersTable } from "@/components/blocks/dashboard/OrdersTable"
import { OverviewPage } from "@/components/blocks/dashboard/OverviewPage"
import { PageHeading } from "@/components/blocks/dashboard/PageHeading"
import { PlanDonut } from "@/components/blocks/dashboard/PlanDonut"
import { ProfileSettings } from "@/components/blocks/dashboard/ProfileSettings"
import { RevenueChart } from "@/components/blocks/dashboard/RevenueChart"
import { SessionsChart } from "@/components/blocks/dashboard/SessionsChart"
import { SettingsPage } from "@/components/blocks/dashboard/SettingsPage"
import { StatCards } from "@/components/blocks/dashboard/StatCards"
import { StatItems } from "@/components/blocks/dashboard/StatItems"
import { StatStrip } from "@/components/blocks/dashboard/StatStrip"
import type { LumenBlock } from "@/components/blocks/lumen-blocks"
import { Button } from "@/components/ui/Button"
import { Kbd } from "@/components/ui/Kbd"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/Sidebar"
import { Skeleton } from "@/components/ui/Skeleton"
import { dashboardBlockMeta } from "@/lib/dashboard-blocks"

/** Padding around a block that is not a whole screen. */
function Pad({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className ?? "@container p-4 sm:p-6"}>{children}</div>
  )
}

/** The sidebar next to a placeholder page, so the toggle has something to push. */
function SidebarPreview({ open }: { open: boolean }) {
  return (
    <SidebarProvider defaultOpen={open} className="h-[760px]">
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <span className="text-xs text-muted-foreground">
            Toggle with <Kbd size="sm">⌘B</Kbd>
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <Skeleton className="h-6 w-48 rounded-full" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-24 rounded-[min(var(--radius-4xl),24px)]" />
            <Skeleton className="h-24 rounded-[min(var(--radius-4xl),24px)]" />
            <Skeleton className="h-24 rounded-[min(var(--radius-4xl),24px)]" />
          </div>
          <Skeleton className="flex-1 rounded-[min(var(--radius-4xl),24px)]" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

const previews: Record<string, ReactNode> = {
  "app-sidebar": <SidebarPreview open />,
  "app-sidebar-collapsed": <SidebarPreview open={false} />,
  "app-header": (
    <SidebarProvider className="h-auto min-h-0">
      <SidebarInset>
        <AppHeader />
      </SidebarInset>
    </SidebarProvider>
  ),
  "page-heading": (
    <Pad>
      <PageHeading
        title="Orders"
        description="Track payments, refunds and failed charges across every plan."
      >
        <Button variant="outline">Export CSV</Button>
        <Button>Create order</Button>
      </PageHeading>
    </Pad>
  ),
  "stat-cards": (
    <Pad>
      <StatCards />
    </Pad>
  ),
  "stat-items": (
    <Pad>
      <StatItems />
    </Pad>
  ),
  "stat-strip": (
    <Pad>
      <StatStrip />
    </Pad>
  ),
  "revenue-chart": (
    <Pad>
      <RevenueChart />
    </Pad>
  ),
  "plan-donut": (
    <Pad className="mx-auto max-w-sm p-4 sm:p-6">
      <PlanDonut />
    </Pad>
  ),
  "sessions-chart": (
    <Pad className="mx-auto max-w-xl p-4 sm:p-6">
      <SessionsChart />
    </Pad>
  ),
  "churn-chart": (
    <Pad className="mx-auto max-w-xl p-4 sm:p-6">
      <ChurnChart />
    </Pad>
  ),
  "orders-table": (
    <Pad>
      <OrdersTable rows={6} title={false} />
    </Pad>
  ),
  "activity-feed": (
    <Pad className="mx-auto max-w-lg p-4 sm:p-6">
      <ActivityFeed />
    </Pad>
  ),
  "empty-state": (
    <Pad className="mx-auto max-w-2xl p-4 sm:p-6">
      <EmptyState />
    </Pad>
  ),
  "settings-profile": (
    <Pad>
      <ProfileSettings />
    </Pad>
  ),
  "settings-notifications": (
    <Pad>
      <NotificationSettings />
    </Pad>
  ),
  "settings-billing": (
    <Pad>
      <BillingSettings />
    </Pad>
  ),
  "settings-danger-zone": (
    <Pad>
      <DangerZone />
    </Pad>
  ),
  "dashboard-overview": <OverviewPage />,
  "dashboard-orders": <OrdersPage />,
  "dashboard-settings": <SettingsPage />,
}

/** Code is empty here: the category page reads each block's files and passes them in. */
export const dashboardBlocks: LumenBlock[] = dashboardBlockMeta.map((meta) => ({
  id: meta.id,
  kit: meta.kit,
  title: meta.title,
  description: meta.description,
  command: meta.command,
  code: "",
  full: true,
  preview: previews[meta.id],
}))
