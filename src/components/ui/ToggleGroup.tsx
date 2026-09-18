"use client"

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"

import { cn } from "@/lib/utils"

function ToggleGroup({ className, ...props }: ToggleGroupPrimitive.Props) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      className={cn(
        "flex w-fit items-center justify-center gap-0.5 rounded-full bg-muted p-0.5",
        "data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup }
