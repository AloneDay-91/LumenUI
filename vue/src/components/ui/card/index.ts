import { cva, type VariantProps } from "class-variance-authority"

export { default as Card } from "./Card.vue"
export { default as CardHeader } from "./CardHeader.vue"
export { default as CardTitle } from "./CardTitle.vue"
export { default as CardDescription } from "./CardDescription.vue"
export { default as CardContent } from "./CardContent.vue"
export { default as CardFooter } from "./CardFooter.vue"

export const cardVariants = cva(
  "group/card flex flex-col overflow-hidden rounded-[min(var(--radius-4xl),24px)] text-sm",
  {
    variants: {
      variant: {
        default: "border border-border bg-card text-card-foreground",
        secondary: "bg-input/50 text-secondary-foreground dark:bg-input/30",
      },
      size: {
        default: "gap-5 py-5",
        sm: "gap-4 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type CardVariantProps = VariantProps<typeof cardVariants>
