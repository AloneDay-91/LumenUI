import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-2xl border px-4 py-3 text-left text-sm has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-card text-card-foreground *:data-[slot=alert-description]:text-muted-foreground",
        destructive:
          "border-crimson-line bg-crimson-panel text-crimson-ink-strong *:data-[slot=alert-description]:text-crimson-ink *:[svg]:text-current",
        warning:
          "border-orange-line bg-orange-panel text-orange-ink-strong *:data-[slot=alert-description]:text-orange-ink *:[svg]:text-current",
        success:
          "border-jade-line bg-jade-panel text-jade-ink-strong *:data-[slot=alert-description]:text-jade-ink *:[svg]:text-current",
        info:
          "border-indigo-line bg-indigo-panel text-indigo-ink-strong *:data-[slot=alert-description]:text-indigo-ink *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  role,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant ?? "default"}
      role={role ?? (variant === "destructive" ? "alert" : "status")}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-xs md:text-pretty [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
