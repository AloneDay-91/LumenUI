import type { HTMLAttributes } from "vue"

export type AudioPlayerLabels = {
  player?: string
  play?: string
  pause?: string
  replay?: string
  seek?: string
  mute?: string
  unmute?: string
  speed?: (rate: number) => string
}

export interface AudioPlayerProps {
  /** Classes for the card. */
  class?: HTMLAttributes["class"]
  /** Track name, shown in bold. The `title` slot replaces it. */
  title?: string
  /** Artist, episode, or any second line. The `description` slot replaces it. */
  description?: string
  /**
   * Bar heights from 0 to 1. With them the scrubber is a waveform; without,
   * a plain track. `getAudioPeaks` computes them from a file.
   */
  peaks?: number[]
  /** Speeds the speed button cycles through. Empty hides it. */
  playbackRates?: number[]
  /** Classes for the `audio` element, which is hidden. `class` styles the card. */
  audioClass?: HTMLAttributes["class"]
  labels?: AudioPlayerLabels
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

/**
 * Decodes an audio file and returns `count` bar heights from 0 to 1 for the
 * `peaks` prop. Runs in the browser; fetches the whole file once.
 */
export async function getAudioPeaks(src: string, count = 64): Promise<number[]> {
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
