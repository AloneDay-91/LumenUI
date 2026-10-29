"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type BadgeColor = "gray" | "indigo" | "cyan" | "orange" | "crimson" | "jade"

const badgeColorClass = {
  gray: {
    soft: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground",
    contrast:
      "border-transparent bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
  },
  indigo: {
    soft: "border-transparent bg-indigo-wash text-indigo-ink hover:bg-indigo-wash-hover hover:text-indigo-ink",
    contrast:
      "border-transparent bg-indigo-solid text-indigo-on-solid hover:bg-indigo-solid hover:text-indigo-on-solid",
  },
  cyan: {
    soft: "border-transparent bg-cyan-wash text-cyan-ink hover:bg-cyan-wash-hover hover:text-cyan-ink",
    contrast:
      "border-transparent bg-cyan-solid text-cyan-on-solid hover:bg-cyan-solid hover:text-cyan-on-solid",
  },
  orange: {
    soft: "border-transparent bg-orange-wash text-orange-ink hover:bg-orange-wash-hover hover:text-orange-ink",
    contrast:
      "border-transparent bg-orange-solid text-orange-on-solid hover:bg-orange-solid hover:text-orange-on-solid",
  },
  crimson: {
    soft: "border-transparent bg-crimson-wash text-crimson-ink hover:bg-crimson-wash-hover hover:text-crimson-ink",
    contrast:
      "border-transparent bg-crimson-solid text-crimson-on-solid hover:bg-crimson-solid hover:text-crimson-on-solid",
  },
  jade: {
    soft: "border-transparent bg-jade-wash text-jade-ink hover:bg-jade-wash-hover hover:text-jade-ink",
    contrast:
      "border-transparent bg-jade-solid text-jade-on-solid hover:bg-jade-solid hover:text-jade-on-solid",
  },
} satisfies Record<BadgeColor, { soft: string; contrast: string }>

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-2xl border border-transparent px-2 text-xs leading-none font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive/10 text-red-700 dark:text-destructive",
        outline: "border-border text-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground",
        success: "bg-secondary text-secondary-foreground",
        warning: "bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  color,
  highContrast = false,
  render,
  ...props
}: useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    color?: BadgeColor
    highContrast?: boolean
  }) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(
          badgeVariants({ variant: color ? "ghost" : variant }),
          color
            ? badgeColorClass[color][highContrast ? "contrast" : "soft"]
            : null,
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      color,
      highContrast,
    },
  })
}

export { Badge, badgeVariants, type BadgeColor }
