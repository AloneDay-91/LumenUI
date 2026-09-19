"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/ui/Menu"
import { Menubar } from "@/components/ui/Menubar"

export default function MenubarPage() {
  return (
    <ComponentDocs
      name="Menubar"
      description="Application menu bar. Built on @base-ui/react/menubar."
      preview={
        <Menubar>
          <Menu>
            <MenuTrigger render={<Button variant="ghost" size="sm" />}>
              File
            </MenuTrigger>
            <MenuContent>
              <MenuItem>New</MenuItem>
              <MenuItem>Open</MenuItem>
            </MenuContent>
          </Menu>
          <Menu>
            <MenuTrigger render={<Button variant="ghost" size="sm" />}>
              Edit
            </MenuTrigger>
            <MenuContent>
              <MenuItem>Copy</MenuItem>
              <MenuItem>Paste</MenuItem>
            </MenuContent>
          </Menu>
        </Menubar>
      }
      usage={`import { Menubar } from "@/components/ui/Menubar"
import { Menu, MenuTrigger, MenuContent, MenuItem } from "@/components/ui/Menu"

<Menubar>
  <Menu>
    <MenuTrigger render={<Button />}>File</MenuTrigger>
    <MenuContent>
      <MenuItem>New</MenuItem>
    </MenuContent>
  </Menu>
</Menubar>`}
    />
  )
}
