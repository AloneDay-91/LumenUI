"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  children,
  locale = "en-US",
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      // One locale on the server and in the browser, so "60%" does not become "60 %".
      locale={locale}
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    >
      {children ?? (
        <ProgressPrimitive.Track className="h-1.5 overflow-hidden rounded-full bg-muted">
          <ProgressPrimitive.Indicator className="h-full bg-primary transition-all" />
        </ProgressPrimitive.Track>
      )}
    </ProgressPrimitive.Root>
  )
}

export { Progress }
