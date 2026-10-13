"use client"

import { Bell, ChevronDown, Moon, Search, Sun } from "lucide-react"
import { Fragment } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/InputGroup"
import { Kbd } from "@/components/ui/Kbd"
import { Separator } from "@/components/ui/Separator"
import { SidebarTrigger } from "@/components/ui/Sidebar"

/** The bar above the page: sidebar toggle, breadcrumb, search and account. Renders inside a SidebarProvider. */
export function AppHeader({
  crumbs = ["Dashboard", "Overview"],
}: {
  crumbs?: string[]
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mx-1 h-4 self-center" />
      <Breadcrumb className="min-w-0">
        <BreadcrumbList className="flex-nowrap">
          {crumbs.map((crumb, index) =>
            index === crumbs.length - 1 ? (
              <BreadcrumbItem key={crumb}>
                <BreadcrumbPage>{crumb}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <Fragment key={crumb}>
                <BreadcrumbItem className="hidden sm:inline-flex">
                  <BreadcrumbLink href="#">{crumb}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:inline-flex" />
              </Fragment>
            ),
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-1" />
      <InputGroup className="hidden w-72 md:flex">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search orders, customers…"
          aria-label="Search"
        />
        <InputGroupAddon align="end">
          <Kbd size="sm">⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <Sun className="dark:hidden" />
        <Moon className="hidden dark:block" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Notifications"
        className="relative"
      >
        <Bell />
        <span className="absolute top-1.5 right-2 size-1.5 rounded-full bg-new" />
      </Button>
      <Separator
        orientation="vertical"
        className="mx-1 hidden h-4 self-center sm:block"
      />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" className="h-9 gap-2 ps-1 pe-2.5" />}
        >
          <Avatar className="size-7">
            <AvatarFallback className="bg-primary text-primary-foreground">
              EB
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-xs font-medium sm:inline">Elouan</span>
          <ChevronDown className="text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
