export { default as ModelSelector } from "./ModelSelector.vue"

export type ModelOption = { value: string; label: string; description?: string }
export type EffortOption = { value: string; label: string }

export const defaultEfforts: EffortOption[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]
