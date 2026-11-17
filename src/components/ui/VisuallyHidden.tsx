"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@/lib/utils"

/**
 * Hidden on screen, read by screen readers. With `focusable`, it shows again
 * while it holds focus — the pattern behind a skip link.
 */
function VisuallyHidden({
  className,
  focusable = false,
  render,
  ...props
}: useRender.ComponentProps<"span"> & { focusable?: boolean }) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      {
        className: cn(
          "sr-only",
          focusable && "focus:not-sr-only focus-within:not-sr-only",
          className
        ),
      },
      props
    ),
    state: { slot: "visually-hidden" },
  })
}

export { VisuallyHidden }
