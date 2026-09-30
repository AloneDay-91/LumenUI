"use client"

import * as React from "react"
import {
  BadgeCheckIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  FrameIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  MousePointerClickIcon,
  PlusIcon,
  SquareTerminalIcon,
  TableIcon,
} from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { Preview } from "@/components/docs/Preview"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Separator } from "@/components/ui/Separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/Sidebar"

const teams = [
  { name: "Studio", plan: "Personal", mark: "LU" },
  { name: "Northwind", plan: "Team", mark: "NW" },
  { name: "Atelier", plan: "Free", mark: "AT" },
] as const

function LabeledFrame({
  label,
  children,
  className,
  ...props
}: React.ComponentProps<typeof SidebarProvider> & { label: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="overflow-hidden rounded-2xl ring-1 ring-foreground/5">
        <SidebarProvider
          shortcut={false}
          className={className ?? "h-72 min-h-0"}
          {...props}
        >
          {children}
        </SidebarProvider>
      </div>
    </div>
  )
}

function FullFrame({
  children,
  className,
  ...props
}: React.ComponentProps<typeof SidebarProvider>) {
  return (
    <SidebarProvider
      shortcut={false}
      className={className ?? "h-80 min-h-0"}
      {...props}
    >
      {children}
    </SidebarProvider>
  )
}

function Canvas({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <SidebarInset>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <p className="text-sm font-medium">{title}</p>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4 text-sm text-muted-foreground">
        {children ?? title}
      </div>
    </SidebarInset>
  )
}

