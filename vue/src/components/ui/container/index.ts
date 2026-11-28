import { cva, type VariantProps } from "class-variance-authority"

export { default as Container } from "./Container.vue"

export const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    },
    padding: {
      none: "px-0",
      default: "px-4 md:px-6",
      wide: "px-6 md:px-12",
    },
  },
  defaultVariants: {
    size: "lg",
    padding: "default",
  },
})

export type ContainerVariantProps = VariantProps<typeof containerVariants>
