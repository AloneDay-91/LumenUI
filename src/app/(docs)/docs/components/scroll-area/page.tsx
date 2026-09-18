import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Card, CardContent } from "@/components/ui/Card"
import { ScrollArea } from "@/components/ui/ScrollArea"

export default function ScrollAreaPage() {
  return (
    <ComponentDocs
      name="Scroll Area"
      description="Conteneur de défilement avec barres custom. Construit sur @base-ui/react/scroll-area."
      preview={
        <Card size="sm" variant="secondary" className="h-32 w-56 overflow-hidden py-0">
          <ScrollArea className="h-32">
            <CardContent className="py-3">
              <p className="text-sm leading-6">
                Inter, Fraunces, JetBrains Mono. Tokens sémantiques, pills, papier
                chaud. Copy-paste, pas une librairie. Base UI pour le comportement.
                CVA pour les variants. Le chrome reste Lumen.
              </p>
            </CardContent>
          </ScrollArea>
        </Card>
      }
      usage={`import { ScrollArea } from "@/components/ui/ScrollArea"

<ScrollArea className="h-32">
  Contenu long
</ScrollArea>`}
    />
  )
}
