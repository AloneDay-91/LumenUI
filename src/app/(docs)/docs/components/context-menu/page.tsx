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
      description="Pointer menu, right-click or long-press. Built on @base-ui/react/context-menu."
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
            Right-click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuItem>Paste</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      }
      usage={`import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/ContextMenu"

<ContextMenu>
  <ContextMenuTrigger>Area</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
    />
  )
}
