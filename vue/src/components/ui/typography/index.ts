import { cva, type VariantProps } from "class-variance-authority"

export { default as Typography } from "./Typography.vue"

export const typographyVariants = cva("w-full text-foreground", {
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

export type TypographyVariantProps = VariantProps<typeof typographyVariants>
