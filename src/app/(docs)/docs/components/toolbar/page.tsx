"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@/components/ui/Toolbar"

export default function ToolbarPage() {
  return (
    <ComponentDocs
      name="Toolbar"
      description="Group of buttons and controls. Built on @base-ui/react/toolbar."
      preview={
        <Toolbar>
          <ToolbarGroup>
            <ToolbarButton>Bold</ToolbarButton>
            <ToolbarButton>Italic</ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarButton>Link</ToolbarButton>
        </Toolbar>
      }
      usage={`import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/Toolbar"

<Toolbar>
  <ToolbarButton>Bold</ToolbarButton>
  <ToolbarSeparator />
  <ToolbarButton>Link</ToolbarButton>
</Toolbar>`}
    />
  )
}
