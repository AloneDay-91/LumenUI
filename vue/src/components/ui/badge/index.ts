import { cva, type VariantProps } from "class-variance-authority"

export { default as Badge } from "./Badge.vue"

export type BadgeColor = "gray" | "indigo" | "cyan" | "orange" | "crimson" | "jade"

export const badgeColorClass = {
  gray: {
    soft: "border-transparent bg-secondary text-secondary-foreground",
    contrast: "border-transparent bg-primary text-primary-foreground",
  },
  indigo: {
    soft: "border-transparent bg-indigo-wash text-indigo-ink",
    contrast: "border-transparent bg-indigo-solid text-indigo-on-solid",
  },
  cyan: {
    soft: "border-transparent bg-cyan-wash text-cyan-ink",
    contrast: "border-transparent bg-cyan-solid text-cyan-on-solid",
  },
  orange: {
    soft: "border-transparent bg-orange-wash text-orange-ink",
    contrast: "border-transparent bg-orange-solid text-orange-on-solid",
  },
  crimson: {
    soft: "border-transparent bg-crimson-wash text-crimson-ink",
    contrast: "border-transparent bg-crimson-solid text-crimson-on-solid",
  },
  jade: {
    soft: "border-transparent bg-jade-wash text-jade-ink",
    contrast: "border-transparent bg-jade-solid text-jade-on-solid",
  },
} satisfies Record<BadgeColor, { soft: string; contrast: string }>

export const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-2xl border border-transparent px-2 text-xs leading-none font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive/10 text-destructive",
        outline: "border-border text-foreground",
        ghost: "",
        success: badgeColorClass.jade.soft,
        warning: badgeColorClass.orange.soft,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type BadgeVariantProps = VariantProps<typeof badgeVariants>
