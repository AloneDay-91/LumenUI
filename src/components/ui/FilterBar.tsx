"use client"

import * as React from "react"
import { PlusIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/Menu"
import { cn } from "@/lib/utils"

function FilterBar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="filter-bar"
      role="group"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

type FilterOption = { value: string; label: React.ReactNode; count?: number }

/**
 * One facet: a dashed pill while empty, then a solid pill that names what is
 * picked. Opens a menu of checkboxes that stays open while you tick.
 */
function FilterSelect({
  label,
  options,
  value,
  defaultValue = [],
  onValueChange,
  clearLabel = "Clear filter",
  maxShown = 2,
  className,
}: {
  label: string
  options: FilterOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  clearLabel?: string
  /** Picked labels shown in the pill before it switches to "n selected". */
  maxShown?: number
  className?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const selected = value ?? uncontrolled
  const active = selected.length > 0

  function set(next: string[]) {
    if (value === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  const picked = options.filter((option) => selected.includes(option.value))
  const summary =
    picked.length > maxShown ? (
      `${picked.length} selected`
    ) : (
      picked.map((option, index) => (
        <React.Fragment key={option.value}>
          {index > 0 ? ", " : null}
          {option.label}
        </React.Fragment>
      ))
    )

  return (
    <Menu>
      <MenuTrigger
        render={
          <Button
            data-slot="filter-select"
            data-active={active ? "" : undefined}
            variant="outline"
            size="sm"
            className={cn(
              !active && "border-dashed text-muted-foreground",
              active && "max-w-72",
              className
            )}
          />
        }
      >
        {active ? null : <PlusIcon data-icon="inline-start" aria-hidden />}
        <span className={cn(active && "text-muted-foreground")}>{label}</span>
        {active ? (
          <>
            <span aria-hidden className="h-3.5 w-px bg-border" />
            <span className="min-w-0 truncate font-medium text-foreground">{summary}</span>
          </>
        ) : null}
      </MenuTrigger>
      <MenuContent align="start" className="w-auto min-w-48">
        {options.map((option) => (
          <MenuCheckboxItem
            key={option.value}
            checked={selected.includes(option.value)}
            closeOnClick={false}
            onCheckedChange={(checked) =>
              set(
                checked
                  ? [...selected, option.value]
                  : selected.filter((item) => item !== option.value)
              )
            }
          >
            <span className="flex-1">{option.label}</span>
            {option.count !== undefined ? (
              <span className="font-mono text-muted-foreground tabular-nums">
                {option.count}
              </span>
            ) : null}
          </MenuCheckboxItem>
        ))}
        {active ? (
          <>
            <MenuSeparator />
            <MenuItem onClick={() => set([])}>{clearLabel}</MenuItem>
          </>
        ) : null}
      </MenuContent>
    </Menu>
  )
}

/** Resets every filter. Render it only while one is active. */
function FilterBarClear({
  children = "Reset",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button data-slot="filter-bar-clear" variant="ghost" size="sm" {...props}>
      {children}
      <XIcon data-icon="inline-end" aria-hidden />
    </Button>
  )
}

export { FilterBar, FilterSelect, FilterBarClear }
export type { FilterOption }
