"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Card } from "@/components/ui/Card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/ContextMenu"

export default function ContextMenuPage() {
  return (
    <ComponentDocs
      name="Context Menu"
      description="Menu au pointeur, clic droit ou appui long. Construit sur @base-ui/react/context-menu."
      preview={
        <ContextMenu>
          <ContextMenuTrigger
            render={
              <Card
                size="sm"
                variant="secondary"
                className="flex h-28 w-56 cursor-context-menu items-center justify-center text-sm text-muted-foreground"
              />
            }
          >
            Clic droit ici
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copier</ContextMenuItem>
            <ContextMenuItem>Coller</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Supprimer</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      }
      usage={`import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/ContextMenu"

<ContextMenu>
  <ContextMenuTrigger>Zone</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copier</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
    />
  )
}
