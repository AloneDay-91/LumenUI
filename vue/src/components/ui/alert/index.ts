import { cva, type VariantProps } from "class-variance-authority"

export { default as Alert } from "./Alert.vue"
export { default as AlertTitle } from "./AlertTitle.vue"
export { default as AlertDescription } from "./AlertDescription.vue"

export const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-2xl border px-4 py-3 text-left text-sm has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-card text-card-foreground *:data-[slot=alert-description]:text-muted-foreground",
        destructive:
          "border-crimson-line bg-crimson-panel text-crimson-ink-strong *:data-[slot=alert-description]:text-crimson-ink *:[svg]:text-current",
        warning:
          "border-orange-line bg-orange-panel text-orange-ink-strong *:data-[slot=alert-description]:text-orange-ink *:[svg]:text-current",
        success:
          "border-jade-line bg-jade-panel text-jade-ink-strong *:data-[slot=alert-description]:text-jade-ink *:[svg]:text-current",
        info:
          "border-indigo-line bg-indigo-panel text-indigo-ink-strong *:data-[slot=alert-description]:text-indigo-ink *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type AlertVariantProps = VariantProps<typeof alertVariants>
