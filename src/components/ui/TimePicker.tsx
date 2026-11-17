"use client"

import * as React from "react"
import { ClockIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { cn } from "@/lib/utils"

type Time = { hours: number; minutes: number }

function parseTime(value: string | undefined): Time | undefined {
  const match = value?.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return undefined
  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (hours > 23 || minutes > 59) return undefined
  return { hours, minutes }
}

const pad = (n: number) => String(n).padStart(2, "0")

function toValue({ hours, minutes }: Time) {
  return `${pad(hours)}:${pad(minutes)}`
}

function formatTime(time: Time, hourCycle: 12 | 24) {
  if (hourCycle === 24) return toValue(time)
  const period = time.hours < 12 ? "AM" : "PM"
  const hours = time.hours % 12 === 0 ? 12 : time.hours % 12
  return `${hours}:${pad(time.minutes)} ${period}`
}

type Option = { value: number; label: string }

/** One scrolling column. A listbox with roving focus: arrows, Home, End. */
function TimeColumn({
  label,
  options,
  selected,
  onSelect,
  autoFocus,
}: {
  label: string
  options: Option[]
  selected: number | undefined
  onSelect: (value: number, commit: boolean) => void
  autoFocus?: boolean
}) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const selectedIndex = options.findIndex((option) => option.value === selected)
  const tabIndex = selectedIndex === -1 ? 0 : selectedIndex

  React.useLayoutEffect(() => {
    const node = refs.current[tabIndex]
    node?.scrollIntoView({ block: "center" })
    if (autoFocus) node?.focus({ preventScroll: true })
    // Only on open: later selections keep the column where the user left it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function move(index: number) {
    const next = Math.max(0, Math.min(options.length - 1, index))
    refs.current[next]?.focus()
    refs.current[next]?.scrollIntoView({ block: "nearest" })
  }

  return (
    <div
      role="listbox"
      aria-label={label}
      data-slot="time-picker-column"
      className="flex max-h-56 w-14 flex-col gap-0.5 overflow-y-auto overscroll-contain p-1 [scrollbar-width:none]"
    >
      {options.map((option, index) => {
        const isSelected = option.value === selected
        return (
          <button
            key={option.value}
            ref={(node) => {
              refs.current[index] = node
            }}
            type="button"
            role="option"
            aria-selected={isSelected}
            tabIndex={index === tabIndex ? 0 : -1}
            onClick={() => onSelect(option.value, true)}
            onKeyDown={(event) => {
              const keys: Record<string, number> = {
                ArrowDown: index + 1,
                ArrowUp: index - 1,
                Home: 0,
                End: options.length - 1,
              }
              if (event.key in keys) {
                event.preventDefault()
                move(keys[event.key])
              } else if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onSelect(option.value, event.key === "Enter")
              }
            }}
            className={cn(
              "flex h-7 shrink-0 items-center justify-center rounded-xl font-mono text-xs tabular-nums outline-none",
              "hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30",
              isSelected && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function TimePicker({
  value,
  defaultValue,
  onValueChange,
  step = 15,
  hourCycle = 24,
  placeholder = "Pick a time",
  disabled,
  name,
  id,
  className,
  "aria-label": ariaLabel,
  labels = {},
}: {
  /** "HH:mm", 24-hour, like a native time input. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Minutes between two options. */
  step?: number
  hourCycle?: 12 | 24
  placeholder?: string
  disabled?: boolean
  name?: string
  id?: string
  className?: string
  "aria-label"?: string
  labels?: { hours?: string; minutes?: string; period?: string }
}) {
  const [open, setOpen] = React.useState(false)
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const time = parseTime(value ?? uncontrolled)

  function commit(next: Time, close: boolean) {
    const formatted = toValue(next)
    if (value === undefined) setUncontrolled(formatted)
    onValueChange?.(formatted)
    if (close) setOpen(false)
  }

  const current = time ?? { hours: 9, minutes: 0 }
  const isPm = current.hours >= 12

  const hourOptions: Option[] =
    hourCycle === 24
      ? Array.from({ length: 24 }, (_, h) => ({ value: h, label: pad(h) }))
      : Array.from({ length: 12 }, (_, i) => {
          const display = i === 0 ? 12 : i
          return { value: isPm ? i + 12 : i, label: String(display) }
        })

  const minuteOptions: Option[] = Array.from(
    { length: Math.ceil(60 / Math.max(1, step)) },
    (_, i) => ({ value: i * step, label: pad(i * step) })
  ).filter((option) => option.value < 60)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            id={id}
            variant="outline"
            disabled={disabled}
            // Keep the time in the name: a bare aria-label would hide the value.
            aria-label={ariaLabel ? `${ariaLabel}, ${time ? formatTime(time, hourCycle) : placeholder}` : undefined}
            data-slot="time-picker"
            className={cn(
              "min-w-36 justify-start font-normal tabular-nums",
              !time && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <ClockIcon data-icon="inline-start" />
        {time ? formatTime(time, hourCycle) : placeholder}
      </PopoverTrigger>
      {name ? <input type="hidden" name={name} value={time ? toValue(time) : ""} /> : null}
      <PopoverContent align="start" className="flex w-auto gap-1 p-1">
        <TimeColumn
          autoFocus
          label={labels.hours ?? "Hours"}
          options={hourOptions}
          selected={time ? current.hours : undefined}
          onSelect={(hours) => commit({ hours, minutes: current.minutes }, false)}
        />
        <div aria-hidden className="w-px self-stretch bg-border" />
        <TimeColumn
          label={labels.minutes ?? "Minutes"}
          options={minuteOptions}
          selected={time ? current.minutes : undefined}
          onSelect={(minutes, close) => commit({ hours: current.hours, minutes }, close)}
        />
        {hourCycle === 12 ? (
          <>
            <div aria-hidden className="w-px self-stretch bg-border" />
            <TimeColumn
              label={labels.period ?? "AM or PM"}
              options={[
                { value: 0, label: "AM" },
                { value: 1, label: "PM" },
              ]}
              selected={time ? (isPm ? 1 : 0) : undefined}
              onSelect={(period) =>
                commit({ hours: (current.hours % 12) + (period ? 12 : 0), minutes: current.minutes }, false)
              }
            />
          </>
        ) : null}
      </PopoverContent>
    </Popover>
  )
}

export { TimePicker }
