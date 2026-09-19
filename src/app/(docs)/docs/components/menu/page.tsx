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
      description="Dropdown list of actions. Built on @base-ui/react/menu."
      preview={
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>Song</MenuTrigger>
          <MenuContent>
            <MenuItem>Add to library</MenuItem>
            <MenuItem>Add to a playlist</MenuItem>
            <MenuSeparator />
            <MenuItem>Share</MenuItem>
          </MenuContent>
        </Menu>
      }
      usage={`import { Menu, MenuTrigger, MenuContent, MenuItem } from "@/components/ui/Menu"

<Menu>
  <MenuTrigger render={<Button />}>Open</MenuTrigger>
  <MenuContent>
    <MenuItem>Action</MenuItem>
  </MenuContent>
</Menu>`}
    />
  )
}
