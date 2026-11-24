"use client"

import * as React from "react"
import { MusicIcon } from "lucide-react"

import { AudioPlayer, getAudioPeaks } from "@/components/ui/AudioPlayer"
import { ComparisonSlider } from "@/components/ui/ComparisonSlider"

const THEME = "/video/lumen-theme.mp3"

export function AudioPlayerDemo() {
  const [peaks, setPeaks] = React.useState<number[]>()

  React.useEffect(() => {
    let cancelled = false
    getAudioPeaks(THEME, 72)
      .then((result) => {
        if (!cancelled) setPeaks(result)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <AudioPlayer
      src={THEME}
      preload="metadata"
      title="Lumen theme"
      description="Showcase soundtrack"
      artwork={
        <span className="flex size-full items-center justify-center text-muted-foreground">
          <MusicIcon className="size-4" />
        </span>
      }
      peaks={peaks}
      className="max-w-md"
    />
  )
}

export function AudioPlayerPlainDemo() {
  return <AudioPlayer src={THEME} preload="metadata" className="max-w-md" />
}

export function ComparisonSliderDemo() {
  return (
    <ComparisonSlider
      className="aspect-video max-w-xl"
      beforeLabel="Light"
      afterLabel="Dark"
      before={
        // eslint-disable-next-line @next/next/no-img-element -- demo of a portable component
        <img src="/images/lumen-showcase-poster.jpg" alt="Lumen in light mode" />
      }
      after={
        // eslint-disable-next-line @next/next/no-img-element -- demo of a portable component
        <img src="/images/lumen-showcase-dark-poster.jpg" alt="Lumen in dark mode" />
      }
    />
  )
}
