import { cva, type VariantProps } from "class-variance-authority"

export { default as Banner } from "./Banner.vue"
export { default as BannerIndicator } from "./BannerIndicator.vue"
export { default as BannerContent } from "./BannerContent.vue"
export { default as BannerTitle } from "./BannerTitle.vue"
export { default as BannerDescription } from "./BannerDescription.vue"
export { default as BannerAction } from "./BannerAction.vue"
export { default as BannerClose } from "./BannerClose.vue"

/*
 * Ink on paper, like the site's own update bar: a neutral surface, a medium
 * title, muted copy, and the hue only on the indicator dot. Status lives in
 * the dot, not in a coloured slab.
 */
export const bannerVariants = cva(
  "group/banner relative flex items-center gap-2 text-xs text-foreground [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      appearance: {
        bar: "min-h-9 w-full justify-center border-b border-border bg-muted px-10 py-2",
        floating:
          "mx-auto min-h-9 w-fit max-w-full rounded-full bg-popover py-1.5 ps-3.5 pe-1.5 text-popover-foreground shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10",
      },
    },
    defaultVariants: {
      appearance: "bar",
    },
  }
)

export type BannerVariantProps = VariantProps<typeof bannerVariants>

export type { BannerVariant } from "./context"
