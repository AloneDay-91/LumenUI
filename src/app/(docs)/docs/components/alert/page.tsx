import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"

export default function AlertPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "alert", text: "Alert", level: 1 },
          { id: "usage", text: "Utilisation", level: 2 },
          { id: "variants", text: "Variantes", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          eyebrow="Composants"
          title="Alert"
          description="Message de statut. Les variantes restent dans la famille monochrome : pas de pastels saturés."
        />
        <Preview>
          <Alert className="max-w-md">
            <AlertTitle>Déploiement terminé</AlertTitle>
            <AlertDescription>
              La preview est en ligne. Les tokens dark suivent la classe .dark.
            </AlertDescription>
          </Alert>
        </Preview>
        <section className="space-y-4">
          <h2 id="usage">
            Utilisation
          </h2>
          <CodeBlock
            code={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert"

<Alert>
  <AlertTitle>Déploiement terminé</AlertTitle>
  <AlertDescription>La preview est en ligne.</AlertDescription>
</Alert>`}
          />
        </section>
        <section className="space-y-4">
          <h2 id="variants">
            Variantes
          </h2>
          <div className="space-y-3">
            <Alert variant="destructive">
              <AlertTitle>Échec de sauvegarde</AlertTitle>
              <AlertDescription>Le serveur n&apos;a pas répondu.</AlertDescription>
            </Alert>
            <Alert variant="info">
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>Les composants vivent dans votre dépôt.</AlertDescription>
            </Alert>
          </div>
        </section>
      </div>
    </>
  )
}
