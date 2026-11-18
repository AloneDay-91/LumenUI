"use client"

import type { ReactNode } from "react"
import { BoldIcon, ChevronUpIcon, ItalicIcon, SearchIcon, UnderlineIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/AvatarGroup"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ButtonGroup } from "@/components/ui/ButtonGroup"
import { Checkbox } from "@/components/ui/Checkbox"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/InputGroup"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/Item"
import { Kbd, KbdGroup } from "@/components/ui/Kbd"
import { Label } from "@/components/ui/Label"
import { Progress } from "@/components/ui/Progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { Slider } from "@/components/ui/Slider"
import { Switch } from "@/components/ui/Switch"
import { Toggle } from "@/components/ui/Toggle"

export interface ComponentExample {
  /** The component's name, as the registry lists it. */
  name: string
  /** A small live example of it. */
  example: ReactNode
}

/**
 * Three rows of live components, the controls the Customize page previews:
 * what "Install all" puts in your repo.
 */
export const COMPONENT_EXAMPLES: readonly (readonly ComponentExample[])[] = [
  [
    {
      name: "Button",
      example: (
        <div className="flex gap-1.5">
          <Button>Button</Button>
          <Button size="sm" variant="secondary">Secondary</Button>
          <Button size="sm" variant="outline">Outline</Button>
        </div>
      ),
    },
    {
      name: "Item",
      example: (
        <Item variant="outline" size="xs" className="flex-nowrap px-2.5">
          <ItemContent className="min-w-0">
            <ItemTitle className="text-xs">Two-factor authentication</ItemTitle>
            <ItemDescription className="truncate text-[11px]">Verify via email or phone.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="secondary" size="xs">Enable</Button>
          </ItemActions>
        </Item>
      ),
    },
    {
      name: "Slider",
      example: <Slider defaultValue={62} aria-label="Density" className="w-full" />,
    },
    {
      name: "Badge",
      example: (
        <div className="flex gap-1.5">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge color="jade">Live</Badge>
        </div>
      ),
    },
  ],
  [
    {
      name: "Input Group",
      example: (
        <InputGroup className="w-full">
          <InputGroupInput readOnly tabIndex={-1} placeholder="Search components" aria-label="Search" />
          <InputGroupAddon align="end">
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      ),
    },
    {
      name: "Switch",
      example: (
        <div className="flex w-full items-center justify-between text-xs">
          Public preset
          <Switch defaultChecked aria-label="Public preset" />
        </div>
      ),
    },
    {
      name: "Button Group",
      example: (
        <ButtonGroup>
          <Button size="sm" variant="outline">Button group</Button>
          <Button size="icon-sm" variant="outline" aria-label="More actions">
            <ChevronUpIcon />
          </Button>
        </ButtonGroup>
      ),
    },
    {
      name: "Checkbox",
      example: (
        <div className="flex items-center gap-4">
          <Label className="font-normal">
            <Checkbox defaultChecked aria-label="Include styles" /> Styles
          </Label>
          <Label className="font-normal">
            <Checkbox aria-label="Include tests" /> Tests
          </Label>
          <RadioGroup defaultValue="copy" aria-label="Install" className="flex-row gap-2">
            <RadioGroupItem value="copy" aria-label="Copy source" />
            <RadioGroupItem value="cli" aria-label="Use the CLI" />
          </RadioGroup>
        </div>
      ),
    },
  ],
  [
    {
      name: "Avatar Group",
      example: (
        <AvatarGroup>
          {["AL", "GH", "KJ"].map((initials) => (
            <Avatar key={initials} className="size-7">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount count={4} className="size-7" />
        </AvatarGroup>
      ),
    },
    {
      name: "Progress",
      example: (
        <div className="flex w-full flex-col gap-1.5">
          <div className="flex justify-between text-xs">
            <span>Uploading</span>
            <span className="text-muted-foreground tabular-nums">68%</span>
          </div>
          <Progress value={68} aria-label="Uploading" />
        </div>
      ),
    },
    {
      name: "Kbd",
      example: (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          Search
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
      ),
    },
    {
      name: "Toggle",
      example: (
        <div className="flex gap-1">
          <Toggle defaultPressed aria-label="Bold">
            <BoldIcon />
          </Toggle>
          <Toggle aria-label="Italic">
            <ItalicIcon />
          </Toggle>
          <Toggle aria-label="Underline">
            <UnderlineIcon />
          </Toggle>
        </div>
      ),
    },
  ],
]
