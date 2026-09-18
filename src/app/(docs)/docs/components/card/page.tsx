import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro, Preview } from "@/components/docs/Preview"
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
        <CardTitle>Notes de version</CardTitle>
        <CardDescription>
          Tokens papier, boutons pill, Base UI pour le comportement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Lumen UI 0.2</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant={variant === "secondary" ? "outline" : "default"}>
          Lire
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function CardPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "card", text: "Card", level: 1 },
          { id: "usage", text: "Utilisation", level: 2 },
          { id: "variants", text: "Variantes", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          eyebrow="Composants"
          title="Card"
          description="Surface à plat, sans ombre. Default pour les contours. Secondary pour le chrome portfolio : fond muted, pas de bordure."
        />
        <Preview>
          <ReleaseCard />
        </Preview>
        <section className="space-y-4">
          <h2 id="usage">Utilisation</h2>
          <CodeBlock
            code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"

<Card>
  <CardHeader>
    <CardTitle>Notes de version</CardTitle>
    <CardDescription>Lumen UI 0.2</CardDescription>
  </CardHeader>
  <CardContent>Contenu</CardContent>
</Card>`}
          />
        </section>
        <section className="space-y-4">
          <h2 id="variants">Variantes</h2>
          <Preview className="items-stretch gap-6">
            <ReleaseCard />
            <ReleaseCard variant="secondary" />
          </Preview>
          <CodeBlock
            code={`<Card>Contour, fond papier.</Card>
<Card variant="secondary">Sans bordure, fond secondary.</Card>`}
          />
        </section>
      </div>
    </>
  )
}
