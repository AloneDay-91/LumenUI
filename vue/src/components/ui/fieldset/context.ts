import type { InjectionKey, Ref } from "vue"

export interface FieldsetContext {
  legendId: Ref<string | undefined>
  disabled: Ref<boolean>
}

export const fieldsetContextKey: InjectionKey<FieldsetContext> = Symbol("Fieldset")
