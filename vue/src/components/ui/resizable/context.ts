import type { InjectionKey, Ref } from "vue"

export type Direction = "horizontal" | "vertical"

export type PanelConfig = { minSize: number; maxSize: number }

export type ResizableContextValue = {
  direction: Ref<Direction>
  sizes: Ref<Record<string, number>>
  configs: Map<string, PanelConfig>
  register: (id: string, defaultSize: number | undefined, config: PanelConfig) => void
  unregister: (id: string) => void
  resize: (beforeId: string, afterId: string, delta: number) => void
  groupRef: Ref<HTMLDivElement | null>
}

export const ResizableContextKey: InjectionKey<ResizableContextValue> = Symbol("ResizableContext")
