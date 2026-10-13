"use client"

import { Download, Plus } from "lucide-react"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"

import { DashboardShell } from "./DashboardShell"
import { OrdersTable } from "./OrdersTable"
import { PageHeading } from "./PageHeading"
import { StatStrip } from "./StatStrip"

export function OrdersPage() {
  return (
    <DashboardShell active="Orders" crumbs={["Commerce", "Orders"]}>
      <PageHeading
        title="Orders"
        description="Track payments, refunds and failed charges across every plan."
      >
        <Button variant="outline">
          <Download data-icon="inline-start" />
          Export CSV
        </Button>
        <Button>
          <Plus data-icon="inline-start" />
          Create order
        </Button>
      </PageHeading>
      <StatStrip />
      <div className="overflow-x-auto">
        <ToggleGroup aria-label="Order status" defaultValue={["all"]}>
          <Toggle value="all">
            All orders
            <Badge variant="outline" className="ms-0.5">
              248
            </Badge>
          </Toggle>
          <Toggle value="paid">Paid</Toggle>
          <Toggle value="pending">Pending</Toggle>
          <Toggle value="refunded">Refunded</Toggle>
          <Toggle value="failed">Failed</Toggle>
        </ToggleGroup>
      </div>
      <OrdersTable rows={10} title={false} />
    </DashboardShell>
  )
}
