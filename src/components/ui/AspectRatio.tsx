import * as React from "react"

import { cn } from "@/lib/utils"

function AspectRatio({
  className,
  ratio = 16 / 9,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  ratio?: number
}) {
  return (
    <div
      data-slot="aspect-ratio"
      className={cn(
        "relative w-full min-w-0 overflow-hidden",
        "[&_img]:size-full [&_img]:object-cover",
        "[&_video]:size-full [&_video]:object-cover",
        className
      )}
      style={{ aspectRatio: String(ratio), ...style }}
      {...props}
    />
  )
}

export { AspectRatio }
