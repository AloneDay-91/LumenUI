import * as React from "react"

import { cn } from "@/lib/utils"

type DataListOrientation = "horizontal" | "vertical"
type DataListSize = "sm" | "default" | "lg"
type DataListAlign = "start" | "center" | "end" | "baseline" | "stretch"
type DataListColor = "gray" | "indigo" | "cyan" | "orange" | "crimson"

const labelColorClass = {
  gray: {
    soft: "text-muted-foreground",
    contrast: "text-foreground",
  },
  indigo: {
    soft: "text-indigo-ink",
    contrast: "text-indigo-ink-strong",
  },
  cyan: {
    soft: "text-cyan-ink",
    contrast: "text-cyan-ink-strong",
  },
  orange: {
    soft: "text-orange-ink",
    contrast: "text-orange-ink-strong",
  },
  crimson: {
    soft: "text-crimson-ink",
    contrast: "text-crimson-ink-strong",
  },
} satisfies Record<DataListColor, { soft: string; contrast: string }>

const itemAlignClass = {
  start: "group-data-[orientation=horizontal]/data-list:items-start",
  center: "group-data-[orientation=horizontal]/data-list:items-center",
  end: "group-data-[orientation=horizontal]/data-list:items-end",
  baseline: "group-data-[orientation=horizontal]/data-list:items-baseline",
  stretch: "group-data-[orientation=horizontal]/data-list:items-stretch",
} satisfies Record<DataListAlign, string>

function DataList({
  className,
  orientation = "horizontal",
  size = "default",
  ...props
}: React.ComponentProps<"dl"> & {
  orientation?: DataListOrientation
  size?: DataListSize
}) {
  return (
    <dl
      data-slot="data-list"
      data-orientation={orientation}
      data-size={size}
      className={cn(
        "group/data-list m-0 text-sm wrap-break-word",
        orientation === "horizontal" &&
          "grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-4 data-[size=sm]:gap-y-3 data-[size=lg]:gap-y-5",
        orientation === "vertical" &&
          "flex flex-col gap-4 data-[size=sm]:gap-3 data-[size=lg]:gap-5",
        className
      )}
      {...props}
    />
  )
}

function DataListItem({
  className,
  align = "baseline",
  ...props
}: React.ComponentProps<"div"> & {
  align?: DataListAlign
}) {
  return (
    <div
      data-slot="data-list-item"
      data-align={align}
      className={cn(
        "min-w-0",
        "group-data-[orientation=horizontal]/data-list:col-span-2 group-data-[orientation=horizontal]/data-list:grid group-data-[orientation=horizontal]/data-list:grid-cols-subgrid group-data-[orientation=horizontal]/data-list:gap-x-6",
        "group-data-[orientation=vertical]/data-list:flex group-data-[orientation=vertical]/data-list:flex-col group-data-[orientation=vertical]/data-list:gap-1",
        itemAlignClass[align],
        className
      )}
      {...props}
    />
  )
}

function DataListLabel({
  className,
  color = "gray",
  highContrast = false,
  width,
  minWidth,
  maxWidth,
  style,
  ...props
}: React.ComponentProps<"dt"> & {
  color?: DataListColor
  highContrast?: boolean
  width?: React.CSSProperties["width"]
  minWidth?: React.CSSProperties["minWidth"]
  maxWidth?: React.CSSProperties["maxWidth"]
}) {
  return (
    <dt
      data-slot="data-list-label"
      data-color={color}
      data-high-contrast={highContrast ? "" : undefined}
      style={{ width, minWidth, maxWidth, ...style }}
      className={cn(
        "m-0 flex min-w-0 items-baseline text-xs font-normal",
        labelColorClass[color][highContrast ? "contrast" : "soft"],
        "group-data-[orientation=horizontal]/data-list:min-w-[7.5rem] group-data-[orientation=horizontal]/data-list:shrink-0",
        "group-data-[size=lg]/data-list:text-sm",
        className
      )}
      {...props}
    />
  )
}

function DataListValue({ className, ...props }: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="data-list-value"
      className={cn(
        "m-0 flex min-w-0 flex-wrap items-center gap-2 text-sm text-foreground",
        "group-data-[size=sm]/data-list:text-xs",
        className
      )}
      {...props}
    />
  )
}

export {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
  type DataListAlign,
  type DataListColor,
  type DataListOrientation,
  type DataListSize,
}
