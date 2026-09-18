import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Badge } from "@/components/ui/Badge"

export default function BadgePage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "badge", text: "Badge", level: 1 },
          { id: "usage", text: "Utilisation", level: 2 },
          { id: "variants", text: "Variantes", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          eyebrow="Composants"
          title="Badge"
          description="Label court, police mono, coins pill. Pour versions, statuts, catégories."
        />
        <Preview className="flex-wrap gap-2">
          <Badge>v0.2</Badge>
          <Badge variant="secondary">Beta</Badge>
          <Badge variant="outline">Docs</Badge>
        </Preview>
        <section className="space-y-4">
          <h2 id="usage">
            Utilisation
          </h2>
          <CodeBlock code={`import { Badge } from "@/components/ui/Badge"

<Badge variant="outline">Docs</Badge>`} />
        </section>
        <section className="space-y-4">
          <h2 id="variants">
            Variantes
          </h2>
          <Preview className="flex-wrap gap-2">
            <Badge>default</Badge>
            <Badge variant="secondary">secondary</Badge>
            <Badge variant="outline">outline</Badge>
            <Badge variant="destructive">destructive</Badge>
            <Badge variant="success">success</Badge>
            <Badge variant="warning">warning</Badge>
          </Preview>
        </section>
      </div>
    </>
  )
}
