import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Separator } from "@/components/ui/Separator"

export default function SeparatorPage() {
  return (
    <ComponentDocs
      name="Separator"
      description="Séparateur accessible aux lecteurs d’écran. Construit sur @base-ui/react/separator."
      preview={
        <div className="w-56">
          <p className="text-sm">Lumen UI</p>
          <Separator className="my-3" />
          <p className="text-sm text-muted-foreground">Copy-paste</p>
        </div>
      }
      usage={`import { Separator } from "@/components/ui/Separator"

<Separator />`}
    />
  )
}
