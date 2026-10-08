import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

import "./typography.css"

const typographyVariants = cva("w-full text-foreground", {
  variants: {
    variant: {
      article:
        "max-w-[65ch] [--type-size:0.875rem] [--type-leading:1.7] [--type-flow:1.25rem]",
      compact:
        "max-w-none [--type-size:0.75rem] [--type-leading:1.55] [--type-flow:0.75rem]",
    },
  },
  defaultVariants: {
    variant: "article",
  },
})

function Typography({
  className,
  variant = "article",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof typographyVariants>) {
  return (
    <div
      data-slot="typography"
      data-variant={variant}
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
