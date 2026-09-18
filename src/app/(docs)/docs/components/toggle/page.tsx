"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Toggle } from "@/components/ui/Toggle"

export default function TogglePage() {
  return (
    <ComponentDocs
      name="Toggle"
      description="Bouton à deux états. Construit sur @base-ui/react/toggle."
      preview={<Toggle>Gras</Toggle>}
      usage={`import { Toggle } from "@/components/ui/Toggle"

<Toggle>Gras</Toggle>`}
    />
  )
}
