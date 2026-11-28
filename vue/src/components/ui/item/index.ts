import { cva, type VariantProps } from "class-variance-authority"

export { default as Item } from "./Item.vue"
export { default as ItemGroup } from "./ItemGroup.vue"
export { default as ItemSeparator } from "./ItemSeparator.vue"
export { default as ItemMedia } from "./ItemMedia.vue"
export { default as ItemContent } from "./ItemContent.vue"
export { default as ItemTitle } from "./ItemTitle.vue"
export { default as ItemDescription } from "./ItemDescription.vue"
export { default as ItemActions } from "./ItemActions.vue"
export { default as ItemHeader } from "./ItemHeader.vue"
export { default as ItemFooter } from "./ItemFooter.vue"

export const itemVariants = cva(
  "group/item flex w-full min-w-0 flex-wrap items-center rounded-2xl text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/30 [&:is(a,button)]:cursor-pointer [&:is(a,button)]:hover:bg-foreground/5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-border bg-card",
        muted: "bg-muted",
      },
      size: {
        default: "gap-3 px-3 py-3",
        sm: "gap-2.5 px-2.5 py-2",
        xs: "gap-2 px-2 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const itemMediaVariants = cva("flex shrink-0 items-center justify-center", {
  variants: {
    variant: {
      default: "",
      icon: "size-8 rounded-2xl bg-muted text-foreground group-data-[size=sm]/item:size-7 group-data-[size=xs]/item:size-6 [&_svg]:pointer-events-none [&_svg]:size-4 group-data-[size=xs]/item:[&_svg]:size-3",
      image:
        "size-10 overflow-hidden rounded-xl bg-muted group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type ItemVariantProps = VariantProps<typeof itemVariants>
export type ItemMediaVariantProps = VariantProps<typeof itemMediaVariants>
