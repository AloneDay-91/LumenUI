import type { HTMLAttributes } from "vue"

export type VideoLabels = {
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

/** Props of Video. Every other attribute (src, poster, autoplay, muted, loop…) goes to the `video` element. */
export interface VideoProps {
  /** Classes for the frame. */
  class?: HTMLAttributes["class"]
  /** Classes for the `video` element, e.g. its aspect ratio. `class` styles the card. */
  videoClass?: HTMLAttributes["class"]
  /** Seconds the arrow keys skip. */
  seekStep?: number
  /** Speeds the speed button cycles through. */
  playbackRates?: number[]
  /** Milliseconds of stillness before the controls fade while playing. */
  hideDelay?: number
  labels?: VideoLabels
}

/** 75 → "1:15", 3725 → "1:02:05". */
export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0
  const s = Math.floor(seconds % 60)
  const m = Math.floor((seconds / 60) % 60)
  const h = Math.floor(seconds / 3600)
  const ss = String(s).padStart(2, "0")
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`
}
