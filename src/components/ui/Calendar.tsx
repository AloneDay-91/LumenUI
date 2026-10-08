"use client"

import { DayPicker, type DayButtonProps, type RootProps } from "@daypicker/react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/Button"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

function CalendarMonthGrid(props: React.ComponentProps<"table">) {
  return <table data-slot="calendar-grid" {...props} />
}

function CalendarRoot({ rootRef, ...props }: RootProps) {
  return <div ref={rootRef} data-slot="calendar" {...props} />
}

function CalendarPrevious({
  className,
  children: _children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Button
      variant="outline"
      size="icon-sm"
      className={cn("aria-disabled:pointer-events-none aria-disabled:opacity-40", className)}
      {...props}
    >
      <ChevronLeftIcon />
    </Button>
  )
}

function CalendarNext({
  className,
  children: _children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Button
      variant="outline"
      size="icon-sm"
      className={cn("aria-disabled:pointer-events-none aria-disabled:opacity-40", className)}
      {...props}
    >
      <ChevronRightIcon />
    </Button>
  )
}

function CalendarDayButton({
  modifiers,
  className,
  day: _day,
  ...props
}: DayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const inRange = Boolean(modifiers.range_middle)
  const selected = Boolean(modifiers.selected) && !inRange

  return (
    <button
      ref={ref}
      className={cn(
        buttonVariants({
          variant: selected ? "default" : "ghost",
          size: "icon-sm",
        }),
        "size-8 font-normal",
        modifiers.today && !modifiers.selected && "ring-1 ring-foreground/15",
        modifiers.outside && !modifiers.selected && "text-muted-foreground",
        inRange && "rounded-none bg-transparent text-foreground hover:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function Calendar({
  className,
  classNames,
  components,
  showOutsideDays = true,
  navLayout = "around",
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const around = navLayout === "around"

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      navLayout={navLayout}
      className={cn("w-fit text-foreground", className)}
      classNames={{
        ...classNames,
        root: cn("w-fit", classNames?.root),
        months: cn("flex flex-col gap-4 sm:flex-row", classNames?.months),
        month: cn("relative flex w-fit flex-col gap-2", classNames?.month),
        month_caption: cn("flex h-7 items-center justify-center", classNames?.month_caption),
        caption_label: cn("text-sm font-medium", classNames?.caption_label),
        button_previous: cn(around && "absolute top-0 left-0", classNames?.button_previous),
        button_next: cn(around && "absolute top-0 right-0", classNames?.button_next),
        month_grid: cn("w-max border-collapse", classNames?.month_grid),
        weekday: cn(
          "size-8 p-0 text-center text-xs font-medium text-muted-foreground",
          classNames?.weekday
        ),
        day: cn("size-8 p-0 text-center align-middle", classNames?.day),
        range_start: cn(
          "range-start [&:not(.range-end)]:bg-[linear-gradient(to_right,transparent_50%,var(--muted)_50%)]",
          classNames?.range_start
        ),
        range_end: cn(
          "range-end [&:not(.range-start)]:bg-[linear-gradient(to_left,transparent_50%,var(--muted)_50%)]",
          classNames?.range_end
        ),
        range_middle: cn("bg-muted", classNames?.range_middle),
        hidden: cn("invisible", classNames?.hidden),
        footer: cn("pt-2 text-xs text-muted-foreground", classNames?.footer),
      }}
      components={{
        Root: CalendarRoot,
        MonthGrid: CalendarMonthGrid,
        PreviousMonthButton: CalendarPrevious,
        NextMonthButton: CalendarNext,
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
