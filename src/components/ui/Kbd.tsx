"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CommandIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const kbdVariants = cva(
  // rounded-sm, not the pill radius the rest of the system uses: a keycap has
  // to read as a key, and the theme radius turns a square key into a circle.
  "inline-flex shrink-0 items-center justify-center gap-1 rounded-sm font-mono leading-none font-medium whitespace-nowrap select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      // Icons track the text em so a glyph and an icon key share one weight.
      // JetBrains Mono lacks ⌘ / arrows; those fall back to a larger system
      // face — Kbd swaps them for Lucide at 1em instead.
      size: {
        default:
          "h-6 min-w-6 px-2 text-xs [&_svg:not([class*='size-'])]:size-[1em]",
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

const kbdGroupVariants = cva("inline-flex items-center", {
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

const KEY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>
> = {
  "⌘": CommandIcon,
  "↑": ArrowUpIcon,
  "↓": ArrowDownIcon,
  "←": ArrowLeftIcon,
  "→": ArrowRightIcon,
}

const KEY_GLYPH_RE = /(⌘|↑|↓|←|→)/

function renderKbdChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child !== "string") {
      return child
    }

    const parts = child.split(KEY_GLYPH_RE)
    if (parts.length === 1) {
      return child
    }

    return parts.map((part, index) => {
      const Icon = KEY_ICONS[part]
      if (!Icon) {
        return part
      }

      return (
        <React.Fragment key={`${part}-${index}`}>
          <span className="sr-only">{part}</span>
          <Icon aria-hidden className="size-[1em]" />
        </React.Fragment>
      )
    })
  })
}

type KbdSize = NonNullable<VariantProps<typeof kbdVariants>["size"]>

const KbdSizeContext = React.createContext<KbdSize | undefined>(undefined)

function Kbd({
  className,
  size,
  variant,
  children,
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  const groupSize = React.useContext(KbdSizeContext)

  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ size: size ?? groupSize, variant }), className)}
      {...props}
    >
      {renderKbdChildren(children)}
    </kbd>
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
