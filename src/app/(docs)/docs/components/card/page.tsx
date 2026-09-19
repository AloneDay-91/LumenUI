import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

function ReleaseCard({
  variant,
}: {
  variant?: "default" | "secondary"
}) {
  return (
    <Card className="max-w-sm flex-1" variant={variant}>
      <CardHeader>
        <CardTitle>Release notes</CardTitle>
        <CardDescription>
          Paper tokens, pill buttons, Base UI for behavior.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Lumen UI 0.2</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant={variant === "secondary" ? "outline" : "default"}>
          Read
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function CardPage() {
  return (
    <ComponentDocs
      name="Card"
      description="Flat surface, no shadow. Default for outlines. Secondary for portfolio chrome: muted fill, no border."
      preview={<ReleaseCard />}
      usage={`import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"

<Card>
  <CardHeader>
    <CardTitle>Release notes</CardTitle>
    <CardDescription>Lumen UI 0.2</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`}
      extraHeadings={[{ id: "variants", text: "Variants", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="variants">Variants</h2>
          <Preview className="items-stretch gap-6">
            <ReleaseCard />
            <ReleaseCard variant="secondary" />
          </Preview>
          <CodeBlock
            code={`<Card>Outline, paper fill.</Card>
<Card variant="secondary">No border, secondary fill.</Card>`}
          />
        </section>
      }
    />
  )
}
