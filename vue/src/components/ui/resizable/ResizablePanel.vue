<script setup lang="ts">
import { computed, inject, onBeforeUnmount, useId, watch, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { ResizableContextKey } from "./context"

const props = withDefaults(
  defineProps<{
    id?: string
    /** Initial size, in percent of the group. */
    defaultSize?: number
    minSize?: number
    maxSize?: number
    class?: HTMLAttributes["class"]
  }>(),
  { minSize: 10, maxSize: 100 },
)

const context = inject(ResizableContextKey)
if (!context) throw new Error("Resizable parts must sit inside ResizablePanelGroup.")

const generated = useId()
const id = computed(() => props.id ?? generated)

watch(
  () => [id.value, props.defaultSize, props.minSize, props.maxSize] as const,
  ([nextId, defaultSize, minSize, maxSize], previous) => {
    if (previous && previous[0] !== nextId) context.unregister(previous[0])
    context.register(nextId, defaultSize, { minSize, maxSize })
  },
  { immediate: true },
)
onBeforeUnmount(() => context.unregister(id.value))

const flex = computed(() => {
  const size = context.sizes.value[id.value]
  return size === undefined ? "1 1 0%" : `${size} 1 0%`
})
</script>

<template>
  <div
    :id="id"
    data-slot="resizable-panel"
    :data-panel-id="id"
    :style="{ flex }"
    :class="cn('min-h-0 min-w-0 overflow-hidden', props.class)"
  >
    <slot />
  </div>
</template>
