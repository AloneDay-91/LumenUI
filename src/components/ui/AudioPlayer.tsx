"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { PauseIcon, PlayIcon, RotateCcwIcon, Volume2Icon, VolumeXIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

type AudioPlayerLabels = {
  player?: string
  play?: string
  pause?: string
  replay?: string
  seek?: string
  mute?: string
  unmute?: string
  speed?: (rate: number) => string
}

type AudioPlayerProps = Omit<React.ComponentProps<"audio">, "controls" | "title"> & {
  /** Track name, shown in bold. */
  title?: React.ReactNode
  /** Artist, episode, or any second line. */
  description?: React.ReactNode
  /** Square art before the title: an img, an Avatar, an icon. */
  artwork?: React.ReactNode
  /**
   * Bar heights from 0 to 1. With them the scrubber is a waveform; without,
   * a plain track. `getAudioPeaks` computes them from a file.
   */
  peaks?: number[]
  /** Speeds the speed button cycles through. Empty hides it. */
  playbackRates?: number[]
  /** Classes for the `audio` element, which is hidden. `className` styles the card. */
  audioClassName?: string
  labels?: AudioPlayerLabels
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

/**
 * Decodes an audio file and returns `count` bar heights from 0 to 1 for the
 * `peaks` prop. Runs in the browser; fetches the whole file once.
 */
async function getAudioPeaks(src: string, count = 64): Promise<number[]> {
  const response = await fetch(src)
  const data = await response.arrayBuffer()
  const context = new AudioContext()
  try {
    const buffer = await context.decodeAudioData(data)
    const channel = buffer.getChannelData(0)
    const size = Math.floor(channel.length / count)
    const peaks: number[] = []
    for (let i = 0; i < count; i++) {
      let sum = 0
      for (let j = i * size; j < (i + 1) * size; j++) sum += channel[j] * channel[j]
      peaks.push(Math.sqrt(sum / size))
    }
    const max = Math.max(...peaks, 0.0001)
    return peaks.map((peak) => peak / max)
  } finally {
    void context.close()
  }
}

/**
 * An audio file in a Lumen card: art, title, play, a scrubber or waveform,
 * the time, speed, and mute. Space or K plays, arrows seek, M mutes.
 */
function AudioPlayer({
  className,
  audioClassName,
  title,
  description,
  artwork,
  peaks,
  playbackRates = [1, 1.25, 1.5, 2, 0.75],
  labels = {},
  ref,
  children,
  ...props
}: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = React.useState(false)
  const [ended, setEnded] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [muted, setMuted] = React.useState(Boolean(props.muted))
  const [rate, setRate] = React.useState(1)

  const setAudioRef = React.useCallback(
    (node: HTMLAudioElement | null) => {
      audioRef.current = node
      if (typeof ref === "function") return ref(node)
      if (ref) ref.current = node
    },
    [ref]
  )

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const sync = () => {
      setPlaying(!audio.paused && !audio.ended)
      setTime(audio.currentTime)
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
      setMuted(audio.muted)
      setEnded(audio.ended)
      setRate(audio.playbackRate)
    }
    const handlers: [string, () => void][] = [
      ["play", () => { setPlaying(true); setEnded(false) }],
      ["pause", () => setPlaying(false)],
      ["ended", () => { setPlaying(false); setEnded(true) }],
      ["timeupdate", () => setTime(audio.currentTime)],
      ["durationchange", sync],
      ["loadedmetadata", sync],
      ["volumechange", () => setMuted(audio.muted)],
      ["ratechange", () => setRate(audio.playbackRate)],
      ["seeked", () => setTime(audio.currentTime)],
    ]
    for (const [event, handler] of handlers) audio.addEventListener(event, handler)
    sync()
    return () => {
      for (const [event, handler] of handlers) audio.removeEventListener(event, handler)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused || audio.ended) void audio.play().catch(() => {})
    else audio.pause()
  }
  const seekBy = (delta: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(Math.max(audio.currentTime + delta, 0), audio.duration || 0)
  }
  const toggleMute = () => {
    const audio = audioRef.current
    if (audio) audio.muted = !audio.muted
  }
  const cycleRate = () => {
    const audio = audioRef.current
    if (!audio || playbackRates.length === 0) return
    const i = playbackRates.indexOf(audio.playbackRate)
    audio.playbackRate = playbackRates[(i + 1) % playbackRates.length]
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    const target = event.target as HTMLElement
    const onSlider = target.closest("[data-slot=audio-player-slider]") !== null
    const onButton = target.closest("button") !== null
    const key = event.key.toLowerCase()
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl"
    if ((key === " " && !onButton) || key === "k") togglePlay()
    else if (key === "m") toggleMute()
    else if (!onSlider && key === "arrowright") seekBy(rtl ? -5 : 5)
    else if (!onSlider && key === "arrowleft") seekBy(rtl ? 5 : -5)
    else return
    event.preventDefault()
  }

  const progress = duration ? Math.min(time / duration, 1) : 0

  return (
    <div
      role="group"
      aria-label={labels.player ?? "Audio player"}
      data-slot="audio-player"
      data-playing={playing ? "" : undefined}
      onKeyDown={onKeyDown}
      className={cn(
        "flex w-full flex-col gap-3 rounded-[min(var(--radius-4xl),24px)] bg-card p-3 text-card-foreground ring-1 ring-foreground/5 dark:ring-foreground/10",
        className
      )}
    >
      <audio ref={setAudioRef} {...props} className={cn("hidden", audioClassName)}>
        {children}
      </audio>

      {title || description || artwork ? (
        <div className="flex min-w-0 items-center gap-3">
          {artwork ? (
            <div className="size-10 shrink-0 overflow-hidden rounded-xl bg-muted [&>img]:size-full [&>img]:object-cover">
              {artwork}
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            {title ? <p className="m-0 truncate text-sm font-medium">{title}</p> : null}
            {description ? (
              <p className="m-0 truncate text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          onClick={togglePlay}
          aria-label={
            playing ? (labels.pause ?? "Pause") : ended ? (labels.replay ?? "Replay") : (labels.play ?? "Play")
          }
        >
          {playing ? (
            <PauseIcon className="fill-current" />
          ) : ended ? (
            <RotateCcwIcon />
          ) : (
            <PlayIcon className="translate-x-px fill-current" />
          )}
        </Button>

        <SliderPrimitive.Root
          data-slot="audio-player-slider"
          value={Math.min(time, duration || 0)}
          min={0}
          max={duration || 1}
          step={0.1}
          disabled={!duration}
          onValueChange={(value) => {
            const audio = audioRef.current
            if (!audio) return
            const next = Array.isArray(value) ? value[0] : value
            audio.currentTime = next
            setTime(next)
          }}
          className="group/seek flex min-w-0 flex-1 touch-none"
        >
          <SliderPrimitive.Control
            className={cn(
              "flex w-full cursor-pointer items-center data-disabled:cursor-default",
              peaks?.length ? "h-8" : "h-6"
            )}
          >
            {peaks?.length ? (
              <SliderPrimitive.Track className="relative flex h-full w-full items-center gap-px select-none">
                {peaks.map((peak, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className={cn(
                      "min-w-px flex-1 rounded-full transition-colors",
                      (i + 0.5) / peaks.length <= progress ? "bg-primary" : "bg-foreground/15"
                    )}
                    style={{ height: `${Math.max(peak, 0.08) * 100}%` }}
                  />
                ))}
                <SliderPrimitive.Thumb
                  aria-label={labels.seek ?? "Seek"}
                  getAriaValueText={(_, value) => `${formatTime(value)} / ${formatTime(duration)}`}
                  className="h-full w-0.5 rounded-full bg-primary opacity-0 outline-none select-none group-hover/seek:opacity-100 focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/30"
                />
              </SliderPrimitive.Track>
            ) : (
              <SliderPrimitive.Track className="relative h-1 w-full rounded-full bg-muted select-none">
                <SliderPrimitive.Indicator className="rounded-full bg-primary select-none" />
                <SliderPrimitive.Thumb
                  aria-label={labels.seek ?? "Seek"}
                  getAriaValueText={(_, value) => `${formatTime(value)} / ${formatTime(duration)}`}
                  className="size-3.5 rounded-full bg-background ring-1 ring-foreground/10 outline-none select-none dark:bg-foreground focus-visible:ring-3 focus-visible:ring-ring/30"
                />
              </SliderPrimitive.Track>
            )}
          </SliderPrimitive.Control>
        </SliderPrimitive.Root>

        <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
          {formatTime(time)} / {formatTime(duration)}
        </span>

        {playbackRates.length ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleRate}
            aria-label={labels.speed?.(rate) ?? `Playback speed ${rate}x`}
            className="min-w-9 px-1.5 font-mono tabular-nums"
          >
            {rate}x
          </Button>
        ) : null}

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleMute}
          aria-label={muted ? (labels.unmute ?? "Unmute") : (labels.mute ?? "Mute")}
        >
          {muted ? <VolumeXIcon /> : <Volume2Icon />}
        </Button>
      </div>
    </div>
  )
}

export { AudioPlayer, getAudioPeaks }
export type { AudioPlayerProps, AudioPlayerLabels }
