import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { FilterBarAlone, FilterBarDemo } from "@/components/docs/FilterBarExamples"

export default function FilterBarPage() {
  return (
    <ComponentDocs
      name="Filter Bar"
      description="Faceted filters as pills. Each one opens a checkbox menu that stays open while you tick, then names what is picked."
      preview={<FilterBarDemo />}
      usage={`import { FilterBar, FilterBarClear, FilterSelect } from "@/components/ui/FilterBar"

const [status, setStatus] = React.useState<string[]>([])

<FilterBar>
  <FilterSelect
    label="Status"
    options={[
      { value: "paid", label: "Paid", count: 4 },
      { value: "pending", label: "Pending", count: 2 },
    ]}
    value={status}
    onValueChange={setStatus}
  />
  {status.length > 0 ? <FilterBarClear onClick={() => setStatus([])} /> : null}
</FilterBar>`}
      extraHeadings={[
        { id: "states", text: "Empty and active", level: 2 },
        { id: "data-table", text: "With Data Table", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="states">Empty and active</h2>
            <p>
              An empty filter is a dashed pill with a plus. Once something is
              picked it turns solid and lists the picks, up to{" "}
              <code>maxShown</code>, then switches to a count.
            </p>
            <div>
              <FilterBarAlone />
            </div>
            <CodeBlock
              code={`<FilterSelect label="Priority" options={priorities} />
<FilterSelect
  label="Assignee"
  defaultValue={["ada", "alan", "grace"]}
  options={people}
/>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="data-table">With Data Table</h2>
            <p>
              Filter Bar only holds the picks; you filter the rows. Pass the
              filtered array to <code>data</code> and the bar to{" "}
              <code>toolbar</code>, next to the search field. The preview above is
              built this way.
            </p>
            <CodeBlock
              code={`const rows = orders.filter(
  (order) => status.length === 0 || status.includes(order.status)
)

<DataTable
  columns={columns}
  data={rows}
  filterable
  toolbar={
    <FilterBar>
      <FilterSelect label="Status" options={statuses} value={status} onValueChange={setStatus} />
    </FilterBar>
  }
/>`}
            />
          </section>
        </>
      }
    />
  )
}
