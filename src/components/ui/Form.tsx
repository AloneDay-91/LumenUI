"use client"

import * as React from "react"
import { Form as FormPrimitive } from "@base-ui/react/form"

import { cn } from "@/lib/utils"

function Form({ className, ...props }: React.ComponentProps<typeof FormPrimitive>) {
  return (
    <FormPrimitive
      data-slot="form"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

export { Form }
