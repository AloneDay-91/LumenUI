import { cva, type VariantProps } from "class-variance-authority"

export const navigationMenuTriggerStyle = cva(
  "-mx-2 -my-1 cursor-pointer rounded-full px-2 py-1 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:text-foreground"
)

export const navigationMenuLinkVariants = cva(
  "inline-flex items-center gap-2 rounded-full text-foreground transition-colors outline-none hover:text-muted-foreground focus-visible:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "text-sm",
        featured: "text-lg font-normal",
        muted:
          "-mx-2 -my-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type NavigationMenuLinkVariantProps = VariantProps<typeof navigationMenuLinkVariants>

