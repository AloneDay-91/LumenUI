"use client"

import * as React from "react"
import { PencilIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Text that turns into a field when clicked. Enter or leaving the field
 * saves, Escape cancels, and focus goes back to the text either way. Empty
 * values are refused unless `allowEmpty` is set.
 */
function InlineEdit({
  className,
  inputClassName,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  placeholder = "Empty",
  allowEmpty = false,
  disabled = false,
  maxLength,
  "aria-label": ariaLabel,
}: {
  className?: string
  inputClassName?: string
  value?: string
  defaultValue?: string
  /** Called once per save, with the new value. Not called when nothing changed. */
  onValueChange?: (value: string) => void
  /** Shown when the value is empty. */
  placeholder?: string
  allowEmpty?: boolean
  disabled?: boolean
  maxLength?: number
  /** Names both the text button and the field, e.g. "Project name". */
  "aria-label": string
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const value = valueProp ?? uncontrolled
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(value)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  // Escape and Enter both end editing; the blur that follows must not save again.
  const done = React.useRef(false)

  React.useEffect(() => {
    if (!editing) return
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [editing])

  const start = () => {
    if (disabled) return
    done.current = false
    setDraft(value)
    setEditing(true)
  }
  const finish = (save: boolean) => {
    if (done.current) return
    done.current = true
    const next = draft.trim()
    if (save && next !== value && (allowEmpty || next !== "")) {
      setUncontrolled(next)
      onValueChange?.(next)
    }
    setEditing(false)
    requestAnimationFrame(() => buttonRef.current?.focus())
  }

  const shared = "-mx-1.5 rounded-lg px-1.5 py-0.5 text-[length:inherit] leading-[inherit] font-[inherit]"

  if (editing) {
    return (
      <input
        ref={inputRef}
        data-slot="inline-edit-input"
        aria-label={ariaLabel}
        value={draft}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault()
            finish(true)
          } else if (event.key === "Escape") {
            event.preventDefault()
            finish(false)
          }
        }}
        onBlur={() => finish(true)}
        className={cn(
          shared,
          "w-full min-w-0 bg-input/50 text-foreground ring-3 ring-ring/30 outline-none placeholder:text-muted-foreground",
          className,
          inputClassName
        )}
      />
    )
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      data-slot="inline-edit"
      aria-label={`${ariaLabel}: ${value || placeholder}`}
      disabled={disabled}
      onClick={start}
      className={cn(
        shared,
        "group/inline-edit inline-flex max-w-full items-center gap-1.5 text-start outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none",
        !value && "text-muted-foreground",
        className
      )}
    >
      <span className="min-w-0 truncate">{value || placeholder}</span>
      <PencilIcon
        aria-hidden
        className="size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/inline-edit:opacity-100 group-focus-visible/inline-edit:opacity-100"
      />
    </button>
  )
}

export { InlineEdit }
