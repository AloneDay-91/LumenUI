<script setup lang="ts">
import { computed, ref, useAttrs, type HTMLAttributes } from "vue"
import { Pause, Play } from "@lucide/vue"

import { cn } from "@/lib/utils"

import "./marquee.css"

/**
 * Children scroll on a loop. Pauses on hover, stops under reduced motion,
 * fades at the edges. The second copy is hidden from assistive tech, and a
 * pause button keeps it compliant with WCAG 2.2.2 when it runs past 5 seconds.
 */
const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical"
    /** Seconds for one full loop. */
    duration?: number
    gap?: string
    reverse?: boolean
    pauseOnHover?: boolean
    /** Masks the start and end edges. */
    fade?: boolean
    /** A small pause / play button in the corner. */
    showControl?: boolean
    labels?: { pause?: string; play?: string }
    class?: HTMLAttributes["class"]
  }>(),
  {
    orientation: "horizontal",
    duration: 30,
    gap: "2rem",
    reverse: false,
    pauseOnHover: true,
    fade: true,
    showControl: true,
    labels: () => ({}),
  }
)

const attrs = useAttrs()
const paused = ref(false)
const vertical = computed(() => props.orientation === "vertical")
// A name only counts on an element with a role.
const role = computed(() => (attrs["aria-label"] || attrs["aria-labelledby"] ? "group" : undefined))

const controlClass =
  "absolute end-1 bottom-1 flex size-6 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-0 ring-1 ring-foreground/10 backdrop-blur-sm transition-opacity outline-none group-hover/marquee:opacity-100 hover:text-foreground focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/30 motion-reduce:hidden"
</script>

<template>
  <div
    data-slot="marquee"
    :role="role"
    :data-orientation="orientation"
    :data-reverse="reverse ? '' : undefined"
    :data-pause-on-hover="pauseOnHover ? '' : undefined"
    :data-paused="paused ? '' : undefined"
    :class="
      cn(
        'group/marquee relative flex overflow-hidden',
        vertical ? 'flex-col' : 'flex-row',
        fade &&
          (vertical
            ? 'mask-[linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]'
            : 'mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]'),
        props.class,
      )
    "
    :style="{ gap, '--marquee-gap': gap, '--marquee-duration': `${duration}s` }"
  >
    <div
      v-for="hidden in [false, true]"
      :key="String(hidden)"
      data-slot="marquee-track"
      :aria-hidden="hidden || undefined"
      :inert="hidden || undefined"
      :class="cn('flex shrink-0 items-center', vertical ? 'flex-col' : 'flex-row')"
      :style="{ gap }"
    >
      <slot />
    </div>
    <button
      v-if="showControl"
      type="button"
      :aria-label="paused ? (labels.play ?? 'Play') : (labels.pause ?? 'Pause')"
      :class="controlClass"
      @click="paused = !paused"
    >
      <Play v-if="paused" class="size-3" />
      <Pause v-else class="size-3" />
    </button>
  </div>
</template>
