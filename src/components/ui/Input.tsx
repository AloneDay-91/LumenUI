import { Input as InputPrimitive } from "@base-ui/react/input"
import type { ComponentProps } from "react"

import { inputClassName } from "@/components/ui/styles"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputClassName, className)}
      {...props}
    />
  )
}

export { Input }
