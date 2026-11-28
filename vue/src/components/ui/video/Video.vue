<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs, watch } from "vue"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui"
import {
  Captions,
  CaptionsOff,
  Maximize,
  Minimize,
  Pause,
  PictureInPicture2,
  Play,
  RotateCcw,
  Volume1,
  Volume2,
  VolumeX,
} from "@lucide/vue"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { formatTime, type VideoProps } from "./utils"

/**
 * A video with Lumen controls over the picture in place of the browser's: a
 * thin full-width scrubber that shows what is buffered, then play, the time,
 * volume, captions, speed, picture-in-picture, and fullscreen. The controls
 * fade while playing and come back on pointer move or focus. Space or K plays,
 * arrows seek, M mutes, F goes fullscreen, C toggles captions.
 *
 * Every attribute other than the props below goes to the `video` element.
 */
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<VideoProps>(), {
  seekStep: 5,
  playbackRates: () => [1, 1.25, 1.5, 2, 0.5, 0.75],
  hideDelay: 2500,
  labels: () => ({}),
})

const attrs = useAttrs()
/** The caller's click handler runs first; preventDefault in it skips the toggle. */
const videoAttrs = computed(() => {
  const { onClick: _onClick, ...rest } = attrs
  return rest
})

const isOn = (value: unknown) => value !== undefined && value !== false && value !== "false"

const rootRef = ref<HTMLDivElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)

const playing = ref(false)
const ended = ref(false)
const waiting = ref(false)
const time = ref(0)
const duration = ref(0)
const buffered = ref(0)
const volume = ref(1)
const muted = ref(isOn(attrs.muted))
const fullscreen = ref(false)
const hasCaptions = ref(false)
const captions = ref(false)
const pipSupported = ref(false)
const canPip = computed(
  () => pipSupported.value && !isOn(attrs.disablePictureInPicture ?? attrs.disablepictureinpicture),
)
const rate = ref(1)
const idle = ref(false)
const scrubbing = ref(false)
const hovering = ref(false)
const focusWithin = ref(false)

defineExpose({ video: videoRef, root: rootRef })

const isCaptionTrack = (track: TextTrack) => track.kind === "captions" || track.kind === "subtitles"

const trackClassName = "relative h-1 w-full rounded-full bg-white/25 select-none"
const indicatorClassName = "absolute h-full rounded-full bg-white select-none"
// top-1/2 and the negative margin center the thumb on the track, which Base UI did inline.
const thumbClassName =
  "top-1/2 -mt-1.5 size-3 rounded-full bg-white outline-none select-none focus-visible:ring-3 focus-visible:ring-white/40"
const controlButton =
  "text-white hover:bg-white/15 hover:text-white aria-expanded:bg-white/15 dark:hover:bg-white/15 focus-visible:border-white/60 focus-visible:ring-white/30"

/** Pixels the controls take from the bottom edge, plus a little air. */
const CONTROLS_CLEARANCE = 72

/** Cues whose position we set, so author-placed cues are left alone. */
const liftedCues = new WeakSet<VTTCue>()

let cleanup: (() => void) | undefined

