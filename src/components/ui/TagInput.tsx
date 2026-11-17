"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function splitTags(text: string) {
  return text
    .split(/[,\n]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function TagInput({
  className,
  value,
  defaultValue = [],
  onValueChange,
  max,
  allowDuplicates = false,
  removeLabel = (tag: string) => `Remove ${tag}`,
  placeholder,
  disabled,
  id,
  name,
  "aria-invalid": ariaInvalid,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  max?: number
  allowDuplicates?: boolean
  removeLabel?: (tag: string) => string
  placeholder?: string
  disabled?: boolean
  name?: string
  "aria-invalid"?: boolean
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const [draft, setDraft] = React.useState("")
  const tags = value ?? uncontrolled
  const full = max !== undefined && tags.length >= max

  function commit(next: string[]) {
    if (value === undefined) {
      setUncontrolled(next)
    }
    onValueChange?.(next)
  }

  function add(candidates: string[]) {
    const next = [...tags]
    for (const tag of candidates) {
      if (max !== undefined && next.length >= max) break
      if (!allowDuplicates && next.includes(tag)) continue
      next.push(tag)
    }
    if (next.length !== tags.length) {
      commit(next)
    }
  }

  function remove(index: number) {
    commit(tags.filter((_, i) => i !== index))
    inputRef.current?.focus()
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if ((event.key === "Enter" || event.key === ",") && draft.trim() !== "") {
      event.preventDefault()
      add(splitTags(draft))
      setDraft("")
    } else if (event.key === "Backspace" && draft === "" && tags.length > 0) {
      event.preventDefault()
      remove(tags.length - 1)
    }
  }

  return (
    <div
      data-slot="tag-input"
      data-disabled={disabled ? "" : undefined}
      aria-invalid={ariaInvalid}
      onClick={(event) => {
        if (event.target === event.currentTarget) inputRef.current?.focus()
      }}
      className={cn(
        "flex min-h-8 w-full min-w-0 flex-wrap items-center gap-1 rounded-2xl border border-border bg-transparent px-1.5 py-1 text-xs transition-colors",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          data-slot="tag-input-tag"
          className="inline-flex h-5 max-w-full items-center gap-0.5 rounded-2xl bg-background ps-2 pe-0.5 font-medium ring-1 ring-foreground/5 dark:bg-secondary"
        >
          <span className="truncate">{tag}</span>
          <button
            type="button"
            aria-label={removeLabel(tag)}
            disabled={disabled}
            onClick={() => remove(index)}
            className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <XIcon className="size-3" />
          </button>
          {name ? <input type="hidden" name={name} value={tag} /> : null}
        </span>
      ))}
      <input
        ref={inputRef}
        id={id}
        data-slot="tag-input-input"
        value={draft}
        disabled={disabled || full}
        placeholder={tags.length === 0 ? placeholder : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => {
          if (draft.trim() !== "") {
            add(splitTags(draft))
            setDraft("")
          }
        }}
        onPaste={(event) => {
          const text = event.clipboardData.getData("text")
          if (/[,\n]/.test(text)) {
            event.preventDefault()
            add(splitTags(draft + text))
            setDraft("")
          }
        }}
        className="h-6 min-w-16 flex-1 bg-transparent px-1.5 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      />
    </div>
  )
}

export { TagInput }
