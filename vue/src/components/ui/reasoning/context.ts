import { computed, inject, type ComputedRef, type InjectionKey } from "vue"

export type ReasoningContextValue = { streaming: boolean; duration?: number }

export const ReasoningContextKey: InjectionKey<ComputedRef<ReasoningContextValue>> = Symbol("ReasoningContext")

const fallback = computed<ReasoningContextValue>(() => ({ streaming: false }))

export function useReasoning() {
  return inject(ReasoningContextKey, fallback)
}
