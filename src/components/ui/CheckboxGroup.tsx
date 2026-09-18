"use client"

import * as React from "react"
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group"

import { cn } from "@/lib/utils"

function CheckboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxGroupPrimitive>) {
  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

export { CheckboxGroup }
