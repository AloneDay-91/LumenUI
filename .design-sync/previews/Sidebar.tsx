import * as React from "react"
import {
  BarChart3Icon,
  BoxIcon,
  ChevronsUpDownIcon,
  FolderKanbanIcon,
  HomeIcon,
  LifeBuoyIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingCartIcon,
  SparklesIcon,
  UserRoundIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Kbd,
  Progress,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "lumen-ui"

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

function DemoHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" tooltip="Acme Inc">
            <WorkspaceMark />
            <TwoLines title="Acme Inc" detail="Pro plan · 5 seats" />
            <ChevronsUpDownIcon />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
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
    </SidebarHeader>
  )
}

function NavGroup({ label, items, active = "Overview" }: { label: string; items: NavItem[]; active?: string }) {
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

function SeatsCard() {
  return (
    <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-300 group-data-[collapsible=icon]/sidebar:grid-rows-[0fr] group-data-[collapsible=icon]/sidebar:opacity-0">
      <div className="min-h-0 overflow-hidden">
        <Card size="sm" variant="secondary" className="w-[calc(var(--sidebar-width)-1rem)] gap-3 rounded-2xl">
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

function DemoFooter({ card = false }: { card?: boolean }) {
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
          <SidebarMenuButton size="lg" tooltip="Alex Martin">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">AM</AvatarFallback>
            </Avatar>
            <TwoLines title="Alex Martin" detail="alex@lumen.dev" />
            <ChevronsUpDownIcon />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

function Canvas({ title }: { title: string }) {
  return (
    <SidebarInset>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4 self-center" />
        <p className="text-sm font-medium">{title}</p>
      </header>
      <div aria-hidden className="flex min-h-0 flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-32 rounded-full bg-muted" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-16 rounded-2xl bg-muted" />
          <div className="h-16 rounded-2xl bg-muted" />
          <div className="h-16 rounded-2xl bg-muted" />
        </div>
        <div className="flex-1 rounded-2xl bg-muted" />
      </div>
    </SidebarInset>
  )
}

function AppDemo({
  title,
  variant = "inset",
  collapsible = "icon",
  side,
  content = <DemoNav />,
  footer = <DemoFooter />,
  height = 600,
  defaultOpen,
}: {
  title: string
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  side?: "left" | "right"
  content?: React.ReactNode
  footer?: React.ReactNode
  height?: number
  defaultOpen?: boolean
}) {
  return (
    <div className="overflow-hidden rounded-[min(var(--radius-4xl),24px)] ring-1 ring-foreground/5">
      <SidebarProvider shortcut={false} defaultOpen={defaultOpen} className="min-h-0" style={{ height }}>
        <Sidebar variant={variant} collapsible={collapsible} side={side}>
          <DemoHeader />
          <SidebarContent>{content}</SidebarContent>
          {footer}
          {collapsible === "none" ? null : <SidebarRail />}
        </Sidebar>
        <Canvas title={title} />
      </SidebarProvider>
    </div>
  )
}

export const Inset = () => <AppDemo title="Overview" height={660} footer={<DemoFooter card />} />

export const Flat = () => <AppDemo title="Overview" variant="sidebar" />

export const Floating = () => <AppDemo title="Overview" variant="floating" />

export const IconCollapsed = () => <AppDemo title="Icon" defaultOpen={false} />

export const Submenu = () => (
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
                  <SidebarMenuSubButton href="#" isActive>
                    All orders
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#">Drafts</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#">Returns</SidebarMenuSubButton>
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
)

export const Skeleton = () => (
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
)
