"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { ButtonGroup } from "@/components/ui/ButtonGroup"
import type { ButtonVariantProps } from "@/components/ui/button-variants"
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/Menu"
import { cn } from "@/lib/utils"

type SplitButtonContextValue = Pick<ButtonVariantProps, "variant" | "size"> & {
  disabled?: boolean
}

const SplitButtonContext = React.createContext<SplitButtonContextValue>({})

/**
 * A main action joined to a menu of related actions. Variant, size and
 * disabled are set once here and shared by both halves.
 */
function SplitButton({
  className,
  variant = "default",
  size = "default",
  disabled,
  ...props
}: React.ComponentProps<typeof ButtonGroup> &
  SplitButtonContextValue) {
  const context = React.useMemo(() => ({ variant, size, disabled }), [variant, size, disabled])

  return (
    <SplitButtonContext.Provider value={context}>
      <ButtonGroup
        data-slot="split-button"
        data-variant={variant}
        className={cn("w-fit", className)}
        {...props}
      />
    </SplitButtonContext.Provider>
  )
}

function SplitButtonAction({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "variant" | "size">) {
  const { variant, size, disabled } = React.useContext(SplitButtonContext)

  return (
    <Button
      data-slot="split-button-action"
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn("rounded-s-4xl! rounded-e-none!", className)}
      {...props}
    />
  )
}

/** The chevron half. Its children are Menu items. */
function SplitButtonMenu({
  label = "More options",
  align = "end",
  className,
  contentClassName,
  children,
}: {
  /** Accessible name of the chevron button. */
  label?: string
  align?: "start" | "center" | "end"
  className?: string
  contentClassName?: string
  children: React.ReactNode
}) {
  const { variant, size, disabled } = React.useContext(SplitButtonContext)
  const iconSize =
    size === "xs" ? "icon-xs" : size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"

  return (
    <Menu>
      <MenuTrigger
        disabled={disabled}
        render={
          <Button
            data-slot="split-button-trigger"
            variant={variant}
            size={iconSize}
            aria-label={label}
            className={cn(
              // Set here, not by ButtonGroup: Menu inserts focus guards in the group,
              // so this button is not its :last-child.
              "rounded-s-none! rounded-e-4xl!",
              // A hairline between two filled halves; outline already has its borders.
              (variant === "default" || variant === "secondary" || variant === "destructive") &&
                "border-s-current/15",
              className
            )}
          />
        }
      >
        <ChevronDownIcon aria-hidden />
      </MenuTrigger>
      <MenuContent align={align} className={cn("w-auto min-w-44", contentClassName)}>
        {children}
      </MenuContent>
    </Menu>
  )
}

export { SplitButton, SplitButtonAction, SplitButtonMenu }
