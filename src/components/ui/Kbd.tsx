"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const kbdVariants = cva(
  // rounded-sm, not the pill radius the rest of the system uses: a keycap has
  // to read as a key, and the theme radius turns a square key into a circle.
  "inline-flex shrink-0 items-center justify-center gap-1 rounded-sm font-mono leading-none font-medium whitespace-nowrap select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      // Icons are sized to the exact em value of the text next to them, so a
      // glyph and an icon key read at the same weight.
      size: {
        default:
          "h-6 min-w-6 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-5 min-w-5 px-1.5 text-[0.6875rem] [&_svg:not([class*='size-'])]:size-[0.6875rem]",
        lg: "h-7 min-w-7 px-2.5 text-[0.8125rem] [&_svg:not([class*='size-'])]:size-[0.8125rem]",
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

const kbdGroupVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      default: "gap-1.5 text-xs",
      sm: "gap-1 text-[0.6875rem]",
      lg: "gap-2 text-[0.8125rem]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

type KbdSize = NonNullable<VariantProps<typeof kbdVariants>["size"]>

const KbdSizeContext = React.createContext<KbdSize | undefined>(undefined)

function Kbd({
  className,
  size,
  variant,
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  const groupSize = React.useContext(KbdSizeContext)

  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ size: size ?? groupSize, variant }), className)}
      {...props}
    />
  )
}

function KbdGroup({
  className,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof kbdGroupVariants>) {
  return (
    <KbdSizeContext.Provider value={size ?? undefined}>
      <span
        data-slot="kbd-group"
        className={cn(kbdGroupVariants({ size }), className)}
        {...props}
      />
    </KbdSizeContext.Provider>
  )
}

export { Kbd, KbdGroup, kbdVariants, kbdGroupVariants }
