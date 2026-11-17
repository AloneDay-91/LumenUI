import * as React from "react"

import { cn } from "@/lib/utils"

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      role="group"
      className={cn(
        "flex items-center -space-x-2 rtl:space-x-reverse",
        "*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  count,
  label = `${count} more`,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  count: number
  label?: string
}) {
  return (
    <span
      data-slot="avatar-group-count"
      aria-label={label}
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-[11px] font-medium text-secondary-foreground ring-2 ring-background tabular-nums",
        className
      )}
      {...props}
    >
      <span aria-hidden>+{count}</span>
    </span>
  )
}

export { AvatarGroup, AvatarGroupCount }
