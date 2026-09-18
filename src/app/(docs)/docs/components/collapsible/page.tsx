"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible"

export default function CollapsiblePage() {
  return (
    <ComponentDocs
      name="Collapsible"
      description="Panneau contrôlé par un bouton. Construit sur @base-ui/react/collapsible."
      preview={
        <Collapsible className="w-full max-w-md">
          <CollapsibleTrigger render={<Button variant="outline" />}>
            Afficher les détails
          </CollapsibleTrigger>
          <CollapsiblePanel className="pt-3">
            Tokens, CVA, Base UI. Le code vit dans votre dépôt.
          </CollapsiblePanel>
        </Collapsible>
      }
      usage={`import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from "@/components/ui/Collapsible"

<Collapsible>
  <CollapsibleTrigger render={<Button />}>Ouvrir</CollapsibleTrigger>
  <CollapsiblePanel>Contenu</CollapsiblePanel>
</Collapsible>`}
    />
  )
}
