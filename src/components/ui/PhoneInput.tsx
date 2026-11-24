"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type PhoneCountry = {
  /** ISO 3166-1 alpha-2, upper case: "FR". */
  code: string
  /** Calling code without the plus: "33". */
  dial: string
  /** National format, one # per digit: "# ## ## ## ##". Groups of three by default. */
  pattern?: string
  /** Drop a leading 0 typed in the national number, as most of Europe writes it. */
  trunkZero?: boolean
}

/** A starting list. Pass your own `countries` for more, fewer, or other formats. */
const defaultCountries: PhoneCountry[] = [
  { code: "FR", dial: "33", pattern: "# ## ## ## ##", trunkZero: true },
  { code: "BE", dial: "32", pattern: "### ## ## ##", trunkZero: true },
  { code: "CH", dial: "41", pattern: "## ### ## ##", trunkZero: true },
  { code: "LU", dial: "352" },
  { code: "MC", dial: "377" },
  { code: "DE", dial: "49", trunkZero: true },
  { code: "AT", dial: "43", trunkZero: true },
  { code: "NL", dial: "31", pattern: "# ########", trunkZero: true },
  { code: "ES", dial: "34", pattern: "### ## ## ##" },
  { code: "PT", dial: "351", pattern: "### ### ###" },
  { code: "IT", dial: "39", pattern: "### ### ####" },
  { code: "GB", dial: "44", pattern: "#### ######", trunkZero: true },
  { code: "IE", dial: "353", trunkZero: true },
  { code: "DK", dial: "45", pattern: "## ## ## ##" },
  { code: "SE", dial: "46", trunkZero: true },
  { code: "NO", dial: "47", pattern: "### ## ###" },
  { code: "FI", dial: "358", trunkZero: true },
  { code: "PL", dial: "48", pattern: "### ### ###" },
  { code: "CZ", dial: "420", pattern: "### ### ###" },
  { code: "GR", dial: "30" },
  { code: "US", dial: "1", pattern: "(###) ###-####" },
  { code: "CA", dial: "1", pattern: "(###) ###-####" },
  { code: "MX", dial: "52" },
  { code: "BR", dial: "55", pattern: "## #####-####" },
  { code: "AR", dial: "54" },
  { code: "MA", dial: "212", pattern: "# ## ## ## ##", trunkZero: true },
  { code: "DZ", dial: "213", trunkZero: true },
  { code: "TN", dial: "216", pattern: "## ### ###" },
  { code: "SN", dial: "221", pattern: "## ### ## ##" },
  { code: "CI", dial: "225" },
  { code: "NG", dial: "234", trunkZero: true },
  { code: "ZA", dial: "27", trunkZero: true },
  { code: "EG", dial: "20", trunkZero: true },
  { code: "TR", dial: "90", trunkZero: true },
  { code: "IL", dial: "972", trunkZero: true },
  { code: "AE", dial: "971", trunkZero: true },
  { code: "SA", dial: "966", trunkZero: true },
  { code: "IN", dial: "91", pattern: "##### #####" },
  { code: "CN", dial: "86" },
  { code: "JP", dial: "81", trunkZero: true },
  { code: "KR", dial: "82", trunkZero: true },
  { code: "SG", dial: "65", pattern: "#### ####" },
  { code: "AU", dial: "61", pattern: "### ### ###", trunkZero: true },
  { code: "NZ", dial: "64", trunkZero: true },
]

/** "FR" → 🇫🇷, from the regional indicator letters. */
function flag(code: string) {
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)))
}

function formatNational(digits: string, pattern?: string) {
  if (!digits) return ""
  if (!pattern) return digits.replace(/(\d{3})(?=\d)/g, "$1 ")
  let out = ""
  let i = 0
  for (const char of pattern) {
    if (i >= digits.length) break
    if (char === "#") out += digits[i++]
    else out += char
  }
  // Digits past the pattern are kept, not dropped.
  return i < digits.length ? `${out}${digits.slice(i)}` : out
}

/** "+33612345678" → the country and national digits, preferring `preferred` on shared codes. */
function parse(value: string, countries: PhoneCountry[], preferred: string) {
  const digits = value.replace(/\D/g, "")
  if (!value.startsWith("+") || !digits) return null
  const matches = countries
    .filter((country) => digits.startsWith(country.dial))
    .sort((a, b) => b.dial.length - a.dial.length)
  if (!matches.length) return null
  const longest = matches.filter((c) => c.dial.length === matches[0].dial.length)
  const country = longest.find((c) => c.code === preferred) ?? longest[0]
  return { country, national: digits.slice(country.dial.length) }
}

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
 * A country picker with flags and calling codes next to a phone field. It
 * formats the number as you type and reports it in E.164 ("+33612345678").
 * Pasting an international number picks the country.
 */
