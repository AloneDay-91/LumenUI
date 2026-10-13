"use client"

import { Calendar, ChevronDown, Download, Plus } from "lucide-react"

import { Button } from "@/components/ui/Button"

import { ActivityFeed } from "./ActivityFeed"
import { ChurnChart } from "./ChurnChart"
import { DashboardShell } from "./DashboardShell"
import { OrdersTable } from "./OrdersTable"
import { PageHeading } from "./PageHeading"
import { PlanDonut } from "./PlanDonut"
import { RevenueChart } from "./RevenueChart"
import { SessionsChart } from "./SessionsChart"
import { StatCards } from "./StatCards"

export function OverviewPage() {
  return (
    <DashboardShell active="Overview" crumbs={["Dashboard", "Overview"]}>
      <PageHeading
        title="Good evening, Elouan"
        description="Here’s what happened across Acme Inc in the last 28 days."
      >
        <Button variant="outline">
          <Calendar data-icon="inline-start" />
          12 Sep – 9 Oct 2026
          <ChevronDown data-icon="inline-end" />
        </Button>
        <Button variant="outline">
          <Download data-icon="inline-start" />
          Export
        </Button>
        <Button>
          <Plus data-icon="inline-start" />
          New report
        </Button>
      </PageHeading>
      <StatCards />
      <div className="grid gap-4 @4xl:grid-cols-[minmax(0,1fr)_340px]">
        <RevenueChart />
        <PlanDonut />
      </div>
      <OrdersTable rows={6} toolbar={false} pagination={false} defaultSelected={[]} />
      <div className="grid gap-4 @3xl:grid-cols-2 @5xl:grid-cols-3">
        <SessionsChart />
        <ChurnChart />
        <ActivityFeed count={4} />
      </div>
    </DashboardShell>
  )
}
