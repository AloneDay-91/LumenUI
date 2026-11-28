import { TraceStep } from "@/components/ui/trace"

export { default as ChainOfThought } from "./ChainOfThought.vue"

/** One step of the chain. The default slot holds what it found: links, images, a quote. */
export const ChainOfThoughtStep = TraceStep
