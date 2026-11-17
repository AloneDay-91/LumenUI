import { CommandIcon } from "lucide-react"
import { Button, Kbd, KbdGroup } from "lumen-ui"

export const Shortcut = () => (
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
)

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Kbd>⌘</Kbd>
    <Kbd variant="outline">⌘</Kbd>
    <Kbd variant="ghost">⌘</Kbd>
  </div>
)

export const Sizes = () => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-wrap items-end gap-3">
      <Kbd size="sm">⌘</Kbd>
      <Kbd>⌘</Kbd>
      <Kbd size="lg">⌘</Kbd>
    </div>
    <div className="flex flex-wrap items-end gap-3">
      <Kbd size="sm">
        <CommandIcon />K
      </Kbd>
      <Kbd>
        <CommandIcon />K
      </Kbd>
      <Kbd size="lg">
        <CommandIcon />K
      </Kbd>
    </div>
  </div>
)

export const Groups = () => (
  <div className="flex flex-col gap-3 text-sm">
    <KbdGroup>
      <Kbd>⇧</Kbd>
      <Kbd>⌘</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <span>+</span>
      <Kbd>B</Kbd>
    </KbdGroup>
    <KbdGroup>
      <Kbd>G</Kbd>
      <span>then</span>
      <Kbd>D</Kbd>
    </KbdGroup>
  </div>
)

export const InButton = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button variant="outline">
      Search
      <Kbd variant="ghost" size="sm">
        ⌘K
      </Kbd>
    </Button>
    <Button variant="secondary">
      Save
      <KbdGroup size="sm">
        <Kbd variant="ghost">⌘</Kbd>
        <Kbd variant="ghost">S</Kbd>
      </KbdGroup>
    </Button>
    <Button>
      Send
      <KbdGroup size="sm">
        <Kbd variant="ghost">⌘</Kbd>
        <Kbd variant="ghost">↵</Kbd>
      </KbdGroup>
    </Button>
  </div>
)
