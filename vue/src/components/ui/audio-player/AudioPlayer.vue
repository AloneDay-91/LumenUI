<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs, useSlots, type HTMLAttributes } from "vue"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui"
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "@lucide/vue"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatTime, type AudioPlayerProps } from "./utils"

/**
 * An audio file in a Lumen card: art, title, play, a scrubber or waveform,
 * the time, speed, and mute. Space or K plays, arrows seek, M mutes.
 *
 * Other attributes (src, preload, muted, loop, crossorigin…) and listeners go
 * to the hidden `audio` element; the default slot fills it (`source`, `track`).
 */
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<AudioPlayerProps>(),
  {
    playbackRates: () => [1, 1.25, 1.5, 2, 0.75],
    labels: () => ({}),
  },
)

defineSlots<{
  default?: () => unknown
  /** Square art before the title: an img, an Avatar, an icon. */
  artwork?: () => unknown
  title?: () => unknown
  description?: () => unknown
}>()

const attrs = useAttrs()
const slots = useSlots()

const audioRef = ref<HTMLAudioElement | null>(null)
const playing = ref(false)
const ended = ref(false)
const time = ref(0)
const duration = ref(0)
const muted = ref(Boolean(attrs.muted === "" || attrs.muted))
const rate = ref(1)

let cleanup: (() => void) | undefined

onMounted(() => {
  const audio = audioRef.value
  if (!audio) return
  const sync = () => {
    playing.value = !audio.paused && !audio.ended
    time.value = audio.currentTime
    duration.value = Number.isFinite(audio.duration) ? audio.duration : 0
    muted.value = audio.muted
    ended.value = audio.ended
    rate.value = audio.playbackRate
  }
  const handlers: [string, () => void][] = [
    [
      "play",
      () => {
        playing.value = true
        ended.value = false
      },
    ],
    ["pause", () => (playing.value = false)],
    [
      "ended",
      () => {
        playing.value = false
        ended.value = true
      },
    ],
    ["timeupdate", () => (time.value = audio.currentTime)],
    ["durationchange", sync],
    ["loadedmetadata", sync],
    ["volumechange", () => (muted.value = audio.muted)],
    ["ratechange", () => (rate.value = audio.playbackRate)],
    ["seeked", () => (time.value = audio.currentTime)],
  ]
  for (const [event, handler] of handlers) audio.addEventListener(event, handler)
  sync()
  cleanup = () => {
    for (const [event, handler] of handlers) audio.removeEventListener(event, handler)
  }
})

onBeforeUnmount(() => cleanup?.())

function togglePlay() {
  const audio = audioRef.value
  if (!audio) return
  if (audio.paused || audio.ended) void audio.play().catch(() => {})
  else audio.pause()
}

function seekBy(delta: number) {
  const audio = audioRef.value
  if (!audio) return
  audio.currentTime = Math.min(Math.max(audio.currentTime + delta, 0), audio.duration || 0)
}

function toggleMute() {
  const audio = audioRef.value
  if (audio) audio.muted = !audio.muted
}

function cycleRate() {
  const audio = audioRef.value
  if (!audio || props.playbackRates.length === 0) return
  const i = props.playbackRates.indexOf(audio.playbackRate)
  audio.playbackRate = props.playbackRates[(i + 1) % props.playbackRates.length]
}

function onKeyDown(event: KeyboardEvent) {
  if (event.altKey || event.ctrlKey || event.metaKey) return
  const target = event.target as HTMLElement
  const onSlider = target.closest("[data-slot=audio-player-slider]") !== null
  const onButton = target.closest("button") !== null
  const key = event.key.toLowerCase()
  const rtl = getComputedStyle(event.currentTarget as HTMLElement).direction === "rtl"
  if ((key === " " && !onButton) || key === "k") togglePlay()
  else if (key === "m") toggleMute()
  else if (!onSlider && key === "arrowright") seekBy(rtl ? -5 : 5)
  else if (!onSlider && key === "arrowleft") seekBy(rtl ? 5 : -5)
  else return
  event.preventDefault()
}

function onSeek(value: number[] | undefined) {
  const audio = audioRef.value
  if (!audio || !value) return
  const next = value[0]
  audio.currentTime = next
  time.value = next
}

const progress = computed(() => (duration.value ? Math.min(time.value / duration.value, 1) : 0))
const sliderValue = computed(() => [Math.min(time.value, duration.value || 0)])
const valueText = computed(() => `${formatTime(sliderValue.value[0])} / ${formatTime(duration.value)}`)
const hasHeader = computed(() => Boolean(props.title || props.description || slots.title || slots.description || slots.artwork))
const hasPeaks = computed(() => Boolean(props.peaks?.length))

