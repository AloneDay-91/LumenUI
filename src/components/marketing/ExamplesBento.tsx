"use client"

import { useState, type ReactNode } from "react"
import {
  AlignLeft,
  Bell,
  Bold,
  Italic,
  MoreHorizontal,
  Search,
  Underline,
} from "lucide-react"

import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/Accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog"
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@/components/ui/Autocomplete"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Checkbox } from "@/components/ui/Checkbox"
import { CheckboxGroup } from "@/components/ui/CheckboxGroup"
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/components/ui/Collapsible"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/Combobox"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/ContextMenu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import { Field, FieldControl, FieldLabel } from "@/components/ui/Field"
import { Fieldset, FieldsetLegend } from "@/components/ui/Fieldset"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/Menu"
import { Meter } from "@/components/ui/Meter"
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/NumberField"
import { OTPField, OTPFieldInput } from "@/components/ui/OTPField"
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@/components/ui/Popover"
import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from "@/components/ui/PreviewCard"
import { Progress } from "@/components/ui/Progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { ScrollArea } from "@/components/ui/ScrollArea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Skeleton } from "@/components/ui/Skeleton"
import { Slider } from "@/components/ui/Slider"
import { Switch } from "@/components/ui/Switch"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "@/components/ui/Tabs"
import { Textarea } from "@/components/ui/Textarea"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/Toolbar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip"
import { useToastManager } from "@/components/ui/Toast"
import { cn } from "@/lib/utils"

const ACTIVITY = [
  { label: "Oct", value: 46 },
  { label: "Nov", value: 62 },
  { label: "Dec", value: 54 },
  { label: "Jan", value: 78 },
  { label: "Feb", value: 44 },
  { label: "Mar", value: 86 },
]

const MEMBERS = [
  { name: "Camille R.", role: "Studio", initials: "CR", hours: 72 },
  { name: "Noah B.", role: "Docs", initials: "NB", hours: 54 },
  { name: "Lea M.", role: "Design", initials: "LM", hours: 31 },
]

const FILES = [
  "button.tsx",
  "card.tsx",
  "dialog.tsx",
  "field.tsx",
  "select.tsx",
  "tabs.tsx",
  "toast.tsx",
]

const COMPONENTS = ["Accordion", "Button", "Dialog", "Drawer", "Select", "Tabs"]
const STACKS = ["Next.js", "Astro", "Vite", "Remix"]

function Tile({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <Card size="sm" className={cn("h-full min-h-0", className)}>
      {children}
    </Card>
  )
}

