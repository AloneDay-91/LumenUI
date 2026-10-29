"use client"

import * as React from "react"
import {
  BadgeCheckIcon,
  BarChart3Icon,
  BoxIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  FolderKanbanIcon,
  HomeIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingCartIcon,
  SparklesIcon,
  UserRoundIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { Preview } from "@/components/docs/Preview"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/InputGroup"
import { Kbd } from "@/components/ui/Kbd"
import { Progress } from "@/components/ui/Progress"
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
import { Tabs, TabsIndicator, TabsList, TabsTab } from "@/components/ui/Tabs"
import { cn } from "@/lib/utils"

/* Content of the dashboard kit's App sidebar block (/blocks/sidebars). */

type NavItem = { icon: LucideIcon; label: string; badge?: string }

const platform: NavItem[] = [
  { icon: HomeIcon, label: "Overview" },
  { icon: BarChart3Icon, label: "Analytics" },
  { icon: ShoppingCartIcon, label: "Orders", badge: "248" },
  { icon: UsersIcon, label: "Customers" },
  { icon: BoxIcon, label: "Products" },
]

const workspace: NavItem[] = [
  { icon: FolderKanbanIcon, label: "Projects", badge: "12" },
  { icon: UserRoundIcon, label: "Team" },
  { icon: SettingsIcon, label: "Settings" },
]

const teams = [
  { name: "Acme Inc", plan: "Pro plan · 5 seats", mark: "A" },
  { name: "Northwind", plan: "Team plan · 12 seats", mark: "N" },
  { name: "Atelier", plan: "Free plan", mark: "AT" },
] as const

const projects = ["Website redesign", "Mobile app", "Analytics v2"]

/* Variant picker: one per preview, the code below follows it. */

const VARIANTS = ["sidebar", "floating", "inset"] as const
type DemoVariant = (typeof VARIANTS)[number]

const VariantContext = React.createContext<DemoVariant>("inset")

function useDemoVariant() {
  return React.useContext(VariantContext)
}

function VariantPicker({
  value,
  onChange,
}: {
  value: DemoVariant
  onChange: (value: DemoVariant) => void
}) {
  return (
    <div className="flex items-center gap-3 self-start">
      <span className="text-xs text-muted-foreground">Variant</span>
      <Tabs
        value={value}
        onValueChange={(next) => onChange(next as DemoVariant)}
      >
        <TabsList>
          <TabsIndicator />
          {VARIANTS.map((variant) => (
            <TabsTab key={variant} value={variant}>
              {variant}
            </TabsTab>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

/** Sets `variant` on the snippet's <Sidebar>, or adds it. */
function withVariant(code: string, variant: DemoVariant) {
  if (/variant="(sidebar|floating|inset)"/.test(code)) {
    return code.replace(/variant="(sidebar|floating|inset)"/g, `variant="${variant}"`)
  }
  return code.replace(/<Sidebar(?=[\s/>])/g, `<Sidebar variant="${variant}"`)
}

function VariantPreview({
  defaultVariant = "inset",
  code,
  children,
}: {
  defaultVariant?: DemoVariant
  code?: string
  children: React.ReactNode
}) {
  const [variant, setVariant] = React.useState<DemoVariant>(defaultVariant)

  return (
    <VariantContext.Provider value={variant}>
      <Preview className="flex-col items-stretch gap-4">
        <VariantPicker value={variant} onChange={setVariant} />
        {children}
      </Preview>
      {code ? <CodeBlock code={withVariant(code, variant)} /> : null}
    </VariantContext.Provider>
  )
}

/* The demo sidebar, built like the App sidebar block. */

function WorkspaceMark({ mark = "A" }: { mark?: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
      {mark}
    </span>
  )
}

function TwoLines({ title, detail }: { title: string; detail: string }) {
  return (
    <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
      <span className="truncate text-sm font-medium text-foreground">{title}</span>
      <span className="truncate text-xs text-muted-foreground">{detail}</span>
    </span>
  )
}

/** Collapsed, the field narrows to its search icon: nothing jumps. */
function SearchField() {
  return (
    <InputGroup className="mt-1 overflow-hidden">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Search"
        aria-label="Search"
        className="placeholder:transition-opacity group-data-[collapsible=icon]/sidebar:placeholder:opacity-0"
      />
      <InputGroupAddon
        align="end"
        className="transition-opacity duration-200 group-data-[collapsible=icon]/sidebar:opacity-0"
      >
        <Kbd size="sm">⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}

function DemoHeader() {
  const team = teams[0]
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" tooltip={team.name}>
            <WorkspaceMark mark={team.mark} />
            <TwoLines title={team.name} detail={team.plan} />
            <ChevronsUpDownIcon />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SearchField />
    </SidebarHeader>
  )
}

function TeamSwitcherHeader() {
  const [team, setTeam] = React.useState<(typeof teams)[number]>(teams[0])

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<SidebarMenuButton size="lg" tooltip={team.name} />}
            >
              <WorkspaceMark mark={team.mark} />
              <TwoLines title={team.name} detail={team.plan} />
              <ChevronsUpDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="min-w-56">
              {teams.map((item, index) => (
                <DropdownMenuItem key={item.name} onClick={() => setTeam(item)}>
                  {item.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <SearchField />
    </SidebarHeader>
  )
}

function NavGroup({
  label,
  items,
  active = "Overview",
}: {
  label: string
  items: NavItem[]
  active?: string
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton isActive={item.label === active} tooltip={item.label}>
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
              {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function DemoNav() {
  return (
    <>
      <NavGroup label="Platform" items={platform} />
      <NavGroup label="Workspace" items={workspace} />
    </>
  )
}

function AccountButton({ menu = false }: { menu?: boolean }) {
  const content = (
    <>
      <Avatar>
        <AvatarFallback className="bg-primary text-primary-foreground">EB</AvatarFallback>
      </Avatar>
      <TwoLines title="Elouan Bruzek" detail="elouan@lumen.dev" />
      <ChevronsUpDownIcon />
    </>
  )

  if (!menu) {
    return (
      <SidebarMenuButton size="lg" tooltip="Elouan Bruzek">
        {content}
      </SidebarMenuButton>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<SidebarMenuButton size="lg" tooltip="Elouan Bruzek" />}
      >
        {content}
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
  )
}

/** Collapsed, the card folds its height away instead of vanishing. */
function SeatsCard() {
  return (
    <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-300 group-data-[collapsible=icon]/sidebar:grid-rows-[0fr] group-data-[collapsible=icon]/sidebar:opacity-0">
      <div className="min-h-0 overflow-hidden">
        <Card
          size="sm"
          variant="secondary"
          className="w-[calc(var(--sidebar-width)-1rem)] gap-3 rounded-2xl"
        >
          <CardHeader className="px-4">
            <CardTitle className="flex items-center gap-1.5">
              <SparklesIcon className="size-3.5" />3 of 5 seats used
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-4">
            <Progress value={60} aria-label="Seats used" />
            <Button size="xs" variant="outline" className="self-start">
              Invite members
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DemoFooter({ card = false, menu = false }: { card?: boolean; menu?: boolean }) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Help & docs">
            <LifeBuoyIcon />
            <span>Help & docs</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      {card ? <SeatsCard /> : null}
      <SidebarMenu>
        <SidebarMenuItem>
          <AccountButton menu={menu} />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

function Canvas({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <SidebarInset>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4 self-center" />
        <p className="text-sm font-medium">{title}</p>
      </header>
      {children ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4 text-sm text-muted-foreground">
          {children}
        </div>
      ) : (
        <div aria-hidden className="flex min-h-0 flex-1 flex-col gap-3 p-4">
          <div className="h-4 w-32 rounded-full bg-muted" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 rounded-2xl bg-muted" />
            <div className="h-16 rounded-2xl bg-muted" />
            <div className="h-16 rounded-2xl bg-muted" />
          </div>
          <div className="flex-1 rounded-2xl bg-muted" />
        </div>
      )}
    </SidebarInset>
  )
}

function AppDemo({
  title,
  label,
  collapsible = "icon",
  expandOnHover = false,
  side,
  header = <DemoHeader />,
  content = <DemoNav />,
  footer = <DemoFooter />,
  canvas,
  className,
  ...props
}: Omit<React.ComponentProps<typeof SidebarProvider>, "content"> & {
  title: string
  label?: string
  collapsible?: "offcanvas" | "icon" | "none"
  expandOnHover?: boolean
  side?: "left" | "right"
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  canvas?: React.ReactNode
}) {
  const variant = useDemoVariant()

  return (
    <div className="flex min-w-0 flex-col gap-2">
      {label ? <p className="text-xs font-medium text-muted-foreground">{label}</p> : null}
      <div className="overflow-hidden rounded-[min(var(--radius-4xl),24px)] ring-1 ring-foreground/5">
        <SidebarProvider
          shortcut={false}
          className={cn("h-[28rem] min-h-0", className)}
          {...props}
        >
          <Sidebar
            variant={variant}
            collapsible={collapsible}
            expandOnHover={expandOnHover}
            side={side}
          >
            {header}
            <SidebarContent>{content}</SidebarContent>
            {footer}
            {collapsible === "none" ? null : <SidebarRail />}
          </Sidebar>
          <Canvas title={title}>{canvas}</Canvas>
        </SidebarProvider>
      </div>
    </div>
  )
}

/** The main preview at the top of the page: ComponentDocs draws the Preview around it. */
export function SidebarHeroDemo() {
  const [variant, setVariant] = React.useState<DemoVariant>("inset")

  return (
    <VariantContext.Provider value={variant}>
      <VariantPicker value={variant} onChange={setVariant} />
      <AppDemo
        title="Overview"
        className="h-[32rem]"
        expandOnHover
        footer={<DemoFooter card menu />}
      />
    </VariantContext.Provider>
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
    <AppDemo title="Controlled" open={open} onOpenChange={setOpen} canvas={<OpenState />} />
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
        <VariantPreview
          defaultVariant="sidebar"
          code={`<SidebarProvider>
  <Sidebar variant="inset" collapsible="icon">
    <SidebarHeader />
    <SidebarContent />
    <SidebarFooter />
  </Sidebar>
  <SidebarInset />
</SidebarProvider>`}
        >
          <AppDemo title="Overview" />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="collapsible">Collapsible</h2>
        <p>
          <code>offcanvas</code> slides the panel away. <code>icon</code> keeps
          the icons and shows a tooltip. <code>none</code> stays open. The rail
          and <code>SidebarTrigger</code> toggle the first two. <code>⌘B</code>{" "}
          does the same on a single sidebar.
        </p>
        <VariantPreview
          code={`<Sidebar collapsible="icon">
  <SidebarContent />
  <SidebarRail />
</Sidebar>`}
        >
          <AppDemo label="offcanvas" title="Offcanvas" collapsible="offcanvas" />
          <AppDemo label="icon" title="Icon" collapsible="icon" defaultOpen={false} />
          <AppDemo label="none" title="None" collapsible="none" />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="expand-on-hover">Expand on hover</h2>
        <p>
          With <code>collapsible="icon"</code>, <code>expandOnHover</code>{" "}
          opens the collapsed rail while the pointer is over it and closes it
          when the pointer leaves. It opens like the trigger does and pushes
          the page, and it stays open while one of its menus is up.{" "}
          <code>useSidebar().peek</code> tells you when it is open this way.
        </p>
        <VariantPreview
          code={`<SidebarProvider defaultOpen={false}>
  <Sidebar variant="inset" collapsible="icon" expandOnHover>
    <SidebarContent />
  </Sidebar>
  <SidebarInset />
</SidebarProvider>`}
        >
          <AppDemo
            title="Hover the rail"
            defaultOpen={false}
            expandOnHover
            footer={<DemoFooter menu />}
          />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="side">Side</h2>
        <p>
          <code>side</code> places the panel on the left or the right. The
          trigger icon and the inset margin follow.
        </p>
        <VariantPreview code={`<Sidebar side="right" variant="inset" collapsible="icon" />`}>
          <AppDemo label="left" title="Left" side="left" />
          <AppDemo label="right" title="Right" side="right" />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="header">Header</h2>
        <p>
          <code>SidebarHeader</code> sticks to the top. A menu button can open a
          dropdown to switch workspaces.
        </p>
        <VariantPreview
          code={`<SidebarHeader>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
          <WorkspaceMark />
          <span>Acme Inc</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuItem>Northwind</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarHeader>`}
        >
          <AppDemo title="Workspace" header={<TeamSwitcherHeader />} />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="footer">Footer</h2>
        <p>
          <code>SidebarFooter</code> stays pinned. Use it for help, a plan card,
          and the account menu.
        </p>
        <VariantPreview
          code={`<SidebarFooter>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg">
        <Avatar />
        <span>Elouan Bruzek</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarFooter>`}
        >
          <AppDemo title="Account" footer={<DemoFooter card menu />} />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="group">Group</h2>
        <p>
          A group has a label, an optional action, and the menu. The action
          hides when the sidebar is collapsed to icons.
        </p>
        <VariantPreview
          code={`<SidebarGroup>
  <SidebarGroupLabel>Projects</SidebarGroupLabel>
  <SidebarGroupAction aria-label="Add a project">
    <PlusIcon />
  </SidebarGroupAction>
  <SidebarGroupContent>
    <SidebarMenu />
  </SidebarGroupContent>
</SidebarGroup>`}
        >
          <AppDemo
            title="Projects"
            content={
              <>
                <NavGroup label="Platform" items={platform} />
                <SidebarGroup>
                  <SidebarGroupLabel>Projects</SidebarGroupLabel>
                  <SidebarGroupAction aria-label="Add a project">
                    <PlusIcon />
                  </SidebarGroupAction>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {projects.map((name) => (
                        <SidebarMenuItem key={name}>
                          <SidebarMenuButton tooltip={name}>
                            <FolderKanbanIcon />
                            <span>{name}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            }
          />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="collapsible-group">Collapsible group</h2>
        <p>
          Wrap a group in <code>Collapsible</code> and render the label as the
          trigger. The chevron follows <code>data-panel-open</code>.
        </p>
        <VariantPreview
          code={`<Collapsible defaultOpen>
  <SidebarGroup>
    <SidebarGroupLabel
      className="[&[data-panel-open]>svg]:rotate-180"
      render={<CollapsibleTrigger />}
    >
      Workspace
    </SidebarGroupLabel>
    <CollapsiblePanel>
      <SidebarGroupContent />
    </CollapsiblePanel>
  </SidebarGroup>
</Collapsible>`}
        >
          <AppDemo
            title="Workspace"
            content={
              <>
                <NavGroup label="Platform" items={platform} />
                <Collapsible defaultOpen>
                  <SidebarGroup>
                    <SidebarGroupLabel
                      className="[&[data-panel-open]>svg]:rotate-180"
                      render={<CollapsibleTrigger />}
                    >
                      Workspace
                      <ChevronDownIcon className="ml-auto transition-transform" />
                    </SidebarGroupLabel>
                    <CollapsiblePanel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {workspace.map((item) => (
                            <SidebarMenuItem key={item.label}>
                              <SidebarMenuButton tooltip={item.label}>
                                <item.icon />
                                <span>{item.label}</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsiblePanel>
                  </SidebarGroup>
                </Collapsible>
              </>
            }
          />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="menu">Menu</h2>
        <p>
          <code>isActive</code> marks the current row. <code>size</code> is{" "}
          <code>sm</code>, <code>default</code>, or <code>lg</code>.{" "}
          <code>render</code> turns a row into a link.
        </p>
        <VariantPreview
          code={`<SidebarMenuButton size="sm">Small</SidebarMenuButton>
<SidebarMenuButton isActive>Overview</SidebarMenuButton>
<SidebarMenuButton size="lg">Acme Inc</SidebarMenuButton>
<SidebarMenuButton render={<a href="/analytics" />}>Analytics</SidebarMenuButton>`}
        >
          <AppDemo
            title="Menu"
            content={
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="sm" tooltip="Small">
                        <BoxIcon />
                        <span>Small</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Overview">
                        <HomeIcon />
                        <span>Overview</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="lg" tooltip="Acme Inc">
                        <WorkspaceMark />
                        <TwoLines title="Acme Inc" detail="Large row" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip="Analytics"
                        render={<a href="#menu" />}
                      >
                        <BarChart3Icon />
                        <span>Analytics</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            }
          />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="menu-action">Menu action</h2>
        <p>
          <code>SidebarMenuAction</code> sits on the trailing edge and appears
          on hover. It can open a menu.
        </p>
        <VariantPreview
          code={`<SidebarMenuItem>
  <SidebarMenuButton>Website redesign</SidebarMenuButton>
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <SidebarMenuAction aria-label="Website redesign actions">
          <MoreHorizontalIcon />
        </SidebarMenuAction>
      }
    />
    <DropdownMenuContent side="right">
      <DropdownMenuItem>Share</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</SidebarMenuItem>`}
        >
          <AppDemo
            title="Projects"
            content={
              <SidebarGroup>
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {projects.map((name) => (
                      <SidebarMenuItem key={name}>
                        <SidebarMenuButton tooltip={name}>
                          <FolderKanbanIcon />
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
            }
          />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="submenu">Submenu</h2>
        <p>
          <code>SidebarMenuSub</code> nests links under a row. It hides in icon
          mode.
        </p>
        <VariantPreview
          code={`<SidebarMenuItem>
  <SidebarMenuButton>Orders</SidebarMenuButton>
  <SidebarMenuSub>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton href="#" isActive>All orders</SidebarMenuSubButton>
    </SidebarMenuSubItem>
  </SidebarMenuSub>
</SidebarMenuItem>`}
        >
          <AppDemo
            title="Orders"
            content={
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Overview">
                        <HomeIcon />
                        <span>Overview</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Orders">
                        <ShoppingCartIcon />
                        <span>Orders</span>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#submenu" isActive>
                            All orders
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#submenu">Drafts</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#submenu">Returns</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Customers">
                        <UsersIcon />
                        <span>Customers</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            }
          />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="badge">Badge</h2>
        <p>
          <code>SidebarMenuBadge</code> pins an outline badge on the row. It
          hides in icon mode.
        </p>
        <VariantPreview
          code={`<SidebarMenuItem>
  <SidebarMenuButton>Orders</SidebarMenuButton>
  <SidebarMenuBadge>248</SidebarMenuBadge>
</SidebarMenuItem>`}
        >
          <AppDemo title="Orders" />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="skeleton">Skeleton</h2>
        <p>
          <code>SidebarMenuSkeleton</code> holds the row while navigation loads.{" "}
          <code>showIcon</code> reserves the icon slot.
        </p>
        <VariantPreview
          code={`<SidebarMenu>
  {Array.from({ length: 5 }, (_, index) => (
    <SidebarMenuItem key={index}>
      <SidebarMenuSkeleton showIcon />
    </SidebarMenuItem>
  ))}
</SidebarMenu>`}
        >
          <AppDemo
            title="Loading"
            content={
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {platform.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuSkeleton showIcon />
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            }
          />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="separator">Separator</h2>
        <p>
          <code>SidebarSeparator</code> draws a hairline between groups.
        </p>
        <VariantPreview
          code={`<SidebarContent>
  <SidebarGroup />
  <SidebarSeparator />
  <SidebarGroup />
</SidebarContent>`}
        >
          <AppDemo
            title="Sections"
            content={
              <>
                <NavGroup label="Platform" items={platform} />
                <SidebarSeparator />
                <NavGroup label="Workspace" items={workspace} />
              </>
            }
          />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="controlled">Controlled</h2>
        <p>
          Pass <code>open</code> and <code>onOpenChange</code> to own the
          desktop state. <code>useSidebar</code> reads it from anywhere inside
          the provider, including a custom trigger.
        </p>
        <VariantPreview
          code={`const [open, setOpen] = React.useState(true)

<SidebarProvider open={open} onOpenChange={setOpen}>
  <Sidebar collapsible="icon" />
  <SidebarInset />
</SidebarProvider>

const { open, toggleSidebar } = useSidebar()`}
        >
          <ControlledDemo />
        </VariantPreview>
      </section>

      <section className="space-y-4">
        <h2 id="width">Width</h2>
        <p>
          Override <code>--sidebar-width</code> on the provider when one
          sidebar needs a different measure. The icon width stays{" "}
          <code>--sidebar-width-icon</code>.
        </p>
        <VariantPreview
          code={`<SidebarProvider style={{ "--sidebar-width": "20rem" } as React.CSSProperties}>
  <Sidebar />
</SidebarProvider>`}
        >
          <AppDemo label="16rem" title="Default" collapsible="none" />
          <AppDemo
            label="20rem"
            title="Wide"
            collapsible="none"
            style={{ "--sidebar-width": "20rem" } as React.CSSProperties}
          />
        </VariantPreview>
      </section>
    </>
  )
}
