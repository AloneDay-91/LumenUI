"use client"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({ className, children, ...props }: SliderPrimitive.Root.Props) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    >
      {children ?? (
        <SliderPrimitive.Control className="flex w-full items-center">
          <SliderPrimitive.Track className="relative h-1 w-full rounded-full bg-muted select-none">
            <SliderPrimitive.Indicator className="rounded-full bg-primary select-none" />
            <SliderPrimitive.Thumb className="size-4 rounded-full bg-background ring-1 ring-foreground/10 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/30" />
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
      )}
    </SliderPrimitive.Root>
  )
}

export { Slider }
