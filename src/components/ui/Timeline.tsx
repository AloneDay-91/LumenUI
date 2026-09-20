import * as React from "react"

import { cn } from "@/lib/utils"

function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function TimelineItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="timeline-item"
      className={cn(
        "group/timeline-item relative grid grid-cols-[auto_1fr] gap-x-3 pb-6 last:pb-0",
        className
      )}
      {...props}
    />
  )
}

function TimelineMarker({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-marker"
      className={cn(
        "relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full bg-foreground ring-4 ring-background",
        "group-last/timeline-item:mt-1.5",
        className
      )}
      {...props}
    />
  )
}

function TimelineSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-separator"
      aria-hidden
      className={cn(
        "absolute top-4 bottom-0 left-[4.5px] w-px bg-border group-last/timeline-item:hidden",
        className
      )}
      {...props}
    />
  )
}

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("min-w-0 space-y-1", className)}
      {...props}
    />
  )
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="timeline-title"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="timeline-time"
      className={cn("font-mono text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function TimelineDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="timeline-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineSeparator,
  TimelineContent,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
}
