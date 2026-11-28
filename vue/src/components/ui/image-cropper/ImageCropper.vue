<script setup lang="ts">
import { computed, onMounted, ref, watch, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { clamp, initialBox, type Box, type CropArea } from "./crop"

/**
 * An image with a crop box you drag and resize by its corners, at a fixed
 * ratio or free. The area outside is dimmed; `shape="round"` previews an
 * avatar. Arrows move the box, Shift with arrows resizes it. Pass the area
 * to `cropImage` to get the file.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    src: string
    alt: string
    /** Width over height, e.g. 1 for a square or 16 / 9. Free when unset. */
    aspect?: number
    /** `round` shows a circle, for avatars. Use with aspect 1. */
    shape?: "rect" | "round"
    /** Pixels. The image scales down to fit. */
    maxHeight?: number
    labels?: { box?: string; handle?: (corner: string) => string }
  }>(),
  { shape: "rect", maxHeight: 360, labels: () => ({}) },
)

const emit = defineEmits<{
  /** The crop in the image's pixels, on every change. */
  areaChange: [area: CropArea]
}>()

const frameRef = ref<HTMLDivElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const natural = ref<{ width: number; height: number } | null>(null)
const box = ref<Box | null>(null)

function toArea(next: Box, size: { width: number; height: number }): CropArea {
  return {
    x: Math.round(next.x * size.width),
    y: Math.round(next.y * size.height),
    width: Math.round(next.w * size.width),
    height: Math.round(next.h * size.height),
  }
}

function update(next: Box) {
  box.value = next
  if (natural.value) emit("areaChange", toArea(next, natural.value))
}

function start(img: HTMLImageElement) {
  if (!img.naturalWidth) return
  const next = { width: img.naturalWidth, height: img.naturalHeight }
  natural.value = next
  const first = initialBox(props.aspect, next.width / next.height)
  box.value = first
  emit("areaChange", toArea(first, next))
}

// A cached image can finish loading before Vue listens for load.
onMounted(() => {
  const img = imageRef.value
  if (img?.complete) start(img)
})
watch(
  () => props.src,
  () => {
    const img = imageRef.value
    if (img?.complete) start(img)
  },
  { flush: "post" },
)

const imageRatio = computed(() => (natural.value ? natural.value.width / natural.value.height : 1))
const minW = 0.08
const minH = 0.08

type Corner = "nw" | "ne" | "sw" | "se"

function startDrag(event: PointerEvent, corner: "move" | Corner) {
  if (!box.value || !frameRef.value) return
  event.preventDefault()
  event.stopPropagation()
  const rect = frameRef.value.getBoundingClientRect()
  const origin = { x: event.clientX, y: event.clientY, box: box.value }
  const aspect = props.aspect
  const onMove = (move: PointerEvent) => {
    const dx = (move.clientX - origin.x) / rect.width
    const dy = (move.clientY - origin.y) / rect.height
    const b = origin.box
    if (corner === "move") {
      update({ ...b, x: clamp(b.x + dx, 0, 1 - b.w), y: clamp(b.y + dy, 0, 1 - b.h) })
      return
    }
    const left = corner === "nw" || corner === "sw"
    const top = corner === "nw" || corner === "ne"
    // The opposite corner stays put.
    const anchorX = left ? b.x + b.w : b.x
    const anchorY = top ? b.y + b.h : b.y
    let w = clamp(left ? b.w - dx : b.w + dx, minW, left ? anchorX : 1 - anchorX)
    let h = clamp(top ? b.h - dy : b.h + dy, minH, top ? anchorY : 1 - anchorY)
    if (aspect) {
      const r = aspect / imageRatio.value
      // Follow the larger movement, then fit inside the room left.
      if (w / r > h) h = w / r
      else w = h * r
      const roomW = left ? anchorX : 1 - anchorX
      const roomH = top ? anchorY : 1 - anchorY
      if (w > roomW) {
        w = roomW
        h = w / r
      }
      if (h > roomH) {
        h = roomH
        w = h * r
      }
    }
    update({ x: left ? anchorX - w : anchorX, y: top ? anchorY - h : anchorY, w, h })
  }
  const onUp = () => {
    window.removeEventListener("pointermove", onMove)
    window.removeEventListener("pointerup", onUp)
  }
  window.addEventListener("pointermove", onMove)
  window.addEventListener("pointerup", onUp)
}

