import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Badge } from "@/components/ui/Badge"

export default function BadgePage() {
  return (
    <ComponentDocs
      name="Badge"
      description="Short label, mono type, pill corners. For versions, statuses, categories."
      preview={
        <>
          <Badge>v0.2</Badge>
          <Badge variant="secondary">Beta</Badge>
          <Badge variant="outline">Docs</Badge>
        </>
      }
      usage={`import { Badge } from "@/components/ui/Badge"

<Badge variant="outline">Docs</Badge>`}
      extraHeadings={[{ id: "variants", text: "Variants", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="variants">Variants</h2>
          <Preview className="flex-wrap gap-2">
            <Badge>default</Badge>
            <Badge variant="secondary">secondary</Badge>
            <Badge variant="outline">outline</Badge>
            <Badge variant="destructive">destructive</Badge>
            <Badge variant="success">success</Badge>
            <Badge variant="warning">warning</Badge>
          </Preview>
        </section>
      }
    />
  )
}