onMounted(() => {
  pipSupported.value = "pictureInPictureEnabled" in document && document.pictureInPictureEnabled

  const video = videoRef.value
  if (!video) return

  const syncBuffered = () => {
    const { buffered: ranges, currentTime } = video
    for (let i = 0; i < ranges.length; i++) {
      if (ranges.start(i) <= currentTime && currentTime <= ranges.end(i)) {
        buffered.value = ranges.end(i)
        return
      }
    }
    buffered.value = ranges.length ? ranges.end(ranges.length - 1) : 0
  }
  const syncTracks = () => {
    const tracks = Array.from(video.textTracks).filter(isCaptionTrack)
    // Cues sit on the bottom edge by default, under the controls. Lift the
    // ones that leave their position to the browser. A cue line is 5% of
    // the video's height, so the offset in lines depends on its size.
    const lineHeight = Math.max(video.clientHeight * 0.05, 1)
    const line = -(Math.ceil(CONTROLS_CLEARANCE / lineHeight) + 1)
    for (const track of tracks) {
      // Cues may load after the track does; catch them as they show.
      track.addEventListener("cuechange", syncTracks)
      let moved = false
      for (const cue of Array.from(track.cues ?? [])) {
        if (!(cue instanceof VTTCue)) continue
        if (cue.line === "auto") liftedCues.add(cue)
        if (liftedCues.has(cue) && cue.line !== line) {
          cue.snapToLines = true
          cue.line = line
          moved = true
        }
      }
      // Chrome keeps a shown cue where it was drawn: redraw it.
      if (moved && track.mode === "showing") {
        track.mode = "hidden"
        track.mode = "showing"
      }
    }
    hasCaptions.value = tracks.length > 0
    captions.value = tracks.some((track) => track.mode === "showing")
  }
  const sync = () => {
    playing.value = !video.paused && !video.ended
    time.value = video.currentTime
    duration.value = Number.isFinite(video.duration) ? video.duration : 0
    volume.value = video.volume
    muted.value = video.muted
    ended.value = video.ended
    syncBuffered()
    syncTracks()
  }

  const handlers: [string, () => void][] = [
    ["play", () => { playing.value = true; ended.value = false; idle.value = false }],
    ["pause", () => { playing.value = false }],
    ["ended", () => { playing.value = false; ended.value = true }],
    ["timeupdate", () => { time.value = video.currentTime; syncBuffered() }],
    ["durationchange", sync],
    ["loadedmetadata", sync],
    ["progress", syncBuffered],
    ["volumechange", () => { volume.value = video.volume; muted.value = video.muted }],
    ["waiting", () => { waiting.value = true }],
    ["playing", () => { waiting.value = false }],
    ["canplay", () => { waiting.value = false }],
    ["seeked", () => { time.value = video.currentTime }],
    ["ratechange", () => { rate.value = video.playbackRate }],
  ]
  for (const [event, handler] of handlers) video.addEventListener(event, handler)
  video.textTracks.addEventListener("addtrack", syncTracks)
  video.textTracks.addEventListener("change", syncTracks)
  // A track element's cues arrive with its load event, which does not bubble.
  video.addEventListener("load", syncTracks, true)
  const resize = new ResizeObserver(syncTracks)
  resize.observe(video)
  sync()

  const onFullscreenChange = () => {
    fullscreen.value = document.fullscreenElement === rootRef.value
  }
  document.addEventListener("fullscreenchange", onFullscreenChange)

  cleanup = () => {
    for (const [event, handler] of handlers) video.removeEventListener(event, handler)
    video.textTracks.removeEventListener("addtrack", syncTracks)
    video.textTracks.removeEventListener("change", syncTracks)
    video.removeEventListener("load", syncTracks, true)
    for (const track of Array.from(video.textTracks)) track.removeEventListener("cuechange", syncTracks)
    resize.disconnect()
    document.removeEventListener("fullscreenchange", onFullscreenChange)
  }
})

// Fade the controls after a still moment, only while playing.
const activity = ref(0)
const pinned = computed(() => !playing.value || scrubbing.value || focusWithin.value || hovering.value)
let idleTimer: number | undefined
watch(
  [pinned, activity, () => props.hideDelay],
  () => {
    window.clearTimeout(idleTimer)
    if (pinned.value) return
    idleTimer = window.setTimeout(() => {
      idle.value = true
    }, props.hideDelay)
  },
  { flush: "post" },
)

onBeforeUnmount(() => {
  window.clearTimeout(idleTimer)
  cleanup?.()
})

function wake() {
  idle.value = false
  activity.value++
}

function cycleRate() {
  const video = videoRef.value
  if (!video || props.playbackRates.length === 0) return
  const i = props.playbackRates.indexOf(video.playbackRate)
  video.playbackRate = props.playbackRates[(i + 1) % props.playbackRates.length]!
}
function togglePlay() {
  const video = videoRef.value
  if (!video) return
  if (video.paused || video.ended) void video.play().catch(() => {})
  else video.pause()
}
function seekBy(delta: number) {
  const video = videoRef.value
  if (!video) return
  video.currentTime = Math.min(Math.max(video.currentTime + delta, 0), video.duration || 0)
}
function toggleMute() {
  const video = videoRef.value
  if (!video) return
  // Unmuting at zero volume would stay silent: bring it back up.
  if (video.muted && video.volume === 0) video.volume = 0.5
  video.muted = !video.muted
}
function changeVolume(value: number) {
  const video = videoRef.value
  if (!video) return
  video.volume = value
  video.muted = value === 0
}
function toggleCaptions() {
  const video = videoRef.value
  if (!video) return
  const tracks = Array.from(video.textTracks).filter(isCaptionTrack)
  const next = !tracks.some((track) => track.mode === "showing")
  tracks.forEach((track, i) => {
    track.mode = next && i === 0 ? "showing" : "hidden"
  })
}
function togglePip() {
  const video = videoRef.value
  if (!video) return
  if (document.pictureInPictureElement) void document.exitPictureInPicture().catch(() => {})
  else void video.requestPictureInPicture().catch(() => {})
}
function toggleFullscreen() {
  const root = rootRef.value
  const video = videoRef.value as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
  if (!root) return
  if (document.fullscreenElement) void document.exitFullscreen().catch(() => {})
  else if (root.requestFullscreen) void root.requestFullscreen().catch(() => {})
  // iOS Safari: only the video element itself can go fullscreen.
  else video?.webkitEnterFullscreen?.()
}

