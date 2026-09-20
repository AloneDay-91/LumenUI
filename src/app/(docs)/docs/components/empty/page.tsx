import { InboxIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Button } from "@/components/ui/Button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/Empty"

export default function EmptyPage() {
  return (
    <ComponentDocs
      name="Empty"
      description="Placeholder when a list, table, or panel has nothing to show yet."
      preview={
        <Empty className="max-w-md">
          <EmptyHeader>
            <EmptyMedia>
              <InboxIcon />
            </EmptyMedia>
            <EmptyTitle>No releases yet</EmptyTitle>
            <EmptyDescription>
              Tag a version and it will land here. Until then the list stays
              quiet.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">Create a release</Button>
            <Button size="sm" variant="ghost">
              Read the changelog
            </Button>
          </EmptyContent>
        </Empty>
      }
      usage={`import { InboxIcon } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/Empty"

<Empty>
  <EmptyHeader>
    <EmptyMedia>
      <InboxIcon />
    </EmptyMedia>
    <EmptyTitle>No releases yet</EmptyTitle>
    <EmptyDescription>Tag a version and it will land here.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm">Create a release</Button>
  </EmptyContent>
</Empty>`}
      extraHeadings={[{ id: "media", text: "Media", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="media">Media</h2>
          <p>
            <code>EmptyMedia</code> is an optional glyph well.{" "}
            <code>ghost</code> drops the well when the icon should sit on the
            paper.
          </p>
          <Preview>
            <Empty className="max-w-sm border-0 py-6">
              <EmptyHeader>
                <EmptyMedia variant="ghost">
                  <InboxIcon />
                </EmptyMedia>
                <EmptyTitle>Nothing in the inbox</EmptyTitle>
              </EmptyHeader>
            </Empty>
          </Preview>
          <CodeBlock
            code={`<EmptyMedia variant="ghost">
  <InboxIcon />
</EmptyMedia>`}
          />
        </section>
      }
    />
  )
}
