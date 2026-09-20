"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="breadcrumb" aria-label="Breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex min-w-0 items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "truncate transition-colors hover:text-foreground",
          className
        ),
      },
      props
    ),
    render,
    state: { slot: "breadcrumb-link" },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      // Not a link, but announced as the current step rather than as plain text.
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("truncate font-medium text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "[&>svg]:size-3.5 [&>svg]:shrink-0 [&>svg]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  children,
  type = "button",
  ...props
}: React.ComponentProps<"button">) {
  return (
    // A native <button>: the collapsed steps have to stay reachable, and Base UI
    // requires a real button under a menu trigger to keep its semantics.
    <button
      data-slot="breadcrumb-ellipsis"
      type={type}
      className={cn(
        "flex size-5 items-center justify-center rounded-md transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none [&>svg]:size-3.5",
        className
      )}
      {...props}
    >
      {children ?? <MoreHorizontalIcon />}
      <span className="sr-only">More</span>
    </button>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
