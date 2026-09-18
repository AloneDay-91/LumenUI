"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

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

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative z-1 flex w-fit gap-0.5 rounded-full bg-muted p-0.5",
        "data-[orientation=vertical]:flex-col",
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
      className={cn("text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTab, TabsIndicator, TabsPanels, TabsPanel }
