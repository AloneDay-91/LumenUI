"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import {
  CaptionsIcon,
  CaptionsOffIcon,
  MaximizeIcon,
  MinimizeIcon,
  PauseIcon,
  PictureInPicture2Icon,
  PlayIcon,
  RotateCcwIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Spinner } from "@/components/ui/Spinner"
import { cn } from "@/lib/utils"

type VideoLabels = {
  player?: string
  play?: string
  pause?: string
  replay?: string
  seek?: string
  speed?: (rate: number) => string
  mute?: string
  unmute?: string
  volume?: string
  captionsOn?: string
  captionsOff?: string
  pictureInPicture?: string
  fullscreen?: string
  exitFullscreen?: string
  loading?: string
}

type VideoProps = Omit<React.ComponentProps<"video">, "controls"> & {
  /** Classes for the `video` element, e.g. its aspect ratio. `className` styles the card. */
  videoClassName?: string
  /** Seconds the arrow keys skip. */
  seekStep?: number
  /** Speeds the speed button cycles through. */
  playbackRates?: number[]
  /** Milliseconds of stillness before the controls fade while playing. */
  hideDelay?: number
  labels?: VideoLabels
}

/** 75 → "1:15", 3725 → "1:02:05". */
function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0
  const s = Math.floor(seconds % 60)
  const m = Math.floor((seconds / 60) % 60)
  const h = Math.floor(seconds / 3600)
  const ss = String(s).padStart(2, "0")
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`
}

const noopSubscribe = () => () => {}

const isCaptionTrack = (track: TextTrack) =>
  track.kind === "captions" || track.kind === "subtitles"

const trackClassName = "relative h-1 w-full rounded-full bg-white/25 select-none"
const indicatorClassName = "rounded-full bg-white select-none"
const thumbClassName =
  "size-3 rounded-full bg-white outline-none select-none focus-visible:ring-3 focus-visible:ring-white/40"
const controlButton =
  "text-white hover:bg-white/15 hover:text-white aria-expanded:bg-white/15 dark:hover:bg-white/15 focus-visible:border-white/60 focus-visible:ring-white/30"

/** Pixels the controls take from the bottom edge, plus a little air. */
const CONTROLS_CLEARANCE = 72

/** Cues whose position we set, so author-placed cues are left alone. */
const liftedCues = new WeakSet<VTTCue>()

/**
 * A video with Lumen controls over the picture in place of the browser's: a
 * thin full-width scrubber that shows what is buffered, then play, the time,
 * volume, captions, speed, picture-in-picture, and fullscreen. The controls
 * fade while playing and come back on pointer move or focus. Space or K plays, arrows seek, M mutes, F goes fullscreen, C
 * toggles captions.
 */
function Video({
  className,
  videoClassName,
  seekStep = 5,
  playbackRates = [1, 1.25, 1.5, 2, 0.5, 0.75],
  hideDelay = 2500,
  labels = {},
  ref,
  children,
  ...props
}: VideoProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)

  const [playing, setPlaying] = React.useState(false)
  const [ended, setEnded] = React.useState(false)
  const [waiting, setWaiting] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [buffered, setBuffered] = React.useState(0)
  const [volume, setVolume] = React.useState(1)
  const [muted, setMuted] = React.useState(Boolean(props.muted))
  const [fullscreen, setFullscreen] = React.useState(false)
  const [hasCaptions, setHasCaptions] = React.useState(false)
  const [captions, setCaptions] = React.useState(false)
  const pipSupported = React.useSyncExternalStore(
    noopSubscribe,
    () => "pictureInPictureEnabled" in document && document.pictureInPictureEnabled,
    () => false
  )
  const canPip = pipSupported && !props.disablePictureInPicture
  const [rate, setRate] = React.useState(1)
  const [idle, setIdle] = React.useState(false)
  const [scrubbing, setScrubbing] = React.useState(false)
  const [hovering, setHovering] = React.useState(false)
  const [focusWithin, setFocusWithin] = React.useState(false)

  const setVideoRef = React.useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node
      if (typeof ref === "function") return ref(node)
      if (ref) ref.current = node
    },
    [ref]
  )

  // Mirror the element's state. Listeners rather than on* props, so the
  // caller's own handlers stay untouched.
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const syncBuffered = () => {
      const { buffered: ranges, currentTime } = video
      for (let i = 0; i < ranges.length; i++) {
        if (ranges.start(i) <= currentTime && currentTime <= ranges.end(i)) {
          setBuffered(ranges.end(i))
          return
        }
      }
      setBuffered(ranges.length ? ranges.end(ranges.length - 1) : 0)
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
      setHasCaptions(tracks.length > 0)
      setCaptions(tracks.some((track) => track.mode === "showing"))
    }
    const sync = () => {
      setPlaying(!video.paused && !video.ended)
      setTime(video.currentTime)
      setDuration(Number.isFinite(video.duration) ? video.duration : 0)
      setVolume(video.volume)
      setMuted(video.muted)
      setEnded(video.ended)
      syncBuffered()
      syncTracks()
    }

    const handlers: [string, () => void][] = [
      ["play", () => { setPlaying(true); setEnded(false); setIdle(false) }],
      ["pause", () => setPlaying(false)],
      ["ended", () => { setPlaying(false); setEnded(true) }],
      ["timeupdate", () => { setTime(video.currentTime); syncBuffered() }],
      ["durationchange", sync],
      ["loadedmetadata", sync],
      ["progress", syncBuffered],
      ["volumechange", () => { setVolume(video.volume); setMuted(video.muted) }],
      ["waiting", () => setWaiting(true)],
      ["playing", () => setWaiting(false)],
      ["canplay", () => setWaiting(false)],
      ["seeked", () => setTime(video.currentTime)],
      ["ratechange", () => setRate(video.playbackRate)],
    ]
    for (const [event, handler] of handlers) video.addEventListener(event, handler)
    video.textTracks.addEventListener("addtrack", syncTracks)
    video.textTracks.addEventListener("change", syncTracks)
    // A track element's cues arrive with its load event, which does not bubble.
    video.addEventListener("load", syncTracks, true)
    const resize = new ResizeObserver(syncTracks)
    resize.observe(video)
    sync()

    return () => {
      for (const [event, handler] of handlers) video.removeEventListener(event, handler)
      video.textTracks.removeEventListener("addtrack", syncTracks)
      video.textTracks.removeEventListener("change", syncTracks)
      video.removeEventListener("load", syncTracks, true)
      for (const track of Array.from(video.textTracks)) track.removeEventListener("cuechange", syncTracks)
      resize.disconnect()
    }
  }, [])

  React.useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === rootRef.current)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  // Fade the controls after a still moment, only while playing.
  const [activity, setActivity] = React.useState(0)
  const wake = React.useCallback(() => {
    setIdle(false)
    setActivity((n) => n + 1)
  }, [])
  const pinned = !playing || scrubbing || focusWithin || hovering
  React.useEffect(() => {
    if (pinned) return
    const timer = window.setTimeout(() => setIdle(true), hideDelay)
    return () => window.clearTimeout(timer)
  }, [pinned, activity, hideDelay])

  const cycleRate = () => {
    const video = videoRef.current
    if (!video || playbackRates.length === 0) return
    const i = playbackRates.indexOf(video.playbackRate)
    video.playbackRate = playbackRates[(i + 1) % playbackRates.length]
  }
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused || video.ended) void video.play().catch(() => {})
    else video.pause()
  }
  const seekBy = (delta: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.min(Math.max(video.currentTime + delta, 0), video.duration || 0)
  }
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    // Unmuting at zero volume would stay silent: bring it back up.
    if (video.muted && video.volume === 0) video.volume = 0.5
    video.muted = !video.muted
  }
  const changeVolume = (value: number) => {
    const video = videoRef.current
    if (!video) return
    video.volume = value
    video.muted = value === 0
  }
  const toggleCaptions = () => {
    const video = videoRef.current
    if (!video) return
    const tracks = Array.from(video.textTracks).filter(isCaptionTrack)
    const next = !tracks.some((track) => track.mode === "showing")
    tracks.forEach((track, i) => {
      track.mode = next && i === 0 ? "showing" : "hidden"
    })
  }
  const togglePip = () => {
    const video = videoRef.current
    if (!video) return
    if (document.pictureInPictureElement) void document.exitPictureInPicture().catch(() => {})
    else void video.requestPictureInPicture().catch(() => {})
  }
  const toggleFullscreen = () => {
    const root = rootRef.current
    const video = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null
    if (!root) return
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {})
    else if (root.requestFullscreen) void root.requestFullscreen().catch(() => {})
    // iOS Safari: only the video element itself can go fullscreen.
    else video?.webkitEnterFullscreen?.()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    const target = event.target as HTMLElement
    const onSlider = target.closest("[data-slot=video-slider]") !== null
    const onButton = target.closest("button") !== null
    const key = event.key.toLowerCase()
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl"

    if ((key === " " && !onButton) || key === "k") togglePlay()
    else if (key === "m") toggleMute()
    else if (key === "f") toggleFullscreen()
    else if (key === "c" && hasCaptions) toggleCaptions()
    else if (!onSlider && key === "arrowright") seekBy(rtl ? -seekStep : seekStep)
    else if (!onSlider && key === "arrowleft") seekBy(rtl ? seekStep : -seekStep)
    else return
    event.preventDefault()
    wake()
  }

  const VolumeIcon = muted || volume === 0 ? VolumeXIcon : volume < 0.5 ? Volume1Icon : Volume2Icon
  const loading = waiting && playing
  const hidden = idle && !pinned

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={labels.player ?? "Video player"}
      tabIndex={-1}
      data-slot="video"
      data-playing={playing ? "" : undefined}
      data-idle={hidden ? "" : undefined}
      onKeyDown={onKeyDown}
      onPointerMove={wake}
      onPointerLeave={() => playing && setIdle(true)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false)
      }}
      className={cn(
        "group/video @container relative isolate w-full overflow-hidden rounded-[min(var(--radius-4xl),24px)] bg-black text-white ring-1 ring-foreground/5 outline-none dark:ring-foreground/10",
        "[&:fullscreen]:flex [&:fullscreen]:items-center [&:fullscreen]:rounded-none [&:fullscreen]:ring-0 data-idle:cursor-none",
        className
      )}
    >
      <video
        ref={setVideoRef}
        playsInline
        {...props}
        className={cn(
          "block aspect-video w-full object-contain group-[:fullscreen]/video:aspect-auto group-[:fullscreen]/video:h-full",
          videoClassName
        )}
        onClick={(event) => {
          props.onClick?.(event)
          if (event.defaultPrevented) return
          togglePlay()
          rootRef.current?.focus({ preventScroll: true })
        }}
      >
        {children}
      </video>

      {/* Centre: play or replay while stopped, a spinner while buffering.
          Pointer only; the bar holds the named controls. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {loading ? (
          <Spinner role={undefined} aria-label={undefined} className="size-6 text-white" />
        ) : (
          <button
            type="button"
            tabIndex={-1}
            onClick={togglePlay}
            className={cn(
              "flex size-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-[opacity,scale,background-color] duration-200 hover:bg-black/55",
              playing ? "scale-90 opacity-0" : "pointer-events-auto opacity-100"
            )}
          >
            {ended ? (
              <RotateCcwIcon className="size-5" />
            ) : (
              <PlayIcon className="size-5 translate-x-px fill-current" />
            )}
          </button>
        )}
      </div>

      <div
        data-slot="video-controls"
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-linear-to-t from-black/70 via-black/35 to-transparent px-3 pt-10 pb-2 transition-opacity duration-300 sm:px-4",
          hidden && "pointer-events-none opacity-0"
        )}
      >
        <SliderPrimitive.Root
          data-slot="video-slider"
          value={Math.min(time, duration || 0)}
          min={0}
          max={duration || 1}
          step={0.1}
          disabled={!duration}
          onValueChange={(value) => {
            const video = videoRef.current
            if (!video) return
            const next = Array.isArray(value) ? value[0] : value
            video.currentTime = next
            setTime(next)
            setScrubbing(true)
          }}
          onValueCommitted={() => setScrubbing(false)}
          className="group/seek flex w-full touch-none"
        >
          <SliderPrimitive.Control className="flex h-4 w-full cursor-pointer items-center data-disabled:cursor-default">
            <SliderPrimitive.Track className={cn(trackClassName, "transition-[height] group-hover/seek:h-1.5")}>
              <div
                aria-hidden
                className="absolute inset-y-0 start-0 rounded-full bg-white/30"
                style={{ width: `${duration ? Math.min((buffered / duration) * 100, 100) : 0}%` }}
              />
              <SliderPrimitive.Indicator className={indicatorClassName} />
              <SliderPrimitive.Thumb
                aria-label={labels.seek ?? "Seek"}
                getAriaValueText={(_, value) => `${formatTime(value)} / ${formatTime(duration)}`}
                className={cn(
                  thumbClassName,
                  "scale-0 transition-[scale] group-hover/seek:scale-100 focus-visible:scale-100 data-dragging:scale-100"
                )}
              />
            </SliderPrimitive.Track>
          </SliderPrimitive.Control>
        </SliderPrimitive.Root>

        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={togglePlay}
            aria-label={
              playing ? (labels.pause ?? "Pause") : ended ? (labels.replay ?? "Replay") : (labels.play ?? "Play")
            }
            className={controlButton}
          >
            {playing ? (
              <PauseIcon className="fill-current" />
            ) : ended ? (
              <RotateCcwIcon />
            ) : (
              <PlayIcon className="translate-x-px fill-current" />
            )}
          </Button>
          <span className="shrink-0 px-1.5 font-mono text-[11px] text-white/90 tabular-nums @md:text-xs">
            {formatTime(time)} / {formatTime(duration)}
          </span>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleMute}
              aria-label={muted ? (labels.unmute ?? "Unmute") : (labels.mute ?? "Mute")}
              className={controlButton}
            >
              <VolumeIcon />
            </Button>
            <SliderPrimitive.Root
              data-slot="video-slider"
              value={muted ? 0 : volume}
              min={0}
              max={1}
              step={0.05}
              onValueChange={(value) => changeVolume(Array.isArray(value) ? value[0] : value)}
              className="hidden w-24 @lg:flex"
            >
              <SliderPrimitive.Control className="flex h-6 w-full cursor-pointer items-center px-1.5">
                <SliderPrimitive.Track className={trackClassName}>
                  <SliderPrimitive.Indicator className={indicatorClassName} />
                  <SliderPrimitive.Thumb
                    aria-label={labels.volume ?? "Volume"}
                    getAriaValueText={(_, value) => `${Math.round(value * 100)}%`}
                    className={thumbClassName}
                  />
                </SliderPrimitive.Track>
              </SliderPrimitive.Control>
            </SliderPrimitive.Root>
          </div>

          <span className="flex-1" />

          {hasCaptions ? (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleCaptions}
              aria-pressed={captions}
              aria-label={captions ? (labels.captionsOff ?? "Hide captions") : (labels.captionsOn ?? "Show captions")}
              className={controlButton}
            >
              {captions ? <CaptionsIcon /> : <CaptionsOffIcon />}
            </Button>
          ) : null}

          <Button
            variant="ghost"
            size="sm"
            onClick={cycleRate}
            aria-label={labels.speed?.(rate) ?? `Playback speed ${rate}x`}
            className={cn(controlButton, "min-w-9 px-1.5 font-mono tabular-nums")}
          >
            {rate}x
          </Button>

          {canPip ? (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={togglePip}
              aria-label={labels.pictureInPicture ?? "Picture in picture"}
              className={cn(controlButton, "hidden @md:inline-flex")}
            >
              <PictureInPicture2Icon />
            </Button>
          ) : null}

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? (labels.exitFullscreen ?? "Exit fullscreen") : (labels.fullscreen ?? "Fullscreen")}
            className={controlButton}
          >
            {fullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </Button>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {loading ? (labels.loading ?? "Loading") : ""}
      </span>
    </div>
  )
}

export { Video, formatTime }
export type { VideoProps, VideoLabels }
