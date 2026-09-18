"use client"

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

function Toolbar({ className, ...props }: ToolbarPrimitive.Root.Props) {
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      className={cn(
        "flex w-fit items-center gap-1 rounded-full border border-border bg-background p-1",
        className
      )}
      {...props}
    />
  )
}

function ToolbarButton({ className, ...props }: ToolbarPrimitive.Button.Props) {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), className)}
      {...props}
    />
  )
}

function ToolbarSeparator({
  className,
  ...props
}: ToolbarPrimitive.Separator.Props) {
  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      className={cn("h-4 w-px bg-border", className)}
      {...props}
    />
  )
}

function ToolbarGroup({ className, ...props }: ToolbarPrimitive.Group.Props) {
  return (
    <ToolbarPrimitive.Group
      data-slot="toolbar-group"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

export { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarGroup }
