import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"

export default function TextareaPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "textarea", text: "Textarea", level: 1 },
          { id: "usage", text: "Utilisation", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          eyebrow="Composants"
          title="Textarea"
          description="Zone de texte multiligne. Mêmes tokens que Input, coins un peu plus ouverts."
        />
        <Preview>
          <div className="grid w-full max-w-sm gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Écrivez ici…" />
          </div>
        </Preview>
        <section className="space-y-4">
          <h2 id="usage">
            Utilisation
          </h2>
          <CodeBlock
            code={`import { Textarea } from "@/components/ui/Textarea"

<Textarea placeholder="Écrivez ici…" />`}
          />
        </section>
      </div>
    </>
  )
}
