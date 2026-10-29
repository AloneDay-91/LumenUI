import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex cursor-pointer items-center gap-2 text-xs leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-[:disabled]:cursor-not-allowed has-[[aria-disabled=true]]:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export { Label }
