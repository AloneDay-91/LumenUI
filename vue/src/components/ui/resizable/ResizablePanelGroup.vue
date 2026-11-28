<script setup lang="ts">
import { provide, ref, toRef, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { ResizableContextKey, type Direction, type PanelConfig } from "./context"

const props = withDefaults(
  defineProps<{
    direction?: Direction
    class?: HTMLAttributes["class"]
  }>(),
  { direction: "horizontal" },
)

const emit = defineEmits<{
  /** Each panel's size, in percent, after a resize. */
  layout: [sizes: Record<string, number>]
}>()

const sizes = ref<Record<string, number>>({})
const configs = new Map<string, PanelConfig>()
const defaults = new Map<string, number | undefined>()
const groupRef = ref<HTMLDivElement | null>(null)

function register(id: string, defaultSize: number | undefined, config: PanelConfig) {
  configs.set(id, config)
  defaults.set(id, defaultSize)
  // Panels without a default share whatever the others leave.
  const entries = Array.from(defaults.entries())
  const fixed = entries.reduce((sum, [, size]) => sum + (size ?? 0), 0)
  const free = entries.filter(([, size]) => size === undefined).length
  const share = free > 0 ? Math.max(0, 100 - fixed) / free : 0
  sizes.value = Object.fromEntries(entries.map(([key, size]) => [key, size ?? share]))
}

function unregister(id: string) {
  configs.delete(id)
  defaults.delete(id)
  const next = { ...sizes.value }
  delete next[id]
  sizes.value = next
}

function resize(beforeId: string, afterId: string, delta: number) {
  const previous = sizes.value
  const before = previous[beforeId]
  const after = previous[afterId]
  if (before === undefined || after === undefined) return
  const a = configs.get(beforeId) ?? { minSize: 0, maxSize: 100 }
  const b = configs.get(afterId) ?? { minSize: 0, maxSize: 100 }
  const total = before + after
  const low = Math.max(a.minSize, total - b.maxSize)
  const high = Math.min(a.maxSize, total - b.minSize)
  const nextBefore = Math.min(high, Math.max(low, before + delta))
  if (nextBefore === before) return
  const next = { ...previous, [beforeId]: nextBefore, [afterId]: total - nextBefore }
  sizes.value = next
  emit("layout", next)
}

provide(ResizableContextKey, {
  direction: toRef(props, "direction"),
  sizes,
  configs,
  register,
  unregister,
  resize,
  groupRef,
})
</script>

<template>
  <div
    ref="groupRef"
    data-slot="resizable-panel-group"
    :data-direction="direction"
    :class="cn('flex size-full overflow-hidden', direction === 'vertical' ? 'flex-col' : 'flex-row', props.class)"
  >
    <slot />
  </div>
</template>
