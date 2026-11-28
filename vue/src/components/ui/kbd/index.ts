import type { InjectionKey, Ref } from "vue"
import { cva, type VariantProps } from "class-variance-authority"

export { default as Kbd } from "./Kbd.vue"
export { default as KbdGroup } from "./KbdGroup.vue"

export const kbdVariants = cva(
  // rounded-sm, not the pill radius the rest of the system uses: a keycap has
  // to read as a key, and the theme radius turns a square key into a circle.
  "inline-flex shrink-0 items-center justify-center gap-1 rounded-sm font-mono leading-none font-medium whitespace-nowrap select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      // Icons track the text em so a glyph and an icon key share one weight.
      // JetBrains Mono lacks ⌘ / arrows; those fall back to a larger system
      // face — Kbd swaps them for Lucide at 1em instead.
      size: {
        default: "h-6 min-w-6 px-2 text-xs [&_svg:not([class*='size-'])]:size-[1em]",
        sm: "h-5 min-w-5 px-1.5 text-xs [&_svg:not([class*='size-'])]:size-[1em]",
        lg: "h-7 min-w-7 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-[1em]",
      },
      variant: {
        default: "bg-secondary text-secondary-foreground",
        outline: "border border-border text-foreground",
        ghost: "bg-current/10 text-current",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export const kbdGroupVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      default: "gap-1.5 text-xs",
      sm: "gap-1 text-xs",
      lg: "gap-2 text-xs",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export type KbdVariantProps = VariantProps<typeof kbdVariants>
export type KbdGroupVariantProps = VariantProps<typeof kbdGroupVariants>
export type KbdSize = NonNullable<KbdVariantProps["size"]>

/** The size a KbdGroup hands down to the keys inside it. */
export const kbdSizeKey: InjectionKey<Ref<KbdSize | undefined>> = Symbol("KbdSize")