function onKeyDown(event: KeyboardEvent) {
  if (event.altKey || event.ctrlKey || event.metaKey) return
  const target = event.target as HTMLElement
  const onSlider = target.closest("[data-slot=video-slider]") !== null
  const onButton = target.closest("button") !== null
  const key = event.key.toLowerCase()
  const rtl = getComputedStyle(event.currentTarget as HTMLElement).direction === "rtl"

  if ((key === " " && !onButton) || key === "k") togglePlay()
  else if (key === "m") toggleMute()
  else if (key === "f") toggleFullscreen()
  else if (key === "c" && hasCaptions.value) toggleCaptions()
  else if (!onSlider && key === "arrowright") seekBy(rtl ? -props.seekStep : props.seekStep)
  else if (!onSlider && key === "arrowleft") seekBy(rtl ? props.seekStep : -props.seekStep)
  else return
  event.preventDefault()
  wake()
}

function onVideoClick(event: MouseEvent) {
  const handler = attrs.onClick as ((event: MouseEvent) => void) | ((event: MouseEvent) => void)[] | undefined
  if (Array.isArray(handler)) handler.forEach((fn) => fn(event))
  else handler?.(event)
  if (event.defaultPrevented) return
  togglePlay()
  rootRef.value?.focus({ preventScroll: true })
}

function onPointerLeave() {
  if (playing.value) idle.value = true
}

function onFocusOut(event: FocusEvent) {
  if (!rootRef.value?.contains(event.relatedTarget as Node | null)) focusWithin.value = false
}

const seekValue = computed(() => [Math.min(time.value, duration.value || 0)])
function onSeek(value: number[] | undefined) {
  const video = videoRef.value
  const next = value?.[0]
  if (!video || next === undefined) return
  video.currentTime = next
  time.value = next
  scrubbing.value = true
}

const volumeValue = computed(() => [muted.value ? 0 : volume.value])
function onVolume(value: number[] | undefined) {
  const next = value?.[0]
  if (next !== undefined) changeVolume(next)
}

const VolumeIcon = computed(() =>
  muted.value || volume.value === 0 ? VolumeX : volume.value < 0.5 ? Volume1 : Volume2,
)
const loading = computed(() => waiting.value && playing.value)
const hidden = computed(() => idle.value && !pinned.value)
const bufferedWidth = computed(() =>
  duration.value ? Math.min((buffered.value / duration.value) * 100, 100) : 0,
)
const playLabel = computed(() =>
  playing.value
    ? (props.labels.pause ?? "Pause")
    : ended.value
      ? (props.labels.replay ?? "Replay")
      : (props.labels.play ?? "Play"),
)

const rootClassName =
  "group/video @container relative isolate w-full overflow-hidden rounded-[min(var(--radius-4xl),24px)] bg-black text-white ring-1 ring-foreground/5 outline-none dark:ring-foreground/10"
const rootFullscreenClassName =
  "[&:fullscreen]:flex [&:fullscreen]:items-center [&:fullscreen]:rounded-none [&:fullscreen]:ring-0 data-idle:cursor-none"
const videoClassName =
  "block aspect-video w-full object-contain group-[:fullscreen]/video:aspect-auto group-[:fullscreen]/video:h-full"
</script>

