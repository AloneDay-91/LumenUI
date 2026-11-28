import { cva, type VariantProps } from "class-variance-authority"

export { default as Empty } from "./Empty.vue"
export { default as EmptyHeader } from "./EmptyHeader.vue"
export { default as EmptyMedia } from "./EmptyMedia.vue"
export { default as EmptyTitle } from "./EmptyTitle.vue"
export { default as EmptyDescription } from "./EmptyDescription.vue"
export { default as EmptyContent } from "./EmptyContent.vue"

export const emptyMediaVariants = cva(
  "mb-1 flex shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-5",
  {
    variants: {
      variant: {
        default: "size-10 rounded-2xl bg-muted",
        icon: "size-10 rounded-2xl bg-muted",
        ghost: "",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  },
)

export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>
