import type { TraceStatus } from "@/components/ui/trace"

export { default as Plan } from "./Plan.vue"

export type PlanItem = { id: string; title: string; description?: string; status: TraceStatus }
