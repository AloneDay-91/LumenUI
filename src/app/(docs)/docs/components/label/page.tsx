import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export default function LabelPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "label", text: "Label", level: 1 },
          { id: "usage", text: "Utilisation", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          eyebrow="Composants"
          title="Label"
          description="Libellé de champ. Placez-le au-dessus du contrôle, jamais à l'intérieur."
        />
        <Preview>
          <div className="grid w-full max-w-sm gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" placeholder="Elouan Bruzek" />
          </div>
        </Preview>
        <section className="space-y-4">
          <h2 id="usage">
            Utilisation
          </h2>
          <CodeBlock
            code={`import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/Input"

<Label htmlFor="name">Nom</Label>
<Input id="name" />`}
          />
        </section>
      </div>
    </>
  )
}
