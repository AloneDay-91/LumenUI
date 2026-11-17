import { Button, Menu, MenuContent, MenuItem, MenuSeparator, MenuShortcut, MenuTrigger, Menubar } from "lumen-ui"

export const Default = () => (
  <Menubar className="w-fit">
    <Menu>
      <MenuTrigger render={<Button variant="ghost" size="sm" />}>File</MenuTrigger>
      <MenuContent>
        <MenuItem>New</MenuItem>
        <MenuItem>Open</MenuItem>
      </MenuContent>
    </Menu>
    <Menu>
      <MenuTrigger render={<Button variant="ghost" size="sm" />}>Edit</MenuTrigger>
      <MenuContent>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </MenuContent>
    </Menu>
  </Menubar>
)

export const Application = () => (
  <Menubar className="w-fit">
    {["File", "Edit", "View", "Window", "Help"].map((label) => (
      <Menu key={label}>
        <MenuTrigger render={<Button variant="ghost" size="sm" />}>{label}</MenuTrigger>
        <MenuContent>
          <MenuItem>Action</MenuItem>
        </MenuContent>
      </Menu>
    ))}
  </Menubar>
)

export const OpenMenu = () => (
  <div style={{ height: 200 }}>
    <Menubar className="w-fit">
      <Menu defaultOpen>
        <MenuTrigger render={<Button variant="ghost" size="sm" />}>File</MenuTrigger>
        <MenuContent className="w-48">
          <MenuItem>
            New file
            <MenuShortcut>⌘N</MenuShortcut>
          </MenuItem>
          <MenuItem>
            Open…
            <MenuShortcut>⌘O</MenuShortcut>
          </MenuItem>
          <MenuSeparator />
          <MenuItem>
            Save
            <MenuShortcut>⌘S</MenuShortcut>
          </MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger render={<Button variant="ghost" size="sm" />}>Edit</MenuTrigger>
        <MenuContent>
          <MenuItem>Copy</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger render={<Button variant="ghost" size="sm" />}>View</MenuTrigger>
        <MenuContent>
          <MenuItem>Zoom in</MenuItem>
        </MenuContent>
      </Menu>
    </Menubar>
  </div>
)
