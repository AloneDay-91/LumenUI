import { CopyIcon, ListMusicIcon, PlusIcon, Share2Icon, TrashIcon } from "lucide-react"
import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "lumen-ui"

export const Open = () => (
  <Menu defaultOpen>
    <MenuTrigger render={<Button variant="outline" />}>Song</MenuTrigger>
    <MenuContent className="w-52">
      <MenuItem>
        <PlusIcon />
        Add to library
        <MenuShortcut>⌘L</MenuShortcut>
      </MenuItem>
      <MenuItem>
        <ListMusicIcon />
        Add to a playlist
      </MenuItem>
      <MenuItem>
        <CopyIcon />
        Copy link
        <MenuShortcut>⌘C</MenuShortcut>
      </MenuItem>
      <MenuSeparator />
      <MenuCheckboxItem defaultChecked>Show lyrics</MenuCheckboxItem>
      <MenuItem>
        <Share2Icon />
        Share
      </MenuItem>
      <MenuSeparator />
      <MenuItem variant="destructive">
        <TrashIcon />
        Remove
      </MenuItem>
    </MenuContent>
  </Menu>
)

export const Simple = () => (
  <Menu defaultOpen>
    <MenuTrigger render={<Button variant="outline" />}>Song</MenuTrigger>
    <MenuContent>
      <MenuItem>Add to library</MenuItem>
      <MenuItem>Add to a playlist</MenuItem>
      <MenuSeparator />
      <MenuItem>Share</MenuItem>
    </MenuContent>
  </Menu>
)
