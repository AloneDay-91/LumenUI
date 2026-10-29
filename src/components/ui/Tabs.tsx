"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

import "./tabs.css"

type TabsListVariant = "pill" | "line"
type TabsTone = "gray" | "indigo" | "cyan" | "orange" | "crimson" | "jade"

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(
        "flex flex-col gap-3 data-[orientation=vertical]:flex-row",
        className
      )}
      {...props}
    />
  )
}

function TabsList({
  className,
  variant = "pill",
  color,
  highContrast = false,
  ...props
}: TabsPrimitive.List.Props & {
  variant?: TabsListVariant
  color?: TabsTone
  highContrast?: boolean
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-color={color}
      data-high-contrast={highContrast ? "true" : undefined}
      className={cn(
        "group/tabs-list relative z-1 flex w-fit",
        variant === "pill" && "gap-0.5 rounded-full bg-muted p-0.5",
        variant === "line" && "gap-1 border-b border-border",
        "data-[orientation=vertical]:flex-col",
        variant === "line" &&
          "data-[orientation=vertical]:border-r data-[orientation=vertical]:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cn(
        "relative z-10 inline-flex h-7 items-center justify-center rounded-full px-3 text-xs font-medium whitespace-nowrap text-muted-foreground outline-none select-none",
        "hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30",
        "data-active:text-foreground",
        "group-data-[variant=line]/tabs-list:h-8 group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:px-2.5",
        "group-data-[variant=line]/tabs-list:data-active:text-(--tabs-active)",
        "data-[orientation=vertical]:w-full",
        className
      )}
      {...props}
    />
  )
}

function TabsIndicator({
  className,
  renderBeforeHydration = true,
  ...props
}: TabsPrimitive.Indicator.Props) {
  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      renderBeforeHydration={renderBeforeHydration}
      className={cn(
        "rounded-full bg-background ring-1 ring-foreground/5 dark:ring-foreground/10",
        "group-data-[variant=line]/tabs-list:h-0.5 group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-(--tabs-line) group-data-[variant=line]/tabs-list:ring-0 group-data-[variant=line]/tabs-list:shadow-none",
        "group-data-[variant=line]/tabs-list:[translate:var(--active-tab-left)_calc(var(--active-tab-top)_+_var(--active-tab-height)_-_2px)]",
        "group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs-list:h-(--active-tab-height) group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs-list:w-0.5",
        "group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs-list:[translate:calc(var(--active-tab-left)_+_var(--active-tab-width)_-_2px)_var(--active-tab-top)]",
        className
      )}
      {...props}
    />
  )
}

function TabsPanels({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tabs-panels"
      className={cn("relative min-h-16 overflow-hidden", className)}
      {...props}
    />
  )
}

function TabsPanel({
  className,
  keepMounted = true,
  ...props
}: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      keepMounted={keepMounted}
      className={cn("text-xs outline-none", className)}
      {...props}
    />
  )
}

export {
  Tabs,
  TabsList,
  TabsTab,
  TabsIndicator,
  TabsPanels,
  TabsPanel,
  type TabsListVariant,
  type TabsTone,
}