const playLabel = computed(() =>
  playing.value
    ? (props.labels.pause ?? "Pause")
    : ended.value
      ? (props.labels.replay ?? "Replay")
      : (props.labels.play ?? "Play"),
)

const artworkClass = "size-10 shrink-0 overflow-hidden rounded-xl bg-muted [&>img]:size-full [&>img]:object-cover"

defineExpose({ audio: audioRef })
</script>

<template>
  <div
    role="group"
    :aria-label="labels.player ?? 'Audio player'"
    data-slot="audio-player"
    :data-playing="playing ? '' : undefined"
    :class="
      cn(
        'flex w-full flex-col gap-3 rounded-[min(var(--radius-4xl),24px)] bg-card p-3 text-card-foreground ring-1 ring-foreground/5 dark:ring-foreground/10',
        props.class,
      )
    "
    @keydown="onKeyDown"
  >
    <audio ref="audioRef" v-bind="attrs" :class="cn('hidden', audioClass)">
      <slot />
    </audio>

    <div v-if="hasHeader" class="flex min-w-0 items-center gap-3">
      <div v-if="slots.artwork" :class="artworkClass">
        <slot name="artwork" />
      </div>
      <div class="min-w-0 flex-1">
        <p v-if="slots.title || title" class="m-0 truncate text-sm font-medium">
          <slot name="title">{{ title }}</slot>
        </p>
        <p v-if="slots.description || description" class="m-0 truncate text-xs text-muted-foreground">
          <slot name="description">{{ description }}</slot>
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <Button size="icon" :aria-label="playLabel" @click="togglePlay">
        <Pause v-if="playing" class="fill-current" />
        <RotateCcw v-else-if="ended" />
        <Play v-else class="translate-x-px fill-current" />
      </Button>

      <SliderRoot
        data-slot="audio-player-slider"
        :model-value="sliderValue"
        :min="0"
        :max="duration || 1"
        :step="0.1"
        :disabled="!duration"
        thumb-alignment="overflow"
        class="group/seek flex min-w-0 flex-1 touch-none"
        @update:model-value="onSeek"
      >
        <div
          :data-disabled="!duration ? '' : undefined"
          :class="
            cn(
              'flex w-full cursor-pointer items-center data-disabled:cursor-default',
              hasPeaks ? 'h-8' : 'h-6',
            )
          "
        >
          <SliderTrack v-if="hasPeaks" class="relative flex h-full w-full items-center gap-px select-none">
            <span
              v-for="(peak, i) in peaks"
              :key="i"
              aria-hidden="true"
              :class="
                cn(
                  'min-w-px flex-1 rounded-full transition-colors',
                  (i + 0.5) / peaks!.length <= progress ? 'bg-primary' : 'bg-foreground/15',
                )
              "
              :style="{ height: `${Math.max(peak, 0.08) * 100}%` }"
            />
            <SliderThumb
              :aria-label="labels.seek ?? 'Seek'"
              :aria-valuetext="valueText"
              class="top-0 h-full w-0.5 rounded-full bg-primary opacity-0 outline-none select-none group-hover/seek:opacity-100 focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/30"
            />
          </SliderTrack>
          <SliderTrack v-else class="relative h-1 w-full rounded-full bg-muted select-none">
            <SliderRange class="absolute h-full rounded-full bg-primary select-none" />
            <SliderThumb
              :aria-label="labels.seek ?? 'Seek'"
              :aria-valuetext="valueText"
              class="top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-background ring-1 ring-foreground/10 outline-none select-none dark:bg-foreground focus-visible:ring-3 focus-visible:ring-ring/30"
            />
          </SliderTrack>
        </div>
      </SliderRoot>

      <span class="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
        {{ formatTime(time) }} / {{ formatTime(duration) }}
      </span>

      <Button
        v-if="playbackRates.length"
        variant="ghost"
        size="sm"
        :aria-label="labels.speed?.(rate) ?? `Playback speed ${rate}x`"
        class="min-w-9 px-1.5 font-mono tabular-nums"
        @click="cycleRate"
      >
        {{ rate }}x
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        :aria-label="muted ? (labels.unmute ?? 'Unmute') : (labels.mute ?? 'Mute')"
        @click="toggleMute"
      >
        <VolumeX v-if="muted" />
        <Volume2 v-else />
      </Button>
    </div>
  </div>
</template>
