"use client"

import * as React from "react"
import { SearchIcon, XIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { Input } from "@/components/ui/Input"
import { InputGroup, InputGroupAddon } from "@/components/ui/InputGroup"
import { cn } from "@/lib/utils"

function SearchInput({
  className,
  value,
  defaultValue = "",
  onValueChange,
  onChange,
  onKeyDown,
  onClear,
  clearLabel = "Clear search",
  disabled,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onClear?: () => void
  clearLabel?: string
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const current = value ?? uncontrolled

  function setValue(next: string) {
    if (value === undefined) {
      setUncontrolled(next)
    }
    onValueChange?.(next)
  }

  function clear() {
    setValue("")
    onClear?.()
    inputRef.current?.focus()
  }

  return (
    <InputGroup data-slot="search-input" className={className}>
      <InputGroupAddon>
        <SearchIcon aria-hidden />
      </InputGroupAddon>
      <Input
        ref={inputRef}
        type="search"
        value={current}
        disabled={disabled}
        onChange={(event) => {
          onChange?.(event)
          setValue(event.target.value)
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.key === "Escape" && current !== "" && !event.defaultPrevented) {
            event.preventDefault()
            clear()
          }
        }}
        className="[&::-webkit-search-cancel-button]:appearance-none"
        {...props}
      />
      {current !== "" ? (
        <InputGroupAddon align="end" className="pe-1">
          <button
            type="button"
            data-slot="search-input-clear"
            aria-label={clearLabel}
            disabled={disabled}
            onClick={clear}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-xs" }),
              "text-muted-foreground hover:text-foreground"
            )}
          >
            <XIcon />
          </button>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}

export { SearchInput }