<template>
  <div
    ref="rootRef"
    role="group"
    :aria-label="labels.player ?? 'Video player'"
    tabindex="-1"
    data-slot="video"
    :data-playing="playing ? '' : undefined"
    :data-idle="hidden ? '' : undefined"
    :class="cn(rootClassName, rootFullscreenClassName, props.class)"
    @keydown="onKeyDown"
    @pointermove="wake"
    @pointerleave="onPointerLeave"
    @focusin="focusWithin = true"
    @focusout="onFocusOut"
  >
    <video
      ref="videoRef"
      playsinline
      v-bind="videoAttrs"
      :class="cn(videoClassName, videoClass)"
      @click="onVideoClick"
    >
      <slot />
    </video>

    <!-- Centre: play or replay while stopped, a spinner while buffering.
         Pointer only; the bar holds the named controls. -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 flex items-center justify-center">
      <Spinner v-if="loading" :role="undefined" :aria-label="undefined" class="size-6 text-white" />
      <button
        v-else
        type="button"
        tabindex="-1"
        :class="
          cn(
            'flex size-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-[opacity,scale,background-color] duration-200 hover:bg-black/55',
            playing ? 'scale-90 opacity-0' : 'pointer-events-auto opacity-100',
          )
        "
        @click="togglePlay"
      >
        <RotateCcw v-if="ended" class="size-5" />
        <Play v-else class="size-5 translate-x-px fill-current" />
      </button>
    </div>

    <div
      data-slot="video-controls"
      :class="
        cn(
          'absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-linear-to-t from-black/70 via-black/35 to-transparent px-3 pt-10 pb-2 transition-opacity duration-300 sm:px-4',
          hidden && 'pointer-events-none opacity-0',
        )
      "
      @pointerenter="hovering = true"
      @pointerleave="hovering = false"
    >
      <div data-slot="video-slider" class="group/seek flex w-full touch-none">
        <SliderRoot
          :model-value="seekValue"
          :min="0"
          :max="duration || 1"
          :step="0.1"
          :disabled="!duration"
          thumb-alignment="overflow"
          class="flex h-4 w-full cursor-pointer items-center data-disabled:cursor-default"
          @update:model-value="onSeek"
          @value-commit="scrubbing = false"
        >
          <SliderTrack :class="cn(trackClassName, 'transition-[height] group-hover/seek:h-1.5')">
            <div
              aria-hidden="true"
              class="absolute inset-y-0 start-0 rounded-full bg-white/30"
              :style="{ width: `${bufferedWidth}%` }"
            />
            <SliderRange :class="indicatorClassName" />
            <SliderThumb
              :aria-label="labels.seek ?? 'Seek'"
              :aria-valuetext="`${formatTime(seekValue[0] ?? 0)} / ${formatTime(duration)}`"
              :data-dragging="scrubbing ? '' : undefined"
              :class="
                cn(
                  thumbClassName,
                  'scale-0 transition-[scale] group-hover/seek:scale-100 focus-visible:scale-100 data-dragging:scale-100',
                )
              "
            />
          </SliderTrack>
        </SliderRoot>
      </div>

      <div class="flex items-center gap-0.5">
        <Button variant="ghost" size="icon-sm" :aria-label="playLabel" :class="controlButton" @click="togglePlay">
          <Pause v-if="playing" class="fill-current" />
          <RotateCcw v-else-if="ended" />
          <Play v-else class="translate-x-px fill-current" />
        </Button>
        <span class="shrink-0 px-1.5 font-mono text-[11px] text-white/90 tabular-nums @md:text-xs">
          {{ formatTime(time) }} / {{ formatTime(duration) }}
        </span>

        <div class="flex items-center">
          <Button
            variant="ghost"
            size="icon-sm"
            :aria-label="muted ? (labels.unmute ?? 'Unmute') : (labels.mute ?? 'Mute')"
            :class="controlButton"
            @click="toggleMute"
          >
            <component :is="VolumeIcon" />
          </Button>
          <div data-slot="video-slider" class="hidden w-24 px-1.5 @lg:flex">
            <SliderRoot
              :model-value="volumeValue"
              :min="0"
              :max="1"
              :step="0.05"
              thumb-alignment="overflow"
              class="flex h-6 w-full cursor-pointer items-center"
              @update:model-value="onVolume"
            >
              <SliderTrack :class="trackClassName">
                <SliderRange :class="indicatorClassName" />
                <SliderThumb
                  :aria-label="labels.volume ?? 'Volume'"
                  :aria-valuetext="`${Math.round((volumeValue[0] ?? 0) * 100)}%`"
                  :class="thumbClassName"
                />
              </SliderTrack>
            </SliderRoot>
          </div>
        </div>

        <span class="flex-1" />

        <Button
          v-if="hasCaptions"
          variant="ghost"
          size="icon-sm"
          :aria-pressed="captions"
          :aria-label="captions ? (labels.captionsOff ?? 'Hide captions') : (labels.captionsOn ?? 'Show captions')"
          :class="controlButton"
          @click="toggleCaptions"
        >
          <Captions v-if="captions" />
          <CaptionsOff v-else />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          :aria-label="labels.speed?.(rate) ?? `Playback speed ${rate}x`"
          :class="cn(controlButton, 'min-w-9 px-1.5 font-mono tabular-nums')"
          @click="cycleRate"
        >
          {{ rate }}x
        </Button>

        <Button
          v-if="canPip"
          variant="ghost"
          size="icon-sm"
          :aria-label="labels.pictureInPicture ?? 'Picture in picture'"
          :class="cn(controlButton, 'hidden @md:inline-flex')"
          @click="togglePip"
        >
          <PictureInPicture2 />
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          :aria-label="fullscreen ? (labels.exitFullscreen ?? 'Exit fullscreen') : (labels.fullscreen ?? 'Fullscreen')"
          :class="controlButton"
          @click="toggleFullscreen"
        >
          <Minimize v-if="fullscreen" />
          <Maximize v-else />
        </Button>
      </div>
    </div>

    <span class="sr-only" aria-live="polite">{{ loading ? (labels.loading ?? "Loading") : "" }}</span>
  </div>
</template>
