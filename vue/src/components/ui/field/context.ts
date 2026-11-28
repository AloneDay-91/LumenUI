import type { ComputedRef, InjectionKey } from "vue"

export interface FieldContext {
  controlId: string
  descriptionId: string
  errorId: string
  invalid: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  name: ComputedRef<string | undefined>
}

export const fieldKey: InjectionKey<FieldContext> = Symbol("LumenField")
