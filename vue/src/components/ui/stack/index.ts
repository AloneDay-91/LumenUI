import { cva, type VariantProps } from "class-variance-authority"

export { default as Stack } from "./Stack.vue"

export const stackVariants = cva("flex", {
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

export type StackVariants = VariantProps<typeof stackVariants>
