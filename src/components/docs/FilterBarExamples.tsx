"use client"

import * as React from "react"

import { Badge } from "@/components/ui/Badge"
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable"
import { FilterBar, FilterBarClear, FilterSelect } from "@/components/ui/FilterBar"

type Order = {
  id: string
  customer: string
  status: "Paid" | "Pending" | "Refunded"
  channel: "Web" | "Store" | "Partner"
  total: number
}

const orders: Order[] = [
  { id: "#1042", customer: "Ada Lovelace", status: "Paid", channel: "Web", total: 129 },
  { id: "#1041", customer: "Alan Turing", status: "Pending", channel: "Store", total: 48 },
  { id: "#1040", customer: "Grace Hopper", status: "Paid", channel: "Partner", total: 310 },
  { id: "#1039", customer: "Katherine Johnson", status: "Refunded", channel: "Web", total: 75 },
  { id: "#1038", customer: "Linus Torvalds", status: "Paid", channel: "Web", total: 22 },
  { id: "#1037", customer: "Margaret Hamilton", status: "Pending", channel: "Partner", total: 540 },
  { id: "#1036", customer: "Tim Berners-Lee", status: "Paid", channel: "Store", total: 96 },
]

const statusColor = { Paid: "jade", Pending: "orange", Refunded: "gray" } as const

const columns: DataTableColumn<Order>[] = [
  { id: "id", header: "Order", className: "font-mono" },
  { id: "customer", header: "Customer", sortable: true },
  {
    id: "status",
    header: "Status",
    cell: (row) => <Badge color={statusColor[row.status]}>{row.status}</Badge>,
  },
  { id: "channel", header: "Channel" },
  {
    id: "total",
    header: "Total",
    sortable: true,
    align: "end",
    className: "tabular-nums",
    cell: (row) => `€${row.total}`,
  },
]

function facet<K extends keyof Order>(key: K) {
  const counts = new Map<string, number>()
  for (const order of orders) counts.set(String(order[key]), (counts.get(String(order[key])) ?? 0) + 1)
  return Array.from(counts, ([value, count]) => ({ value, label: value, count }))
}

export function FilterBarDemo() {
  const [status, setStatus] = React.useState<string[]>(["Paid"])
  const [channel, setChannel] = React.useState<string[]>([])

  const rows = orders.filter(
    (order) =>
      (status.length === 0 || status.includes(order.status)) &&
      (channel.length === 0 || channel.includes(order.channel))
  )

  return (
    <DataTable
      className="w-full"
      columns={columns}
      data={rows}
      getRowId={(row) => row.id}
      filterable
      filterPlaceholder="Search orders"
      toolbar={
        <FilterBar>
          <FilterSelect label="Status" options={facet("status")} value={status} onValueChange={setStatus} />
          <FilterSelect label="Channel" options={facet("channel")} value={channel} onValueChange={setChannel} />
          {status.length + channel.length > 0 ? (
            <FilterBarClear
              onClick={() => {
                setStatus([])
                setChannel([])
              }}
            />
          ) : null}
        </FilterBar>
      }
    />
  )
}

export function FilterBarAlone() {
  return (
    <FilterBar>
      <FilterSelect
        label="Priority"
        options={[
          { value: "urgent", label: "Urgent" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ]}
      />
      <FilterSelect
        label="Assignee"
        defaultValue={["ada", "alan", "grace"]}
        options={[
          { value: "ada", label: "Ada" },
          { value: "alan", label: "Alan" },
          { value: "grace", label: "Grace" },
        ]}
      />
    </FilterBar>
  )
}
