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
      extraHeadings={[
        { id: "variants", text: "Variants", level: 2 },
        { id: "color", text: "Color", level: 2 },
      ]}
      extra={
        <div className="flex flex-col gap-12">
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
          <section className="space-y-4">
            <h2 id="color">Color</h2>
            <p>
              <code>color</code> paints a soft pill. <code>highContrast</code>{" "}
              fills it with the hue. Gray stays on the paper tokens.
            </p>
            <Preview className="flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <Badge color="gray">Gray</Badge>
                <Badge color="indigo">Indigo</Badge>
                <Badge color="cyan">Cyan</Badge>
                <Badge color="orange">Orange</Badge>
                <Badge color="crimson">Crimson</Badge>
                <Badge color="jade">Jade</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge color="gray" highContrast>
                  Gray
                </Badge>
                <Badge color="indigo" highContrast>
                  Indigo
                </Badge>
                <Badge color="cyan" highContrast>
                  Cyan
                </Badge>
                <Badge color="orange" highContrast>
                  Orange
                </Badge>
                <Badge color="crimson" highContrast>
                  Crimson
                </Badge>
                <Badge color="jade" highContrast>
                  Jade
                </Badge>
              </div>
            </Preview>
          </section>
        </div>
      }
    />
  )
}