function onKeyDown(event: KeyboardEvent) {
  const current = box.value
  if (!current) return
  const aspect = props.aspect
  const step = event.altKey ? 0.002 : 0.02
  const dx = event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0
  const dy = event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0
  if (!dx && !dy) return
  event.preventDefault()
  if (event.shiftKey) {
    // Resize from the top-left corner, keeping the ratio.
    let w = clamp(current.w + (dx || dy), minW, 1 - current.x)
    let h = aspect ? w / (aspect / imageRatio.value) : clamp(current.h + dy, minH, 1 - current.y)
    if (aspect && current.y + h > 1) {
      h = 1 - current.y
      w = h * (aspect / imageRatio.value)
    }
    if (!aspect) w = clamp(current.w + dx, minW, 1 - current.x)
    update({ ...current, w, h })
  } else {
    update({ ...current, x: clamp(current.x + dx, 0, 1 - current.w), y: clamp(current.y + dy, 0, 1 - current.h) })
  }
}

const pct = (value: number) => `${value * 100}%`
const corners = ["nw", "ne", "sw", "se"] as const

const cornerClass: Record<Corner, string> = {
  nw: "-top-1.5 -left-1.5 cursor-nwse-resize",
  ne: "-top-1.5 -right-1.5 cursor-nesw-resize",
  sw: "-bottom-1.5 -left-1.5 cursor-nesw-resize",
  se: "-right-1.5 -bottom-1.5 cursor-nwse-resize",
}

const boxShadowClass = "shadow-[0_0_0_9999px_rgb(0_0_0/0.55)]"
</script>

<template>
  <div
    data-slot="image-cropper"
    :class="
      cn(
        'flex w-full items-center justify-center overflow-hidden rounded-[min(var(--radius-4xl),24px)] bg-muted p-3 ring-1 ring-foreground/5 select-none dark:ring-foreground/10',
        props.class,
      )
    "
  >
    <div ref="frameRef" class="relative touch-none" :style="{ maxHeight: `${maxHeight}px` }">
      <img
        ref="imageRef"
        :src="src"
        :alt="alt"
        draggable="false"
        class="block h-auto max-w-full"
        :style="{ maxHeight: `${maxHeight}px` }"
        @load="start($event.currentTarget as HTMLImageElement)"
      />
      <div
        v-if="box"
        role="slider"
        tabindex="0"
        :aria-label="labels.box ?? 'Crop area'"
        :aria-valuenow="Math.round(box.x * 100)"
        :aria-valuetext="`Left ${Math.round(box.x * 100)}%, top ${Math.round(box.y * 100)}%, ${Math.round(box.w * 100)}% wide, ${Math.round(box.h * 100)}% high`"
        :class="
          cn(
            'absolute cursor-move outline-none ring-2 ring-white focus-visible:ring-ring',
            boxShadowClass,
            shape === 'round' && 'rounded-full',
          )
        "
        :style="{ left: pct(box.x), top: pct(box.y), width: pct(box.w), height: pct(box.h) }"
        @keydown="onKeyDown"
        @pointerdown="startDrag($event, 'move')"
      >
        <!-- Thirds, to frame the shot. -->
        <span aria-hidden="true" :class="cn('pointer-events-none absolute inset-0 opacity-40', shape === 'round' && 'hidden')">
          <span class="absolute inset-y-0 left-1/3 w-px bg-white" />
          <span class="absolute inset-y-0 left-2/3 w-px bg-white" />
          <span class="absolute inset-x-0 top-1/3 h-px bg-white" />
          <span class="absolute inset-x-0 top-2/3 h-px bg-white" />
        </span>
        <span
          v-for="corner in corners"
          :key="corner"
          aria-hidden="true"
          :class="cn('absolute size-3.5 rounded-full border-2 border-white bg-black/40 shadow', cornerClass[corner])"
          @pointerdown="startDrag($event, corner)"
        />
      </div>
    </div>
  </div>
</template>