function PhoneInput({
  className,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  country: countryProp,
  defaultCountry = "FR",
  onCountryChange,
  countries = defaultCountries,
  locale: localeProp,
  name,
  placeholder,
  disabled,
  required,
  id,
  labels = {},
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: {
  className?: string
  /** E.164, "+33612345678". Empty string when cleared. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string, details: { country: PhoneCountry; national: string }) => void
  /** Controlled ISO code. */
  country?: string
  defaultCountry?: string
  onCountryChange?: (code: string) => void
  countries?: PhoneCountry[]
  /** Language for country names. Defaults to the page's. */
  locale?: string
  /** Posts the E.164 value in a hidden input. */
  name?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  id?: string
  labels?: { country?: string }
  "aria-label"?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const value = valueProp ?? uncontrolledValue
  const parsedDefault = parse(defaultValue, countries, defaultCountry)
  const [uncontrolledCountry, setUncontrolledCountry] = React.useState(
    parsedDefault?.country.code ?? defaultCountry
  )
  const countryCode = countryProp ?? uncontrolledCountry
  const country = countries.find((c) => c.code === countryCode) ?? countries[0]

  const parsed = parse(value, countries, country.code)
  const national = parsed && parsed.country.dial === country.dial ? parsed.national : ""

  const locale = useFormatLocale(localeProp)
  const names = React.useMemo(() => {
    try {
      return new Intl.DisplayNames(locale ? [locale] : undefined, { type: "region" })
    } catch {
      return null
    }
  }, [locale])
  const countryName = (code: string) => names?.of(code) ?? code

  const emit = (nextCountry: PhoneCountry, nextNational: string) => {
    const e164 = nextNational ? `+${nextCountry.dial}${nextNational}` : ""
    setUncontrolledValue(e164)
    onValueChange?.(e164, { country: nextCountry, national: nextNational })
  }
  const pickCountry = (code: string) => {
    const next = countries.find((c) => c.code === code)
    if (!next) return
    setUncontrolledCountry(code)
    onCountryChange?.(code)
    emit(next, national)
  }

  const onInput = (raw: string) => {
    // A pasted international number chooses the country.
    if (raw.trim().startsWith("+") || raw.trim().startsWith("00")) {
      const found = parse(`+${raw.replace(/\D/g, "").replace(/^00/, "")}`, countries, country.code)
      if (found) {
        if (found.country.code !== country.code) {
          setUncontrolledCountry(found.country.code)
          onCountryChange?.(found.country.code)
        }
        emit(found.country, found.national)
        return
      }
    }
    let digits = raw.replace(/\D/g, "")
    if (country.trunkZero) digits = digits.replace(/^0/, "")
    emit(country, digits.slice(0, 15 - country.dial.length))
  }

  return (
    <div
      data-slot="phone-input"
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "group/phone relative flex h-8 w-full min-w-0 items-center rounded-2xl border border-border bg-transparent transition-colors",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
        "has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <SelectPrimitive.Root
        value={country.code}
        onValueChange={(code) => code && pickCountry(code as string)}
        disabled={disabled}
        items={countries.map((c) => ({ value: c.code, label: `${countryName(c.code)} +${c.dial}` }))}
      >
        <SelectPrimitive.Trigger
          aria-label={labels.country ?? `Country: ${countryName(country.code)}`}
          className="flex h-full shrink-0 items-center gap-1 rounded-s-2xl ps-3 pe-2 text-xs outline-none hover:bg-muted/60 focus-visible:bg-muted"
        >
          <span aria-hidden className="text-sm leading-none">{flag(country.code)}</span>
          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">+{country.dial}</span>
          <ChevronDownIcon aria-hidden className="size-3.5 text-muted-foreground" />
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Positioner
            side="bottom"
            align="start"
            sideOffset={6}
            alignItemWithTrigger={false}
            className="isolate z-50"
          >
            <SelectPrimitive.Popup className="relative isolate z-50 flex max-h-72 min-w-56 origin-(--transform-origin) flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 dark:ring-foreground/10">
              <SelectPrimitive.List className="min-h-0 flex-1 scroll-fade overflow-y-auto p-1">
                {countries.map((c) => (
                  <SelectPrimitive.Item
                    key={c.code}
                    value={c.code}
                    className="relative flex min-h-7 cursor-pointer items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                  >
                    <span aria-hidden className="text-sm leading-none">{flag(c.code)}</span>
                    <SelectPrimitive.ItemText className="flex-1 truncate">{countryName(c.code)}</SelectPrimitive.ItemText>
                    <span className="font-mono text-[11px] text-muted-foreground tabular-nums">+{c.dial}</span>
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

      <span aria-hidden className="h-4 w-px shrink-0 bg-border" />

      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        data-slot="input"
        value={formatNational(national, country.pattern)}
        onChange={(event) => onInput(event.target.value)}
        placeholder={placeholder ?? formatNational("6".repeat(9), country.pattern).replace(/\d/g, "0")}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className="h-full min-w-0 flex-1 bg-transparent ps-2.5 pe-3 text-xs tabular-nums outline-none placeholder:text-muted-foreground/70"
      />
      {name ? <input type="hidden" name={name} value={value} /> : null}
    </div>
  )
}

export { PhoneInput, defaultCountries as phoneCountries, formatNational as formatPhoneNumber }
export type { PhoneCountry }
