import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Container } from "@/components/ui/Container"

export default function ContainerPage() {
  return (
    <ComponentDocs
      name="Container"
      description="Centered column with a max width and side gutters. Five widths and three gutters, so pages line up without repeating the classes."
      preview={
        <div className="w-full rounded-2xl bg-muted/50 py-4">
          <Container size="sm">
            <div className="rounded-xl bg-background px-3 py-6 text-center text-xs text-muted-foreground ring-1 ring-foreground/5">
              size=&quot;sm&quot; · max-w-2xl
            </div>
          </Container>
        </div>
      }
      usage={`import { Container } from "@/components/ui/Container"

<Container>
  <h1>Page title</h1>
</Container>`}
      extraHeadings={[
        { id: "sizes", text: "Sizes", level: 2 },
        { id: "render", text: "Rendering as another tag", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="sizes">Sizes</h2>
            <p>
              <code>sm</code> max-w-2xl for reading, <code>md</code> max-w-4xl
              like the docs column, <code>lg</code> max-w-6xl (default),{" "}
              <code>xl</code> max-w-7xl, and <code>full</code>. The{" "}
              <code>wide</code> gutter matches the marketing header,{" "}
              <code>px-6 md:px-12</code>.
            </p>
            <CodeBlock
              code={`<Container size="sm">…</Container>
<Container size="xl" padding="wide">…</Container>
<Container size="full" padding="none">…</Container>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="render">Rendering as another tag</h2>
            <CodeBlock code={`<Container render={<main />}>…</Container>`} />
          </section>
        </>
      }
    />
  )
}
