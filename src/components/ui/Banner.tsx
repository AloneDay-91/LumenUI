"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

/*
 * Ink on paper, like the site's own update bar: a neutral surface, a medium
 * title, muted copy, and the hue only on the indicator dot. Status lives in
 * the dot, not in a coloured slab.
 */
const bannerVariants = cva(
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

type BannerVariant = "default" | "new" | "info" | "success" | "warning" | "destructive"

const indicatorClass: Record<BannerVariant, string> = {
  default: "bg-muted-foreground",
  new: "bg-new",
  info: "bg-indigo-solid",
  success: "bg-jade-solid",
  warning: "bg-orange-solid",
  destructive: "bg-crimson-solid",
}

type BannerContextValue = { variant: BannerVariant; dismiss: () => void }

const BannerContext = React.createContext<BannerContextValue>({
  variant: "default",
  dismiss: () => {},
})

function Banner({
  className,
  variant = "default",
  appearance,
  open,
  defaultOpen = true,
  onOpenChange,
  "aria-label": ariaLabel = "Announcement",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bannerVariants> & {
    /** Hue of the indicator dot. The surface stays neutral. */
    variant?: BannerVariant
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
  }) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen)
  const isOpen = open ?? uncontrolled

  const context = React.useMemo<BannerContextValue>(
    () => ({
      variant,
      dismiss: () => {
        if (open === undefined) setUncontrolled(false)
        onOpenChange?.(false)
      },
    }),
    [variant, open, onOpenChange]
  )

  if (!isOpen) return null

  return (
    <BannerContext.Provider value={context}>
      <div
        data-slot="banner"
        data-variant={variant}
        data-appearance={appearance ?? "bar"}
        role="region"
        aria-label={ariaLabel}
        className={cn(bannerVariants({ appearance }), className)}
        {...props}
      />
    </BannerContext.Provider>
  )
}

/** Hued dot, or an icon passed as children. */
function BannerIndicator({ className, children, ...props }: React.ComponentProps<"span">) {
  const { variant } = React.useContext(BannerContext)

  if (children) {
    return (
      <span
        data-slot="banner-indicator"
        aria-hidden
        className={cn("flex text-muted-foreground", className)}
        {...props}
      >
        {children}
      </span>
    )
  }

  return (
    <span
      data-slot="banner-indicator"
      aria-hidden
      className={cn("size-1.5 shrink-0 rounded-full", indicatorClass[variant], className)}
      {...props}
    />
  )
}

/** Title and description on one line; truncates rather than wraps. */
function BannerContent({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="banner-content"
      // Sized here, not inherited: a <p> inside prose would otherwise pick up the body size.
      className={cn("m-0 min-w-0 truncate text-xs leading-5", className)}
      {...props}
    />
  )
}

function BannerTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="banner-title"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

/** Supporting copy. Hidden below sm so the bar keeps one line on phones. */
function BannerDescription({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="banner-description"
      className={cn("hidden text-muted-foreground sm:inline", className)}
      {...props}
    >
      {" — "}
      {children}
    </span>
  )
}

/** Text link after the message. Pass `render={<Link href="…" />}` for client routing. */
function BannerAction({ className, render, ...props }: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps<"a">(
      {
        className: cn(
          "shrink-0 rounded-sm font-medium text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/30",
          "group-data-[appearance=floating]/banner:inline-flex group-data-[appearance=floating]/banner:h-6 group-data-[appearance=floating]/banner:items-center group-data-[appearance=floating]/banner:rounded-full group-data-[appearance=floating]/banner:bg-secondary group-data-[appearance=floating]/banner:px-2.5 group-data-[appearance=floating]/banner:hover:no-underline group-data-[appearance=floating]/banner:hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
          className
        ),
      },
      props
    ),
    state: { slot: "banner-action" },
  })
}

function BannerClose({
  className,
  onClick,
  "aria-label": ariaLabel = "Dismiss",
  ...props
}: React.ComponentProps<"button">) {
  const { dismiss } = React.useContext(BannerContext)

  return (
    <button
      type="button"
      data-slot="banner-close"
      aria-label={ariaLabel}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) dismiss()
      }}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-xs" }),
        "shrink-0 text-muted-foreground hover:text-foreground",
        "group-data-[appearance=bar]/banner:absolute group-data-[appearance=bar]/banner:end-2 group-data-[appearance=bar]/banner:top-1/2 group-data-[appearance=bar]/banner:-translate-y-1/2",
        className
      )}
      {...props}
    >
      <XIcon />
    </button>
  )
}

export {
  Banner,
  BannerIndicator,
  BannerContent,
  BannerTitle,
  BannerDescription,
  BannerAction,
  BannerClose,
  bannerVariants,
}
export type { BannerVariant }
