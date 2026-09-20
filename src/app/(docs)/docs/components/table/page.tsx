import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

import { PaginatedTable } from "./paginated-table"

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
            <TableCell className="font-mono text-xs tabular-nums">
              {rows.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      ) : null}
    </Table>
  )
}

export default function TablePage() {
  return (
    <ComponentDocs
      name="Table"
      description="Native table in a framed wrap. Hover the row, caption on top, footer as a rule."
      preview={<ReleasesTable />}
      usage={`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

<Table>
  <TableCaption>Recent Lumen releases.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Version</TableHead>
      <TableHead>Note</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>0.5.0</TableCell>
      <TableCell>API tabs</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      extraHeadings={[
        { id: "footer", text: "Footer", level: 2 },
        { id: "pagination", text: "Pagination", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="footer">Footer</h2>
            <p>
              <code>TableFooter</code> sits under the body — a total, a count,
              not another header.
            </p>
            <Preview>
              <ReleasesTable footer />
            </Preview>
            <CodeBlock
              code={`<TableFooter>
  <TableRow>
    <TableCell colSpan={2}>Releases</TableCell>
    <TableCell>3</TableCell>
  </TableRow>
</TableFooter>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="pagination">Pagination</h2>
            <p>
              Pair the table with <code>Pagination</code>. The wrap stays on
              the table; the pager sits underneath.
            </p>
            <Preview>
              <PaginatedTable />
            </Preview>
            <CodeBlock
              code={`<Table />
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious onClick={() => goTo(page - 1)} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink isActive onClick={() => goTo(2)}>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext onClick={() => goTo(page + 1)} />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
            />
          </section>
        </>
      }
    />
  )
}
