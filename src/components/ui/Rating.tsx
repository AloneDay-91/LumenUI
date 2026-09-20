"use client"

import * as React from "react"
import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function Rating({
  className,
  max = 5,
  value,
  defaultValue = 0,
  onValueChange,
  readOnly = false,
  name,
  label = "Rating",
  ...props
}: Omit<React.ComponentProps<"div">, "defaultValue"> & {
  max?: number
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  readOnly?: boolean
  name?: string
  label?: string
}) {
  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const current = clamp(isControlled ? value : uncontrolled, 0, max)
  const [hovered, setHovered] = React.useState<number | null>(null)
  const displayed = hovered ?? current

  function setScore(next: number) {
    if (readOnly) {
      return
    }
    const score = clamp(next, 0, max)
    if (!isControlled) {
      setUncontrolled(score)
    }
    onValueChange?.(score)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (readOnly) {
      return
    }

    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault()
        setScore(current + 1)
        break
      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault()
        setScore(current - 1)
        break
      case "Home":
        event.preventDefault()
        setScore(1)
        break
      case "End":
        event.preventDefault()
        setScore(max)
        break
      default:
        break
    }
  }

  return (
    <div
      data-slot="rating"
      role="radiogroup"
      aria-label={label}
      aria-readonly={readOnly || undefined}
      tabIndex={readOnly ? undefined : 0}
      onKeyDown={onKeyDown}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "inline-flex items-center gap-0.5 outline-none focus-visible:rounded-lg focus-visible:ring-3 focus-visible:ring-ring/30",
        readOnly && "pointer-events-none",
        className
      )}
      {...props}
    >
      {name ? <input type="hidden" name={name} value={current} /> : null}
      {Array.from({ length: max }, (_, index) => {
        const score = index + 1
        const active = score <= displayed
        return (
          <button
            key={score}
            type="button"
            role="radio"
            aria-checked={score === current}
            aria-label={`${score} of ${max}`}
            tabIndex={-1}
            disabled={readOnly}
            data-active={active || undefined}
            onMouseEnter={() => {
              if (!readOnly) {
                setHovered(score)
              }
            }}
            onClick={() => setScore(score)}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground/40 transition-colors",
              "hover:text-foreground data-active:text-foreground",
              "focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
            )}
          >
            <StarIcon
              className="size-4"
              fill={active ? "currentColor" : "none"}
            />
          </button>
        )
      })}
    </div>
  )
}

export { Rating }
