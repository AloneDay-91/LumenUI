"use client"

import { Meter as MeterPrimitive } from "@base-ui/react/meter"

import { cn } from "@/lib/utils"

function Meter({ className, children, ...props }: MeterPrimitive.Root.Props) {
  return (
    <MeterPrimitive.Root
      data-slot="meter"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    >
      {children ?? (
        <MeterPrimitive.Track className="h-1.5 overflow-hidden rounded-full bg-muted">
          <MeterPrimitive.Indicator className="h-full bg-primary" />
        </MeterPrimitive.Track>
      )}
    </MeterPrimitive.Root>
  )
}

export { Meter }
