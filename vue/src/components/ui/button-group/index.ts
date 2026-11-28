import { cva, type VariantProps } from "class-variance-authority"

export { default as ButtonGroup } from "./ButtonGroup.vue"
export { default as ButtonGroupSeparator } from "./ButtonGroupSeparator.vue"

export const buttonGroupVariants = cva(
  // The outer ends follow --radius-4xl (pill at the default token), the inner
  // edges square off, so a group reads as one control. Logical radii (s/e) so
  // it mirrors under dir="rtl".
  "group/button-group flex items-center [&>*]:rounded-none [&>*]:focus-visible:relative [&>*]:focus-visible:z-10",
  {
    variants: {
      orientation: {
        horizontal:
          "flex-row -space-x-px [&>*:first-child]:rounded-s-4xl [&>*:last-child]:rounded-e-4xl",
        // Not a full end radius: on a button that is wider than it is tall, that
        // turns the end segments into domes. And stretch, so stacked segments
        // share one width instead of tracking their label length.
        vertical:
          "flex-col items-stretch -space-y-px [&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-b-xl",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroupVariants>
