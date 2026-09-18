"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/ui/Menu"
import { Menubar } from "@/components/ui/Menubar"

export default function MenubarPage() {
  return (
    <ComponentDocs
      name="Menubar"
      description="Barre de menus d’application. Construit sur @base-ui/react/menubar."
      preview={
        <Menubar>
          <Menu>
            <MenuTrigger render={<Button variant="ghost" size="sm" />}>
              Fichier
            </MenuTrigger>
            <MenuContent>
              <MenuItem>Nouveau</MenuItem>
              <MenuItem>Ouvrir</MenuItem>
            </MenuContent>
          </Menu>
          <Menu>
            <MenuTrigger render={<Button variant="ghost" size="sm" />}>
              Édition
            </MenuTrigger>
            <MenuContent>
              <MenuItem>Copier</MenuItem>
              <MenuItem>Coller</MenuItem>
            </MenuContent>
          </Menu>
        </Menubar>
      }
      usage={`import { Menubar } from "@/components/ui/Menubar"
import { Menu, MenuTrigger, MenuContent, MenuItem } from "@/components/ui/Menu"

<Menubar>
  <Menu>
    <MenuTrigger render={<Button />}>Fichier</MenuTrigger>
    <MenuContent>
      <MenuItem>Nouveau</MenuItem>
    </MenuContent>
  </Menu>
</Menubar>`}
    />
  )
}
