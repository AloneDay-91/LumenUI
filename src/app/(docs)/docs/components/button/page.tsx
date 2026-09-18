import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Button } from "@/components/ui/Button"

export default function ButtonPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "button", text: "Button", level: 1 },
          { id: "usage", text: "Utilisation", level: 2 },
          { id: "variants", text: "Variantes", level: 2 },
          { id: "sizes", text: "Tailles", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Composants"
          title="Button"
          description="Bouton pill, construit sur @base-ui/react/button. Variants via CVA. Composition via la prop render."
        />

        <Preview>
          <Button>Continuer</Button>
        </Preview>

        <section className="space-y-4">
          <h2 id="usage">
            Utilisation
          </h2>
          <CodeBlock
            filename="app/page.tsx"
            code={`import { Button } from "@/components/ui/Button"

export default function Example() {
  return <Button>Continuer</Button>
}`}
          />
          <p className="text-sm text-muted-foreground">
            Copiez <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">src/components/ui/Button.tsx</code>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="variants">
            Variantes
          </h2>
          <Preview className="flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Lien</Button>
          </Preview>
        </section>

        <section className="space-y-4">
          <h2 id="sizes">
            Tailles
          </h2>
          <Preview className="flex-wrap gap-3">
            <Button size="sm">Petit</Button>
            <Button>Défaut</Button>
            <Button size="lg">Grand</Button>
            <Button disabled>Désactivé</Button>
          </Preview>
        </section>
      </div>
    </>
  )
}
