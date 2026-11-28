import { inject, type InjectionKey, type Ref } from "vue"

export type PromptStatus = "ready" | "submitted" | "streaming" | "error"

export interface PromptInputContext {
  value: Ref<string>
  setValue: (value: string) => void
  submit: () => void
  status: Ref<PromptStatus>
  onStop: Ref<(() => void) | undefined>
  submitOn: Ref<"enter" | "mod-enter">
  disabled: Ref<boolean | undefined>
}

export const promptInputKey: InjectionKey<PromptInputContext> = Symbol("PromptInput")

export function usePromptInput() {
  const context = inject(promptInputKey, null)
  if (!context) throw new Error("PromptInput parts must sit inside PromptInput.")
  return context
}
