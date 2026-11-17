"use client"

import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import { SearchInput } from "@/components/ui/SearchInput"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import { cn } from "@/lib/utils"

type SortDirection = "asc" | "desc"

type DataTableSort = { id: string; direction: SortDirection }

type DataTableColumn<Row> = {
  id: string
  header: React.ReactNode
  /** Value used to sort and filter. Defaults to `row[id]`. */
  accessor?: (row: Row) => string | number | boolean | Date | null | undefined
  /** Cell content. Defaults to the accessor value. */
  cell?: (row: Row) => React.ReactNode
  sortable?: boolean
  align?: "start" | "center" | "end"
  className?: string
}

function readValue<Row>(row: Row, column: DataTableColumn<Row>) {
  if (column.accessor) return column.accessor(row)
  return (row as Record<string, unknown>)[column.id] as
    | string
    | number
    | boolean
    | Date
    | null
    | undefined
}

function compare(a: unknown, b: unknown) {
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime()
  if (typeof a === "number" && typeof b === "number") return a - b
  return String(a).localeCompare(String(b), undefined, { numeric: true })
}

const alignClass = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
}

function DataTable<Row>({
  className,
  columns,
  data,
  getRowId = (_row, index) => String(index),
  filterable = false,
  filterPlaceholder = "Filter…",
  filterLabel = "Filter rows",
  pageSize,
  defaultSort,
  emptyMessage = "No results.",
  toolbar,
  labels = {},
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  columns: DataTableColumn<Row>[]
  data: Row[]
  getRowId?: (row: Row, index: number) => string
  /** Adds a search field that matches every column's accessor value. */
  filterable?: boolean
  filterPlaceholder?: string
  filterLabel?: string
  /** Rows per page. Leave unset to show every row. */
  pageSize?: number
  defaultSort?: DataTableSort
  emptyMessage?: React.ReactNode
  /** Extra controls next to the filter. */
  toolbar?: React.ReactNode
  labels?: {
    previous?: string
    next?: string
    page?: (page: number, pageCount: number, total: number) => string
  }
}) {
  const [query, setQuery] = React.useState("")
  const [sort, setSort] = React.useState<DataTableSort | undefined>(defaultSort)
  const [page, setPage] = React.useState(0)

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return data
    return data.filter((row) =>
      columns.some((column) => {
        const value = readValue(row, column)
        return value != null && String(value).toLowerCase().includes(needle)
      })
    )
  }, [columns, data, query])

  const sorted = React.useMemo(() => {
    const column = sort && columns.find((entry) => entry.id === sort.id)
    if (!sort || !column) return filtered
    const factor = sort.direction === "asc" ? 1 : -1
    return [...filtered].sort(
      (a, b) => compare(readValue(a, column), readValue(b, column)) * factor
    )
  }, [columns, filtered, sort])

  const pageCount = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1
  const currentPage = Math.min(page, pageCount - 1)
  const rows = pageSize
    ? sorted.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    : sorted

  function toggleSort(id: string) {
    setSort((previous) => {
      if (!previous || previous.id !== id) return { id, direction: "asc" }
      if (previous.direction === "asc") return { id, direction: "desc" }
      return undefined
    })
  }

  const pageText = (labels.page ?? ((p, count, total) => `Page ${p} of ${count} · ${total} rows`))(
    currentPage + 1,
    pageCount,
    sorted.length
  )

  return (
    <div data-slot="data-table" className={cn("flex flex-col gap-3", className)} {...props}>
      {filterable || toolbar ? (
        <div data-slot="data-table-toolbar" className="flex flex-wrap items-center gap-2">
          {filterable ? (
            <SearchInput
              className="max-w-64"
              value={query}
              onValueChange={(next) => {
                setQuery(next)
                setPage(0)
              }}
              placeholder={filterPlaceholder}
              aria-label={filterLabel}
            />
          ) : null}
          {toolbar}
        </div>
      ) : null}

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              const active = sort?.id === column.id ? sort.direction : undefined
              const align = alignClass[column.align ?? "start"]
              return (
                <TableHead
                  key={column.id}
                  aria-sort={
                    active === "asc" ? "ascending" : active === "desc" ? "descending" : undefined
                  }
                  className={cn(align, column.className)}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.id)}
                      className={cn(
                        "-mx-2 inline-flex h-6 items-center gap-1 rounded-xl px-2 font-medium outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30",
                        active && "text-foreground",
                        column.align === "end" && "flex-row-reverse"
                      )}
                    >
                      {column.header}
                      {active === "asc" ? (
                        <ArrowUpIcon aria-hidden className="size-3" />
                      ) : active === "desc" ? (
                        <ArrowDownIcon aria-hidden className="size-3" />
                      ) : (
                        <ChevronsUpDownIcon aria-hidden className="size-3 opacity-50" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow key={getRowId(row, index)}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    className={cn(alignClass[column.align ?? "start"], column.className)}
                  >
                    {column.cell
                      ? column.cell(row)
                      : String(readValue(row, column) ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {pageSize ? (
        <div data-slot="data-table-pagination" className="flex items-center justify-between gap-3">
          <p className="m-0 text-xs text-muted-foreground tabular-nums" aria-live="polite">
            {pageText}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label={labels.previous ?? "Previous page"}
              disabled={currentPage === 0}
              onClick={() => setPage(currentPage - 1)}
            >
              <ChevronLeftIcon className="rtl:rotate-180" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label={labels.next ?? "Next page"}
              disabled={currentPage >= pageCount - 1}
              onClick={() => setPage(currentPage + 1)}
            >
              <ChevronRightIcon className="rtl:rotate-180" />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { DataTable }
export type { DataTableColumn, DataTableSort, SortDirection }
