"use client"

import * as React from "react"
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

/**
 * A bar of bulk actions that rises when something is selected and leaves
 * when nothing is: the count, a clear button, and your actions. It is a
 * toolbar, so the arrows move between its buttons. Escape clears.
 */
function SelectionBar({
  className,
  count,
  onClear,
  position = "fixed",
  labels = {},
  children,
}: {
  className?: string
  /** How many items are selected. The bar shows from 1. */
  count: number
  /** Called by the clear button and by Escape. */
  onClear: () => void
  /** `fixed` floats over the page; `absolute` sits in the nearest positioned parent. */
  position?: "fixed" | "absolute"
  labels?: {
    toolbar?: string
    count?: (count: number) => React.ReactNode
    clear?: string
  }
  /** The actions: Buttons, or SelectionBarAction. */
  children?: React.ReactNode
}) {
  const open = count > 0
  // Keep the last count while the bar slides away, so it does not read "0".
  const [shown, setShown] = React.useState(count)
  if (open && shown !== count) setShown(count)

  return (
    <div
      data-slot="selection-bar"
      data-open={open ? "" : undefined}
      className={cn(
        position,
        "inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-[opacity,translate] duration-200",
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
      inert={!open}
    >
      <ToolbarPrimitive.Root
        aria-label={labels.toolbar ?? "Selection actions"}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault()
            onClear()
          }
        }}
        className={cn(
          "flex max-w-full items-center gap-1 overflow-x-auto rounded-4xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10",
          className
        )}
      >
        <span
          aria-live="polite"
          className="shrink-0 ps-2.5 pe-1 text-xs font-medium tabular-nums whitespace-nowrap"
        >
          {labels.count?.(shown) ?? `${shown} selected`}
        </span>
        <ToolbarPrimitive.Button
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={labels.clear ?? "Clear selection"}
              className="text-muted-foreground"
            />
          }
          onClick={onClear}
        >
          <XIcon />
        </ToolbarPrimitive.Button>
        {children ? (
          <ToolbarPrimitive.Separator className="mx-1 h-4 w-px shrink-0 bg-border" />
        ) : null}
        <div className="flex items-center gap-1">{children}</div>
      </ToolbarPrimitive.Root>
    </div>
  )
}

/** A button inside the bar, part of its arrow-key order. */
function SelectionBarAction({
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <ToolbarPrimitive.Button
      render={<Button variant={variant} size="sm" {...props} />}
    />
  )
}

export { SelectionBar, SelectionBarAction }
