"use client"

import { useState } from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

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

export function PaginatedTable() {
  const [page, setPage] = useState(1)
  const pageCount = Math.ceil(inventory.length / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const rows = inventory.slice(start, start + PAGE_SIZE)
  const from = start + 1
  const to = start + rows.length

  function goTo(next: number) {
    setPage(Math.min(pageCount, Math.max(1, next)))
  }

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
          {rows.map((row) => (
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
          {from}–{to} of {inventory.length}
        </p>
        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={page === 1}
                onClick={() => goTo(page - 1)}
              />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, index) => {
              const number = index + 1
              return (
                <PaginationItem key={number}>
                  <PaginationLink
                    isActive={page === number}
                    onClick={() => goTo(number)}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
            <PaginationItem>
              <PaginationNext
                disabled={page === pageCount}
                onClick={() => goTo(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
