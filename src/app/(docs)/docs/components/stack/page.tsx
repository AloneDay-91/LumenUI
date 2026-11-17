import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import { Stack } from "@/components/ui/Stack"

function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground">
      {children}
    </div>
  )
}

export default function StackPage() {
  return (
    <ComponentDocs
      name="Stack"
      description="Flex layout on the Lumen spacing steps. Direction, gap, alignment, and wrap as props instead of a string of classes."
      preview={
        <Stack gap="sm" className="w-48">
          <Box>One</Box>
          <Box>Two</Box>
          <Box>Three</Box>
        </Stack>
      }
      usage={`import { Stack } from "@/components/ui/Stack"

<Stack gap="sm">
  <div>One</div>
  <div>Two</div>
</Stack>`}
      extraHeadings={[
        { id: "row", text: "Row", level: 2 },
        { id: "gap", text: "Gap scale", level: 2 },
        { id: "render", text: "Rendering as another tag", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="row">Row</h2>
            <Stack direction="row" gap="sm" align="center" justify="between" className="w-full max-w-sm">
              <span className="text-sm font-medium">Delete project</span>
              <Stack direction="row" gap="xs">
                <Button variant="ghost">Cancel</Button>
                <Button variant="destructive">Delete</Button>
              </Stack>
            </Stack>
            <CodeBlock
              code={`<Stack direction="row" align="center" justify="between">
  <span>Delete project</span>
  <Stack direction="row" gap="xs">
    <Button variant="ghost">Cancel</Button>
    <Button variant="destructive">Delete</Button>
  </Stack>
</Stack>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="gap">Gap scale</h2>
            <p>
              <code>xs</code> 4px, <code>sm</code> 8px, <code>md</code> 16px
              (default), <code>lg</code> 24px, <code>xl</code> 32px,{" "}
              <code>2xl</code> 48px. Reach for <code>className</code> only when a
              layout needs a step outside the scale.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="render">Rendering as another tag</h2>
            <CodeBlock
              code={`<Stack render={<ul />} gap="xs">
  <li>…</li>
</Stack>`}
            />
          </section>
        </>
      }
    />
  )
}
