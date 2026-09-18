"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@/components/ui/Toolbar"

export default function ToolbarPage() {
  return (
    <ComponentDocs
      name="Toolbar"
      description="Groupe de boutons et contrôles. Construit sur @base-ui/react/toolbar."
      preview={
        <Toolbar>
          <ToolbarGroup>
            <ToolbarButton>Gras</ToolbarButton>
            <ToolbarButton>Italique</ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarButton>Lien</ToolbarButton>
        </Toolbar>
      }
      usage={`import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/Toolbar"

<Toolbar>
  <ToolbarButton>Gras</ToolbarButton>
  <ToolbarSeparator />
  <ToolbarButton>Lien</ToolbarButton>
</Toolbar>`}
    />
  )
}
