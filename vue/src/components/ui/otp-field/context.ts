import type { ComputedRef, InjectionKey } from "vue"

export type OTPValidationType = "numeric" | "alpha" | "alphanumeric" | "none"

export interface OTPFieldContext {
  /** Id of the first input; the next ones get `{id}-2`, `{id}-3`… */
  id: ComputedRef<string | undefined>
  validationType: ComputedRef<OTPValidationType>
  /** Next index for an input that does not pass one (in setup order). */
  nextIndex: () => number
}

export const OTPFieldKey: InjectionKey<OTPFieldContext> = Symbol("OTPField")

const patterns: Record<OTPValidationType, RegExp | null> = {
  numeric: /[^0-9]/g,
  alpha: /[^a-zA-Z]/g,
  alphanumeric: /[^a-zA-Z0-9]/g,
  none: null,
}

/** Drops whitespace and the characters `validationType` rejects. */
export function filterOTPValue(value: string, validationType: OTPValidationType) {
  const pattern = patterns[validationType]
  const trimmed = value.replace(/\s/g, "")
  return pattern ? trimmed.replace(pattern, "") : trimmed
}
