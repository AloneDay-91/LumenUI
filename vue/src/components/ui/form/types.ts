/** Server-side messages keyed by field `name`, as on Base UI's Form. */
export type FormErrors = Record<string, string | string[]>

/** Values of every named control, a list when several share a name. */
export type FormValues = Record<string, unknown>

/** What the default slot of Form receives. */
export interface FormSlotProps {
  /** `true` for every field name that has a native or server error. */
  invalid: Record<string, boolean>
  /** Messages per field name: the browser's validation message and the server's. */
  errors: Record<string, string[]>
  /** How many times the form has been submitted. */
  submitCount: number
}
