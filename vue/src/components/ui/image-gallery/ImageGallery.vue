<script setup lang="ts">
import { computed, ref, watch, type HTMLAttributes } from "vue"
import { ChevronLeft, ChevronRight, X } from "@lucide/vue"
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from "reka-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { backdropClassName } from "@/components/ui/styles"
import type { GalleryImage } from "."

/**
 * A grid of thumbnails; each opens a lightbox with the full image, arrows,
 * and a counter. Left and Right move, Escape closes and returns focus.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    images: GalleryImage[]
    columns?: 2 | 3 | 4
    labels?: {
      open?: (image: GalleryImage) => string
      previous?: string
      next?: string
      close?: string
      counter?: (index: number, total: number) => string
    }
  }>(),
  { columns: 3, labels: () => ({}) }
)

defineSlots<{
  /** Rich caption in the lightbox; defaults to `image.caption`. */
  caption?: (props: { image: GalleryImage; index: number }) => unknown
}>()

const index = ref<number | null>(null)
// Keeps the last image on screen while the lightbox fades out.
const shown = ref(0)
watch(index, (i) => {
  if (i !== null) shown.value = i
})

const total = computed(() => props.images.length)
const current = computed(() => props.images[shown.value])

function go(delta: number) {
  if (index.value === null) return
  index.value = (index.value + delta + total.value) % total.value
}

function onOpenChange(open: boolean) {
  if (!open) index.value = null
}

function onKeydown(event: KeyboardEvent) {
  const rtl = getComputedStyle(event.currentTarget as HTMLElement).direction === "rtl"
  if (event.key === "ArrowRight") go(rtl ? -1 : 1)
  else if (event.key === "ArrowLeft") go(rtl ? 1 : -1)
}

const navButtonClass = "text-white hover:bg-white/15 hover:text-white"
</script>

<template>
  <ul
    data-slot="image-gallery"
    :class="
      cn(
        'm-0 grid list-none gap-2 p-0',
        columns === 2 && 'grid-cols-2',
        columns === 3 && 'grid-cols-2 sm:grid-cols-3',
        columns === 4 && 'grid-cols-2 sm:grid-cols-4',
        props.class,
      )
    "
  >
    <li v-for="(image, i) in images" :key="`${image.src}-${i}`">
      <button
        type="button"
        :aria-label="labels.open?.(image) ?? `Open ${image.alt}`"
        class="group/thumb block aspect-square w-full overflow-hidden rounded-2xl bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        @click="index = i"
      >
        <img
          :src="image.thumbnail ?? image.src"
          alt=""
          loading="lazy"
          class="size-full object-cover transition-transform duration-300 group-hover/thumb:scale-[1.03]"
        />
      </button>
    </li>
  </ul>

  <DialogRoot :open="index !== null" @update:open="onOpenChange">
    <DialogPortal>
      <DialogOverlay :class="cn(backdropClassName, 'bg-black/80')" />
      <DialogContent
        data-slot="image-gallery-lightbox"
        :aria-describedby="undefined"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-4 text-white outline-none duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 sm:p-10"
        @keydown="onKeydown"
      >
        <template v-if="current">
          <DialogTitle class="sr-only">{{ current.alt }}</DialogTitle>
          <div class="flex min-h-0 w-full flex-1 items-center justify-center">
            <img
              :key="current.src"
              :src="current.src"
              :alt="current.alt"
              :width="current.width"
              :height="current.height"
              class="max-h-full max-w-full rounded-2xl object-contain"
            />
          </div>
          <div class="flex w-full max-w-3xl items-center gap-3 text-xs">
            <span class="font-mono text-white/70 tabular-nums" aria-live="polite">
              {{ labels.counter?.(shown + 1, total) ?? `${shown + 1} / ${total}` }}
            </span>
            <span class="min-w-0 flex-1 truncate text-white/90">
              <slot name="caption" :image="current" :index="shown">{{ current.caption }}</slot>
            </span>
            <span v-if="total > 1" class="flex gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                :aria-label="labels.previous ?? 'Previous image'"
                :class="navButtonClass"
                @click="go(-1)"
              >
                <ChevronLeft class="rtl:rotate-180" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                :aria-label="labels.next ?? 'Next image'"
                :class="navButtonClass"
                @click="go(1)"
              >
                <ChevronRight class="rtl:rotate-180" />
              </Button>
            </span>
          </div>
          <DialogClose as-child>
            <Button
              variant="ghost"
              size="icon-sm"
              :aria-label="labels.close ?? 'Close'"
              :class="cn('absolute end-3 top-3', navButtonClass)"
            >
              <X />
            </Button>
          </DialogClose>
        </template>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
