"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import type { ButtonVariantProps } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

type ButtonProps = React.ComponentProps<typeof Button>

/**
 * Copies `value` to the clipboard and swaps to a check for `timeout` ms.
 * Without children it is an icon button; with children the label swaps too.
 */
function CopyButton({
  value,
  timeout = 2000,
  onCopy,
  label = "Copy",
  copiedLabel = "Copied",
  variant = "ghost",
  size,
  className,
  children,
  onClick,
  ...props
}: Omit<ButtonProps, "value" | "onCopy"> &
  ButtonVariantProps & {
    /** Text to copy, or a function that returns it at click time. */
    value: string | (() => string)
    timeout?: number
    onCopy?: (value: string) => void
    /** Accessible name before the copy, and the visible label when children are set. */
    label?: string
    copiedLabel?: string
  }) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  async function copy(event: Parameters<NonNullable<ButtonProps["onClick"]>>[0]) {
    onClick?.(event)
    if (event.defaultPrevented) return
    const text = typeof value === "function" ? value() : value
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return
    }
    setCopied(true)
    onCopy?.(text)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), timeout)
  }

  const iconOnly = children === undefined
  const Icon = copied ? CheckIcon : CopyIcon

  return (
    <>
      <Button
        data-slot="copy-button"
        data-copied={copied ? "" : undefined}
        variant={variant}
        size={size ?? (iconOnly ? "icon-sm" : "default")}
        aria-label={iconOnly ? (copied ? copiedLabel : label) : undefined}
        onClick={copy}
        className={cn(iconOnly && "text-muted-foreground hover:text-foreground", className)}
        {...props}
      >
        <Icon
          aria-hidden
          data-icon={iconOnly ? undefined : "inline-start"}
          className={cn(copied && "text-jade-ink")}
        />
        {iconOnly ? null : copied ? copiedLabel : children}
      </Button>
      {/* Outside the button, so it announces without joining the button's name. */}
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  )
}

export { CopyButton }
