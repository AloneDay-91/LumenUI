"use client"

import * as React from "react"
import { ArrowUpIcon, SquareIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

type PromptStatus = "ready" | "submitted" | "streaming" | "error"

type PromptInputContextValue = {
  value: string
  setValue: (value: string) => void
  submit: () => void
  status: PromptStatus
  onStop?: () => void
  submitOn: "enter" | "mod-enter"
  disabled?: boolean
}

const PromptInputContext = React.createContext<PromptInputContextValue | null>(null)

function usePromptInput() {
  const context = React.useContext(PromptInputContext)
  if (!context) throw new Error("PromptInput parts must sit inside PromptInput.")
  return context
}

/**
 * The composer: a growing textarea over a toolbar. Enter sends and
 * Shift+Enter breaks a line, or ⌘/Ctrl+Enter sends with `submitOn="mod-enter"`.
 */
function PromptInput({
  className,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onSubmit,
  onStop,
  status = "ready",
  submitOn = "enter",
  disabled,
  children,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit" | "defaultValue"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Called with the trimmed text. Clear the field yourself when uncontrolled is not enough. */
  onSubmit?: (value: string) => void
  onStop?: () => void
  status?: PromptStatus
  submitOn?: "enter" | "mod-enter"
  disabled?: boolean
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const value = valueProp ?? uncontrolled

  const setValue = React.useCallback(
    (next: string) => {
      if (valueProp === undefined) setUncontrolled(next)
      onValueChange?.(next)
    },
    [valueProp, onValueChange]
  )

  const submit = React.useCallback(() => {
    const text = value.trim()
    if (!text || disabled || status === "submitted" || status === "streaming") return
    onSubmit?.(text)
    setValue("")
  }, [value, disabled, status, onSubmit, setValue])

  const context = React.useMemo(
    () => ({ value, setValue, submit, status, onStop, submitOn, disabled }),
    [value, setValue, submit, status, onStop, submitOn, disabled]
  )

  return (
    <PromptInputContext.Provider value={context}>
      <form
        data-slot="prompt-input"
        data-status={status}
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
        className={cn(
          "flex w-full flex-col gap-1 rounded-3xl border border-border bg-card p-2 transition-colors",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
          className
        )}
        {...props}
      >
        {children}
      </form>
    </PromptInputContext.Provider>
  )
}

function PromptInputTextarea({
  className,
  onKeyDown,
  placeholder = "Ask anything…",
  maxRows = 8,
  ...props
}: Omit<React.ComponentProps<"textarea">, "value" | "defaultValue"> & {
  /** Height cap before the field scrolls. */
  maxRows?: number
}) {
  const { value, setValue, submit, submitOn, disabled } = usePromptInput()

  return (
    <textarea
      data-slot="prompt-input-textarea"
      rows={1}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented || event.key !== "Enter" || event.nativeEvent.isComposing) return
        const mod = event.metaKey || event.ctrlKey
        const send = submitOn === "enter" ? !event.shiftKey : mod
        if (send) {
          event.preventDefault()
          submit()
        }
      }}
      style={{ maxHeight: `calc(${maxRows} * 1.5rem + 1rem)` }}
      className={cn(
        "field-sizing-content min-h-10 w-full resize-none bg-transparent px-2.5 py-2 text-sm leading-6 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function PromptInputToolbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-toolbar"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

/** Sends while ready, stops while streaming. */
function PromptInputSubmit({
  className,
  sendLabel = "Send",
  stopLabel = "Stop",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "type" | "children"> & {
  sendLabel?: string
  stopLabel?: string
}) {
  const { value, status, onStop, disabled } = usePromptInput()
  const busy = status === "submitted" || status === "streaming"

  if (busy && onStop) {
    return (
      <Button
        type="button"
        size="icon"
        aria-label={stopLabel}
        onClick={onStop}
        className={cn("ms-auto", className)}
        {...props}
      >
        <SquareIcon className="size-3 fill-current" />
      </Button>
    )
  }

  return (
    <Button
      type="submit"
      size="icon"
      aria-label={sendLabel}
      loading={status === "submitted"}
      disabled={disabled || (busy && status !== "submitted") || value.trim() === ""}
      className={cn("ms-auto", className)}
      {...props}
    >
      <ArrowUpIcon />
    </Button>
  )
}

export { PromptInput, PromptInputTextarea, PromptInputToolbar, PromptInputSubmit }
export type { PromptStatus }
