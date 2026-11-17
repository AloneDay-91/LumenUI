"use client"

import * as React from "react"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

/** A row of prompts that scrolls sideways on narrow screens. */
function Suggestions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="suggestions"
      role="group"
      className={cn(
        "flex w-full gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      {...props}
    />
  )
}

/** A short prompt you can send to the agent in one click. */
function Suggestion({
  suggestion,
  onSelect,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onSelect"> & {
  suggestion: string
  onSelect?: (suggestion: string) => void
}) {
  return (
    <Button
      data-slot="suggestion"
      variant="outline"
      size="sm"
      onClick={() => onSelect?.(suggestion)}
      className={cn("shrink-0 font-normal", className)}
      {...props}
    >
      {children ?? suggestion}
    </Button>
  )
}

export { Suggestions, Suggestion }
