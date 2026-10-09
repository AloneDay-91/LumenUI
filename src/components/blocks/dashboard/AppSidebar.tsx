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
  useSidebar,
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

/** Inset sidebar. Collapses to icons with the SidebarTrigger or ⌘B. */
export function AppSidebar({
  active = "Overview",
  className,
}: {
  active?: string
  className?: string
}) {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <Sidebar variant="inset" collapsible="icon" className={className}>
      <SidebarHeader>
        {collapsed ? (
          <WorkspaceMark />
        ) : (
          <>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="h-12 gap-2.5 px-2">
                  <WorkspaceMark />
                  <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
                    <span className="text-sm font-medium">Acme Inc</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Pro plan · 5 seats
                    </span>
                  </span>
                  <ChevronsUpDown className="text-muted-foreground" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <InputGroup className="mt-1">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search" aria-label="Search" />
              <InputGroupAddon align="end">
                <Kbd size="sm">⌘K</Kbd>
              </InputGroupAddon>
            </InputGroup>
          </>
        )}
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
                    {item.badge && !collapsed ? (
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
        {collapsed ? (
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              EB
            </AvatarFallback>
          </Avatar>
        ) : (
          <>
            <Card size="sm" variant="secondary" className="gap-3 rounded-2xl">
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
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="h-12 gap-2.5 px-2">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      EB
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
                    <span className="text-sm font-medium">Elouan Bruzek</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      elouan@lumen.dev
                    </span>
                  </span>
                  <ChevronsUpDown className="text-muted-foreground" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
