import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination"

export default function PaginationPage() {
  return (
    <ComponentDocs
      name="Pagination"
      description="Page controls for a list or table. Built from Button — ghost, secondary when current."
      preview={
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>12</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      }
      usage={`import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination"

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
      extraHeadings={[{ id: "active", text: "Active page", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="active">Active page</h2>
          <p>
            <code>isActive</code> sets <code>aria-current=&quot;page&quot;</code>{" "}
            and switches the button to the secondary variant — no outline
            border.
          </p>
          <Preview>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink isActive>2</PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Preview>
          <CodeBlock
            code={`<PaginationLink isActive onClick={() => goTo(2)}>
  2
</PaginationLink>`}
          />
        </section>
      }
    />
  )
}
