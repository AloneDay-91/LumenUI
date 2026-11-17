import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "lumen-ui"

const rows = [
  { version: "0.5.0", date: "20 Sep 2026", note: "Native components, logo favicon" },
  { version: "0.4.0", date: "19 Sep 2026", note: "API tabs, English default" },
  { version: "0.3.0", date: "18 Sep 2026", note: "Examples bento" },
]

function ReleasesTable({ footer = false }: { footer?: boolean }) {
  return (
    <Table>
      <TableCaption>Recent Lumen releases.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[1%] whitespace-nowrap">Version</TableHead>
          <TableHead className="w-[1%] whitespace-nowrap">Shipped</TableHead>
          <TableHead>Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.version}>
            <TableCell className="whitespace-nowrap font-mono text-xs tabular-nums">
              {row.version}
            </TableCell>
            <TableCell className="whitespace-nowrap font-mono text-xs tabular-nums text-muted-foreground">
              {row.date}
            </TableCell>
            <TableCell>{row.note}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {footer ? (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Releases</TableCell>
            <TableCell className="font-mono text-xs tabular-nums">{rows.length}</TableCell>
          </TableRow>
        </TableFooter>
      ) : null}
    </Table>
  )
}

export const Releases = () => <ReleasesTable />

export const WithFooter = () => <ReleasesTable footer />

const PAGE_SIZE = 4
const inventory = [
  { name: "Accordion", kind: "Base UI", status: "Stable" },
  { name: "Aspect Ratio", kind: "Native", status: "Stable" },
  { name: "Command", kind: "Native", status: "Stable" },
  { name: "Empty", kind: "Native", status: "Stable" },
  { name: "Input Group", kind: "Native", status: "Stable" },
  { name: "Kbd", kind: "Native", status: "Stable" },
  { name: "Pagination", kind: "Native", status: "Stable" },
  { name: "Rating", kind: "Native", status: "Stable" },
  { name: "Spinner", kind: "Native", status: "Stable" },
  { name: "Stepper", kind: "Native", status: "Stable" },
  { name: "Table", kind: "Native", status: "Stable" },
  { name: "Timeline", kind: "Native", status: "Stable" },
]

export const Paginated = () => {
  const [page, setPage] = React.useState(1)
  const pageCount = Math.ceil(inventory.length / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const pageRows = inventory.slice(start, start + PAGE_SIZE)
  const goTo = (next: number) => setPage(Math.min(pageCount, Math.max(1, next)))

  return (
    <div className="w-full space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Component</TableHead>
            <TableHead>Kind</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageRows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell className="text-muted-foreground">{row.kind}</TableCell>
              <TableCell className="text-muted-foreground">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          {start + 1}–{start + pageRows.length} of {inventory.length}
        </p>
        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious disabled={page === 1} onClick={() => goTo(page - 1)} />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink isActive={page === i + 1} onClick={() => goTo(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext disabled={page === pageCount} onClick={() => goTo(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
