import { SearchIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import { VisuallyHidden } from "@/components/ui/VisuallyHidden"

export default function VisuallyHiddenPage() {
  return (
    <ComponentDocs
      name="Visually Hidden"
      description="Text that screen readers read and the screen does not show. With focusable, it appears while it holds focus."
      preview={
        <Button variant="outline" size="icon">
          <SearchIcon aria-hidden />
          <VisuallyHidden>Search</VisuallyHidden>
        </Button>
      }
      usage={`import { VisuallyHidden } from "@/components/ui/VisuallyHidden"

<Button variant="outline" size="icon">
  <SearchIcon aria-hidden />
  <VisuallyHidden>Search</VisuallyHidden>
</Button>`}
      extraHeadings={[{ id: "skip-link", text: "Skip link", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="skip-link">Skip link</h2>
          <p>
            Render it as a link with <code>focusable</code>: the first Tab on the
            page shows it, the next one hides it again. Press Tab in the box
            below.
          </p>
          <div className="rounded-2xl border border-foreground/5 p-6 dark:border-foreground/10">
            <VisuallyHidden
              focusable
              render={<a href="#skip-link" />}
              className="rounded-full bg-primary px-3 py-1.5 text-xs text-primary-foreground"
            >
              Skip to content
            </VisuallyHidden>
          </div>
          <CodeBlock
            code={`<VisuallyHidden focusable render={<a href="#main" />}>
  Skip to content
</VisuallyHidden>`}
          />
        </section>
      }
    />
  )
}
