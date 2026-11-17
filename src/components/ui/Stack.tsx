"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const stackVariants = cva("flex", {
  variants: {
    direction: {
      column: "flex-col",
      row: "flex-row",
      "column-reverse": "flex-col-reverse",
      "row-reverse": "flex-row-reverse",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    direction: "column",
    gap: "md",
  },
})

/** Flex layout on the Lumen spacing steps. Renders a div unless `render` says otherwise. */
function Stack({
  className,
  direction,
  gap,
  align,
  justify,
  wrap,
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof stackVariants>) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        className: cn(stackVariants({ direction, gap, align, justify, wrap }), className),
      },
      props
    ),
    state: { slot: "stack", direction: direction ?? "column" },
  })
}

export { Stack, stackVariants }
