import * as React from "react"

import { cn } from "@/lib/utils"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-2xl border border-transparent bg-input/50 transition-colors",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
        "has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20",
        "has-disabled:pointer-events-none has-disabled:opacity-50",
        "dark:bg-input/30",
        "[&_[data-slot=input]]:h-full [&_[data-slot=input]]:min-w-0 [&_[data-slot=input]]:flex-1",
        "[&_[data-slot=input]]:rounded-none [&_[data-slot=input]]:border-0 [&_[data-slot=input]]:bg-transparent",
        "[&_[data-slot=input]]:shadow-none [&_[data-slot=input]]:focus-visible:border-transparent [&_[data-slot=input]]:focus-visible:ring-0",
        className
      )}
      {...props}
    />
  )
}

function InputGroupAddon({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end"
}) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "flex h-full shrink-0 items-center gap-1 text-xs text-muted-foreground [&_svg]:size-3.5",
        align === "start" ? "ps-3 pe-1" : "ps-1 pe-3",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground",
        "group-has-data-[align=start]/input-group:ps-1 group-has-data-[align=end]/input-group:pe-1",
        className
      )}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn("font-mono text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText }
