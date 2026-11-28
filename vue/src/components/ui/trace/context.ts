import { computed, inject, type ComputedRef, type InjectionKey } from "vue"

export type TraceStatus = "pending" | "running" | "done" | "error"

export const statusLabel: Record<TraceStatus, string> = {
  pending: "Pending",
  running: "Running",
  done: "Done",
  error: "Failed",
}

export type TraceContextValue = { status: TraceStatus; variant: "plain" | "card" }

export const TraceContextKey: InjectionKey<ComputedRef<TraceContextValue>> = Symbol("TraceContext")

const fallback = computed<TraceContextValue>(() => ({ status: "done", variant: "plain" }))

/** The status and variant of the enclosing Trace, as a computed ref. */
export function useTrace() {
  return inject(TraceContextKey, fallback)
}
