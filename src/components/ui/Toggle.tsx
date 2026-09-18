"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"

import { cn } from "@/lib/utils"

function Toggle({ className, ...props }: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-medium whitespace-nowrap text-muted-foreground outline-none select-none",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:relative focus-visible:z-1 focus-visible:ring-3 focus-visible:ring-ring/30",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-pressed:bg-muted data-pressed:text-foreground",
        "in-data-[slot=toggle-group]:h-7 in-data-[slot=toggle-group]:hover:bg-transparent",
        "in-data-[slot=toggle-group]:data-pressed:bg-background in-data-[slot=toggle-group]:data-pressed:shadow-sm in-data-[slot=toggle-group]:data-pressed:ring-1 in-data-[slot=toggle-group]:data-pressed:ring-foreground/5",
        "in-data-[slot=toggle-group]:data-pressed:hover:bg-background",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

export { Toggle }