function ActivityTile() {
  const toast = useToastManager()
  return (
    <Tile className="md:col-span-4 md:row-span-2">
      <CardHeader>
        <CardTitle>Studio activity</CardTitle>
        <CardDescription>Last six months, billed days.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        <div className="flex h-36 items-end gap-2 md:h-44">
          {ACTIVITY.map((month) => (
            <div key={month.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-foreground/25"
                style={{ height: `${month.value}%` }}
              />
              <span className="font-mono text-[10px] text-muted-foreground">{month.label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-secondary p-3">
            <p className="text-[10px] tracking-wide text-muted-foreground uppercase">Next</p>
            <p className="mt-1 text-sm font-medium">18 Sep 2026</p>
            <p className="text-xs text-muted-foreground">Docs delivery</p>
          </div>
          <div className="rounded-2xl bg-secondary p-3">
            <p className="text-[10px] tracking-wide text-muted-foreground uppercase">Plan</p>
            <p className="mt-1 text-sm font-medium">Accelerated</p>
            <p className="text-xs text-muted-foreground">Weekly</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant="outline"
          onClick={() =>
            toast.add({ title: "Report ready", description: "Export of the last six months." })
          }
        >
          View report
        </Button>
      </CardFooter>
    </Tile>
  )
}

function ThresholdTile() {
  const toast = useToastManager()
  const [amount, setAmount] = useState(2500)

  return (
    <Tile className="md:col-span-2 md:row-span-2">
      <CardHeader>
        <CardTitle>Payout threshold</CardTitle>
        <CardDescription>Minimum before a transfer.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <Field>
          <FieldLabel>Currency</FieldLabel>
          <Select defaultValue="usd">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD — Dollar</SelectItem>
              <SelectItem value="eur">EUR — Euro</SelectItem>
              <SelectItem value="gbp">GBP — Pound</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <div className="grid gap-2">
          <div className="flex items-end justify-between gap-3">
            <Label htmlFor="threshold">Amount</Label>
            <p className="font-mono text-sm tabular-nums">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(amount)}
            </p>
          </div>
          <Slider
            id="threshold"
            min={50}
            max={10000}
            value={amount}
            onValueChange={(value) => {
              const next = Array.isArray(value) ? value[0] : value
              setAmount(next ?? 50)
            }}
          />
        </div>
        <Field>
          <FieldLabel>Notes</FieldLabel>
          <Textarea placeholder="Details…" rows={2} />
        </Field>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() =>
            toast.add({
              title: "Threshold saved",
              description: `${amount.toLocaleString("en-US")} USD before transfer.`,
            })
          }
        >
          Save
        </Button>
      </CardFooter>
    </Tile>
  )
}

function TeamTile() {
  return (
    <Tile className="md:col-span-3">
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>This week’s load.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {MEMBERS.map((member) => (
          <div key={member.initials} className="flex items-center gap-3">
            <PreviewCard>
              <PreviewCardTrigger
                render={
                  <button type="button" className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/30">
                    <Avatar>
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                  </button>
                }
              />
              <PreviewCardContent>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role} · {member.hours} %</p>
              </PreviewCardContent>
            </PreviewCard>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium">{member.name}</p>
                <Badge variant="outline">{member.role}</Badge>
              </div>
              <Progress value={member.hours} className="mt-2" />
            </div>
            <Switch defaultChecked={member.hours > 40} aria-label={`Notify ${member.name}`} />
          </div>
        ))}
      </CardContent>
    </Tile>
  )
}

function InviteTile() {
  const toast = useToastManager()
  return (
    <Tile className="md:col-span-3">
      <CardHeader>
        <CardTitle>Access</CardTitle>
        <CardDescription>Invite someone to the studio.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="invite">
          <TabsList>
            <TabsTab value="invite">Invite</TabsTab>
            <TabsTab value="code">Code</TabsTab>
            <TabsIndicator />
          </TabsList>
          <TabsPanels>
            <TabsPanel value="invite" className="flex flex-col gap-3 pt-3">
              <Field>
                <FieldLabel>E-mail</FieldLabel>
                <FieldControl type="email" placeholder="studio@example.com" />
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox defaultChecked />
                Can publish components
              </label>
              <Button
                onClick={() =>
                  toast.add({
                    title: "Invite sent",
                    description: "A link expires in 48 hours.",
                  })
                }
              >
                Send
              </Button>
            </TabsPanel>
            <TabsPanel value="code" className="flex flex-col gap-3 pt-3">
              <OTPField length={6}>
                <OTPFieldInput />
                <OTPFieldInput />
                <OTPFieldInput />
                <OTPFieldInput />
                <OTPFieldInput />
                <OTPFieldInput />
              </OTPField>
              <NumberField defaultValue={12} min={1} max={48}>
                <Label>Duration (hours)</Label>
                <NumberFieldGroup>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldGroup>
              </NumberField>
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </CardContent>
    </Tile>
  )
}

function PaletteTile() {
  const [query, setQuery] = useState("")
  const commands = [
    "Open the studio",
    "Export tokens",
    "Invite a member",
    "Toggle theme",
  ].filter((item) => item.toLocaleLowerCase("en").includes(query.toLocaleLowerCase("en")))

  return (
    <Tile className="md:col-span-4">
      <CardHeader>
        <CardTitle>Command palette</CardTitle>
        <CardDescription>Search a studio action.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search a command…"
            className="pl-9"
            autoComplete="off"
          />
        </div>
        <div className="divide-y divide-border overflow-hidden rounded-2xl bg-secondary">
          {commands.length === 0 ? (
            <p className="px-3 py-5 text-center text-sm text-muted-foreground">No results.</p>
          ) : (
            commands.map((command) => (
              <button
                key={command}
                type="button"
                className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm hover:bg-background/60"
              >
                {command}
                <kbd className="rounded-lg bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  ⌘K
                </kbd>
              </button>
            ))
          )}
        </div>
      </CardContent>
    </Tile>
  )
}

function NoticesTile() {
  return (
    <Tile className="md:col-span-2">
      <CardHeader>
        <CardTitle>Needs action</CardTitle>
        <CardDescription>Alerts and confirmations.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Alert>
          <AlertTitle>Export queued</AlertTitle>
          <AlertDescription>The token ZIP leaves in a minute.</AlertDescription>
        </Alert>
        <div className="flex flex-wrap gap-2">
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              <Bell />
              Queue
            </DrawerTrigger>
            <DrawerPopup>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Queue</DrawerTitle>
                  <DrawerDescription>Three exports in progress.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="secondary" />}>Close</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </DrawerPopup>
          </Drawer>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              Purge
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Purge the queue?</AlertDialogTitle>
                <AlertDialogDescription>Exports in progress will be cancelled.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose render={<Button variant="ghost" />}>Cancel</AlertDialogClose>
                <AlertDialogClose render={<Button variant="destructive" />}>Purge</AlertDialogClose>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Tile>
  )
}

function EditorTile() {
  return (
    <Tile className="md:col-span-3">
      <CardHeader>
        <CardTitle>Release note</CardTitle>
        <CardDescription>Formatting before publish.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Toolbar aria-label="Formatting">
            <ToolbarButton aria-label="Bold">
              <Bold />
            </ToolbarButton>
            <ToolbarButton aria-label="Italic">
              <Italic />
            </ToolbarButton>
            <ToolbarButton aria-label="Underline">
              <Underline />
            </ToolbarButton>
            <ToolbarSeparator />
            <ToolbarButton>Link</ToolbarButton>
          </Toolbar>
          <ToggleGroup defaultValue={["left"]} aria-label="Alignment">
            <Toggle value="left" aria-label="Left">
              <AlignLeft />
            </Toggle>
            <Toggle value="center">Center</Toggle>
          </ToggleGroup>
        </div>
        <Textarea defaultValue="v0.2.0 — Changelog, novelty dots, examples page." rows={4} />
      </CardContent>
    </Tile>
  )
}

function PublishTile() {
  return (
    <Tile className="md:col-span-3">
      <CardHeader>
        <CardTitle>Publish</CardTitle>
        <CardDescription>Who can see this version.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Fieldset>
          <FieldsetLegend>Visibility</FieldsetLegend>
          <RadioGroup defaultValue="private">
            <Label className="gap-2">
              <RadioGroupItem value="private" />
              Private
            </Label>
            <Label className="gap-2">
              <RadioGroupItem value="team" />
              Team
            </Label>
            <Label className="gap-2">
              <RadioGroupItem value="public" />
              Public
            </Label>
          </RadioGroup>
        </Fieldset>
        <Fieldset>
          <FieldsetLegend>Surfaces</FieldsetLegend>
          <CheckboxGroup defaultValue={["docs"]}>
            <Label className="gap-2">
              <Checkbox value="docs" />
              Documentation
            </Label>
            <Label className="gap-2">
              <Checkbox value="examples" />
              Examples
            </Label>
            <Label className="gap-2">
              <Checkbox value="landing" />
              Home
            </Label>
          </CheckboxGroup>
        </Fieldset>
      </CardContent>
    </Tile>
  )
}

function FaqTile() {
  return (
    <Tile className="md:col-span-3">
      <CardHeader>
        <CardTitle>Questions</CardTitle>
        <CardDescription>What the team asks most.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion>
          <AccordionItem value="copy">
            <AccordionTrigger>Where does the code live?</AccordionTrigger>
            <AccordionPanel>In your repo. You copy the file, not a package.</AccordionPanel>
          </AccordionItem>
          <AccordionItem value="base">
            <AccordionTrigger>Why Base UI?</AccordionTrigger>
            <AccordionPanel>Focus, keyboard, and portals. The chrome stays Lumen.</AccordionPanel>
          </AccordionItem>
          <AccordionItem value="theme">
            <AccordionTrigger>How do I switch to ink?</AccordionTrigger>
            <AccordionPanel>The theme switcher, top right.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Tile>
  )
}

function FilesTile() {
  return (
    <Tile className="md:col-span-3">
      <CardHeader>
        <CardTitle>Files</CardTitle>
        <CardDescription>Right-click to copy or open.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-44">
          <ContextMenu>
            <ContextMenuTrigger className="block">
              <ul className="divide-y divide-border overflow-hidden rounded-2xl bg-secondary">
                {FILES.map((file) => (
                  <li key={file} className="px-3 py-2 font-mono text-xs">
                    {file}
                  </li>
                ))}
              </ul>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Copy path</ContextMenuItem>
              <ContextMenuItem>Open in docs</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </ScrollArea>
      </CardContent>
    </Tile>
  )
}

function SearchTile() {
  return (
    <Tile className="md:col-span-2">
      <CardHeader>
        <CardTitle>Component</CardTitle>
        <CardDescription>Search to paste.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Autocomplete items={COMPONENTS}>
          <AutocompleteInput placeholder="Button, Dialog…" />
          <AutocompleteContent>
            <AutocompleteEmpty>No results</AutocompleteEmpty>
            <AutocompleteList>
              {(item) => (
                <AutocompleteItem key={item} value={item}>
                  {item}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
        <Combobox items={STACKS}>
          <ComboboxInput placeholder="Stack" />
          <ComboboxContent>
            <ComboboxEmpty>No results</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </CardContent>
    </Tile>
  )
}

function QuotaTile() {
  return (
    <Tile className="md:col-span-2">
      <CardHeader>
        <CardTitle>Copy quota</CardTitle>
        <CardDescription>Monthly cap.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Meter value={64} />
        <p className="text-xs text-muted-foreground">64% used.</p>
        <NumberField defaultValue={120} min={10} max={500}>
          <Label>Limit</Label>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </CardContent>
    </Tile>
  )
}

function DetailsTile() {
  return (
    <Tile className="md:col-span-2">
      <CardHeader>
        <CardTitle>Token details</CardTitle>
        <CardDescription>Paper, pills, Inter.</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible defaultOpen>
          <CollapsibleTrigger render={<Button variant="outline" className="w-full" />}>
            Show tokens
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div className="mt-3 space-y-2 text-xs text-muted-foreground">
              <p>Light paper: oklch 0.99, hue 90.</p>
              <p>Ink: #111. Destructive is the only exception.</p>
            </div>
          </CollapsiblePanel>
        </Collapsible>
      </CardContent>
    </Tile>
  )
}

function LoadingTile() {
  return (
    <Tile className="md:col-span-3">
      <CardHeader>
        <CardTitle>Sync in progress</CardTitle>
        <CardDescription>Files are arriving.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </CardContent>
    </Tile>
  )
}

function ProjectTile() {
  const toast = useToastManager()
  return (
    <Tile className="md:col-span-3">
      <CardHeader>
        <CardTitle>New project</CardTitle>
        <CardDescription>Name it, then copy the files.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger render={<Button />}>Create</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New project</DialogTitle>
                <DialogDescription>A folder in your repo, not a package.</DialogDescription>
              </DialogHeader>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <FieldControl defaultValue="lumen-studio" />
              </Field>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
                <DialogClose
                  render={<Button />}
                  onClick={() =>
                    toast.add({ title: "Project created", description: "lumen-studio is ready." })
                  }
                >
                  Create
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>Help</PopoverTrigger>
            <PopoverContent>
              <PopoverTitle>Copy-paste</PopoverTitle>
              <PopoverDescription>You copy the file. It lives in your repo.</PopoverDescription>
            </PopoverContent>
          </Popover>
          <Menu>
            <MenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
              <MoreHorizontal />
              <span className="sr-only">More</span>
            </MenuTrigger>
            <MenuContent>
              <MenuItem>Duplicate</MenuItem>
              <MenuItem>Export</MenuItem>
              <MenuSeparator />
              <MenuItem>Archive</MenuItem>
            </MenuContent>
          </Menu>
        </div>
      </CardContent>
    </Tile>
  )
}

export function ExamplesBento() {
  return (
    <div className="rounded-[28px] bg-secondary/70 p-3 md:p-4">
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <div className="flex min-w-0 items-center gap-3">
          <Tooltip>
            <TooltipTrigger
              render={
                <button type="button" className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/30">
                  <Avatar>
                    <AvatarFallback>LU</AvatarFallback>
                  </Avatar>
                </button>
              }
            />
            <TooltipContent>Studio Lumen</TooltipContent>
          </Tooltip>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Studio Lumen</p>
            <p className="text-xs text-muted-foreground">Composed usages</p>
          </div>
        </div>
        <Badge variant="outline">Copy-paste</Badge>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
        <ActivityTile />
        <ThresholdTile />
        <TeamTile />
        <InviteTile />
        <PaletteTile />
        <NoticesTile />
        <EditorTile />
        <PublishTile />
        <FaqTile />
        <FilesTile />
        <SearchTile />
        <QuotaTile />
        <DetailsTile />
        <LoadingTile />
        <ProjectTile />
      </div>
    </div>
  )
}
