import { BoldIcon, ItalicIcon, LinkIcon, ListIcon, UnderlineIcon } from "lucide-react"
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "lumen-ui"

export const Default = () => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarButton>Bold</ToolbarButton>
      <ToolbarButton>Italic</ToolbarButton>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarButton>Link</ToolbarButton>
  </Toolbar>
)

export const WithIcons = () => (
  <Toolbar aria-label="Text formatting">
    <ToolbarGroup>
      <ToolbarButton aria-label="Bold">
        <BoldIcon />
      </ToolbarButton>
      <ToolbarButton aria-label="Italic">
        <ItalicIcon />
      </ToolbarButton>
      <ToolbarButton aria-label="Underline">
        <UnderlineIcon />
      </ToolbarButton>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarGroup>
      <ToolbarButton aria-label="Bulleted list">
        <ListIcon />
      </ToolbarButton>
      <ToolbarButton aria-label="Insert link">
        <LinkIcon />
      </ToolbarButton>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarButton>Publish</ToolbarButton>
  </Toolbar>
)