function SampleMenu() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip="Playground">
              <SquareTerminalIcon />
              <span>Playground</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Components">
              <FrameIcon />
              <span>Components</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function VariantDemo({
  variant,
  label,
}: {
  variant: "sidebar" | "floating" | "inset"
  label: string
}) {
  return (
    <LabeledFrame label={label}>
      <Sidebar variant={variant} collapsible="none">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <span>{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SampleMenu />
        </SidebarContent>
      </Sidebar>
      <Canvas title={label} />
    </LabeledFrame>
  )
}

function CollapsibleDemo({
  collapsible,
  label,
  defaultOpen = true,
}: {
  collapsible: "offcanvas" | "icon" | "none"
  label: string
  defaultOpen?: boolean
}) {
  return (
    <LabeledFrame label={label} defaultOpen={defaultOpen}>
      <Sidebar variant="inset" collapsible={collapsible}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={label}>
                <SquareTerminalIcon />
                <span>{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SampleMenu />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <Canvas title={label} />
    </LabeledFrame>
  )
}

function SideDemo({ side }: { side: "left" | "right" }) {
  const label = side === "left" ? "Left" : "Right"
  return (
    <LabeledFrame label={label}>
      <Sidebar side={side} variant="inset" collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={label}>
                <FrameIcon />
                <span>{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SampleMenu />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <Canvas title={label} />
    </LabeledFrame>
  )
}

function HeaderDemo() {
  const [team, setTeam] = React.useState<(typeof teams)[number]>(teams[0])

  return (
    <FullFrame>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<SidebarMenuButton size="lg" tooltip={team.name} />}
                >
                  <Avatar className="size-6">
                    <AvatarFallback className="text-[10px]">{team.mark}</AvatarFallback>
                  </Avatar>
                  <span className="grid flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-medium">{team.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {team.plan}
                    </span>
                  </span>
                  <ChevronsUpDownIcon className="ml-auto" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="min-w-52">
                  {teams.map((item, index) => (
                    <DropdownMenuItem key={item.name} onClick={() => setTeam(item)}>
                      <Avatar className="size-5">
                        <AvatarFallback className="text-[10px]">{item.mark}</AvatarFallback>
                      </Avatar>
                      {item.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SampleMenu />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <Canvas title={team.name} />
    </FullFrame>
  )
}

function FooterDemo() {
  return (
    <FullFrame>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarContent>
          <SampleMenu />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<SidebarMenuButton size="lg" tooltip="Camille R." />}
                >
                  <Avatar className="size-6">
                    <AvatarFallback className="text-[10px]">CR</AvatarFallback>
                  </Avatar>
                  <span className="grid flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-medium">Camille R.</span>
                    <span className="truncate text-xs text-muted-foreground">
                      camille@studio.dev
                    </span>
                  </span>
                  <ChevronsUpDownIcon className="ml-auto" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="end" className="min-w-52">
                  <DropdownMenuItem>
                    <BadgeCheckIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOutIcon />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <Canvas title="Account" />
    </FullFrame>
  )
}

function OpenState() {
  const { open, toggleSidebar } = useSidebar()

  return (
    <>
      <p>{open ? "Expanded" : "Collapsed"}</p>
      <Button variant="outline" size="sm" onClick={toggleSidebar}>
        Toggle
      </Button>
    </>
  )
}

function ControlledDemo() {
  const [open, setOpen] = React.useState(true)

  return (
    <FullFrame open={open} onOpenChange={setOpen}>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarContent>
          <SampleMenu />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <Canvas title="Controlled">
        <OpenState />
      </Canvas>
    </FullFrame>
  )
}

export function SidebarExamples() {
  return (
    <>
      <section className="space-y-4">
        <h2 id="variants">Variants</h2>
        <p>
          <code>sidebar</code> is a flat column. <code>floating</code> and{" "}
          <code>inset</code> sit on a muted wash. Pair <code>inset</code> with{" "}
          <code>SidebarInset</code> so the page becomes the paper card.
        </p>
        <Preview className="flex-col items-stretch gap-6">
          <VariantDemo variant="sidebar" label="Sidebar" />
          <VariantDemo variant="floating" label="Floating" />
          <VariantDemo variant="inset" label="Inset" />
        </Preview>
        <CodeBlock
          code={`<SidebarProvider>
  <Sidebar variant="inset" collapsible="none">
    <SidebarContent />
  </Sidebar>
  <SidebarInset />
</SidebarProvider>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="collapsible">Collapsible</h2>
        <p>
          <code>offcanvas</code> slides the panel away. <code>icon</code> keeps
          the icons and shows a tooltip. <code>none</code> stays open. The rail
          and <code>SidebarTrigger</code> toggle the first two. <code>⌘B</code>{" "}
          does the same on a single sidebar.
        </p>
        <Preview className="flex-col items-stretch gap-6">
          <CollapsibleDemo collapsible="offcanvas" label="Offcanvas" />
          <CollapsibleDemo
            collapsible="icon"
            label="Icon"
            defaultOpen={false}
          />
          <CollapsibleDemo collapsible="none" label="None" />
        </Preview>
        <CodeBlock
          code={`<Sidebar collapsible="icon">
  <SidebarContent />
  <SidebarRail />
</Sidebar>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="side">Side</h2>
        <p>
          <code>side</code> places the panel on the left or the right. The
          trigger icon and the inset margin follow.
        </p>
        <Preview className="flex-col items-stretch gap-6">
          <SideDemo side="left" />
          <SideDemo side="right" />
        </Preview>
        <CodeBlock code={`<Sidebar side="right" variant="inset" collapsible="icon" />`} />
      </section>

      <section className="space-y-4">
        <h2 id="header">Header</h2>
        <p>
          <code>SidebarHeader</code> sticks to the top. A menu button can open a
          dropdown to switch workspaces.
        </p>
        <Preview className="overflow-hidden p-0">
          <HeaderDemo />
        </Preview>
        <CodeBlock
          code={`<SidebarHeader>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
          Studio
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuItem>Northwind</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarHeader>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="footer">Footer</h2>
        <p>
          <code>SidebarFooter</code> stays pinned. Use it for the account menu.
        </p>
        <Preview className="overflow-hidden p-0">
          <FooterDemo />
        </Preview>
        <CodeBlock
          code={`<SidebarFooter>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg">
        <span>Camille R.</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarFooter>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="group">Group</h2>
        <p>
          A group has a label, an optional action, and the menu. The action
          hides when the sidebar is collapsed to icons.
        </p>
        <Preview className="overflow-hidden p-0">
          <FullFrame>
            <Sidebar variant="inset" collapsible="none">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Projects</SidebarGroupLabel>
                  <SidebarGroupAction aria-label="Add a project">
                    <PlusIcon />
                  </SidebarGroupAction>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <FrameIcon />
                          <span>Design</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <TableIcon />
                          <span>Research</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <Canvas title="Projects" />
          </FullFrame>
        </Preview>
        <CodeBlock
          code={`<SidebarGroup>
  <SidebarGroupLabel>Projects</SidebarGroupLabel>
  <SidebarGroupAction aria-label="Add a project">
    <PlusIcon />
  </SidebarGroupAction>
  <SidebarGroupContent>
    <SidebarMenu />
  </SidebarGroupContent>
</SidebarGroup>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="collapsible-group">Collapsible group</h2>
        <p>
          Wrap a group in <code>Collapsible</code> and render the label as the
          trigger. The chevron follows <code>data-panel-open</code>.
        </p>
        <Preview className="overflow-hidden p-0">
          <FullFrame>
            <Sidebar variant="inset" collapsible="none">
              <SidebarContent>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel
                      className="[&[data-panel-open]>svg]:rotate-180"
                      render={<CollapsibleTrigger />}
                    >
                      Library
                      <ChevronDownIcon className="ml-auto transition-transform" />
                    </SidebarGroupLabel>
                    <CollapsiblePanel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <MousePointerClickIcon />
                              <span>Button</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <TableIcon />
                              <span>Table</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsiblePanel>
                  </SidebarGroup>
                </Collapsible>
              </SidebarContent>
            </Sidebar>
            <Canvas title="Library" />
          </FullFrame>
        </Preview>
        <CodeBlock
          code={`<Collapsible defaultOpen>
  <SidebarGroup>
    <SidebarGroupLabel
      className="[&[data-panel-open]>svg]:rotate-180"
      render={<CollapsibleTrigger />}
    >
      Library
    </SidebarGroupLabel>
    <CollapsiblePanel>
      <SidebarGroupContent />
    </CollapsiblePanel>
  </SidebarGroup>
</Collapsible>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="menu">Menu</h2>
        <p>
          <code>isActive</code> marks the current row. <code>size</code> follows
          the button scale. <code>render</code> turns a row into a link.
        </p>
        <Preview className="overflow-hidden p-0">
          <FullFrame>
            <Sidebar variant="inset" collapsible="none">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton size="sm">
                          <span>Small</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive>
                          <SquareTerminalIcon />
                          <span>Active</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                          <FrameIcon />
                          <span>Large</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton render={<a href="#playground" />}>
                          <span>Link</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <Canvas title="Menu" />
          </FullFrame>
        </Preview>
        <CodeBlock
          code={`<SidebarMenuButton isActive>Active</SidebarMenuButton>
<SidebarMenuButton size="lg">Large</SidebarMenuButton>
<SidebarMenuButton render={<a href="#playground" />}>Link</SidebarMenuButton>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="menu-action">Menu action</h2>
        <p>
          <code>SidebarMenuAction</code> sits on the trailing edge and appears
          on hover. It can open a menu.
        </p>
        <Preview className="overflow-hidden p-0">
          <FullFrame>
            <Sidebar variant="inset" collapsible="none">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Projects</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {["Design", "Research", "Travel"].map((name) => (
                        <SidebarMenuItem key={name}>
                          <SidebarMenuButton>
                            <FrameIcon />
                            <span>{name}</span>
                          </SidebarMenuButton>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <SidebarMenuAction aria-label={`${name} actions`}>
                                  <MoreHorizontalIcon />
                                </SidebarMenuAction>
                              }
                            />
                            <DropdownMenuContent side="right" align="start">
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <Canvas title="Projects" />
          </FullFrame>
        </Preview>
        <CodeBlock
          code={`<SidebarMenuItem>
  <SidebarMenuButton>Design</SidebarMenuButton>
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <SidebarMenuAction aria-label="Design actions">
          <MoreHorizontalIcon />
        </SidebarMenuAction>
      }
    />
    <DropdownMenuContent side="right">
      <DropdownMenuItem>Share</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</SidebarMenuItem>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="submenu">Submenu</h2>
        <p>
          <code>SidebarMenuSub</code> nests links under a row. It hides in icon
          mode.
        </p>
        <Preview className="overflow-hidden p-0">
          <FullFrame>
            <Sidebar variant="inset" collapsible="none">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive>
                          <SquareTerminalIcon />
                          <span>Playground</span>
                        </SidebarMenuButton>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton href="#" isActive>
                              History
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton href="#">Starred</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton href="#">Settings</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <Canvas title="Playground" />
          </FullFrame>
        </Preview>
        <CodeBlock
          code={`<SidebarMenuItem>
  <SidebarMenuButton>Playground</SidebarMenuButton>
  <SidebarMenuSub>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton href="#" isActive>History</SidebarMenuSubButton>
    </SidebarMenuSubItem>
  </SidebarMenuSub>
</SidebarMenuItem>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="badge">Badge</h2>
        <p>
          <code>SidebarMenuBadge</code> pins an outline badge on the row. It
          hides in icon mode.
        </p>
        <Preview className="overflow-hidden p-0">
          <FullFrame>
            <Sidebar variant="inset" collapsible="none">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <FrameIcon />
                          <span>Components</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>56</SidebarMenuBadge>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <SquareTerminalIcon />
                          <span>Drafts</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>3</SidebarMenuBadge>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <Canvas title="Inbox" />
          </FullFrame>
        </Preview>
        <CodeBlock
          code={`<SidebarMenuItem>
  <SidebarMenuButton>Components</SidebarMenuButton>
  <SidebarMenuBadge>56</SidebarMenuBadge>
</SidebarMenuItem>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="skeleton">Skeleton</h2>
        <p>
          <code>SidebarMenuSkeleton</code> holds the row while navigation loads.{" "}
          <code>showIcon</code> reserves the icon slot.
        </p>
        <Preview className="overflow-hidden p-0">
          <FullFrame>
            <Sidebar variant="inset" collapsible="none">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {["one", "two", "three", "four"].map((id) => (
                        <SidebarMenuItem key={id}>
                          <SidebarMenuSkeleton showIcon />
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <Canvas title="Loading" />
          </FullFrame>
        </Preview>
        <CodeBlock
          code={`<SidebarMenu>
  {Array.from({ length: 4 }, (_, index) => (
    <SidebarMenuItem key={index}>
      <SidebarMenuSkeleton showIcon />
    </SidebarMenuItem>
  ))}
</SidebarMenu>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="separator">Separator</h2>
        <p>
          <code>SidebarSeparator</code> draws a hairline between groups.
        </p>
        <Preview className="overflow-hidden p-0">
          <FullFrame>
            <Sidebar variant="inset" collapsible="none">
              <SidebarContent>
                <SampleMenu />
                <SidebarSeparator />
                <SidebarGroup>
                  <SidebarGroupLabel>Library</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <MousePointerClickIcon />
                          <span>Button</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <Canvas title="Sections" />
          </FullFrame>
        </Preview>
        <CodeBlock
          code={`<SidebarContent>
  <SidebarGroup />
  <SidebarSeparator />
  <SidebarGroup />
</SidebarContent>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="controlled">Controlled</h2>
        <p>
          Pass <code>open</code> and <code>onOpenChange</code> to own the
          desktop state. <code>useSidebar</code> reads it from anywhere inside
          the provider, including a custom trigger.
        </p>
        <Preview className="overflow-hidden p-0">
          <ControlledDemo />
        </Preview>
        <CodeBlock
          code={`const [open, setOpen] = React.useState(true)

<SidebarProvider open={open} onOpenChange={setOpen}>
  <Sidebar collapsible="icon" />
  <SidebarInset />
</SidebarProvider>

const { open, toggleSidebar } = useSidebar()`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="width">Width</h2>
        <p>
          Override <code>--sidebar-width</code> on the provider when one
          sidebar needs a different measure. The icon width stays{" "}
          <code>--sidebar-width-icon</code>.
        </p>
        <Preview className="flex-col items-stretch gap-6">
          <LabeledFrame label="16rem">
            <Sidebar collapsible="none">
              <SidebarContent>
                <SampleMenu />
              </SidebarContent>
            </Sidebar>
            <Canvas title="Default" />
          </LabeledFrame>
          <LabeledFrame
            label="22rem"
            style={{ "--sidebar-width": "22rem" } as React.CSSProperties}
          >
            <Sidebar collapsible="none">
              <SidebarContent>
                <SampleMenu />
              </SidebarContent>
            </Sidebar>
            <Canvas title="Wide" />
          </LabeledFrame>
        </Preview>
        <CodeBlock
          code={`<SidebarProvider style={{ "--sidebar-width": "22rem" } as React.CSSProperties}>
  <Sidebar />
</SidebarProvider>`}
        />
      </section>
    </>
  )
}
