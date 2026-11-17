"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { Input } from "@/components/ui/Input"
import { InputGroup, InputGroupAddon } from "@/components/ui/InputGroup"
import { cn } from "@/lib/utils"

function PasswordInput({
  className,
  visible,
  defaultVisible = false,
  onVisibleChange,
  showLabel = "Show password",
  hideLabel = "Hide password",
  disabled,
  ...props
}: Omit<React.ComponentProps<"input">, "type"> & {
  visible?: boolean
  defaultVisible?: boolean
  onVisibleChange?: (visible: boolean) => void
  showLabel?: string
  hideLabel?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultVisible)
  const isVisible = visible ?? uncontrolled

  function toggle() {
    const next = !isVisible
    if (visible === undefined) {
      setUncontrolled(next)
    }
    onVisibleChange?.(next)
  }

  return (
    <InputGroup data-slot="password-input" className={className}>
      <Input
        type={isVisible ? "text" : "password"}
        autoComplete="current-password"
        spellCheck={false}
        disabled={disabled}
        {...props}
      />
      <InputGroupAddon align="end" className="pe-1">
        <button
          type="button"
          data-slot="password-input-toggle"
          aria-label={isVisible ? hideLabel : showLabel}
          aria-pressed={isVisible}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon-xs" }),
            "text-muted-foreground hover:text-foreground"
          )}
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { PasswordInput }
