"use client"

import { Badge } from "@/components/ui/Badge"
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable"

type Release = {
  version: string
  status: "Published" | "Draft" | "Failed"
  downloads: number
  date: string
}

const releases: Release[] = [
  { version: "1.1.0", status: "Published", downloads: 12480, date: "2026-10-29" },
  { version: "1.0.7", status: "Published", downloads: 9320, date: "2026-10-12" },
  { version: "1.0.6", status: "Published", downloads: 8104, date: "2026-09-30" },
  { version: "1.0.5", status: "Failed", downloads: 0, date: "2026-09-21" },
  { version: "1.0.4", status: "Published", downloads: 6012, date: "2026-09-04" },
  { version: "1.0.3", status: "Published", downloads: 4410, date: "2026-08-18" },
  { version: "1.0.2", status: "Published", downloads: 2970, date: "2026-08-01" },
  { version: "1.2.0", status: "Draft", downloads: 0, date: "2026-11-20" },
]

const statusColor = {
  Published: "jade",
  Draft: "gray",
  Failed: "crimson",
} as const

const columns: DataTableColumn<Release>[] = [
  { id: "version", header: "Version", sortable: true, className: "font-mono" },
  {
    id: "status",
    header: "Status",
    sortable: true,
    cell: (row) => <Badge color={statusColor[row.status]}>{row.status}</Badge>,
  },
  {
    id: "downloads",
    header: "Downloads",
    sortable: true,
    align: "end",
    className: "tabular-nums",
    cell: (row) => row.downloads.toLocaleString("en-US"),
  },
  { id: "date", header: "Date", sortable: true, className: "tabular-nums" },
]

export function DataTableDemo() {
  return (
    <DataTable
      className="w-full"
      columns={columns}
      data={releases}
      getRowId={(row) => row.version}
      filterable
      filterPlaceholder="Filter releases"
      pageSize={5}
      defaultSort={{ id: "date", direction: "desc" }}
    />
  )
}
