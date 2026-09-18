"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/Menu"

export default function MenuPage() {
  return (
    <ComponentDocs
      name="Menu"
      description="Liste d’actions en menu déroulant. Construit sur @base-ui/react/menu."
      preview={
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>Song</MenuTrigger>
          <MenuContent>
            <MenuItem>Ajouter à la bibliothèque</MenuItem>
            <MenuItem>Ajouter à une playlist</MenuItem>
            <MenuSeparator />
            <MenuItem>Partager</MenuItem>
          </MenuContent>
        </Menu>
      }
      usage={`import { Menu, MenuTrigger, MenuContent, MenuItem } from "@/components/ui/Menu"

<Menu>
  <MenuTrigger render={<Button />}>Ouvrir</MenuTrigger>
  <MenuContent>
    <MenuItem>Action</MenuItem>
  </MenuContent>
</Menu>`}
    />
  )
}
