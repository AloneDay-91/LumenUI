"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    },
    padding: {
      none: "px-0",
      default: "px-4 md:px-6",
      wide: "px-6 md:px-12",
    },
  },
  defaultVariants: {
    size: "lg",
    padding: "default",
  },
})

/** Centered column with a max width and side gutters. */
function Container({
  className,
  size,
  padding,
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof containerVariants>) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      { className: cn(containerVariants({ size, padding }), className) },
      props
    ),
    state: { slot: "container", size: size ?? "lg" },
  })
}

export { Container, containerVariants }
