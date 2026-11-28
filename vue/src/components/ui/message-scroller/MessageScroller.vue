<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type HTMLAttributes } from "vue"
import { ArrowDown } from "@lucide/vue"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** How close to the bottom still counts as "at the bottom", in px. */
const THRESHOLD = 48

/**
 * A scroll area that stays pinned to the bottom while content grows, as long
 * as the reader is there. Scroll up to read and it lets go; a button brings
 * them back to the latest message.
 */
const props = withDefaults(defineProps<{ class?: HTMLAttributes["class"]; label?: string }>(), {
  label: "Scroll to latest",
})

const viewport = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()
let pinned = true
const atBottom = ref(true)
let observer: ResizeObserver | undefined

function scrollToBottom(behavior: ScrollBehavior = "auto") {
  const el = viewport.value
  if (!el) return
  el.scrollTo({ top: el.scrollHeight, behavior })
}

// New content: follow it only if the reader was at the bottom.
onMounted(() => {
  if (!content.value) return
  observer = new ResizeObserver(() => {
    if (pinned) scrollToBottom()
  })
  observer.observe(content.value)
  scrollToBottom()
})
onBeforeUnmount(() => observer?.disconnect())

function onScroll(event: Event) {
  const el = event.currentTarget as HTMLDivElement
  const distance = el.scrollHeight - el.scrollTop - el.clientHeight
  pinned = distance <= THRESHOLD
  atBottom.value = pinned
}

function jump() {
  pinned = true
  scrollToBottom("smooth")
}
</script>

<template>
  <div data-slot="message-scroller" :class="cn('relative min-h-0', props.class)">
    <div
      ref="viewport"
      data-slot="message-scroller-viewport"
      tabindex="0"
      class="size-full scroll-fade overflow-y-auto overscroll-contain outline-none focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:ring-inset"
      @scroll="onScroll"
    >
      <div ref="content">
        <slot />
      </div>
    </div>
    <Button
      variant="outline"
      size="icon-sm"
      :aria-label="label"
      :tabindex="atBottom ? -1 : 0"
      :aria-hidden="atBottom || undefined"
      :class="
        cn(
          'absolute bottom-3 left-1/2 -translate-x-1/2 bg-background shadow-sm transition-[opacity,translate] duration-200',
          atBottom ? 'pointer-events-none translate-y-2 opacity-0' : 'opacity-100',
        )
      "
      @click="jump"
    >
      <ArrowDown />
    </Button>
  </div>
</template>
