<script setup lang="ts">
import { computed, inject, onMounted, ref, watch, type HTMLAttributes } from "vue"
import { GripVertical } from "@lucide/vue"

import { cn } from "@/lib/utils"
import { ResizableContextKey } from "./context"

const props = withDefaults(
  defineProps<{
    withHandle?: boolean
    ariaLabel?: string
    class?: HTMLAttributes["class"]
  }>(),
  { withHandle: false, ariaLabel: "Resize panels" },
)

const context = inject(ResizableContextKey)
if (!context) throw new Error("Resizable parts must sit inside ResizablePanelGroup.")
const { direction, sizes, configs, resize, groupRef } = context

const handleRef = ref<HTMLDivElement | null>(null)
const pair = ref<[string, string] | null>(null)
const dragging = ref(false)

function neighbour(handle: HTMLElement, side: "previous" | "next") {
  let node = side === "previous" ? handle.previousElementSibling : handle.nextElementSibling
  while (node && !(node as HTMLElement).dataset.panelId) {
    node = side === "previous" ? node.previousElementSibling : node.nextElementSibling
  }
  return (node as HTMLElement | null)?.dataset.panelId
}

function findPair() {
  if (!handleRef.value) return
  const before = neighbour(handleRef.value, "previous")
  const after = neighbour(handleRef.value, "next")
  pair.value = before && after ? [before, after] : null
}
onMounted(findPair)
watch(sizes, findPair, { flush: "post" })

const horizontal = computed(() => direction.value === "horizontal")
const value = computed(() => (pair.value ? sizes.value[pair.value[0]] : undefined))
const config = computed(() => {
  // Re-read when sizes change, since configs is a plain Map.
  void sizes.value
  return pair.value ? configs.get(pair.value[0]) : undefined
})

function onPointerDown(event: PointerEvent) {
  const current = pair.value
  if (!current || !groupRef.value) return
  event.preventDefault()
  const rect = groupRef.value.getBoundingClientRect()
  const isHorizontal = horizontal.value
  const length = isHorizontal ? rect.width : rect.height
  const rtl = isHorizontal && getComputedStyle(groupRef.value).direction === "rtl"
  let last = isHorizontal ? event.clientX : event.clientY
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  dragging.value = true

  const move = (moveEvent: PointerEvent) => {
    const position = isHorizontal ? moveEvent.clientX : moveEvent.clientY
    const delta = ((position - last) / length) * 100 * (rtl ? -1 : 1)
    last = position
    resize(current[0], current[1], delta)
  }
  const up = () => {
    dragging.value = false
    window.removeEventListener("pointermove", move)
    window.removeEventListener("pointerup", up)
  }
  window.addEventListener("pointermove", move)
  window.addEventListener("pointerup", up)
}

function onKeyDown(event: KeyboardEvent) {
  const current = pair.value
  if (!current) return
  const step = event.shiftKey ? 10 : 2
  const rtl = horizontal.value && getComputedStyle(event.currentTarget as HTMLElement).direction === "rtl"
  const grow = horizontal.value ? (rtl ? "ArrowLeft" : "ArrowRight") : "ArrowDown"
  const shrink = horizontal.value ? (rtl ? "ArrowRight" : "ArrowLeft") : "ArrowUp"
  if (event.key === grow) resize(current[0], current[1], step)
  else if (event.key === shrink) resize(current[0], current[1], -step)
  else if (event.key === "Home") resize(current[0], current[1], -100)
  else if (event.key === "End") resize(current[0], current[1], 100)
  else return
  event.preventDefault()
}

const afterClass = "after:absolute after:content-[''] focus-visible:bg-ring data-dragging:bg-ring"
</script>

<template>
  <div
    ref="handleRef"
    role="separator"
    tabindex="0"
    :aria-label="ariaLabel"
    :aria-orientation="horizontal ? 'vertical' : 'horizontal'"
    :aria-controls="pair?.[0]"
    :aria-valuenow="value === undefined ? undefined : Math.round(value)"
    :aria-valuemin="config?.minSize"
    :aria-valuemax="config?.maxSize"
    data-slot="resizable-handle"
    :data-dragging="dragging ? '' : undefined"
    :class="
      cn(
        'relative flex shrink-0 touch-none items-center justify-center bg-border outline-none select-none',
        afterClass,
        horizontal
          ? 'w-px cursor-col-resize after:inset-y-0 after:-inset-x-1.5'
          : 'h-px cursor-row-resize after:inset-x-0 after:-inset-y-1.5',
        props.class,
      )
    "
    @pointerdown="onPointerDown"
    @keydown="onKeyDown"
  >
    <span
      v-if="withHandle"
      aria-hidden="true"
      :class="
        cn(
          'z-10 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground',
          horizontal ? 'h-6 w-3.5' : 'h-3.5 w-6 [&_svg]:rotate-90',
        )
      "
    >
      <GripVertical class="size-2.5" />
    </span>
  </div>
</template>
