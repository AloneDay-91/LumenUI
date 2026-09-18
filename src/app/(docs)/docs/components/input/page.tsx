import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export default function InputPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "input", text: "Input", level: 1 },
          { id: "usage", text: "Utilisation", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          eyebrow="Composants"
          title="Input"
          description="Champ de saisie Base UI. Contour pill, focus ring discret, état invalid via aria-invalid."
        />
        <Preview>
          <div className="grid w-full max-w-sm gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="vous@studio.fr" />
          </div>
        </Preview>
        <section className="space-y-4">
          <h2 id="usage">
            Utilisation
          </h2>
          <CodeBlock
            code={`import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="vous@studio.fr" />`}
          />
        </section>
      </div>
    </>
  )
}
