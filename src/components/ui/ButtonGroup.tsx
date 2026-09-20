"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonGroupVariants = cva(
  // The outer ends keep the pill radius, the inner edges square off, so a group
  // reads as one control. Logical radii (s/e) so it mirrors under dir="rtl".
  "group/button-group flex items-center [&>*]:rounded-none [&>*]:focus-visible:relative [&>*]:focus-visible:z-10",
  {
    variants: {
      orientation: {
        horizontal:
          "flex-row -space-x-px [&>*:first-child]:rounded-s-full [&>*:last-child]:rounded-e-full",
        // Not rounded-t-full: on a button that is wider than it is tall, a full
        // radius turns the end segments into domes. And stretch, so stacked
        // segments share one width instead of tracking their label length.
        vertical:
          "flex-col items-stretch -space-y-px [&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-b-xl",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      data-slot="button-group"
      role="group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="button-group-separator"
      role="separator"
      className={cn(
        "relative z-10 self-stretch bg-border group-data-[orientation=vertical]/button-group:h-px group-data-[orientation=vertical]/button-group:w-auto w-px",
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupSeparator, buttonGroupVariants }
