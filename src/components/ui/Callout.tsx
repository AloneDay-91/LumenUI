import * as React from "react"

import { cn } from "@/lib/utils"

import "./callout.css"

type CalloutSize = "sm" | "default" | "lg"
type CalloutVariant = "soft" | "surface" | "outline"
type CalloutColor = "gray" | "indigo" | "cyan" | "orange" | "crimson" | "jade"

function Callout({
  className,
  variant = "soft",
  size = "default",
  color = "gray",
  highContrast = false,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: CalloutVariant
  size?: CalloutSize
  color?: CalloutColor
  highContrast?: boolean
}) {
  return (
    <div
      data-slot="callout"
      data-variant={variant}
      data-size={size}
      data-color={color}
      data-high-contrast={highContrast ? "true" : undefined}
      className={cn(
        "group/callout grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-1 rounded-2xl px-4 py-3 text-sm leading-5",
        size === "sm" && "gap-x-2 px-3 py-2 text-xs leading-4",
        size === "lg" && "gap-x-3.5 px-5 py-4 text-base leading-6",
        className
      )}
      {...props}
    />
  )
}

function CalloutIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-icon"
      className={cn(
        "flex h-5 shrink-0 items-center text-current group-data-[size=sm]/callout:h-4 group-data-[size=lg]/callout:h-6 [&_svg]:size-4 group-data-[size=sm]/callout:[&_svg]:size-3.5 group-data-[size=lg]/callout:[&_svg]:size-5",
        className
      )}
      {...props}
    />
  )
}

function CalloutText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="callout-text"
      className={cn(
        "m-0 min-w-0 leading-[inherit] text-[length:inherit] text-inherit only:col-span-2 [&_a]:text-inherit [&_a]:underline [&_a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Callout,
  CalloutIcon,
  CalloutText,
  type CalloutColor,
  type CalloutSize,
  type CalloutVariant,
}
