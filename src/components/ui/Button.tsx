"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"

import { cn } from "@/lib/utils"
import {
  buttonVariants,
  type ButtonVariantProps,
} from "@/components/ui/button-variants"
import { Spinner } from "@/components/ui/Spinner"

function Button({
  className,
  variant = "default",
  size = "default",
  nativeButton,
  render,
  loading = false,
  disabled,
  focusableWhenDisabled,
  children,
  ...props
}: ButtonPrimitive.Props &
  ButtonVariantProps & {
    /** Shows a Spinner, sets aria-busy, and blocks clicks while keeping focus. */
    loading?: boolean
  }) {
  const iconOnly = typeof size === "string" && size.startsWith("icon")
  // The Spinner is decoration here: aria-busy on the button carries the state.
  const spinner = (
    <Spinner
      role={undefined}
      aria-label={undefined}
      aria-hidden
      data-icon={iconOnly ? undefined : "inline-start"}
    />
  )

  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading ? "" : undefined}
      aria-busy={loading || undefined}
      render={render}
      nativeButton={nativeButton ?? !render}
      disabled={disabled || loading}
      focusableWhenDisabled={focusableWhenDisabled ?? loading}
      className={cn(
        buttonVariants({ variant, size }),
        // The Spinner takes the place of a leading icon instead of sitting beside it.
        "data-loading:cursor-progress data-loading:[&>[data-icon=inline-start]:not([data-slot=spinner])]:hidden",
        className
      )}
      {...props}
    >
      {loading && iconOnly ? (
        spinner
      ) : (
        <>
          {loading ? spinner : null}
          {children}
        </>
      )}
    </ButtonPrimitive>
  )
}

export { Button }
