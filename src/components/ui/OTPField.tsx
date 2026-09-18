"use client"

import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field"

import { cn } from "@/lib/utils"

function OTPField({ className, ...props }: OTPFieldPrimitive.Root.Props) {
  return (
    <OTPFieldPrimitive.Root
      data-slot="otp-field"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function OTPFieldInput({ className, ...props }: OTPFieldPrimitive.Input.Props) {
  return (
    <OTPFieldPrimitive.Input
      data-slot="otp-field-input"
      className={cn(
        "size-9 rounded-xl border border-transparent bg-input/50 text-center text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function OTPFieldSeparator({
  className,
  ...props
}: OTPFieldPrimitive.Separator.Props) {
  return (
    <OTPFieldPrimitive.Separator
      data-slot="otp-field-separator"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export { OTPField, OTPFieldInput, OTPFieldSeparator }
