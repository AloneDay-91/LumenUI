import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type StepStatus = "complete" | "current" | "upcoming"

function Stepper({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"ol"> & {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <ol
      data-slot="stepper"
      data-orientation={orientation}
      className={cn(
        "group/stepper flex w-full",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      {...props}
    />
  )
}

function StepperItem({
  className,
  status = "upcoming",
  ...props
}: React.ComponentProps<"li"> & {
  status?: StepStatus
}) {
  return (
    <li
      data-slot="stepper-item"
      data-status={status}
      aria-current={status === "current" ? "step" : undefined}
      className={cn(
        "group/step relative flex min-w-0 before:content-[''] after:content-['']",
        "group-data-[orientation=vertical]/stepper:before:hidden",
        // Horizontal: circle on a shared baseline, copy underneath.
        // ::before / ::after are the rails — they stop short of the circle.
        "group-data-[orientation=horizontal]/stepper:flex-1 group-data-[orientation=horizontal]/stepper:flex-col group-data-[orientation=horizontal]/stepper:items-center group-data-[orientation=horizontal]/stepper:gap-2.5",
        "group-data-[orientation=horizontal]/stepper:before:absolute group-data-[orientation=horizontal]/stepper:before:top-3.5 group-data-[orientation=horizontal]/stepper:before:right-[calc(50%+1rem)] group-data-[orientation=horizontal]/stepper:before:left-0 group-data-[orientation=horizontal]/stepper:before:h-px group-data-[orientation=horizontal]/stepper:before:bg-border",
        "group-data-[orientation=horizontal]/stepper:after:absolute group-data-[orientation=horizontal]/stepper:after:top-3.5 group-data-[orientation=horizontal]/stepper:after:left-[calc(50%+1rem)] group-data-[orientation=horizontal]/stepper:after:right-0 group-data-[orientation=horizontal]/stepper:after:h-px group-data-[orientation=horizontal]/stepper:after:bg-border",
        "group-data-[orientation=horizontal]/stepper:first:before:hidden group-data-[orientation=horizontal]/stepper:last:after:hidden",
        "group-data-[orientation=horizontal]/stepper:data-[status=complete]:before:bg-foreground group-data-[orientation=horizontal]/stepper:data-[status=complete]:after:bg-foreground group-data-[orientation=horizontal]/stepper:data-[status=current]:before:bg-foreground",
        // Vertical: 1.75rem track for the circle, rail centered on that track.
        "group-data-[orientation=vertical]/stepper:grid group-data-[orientation=vertical]/stepper:grid-cols-[1.75rem_minmax(0,1fr)] group-data-[orientation=vertical]/stepper:gap-x-3 group-data-[orientation=vertical]/stepper:items-start group-data-[orientation=vertical]/stepper:pb-8 group-data-[orientation=vertical]/stepper:last:pb-0",
        "group-data-[orientation=vertical]/stepper:after:absolute group-data-[orientation=vertical]/stepper:after:top-7 group-data-[orientation=vertical]/stepper:after:bottom-0 group-data-[orientation=vertical]/stepper:after:left-3.5 group-data-[orientation=vertical]/stepper:after:-translate-x-1/2 group-data-[orientation=vertical]/stepper:after:w-px group-data-[orientation=vertical]/stepper:after:bg-border",
        "group-data-[orientation=vertical]/stepper:last:after:hidden",
        "group-data-[orientation=vertical]/stepper:data-[status=complete]:after:bg-foreground",
        className
      )}
      {...props}
    />
  )
}

function StepperIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-indicator"
      className={cn(
        "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
        "group-data-[status=complete]/step:border-foreground group-data-[status=complete]/step:bg-foreground group-data-[status=complete]/step:text-background",
        "group-data-[status=current]/step:border-foreground group-data-[status=current]/step:bg-background group-data-[status=current]/step:text-foreground group-data-[status=current]/step:ring-2 group-data-[status=current]/step:ring-foreground/15",
        "group-data-[status=upcoming]/step:border-border group-data-[status=upcoming]/step:bg-background group-data-[status=upcoming]/step:text-muted-foreground",
        className
      )}
      {...props}
    >
      <span className="group-data-[status=complete]/step:hidden">{children}</span>
      <CheckIcon className="hidden size-3.5 group-data-[status=complete]/step:block" />
    </div>
  )
}

function StepperContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-content"
      className={cn(
        "min-w-0 space-y-0.5",
        "group-data-[orientation=horizontal]/stepper:text-center",
        className
      )}
      {...props}
    />
  )
}

function StepperTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stepper-title"
      className={cn(
        "text-sm font-medium",
        "group-data-[status=upcoming]/step:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function StepperDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stepper-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperContent,
  StepperTitle,
  StepperDescription,
}
