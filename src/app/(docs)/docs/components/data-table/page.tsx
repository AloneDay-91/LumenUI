import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { DataTableDemo } from "@/components/docs/DataTableExamples"

export default function DataTablePage() {
  return (
    <ComponentDocs
      name="Data Table"
      description="Table with sortable columns, a filter field, and pages, built on Table, Search Input, and Button. Sorting and filtering run in the browser."
      preview={<DataTableDemo />}
      usage={`import { DataTable, type DataTableColumn } from "@/components/ui/DataTable"

const columns: DataTableColumn<Release>[] = [
  { id: "version", header: "Version", sortable: true },
  {
    id: "status",
    header: "Status",
    cell: (row) => <Badge>{row.status}</Badge>,
  },
  { id: "downloads", header: "Downloads", sortable: true, align: "end" },
]

<DataTable
  columns={columns}
  data={releases}
  getRowId={(row) => row.version}
  filterable
  pageSize={5}
/>`}
      extraHeadings={[
        { id: "columns", text: "Columns", level: 2 },
        { id: "sorting", text: "Sorting", level: 2 },
        { id: "server", text: "Server data", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="columns">Columns</h2>
            <p>
              <code>id</code> reads <code>row[id]</code>. Pass{" "}
              <code>accessor</code> when the value lives elsewhere or needs
              shaping: it is what the filter matches and the sort compares.{" "}
              <code>cell</code> only changes what is drawn.
            </p>
            <CodeBlock
              code={`{
  id: "author",
  header: "Author",
  accessor: (row) => row.author.name,
  cell: (row) => <Avatar>…</Avatar>,
}`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="sorting">Sorting</h2>
            <p>
              A sortable header cycles ascending, descending, then off. The header
              cell carries <code>aria-sort</code>. Numbers and dates compare as
              values, text compares with numeric collation, so{" "}
              <code>1.10</code> sorts after <code>1.9</code>.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="server">Server data</h2>
            <p>
              Data Table keeps every row in memory. For thousands of rows or
              filtering on the server, compose <code>Table</code>,{" "}
              <code>SearchInput</code>, and <code>Pagination</code> yourself and
              fetch per page.
            </p>
          </section>
        </>
      }
    />
  )
}
