"use client"

import * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const subscribeToNothing = () => () => {}

/**
 * The locale to format with. Without an explicit one, the server and the
 * first client render use "en-US" so the HTML matches, then the page's.
 */
function useFormatLocale(locale?: string) {
  const hydrated = React.useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  )
  return locale ?? (hydrated ? undefined : "en-US")
}

/**
 * A number field for money. The amount is formatted for the locale as you
 * leave the field ("1 234,50 €", "$1,234.50") and stays a plain number in
 * code. With `currencies`, a picker sits at the end. Arrows step, Shift
 * steps by ten.
 */
function CurrencyInput({
  className,
  currency: currencyProp,
  defaultCurrency = "EUR",
  onCurrencyChange,
  currencies,
  locale: localeProp,
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max,
  step = 1,
  fractionDigits,
  name,
  currencyName,
  disabled,
  required,
  id,
  placeholder,
  labels = {},
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: {
  className?: string
  /** Controlled ISO 4217 code. */
  currency?: string
  defaultCurrency?: string
  onCurrencyChange?: (currency: string) => void
  /** Codes offered in the picker. Without it, the currency is fixed. */
  currencies?: string[]
  /** Format locale. Defaults to the page's. */
  locale?: string
  value?: number | null
  defaultValue?: number
  onValueChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  /** Decimal places. Defaults to the currency's: 2 for EUR, 0 for JPY. */
  fractionDigits?: number
  /** Posts the amount. */
  name?: string
  /** Posts the currency code. */
  currencyName?: string
  disabled?: boolean
  required?: boolean
  id?: string
  placeholder?: string
  labels?: { currency?: string }
  "aria-label"?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}) {
  const locale = useFormatLocale(localeProp)
  const [uncontrolledCurrency, setUncontrolledCurrency] = React.useState(defaultCurrency)
  const currency = currencyProp ?? uncontrolledCurrency

  const format = React.useMemo<Intl.NumberFormatOptions>(
    () => ({
      style: "currency",
      currency,
      ...(fractionDigits === undefined
        ? {}
        : { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }),
    }),
    [currency, fractionDigits]
  )

  const names = React.useMemo(() => {
    try {
      return new Intl.DisplayNames(locale ? [locale] : undefined, { type: "currency" })
    } catch {
      return null
    }
  }, [locale])
  const symbol = (code: string) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: code, currencyDisplay: "narrowSymbol" })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value ?? code

  return (
    <NumberFieldPrimitive.Root
      data-slot="currency-input"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next)}
      min={min}
      max={max}
      step={step}
      largeStep={step * 10}
      format={format}
      locale={locale}
      name={name}
      disabled={disabled}
      required={required}
      id={id}
      className="w-full"
    >
      <NumberFieldPrimitive.Group
        className={cn(
          "relative flex h-8 w-full min-w-0 items-center rounded-2xl border border-border bg-transparent transition-colors",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
          "has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20",
          "data-disabled:pointer-events-none data-disabled:opacity-50",
          className
        )}
      >
        <NumberFieldPrimitive.Input
          aria-label={ariaLabel}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          placeholder={placeholder ?? new Intl.NumberFormat(locale, format).format(0)}
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs tabular-nums outline-none placeholder:text-muted-foreground/70"
        />
        {currencies?.length ? (
          <>
            <span aria-hidden className="h-4 w-px shrink-0 bg-border" />
            <SelectPrimitive.Root
              value={currency}
              onValueChange={(code) => {
                if (!code) return
                setUncontrolledCurrency(code as string)
                onCurrencyChange?.(code as string)
              }}
              disabled={disabled}
              name={currencyName}
              items={currencies.map((code) => ({ value: code, label: code }))}
            >
              <SelectPrimitive.Trigger
                aria-label={labels.currency ?? `Currency: ${names?.of(currency) ?? currency}`}
                className="flex h-full shrink-0 items-center gap-1 rounded-e-2xl ps-2 pe-2.5 font-mono text-[11px] text-muted-foreground outline-none hover:bg-muted/60 hover:text-foreground focus-visible:bg-muted"
              >
                {currency}
                <ChevronDownIcon aria-hidden className="size-3.5" />
              </SelectPrimitive.Trigger>
              <SelectPrimitive.Portal>
                <SelectPrimitive.Positioner
                  side="bottom"
                  align="end"
                  sideOffset={6}
                  alignItemWithTrigger={false}
                  className="isolate z-50"
                >
                  <SelectPrimitive.Popup className="relative isolate z-50 flex max-h-72 min-w-52 origin-(--transform-origin) flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 dark:ring-foreground/10">
                    <SelectPrimitive.List className="min-h-0 flex-1 scroll-fade overflow-y-auto p-1">
                      {currencies.map((code) => (
                        <SelectPrimitive.Item
                          key={code}
                          value={code}
                          className="relative flex min-h-7 cursor-pointer items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                        >
                          <span className="w-6 shrink-0 text-center text-muted-foreground">{symbol(code)}</span>
                          <SelectPrimitive.ItemText className="flex-1 truncate">
                            {names?.of(code) ?? code}
                          </SelectPrimitive.ItemText>
                          <span className="font-mono text-[11px] text-muted-foreground">{code}</span>
                          <SelectPrimitive.ItemIndicator className="absolute end-2 flex size-4 items-center justify-center">
                            <CheckIcon className="size-3.5" />
                          </SelectPrimitive.ItemIndicator>
                        </SelectPrimitive.Item>
                      ))}
                    </SelectPrimitive.List>
                  </SelectPrimitive.Popup>
                </SelectPrimitive.Positioner>
              </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
          </>
        ) : currencyName ? (
          <input type="hidden" name={currencyName} value={currency} />
        ) : null}
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
  )
}

export { CurrencyInput }
