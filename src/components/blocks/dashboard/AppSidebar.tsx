"use client"

import {
  BarChart3,
  Box,
  ChevronsUpDown,
  FolderKanban,
  Home,
  LifeBuoy,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/InputGroup"
import { Kbd } from "@/components/ui/Kbd"
import { Progress } from "@/components/ui/Progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/Sidebar"
import { cn } from "@/lib/utils"

type NavItem = { icon: LucideIcon; label: string; badge?: string }

const nav: { label: string; items: NavItem[] }[] = [
  {
    label: "Platform",
    items: [
      { icon: Home, label: "Overview" },
      { icon: BarChart3, label: "Analytics" },
      { icon: ShoppingCart, label: "Orders", badge: "248" },
      { icon: Users, label: "Customers" },
      { icon: Box, label: "Products" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { icon: FolderKanban, label: "Projects", badge: "12" },
      { icon: UserRound, label: "Team" },
      { icon: Settings, label: "Settings" },
    ],
  },
]

function WorkspaceMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground",
        className,
      )}
    >
      A
    </span>
  )
}

/**
 * Inset sidebar. Collapses to icons with the SidebarTrigger or ⌘B; hovering
 * the icons opens it. The content never swaps: labels fade, the search
 * narrows to its icon and the card folds, so collapsing stays smooth.
 */
export function AppSidebar({
  active = "Overview",
  className,
}: {
  active?: string
  className?: string
}) {
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      expandOnHover
      className={className}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Acme Inc">
              <WorkspaceMark />
              <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
                <span className="text-sm font-medium text-foreground">Acme Inc</span>
                <span className="text-xs font-normal text-muted-foreground">
                  Pro plan · 5 seats
                </span>
              </span>
              <ChevronsUpDown className="text-muted-foreground" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <InputGroup className="mt-1 overflow-hidden">
          <InputGroupAddon>
            <Search />
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
      <SidebarContent>
        {nav.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={item.label === active}
                      tooltip={item.label}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.badge ? (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    ) : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help & docs">
              <LifeBuoy />
              <span>Help & docs</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-300 group-data-[collapsible=icon]/sidebar:grid-rows-[0fr] group-data-[collapsible=icon]/sidebar:opacity-0">
          <div className="min-h-0 overflow-hidden">
            <Card
              size="sm"
              variant="secondary"
              className="w-[calc(var(--sidebar-width)-1rem)] gap-3 rounded-2xl"
            >
              <CardHeader className="px-4">
                <CardTitle className="flex items-center gap-1.5">
                  <Sparkles className="size-3.5" />3 of 5 seats used
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-4">
                <Progress value={60} aria-label="Seats used" />
                <p className="text-xs text-muted-foreground">
                  Invite your team before Nov 1 to keep the Pro price.
                </p>
                <Button size="xs" variant="outline" className="self-start">
                  Invite members
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Elouan Bruzek">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  EB
                </AvatarFallback>
              </Avatar>
              <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
                <span className="text-sm font-medium text-foreground">Elouan Bruzek</span>
                <span className="text-xs font-normal text-muted-foreground">
                  elouan@lumen.dev
                </span>
              </span>
              <ChevronsUpDown className="text-muted-foreground" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
