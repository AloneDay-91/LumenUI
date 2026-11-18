"use client"

import { Player } from "@remotion/player"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

import {
  LumenShowcase,
  SHOWCASE_DURATION,
  SHOWCASE_FPS,
  SHOWCASE_HEIGHT,
  SHOWCASE_WIDTH,
} from "@/components/snap-cn/lumen-showcase"
import { cn } from "@/lib/utils"

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function subscribeToNothing() {
  return () => {}
}

/** The frame a still shows instead of the loop: the finished logo lockup. */
const STILL_FRAME = SHOWCASE_DURATION - 10

/**
 * The Lumen showcase video, played live in the page so it follows the site theme.
 *
 * `ambient` is the landing page's version: no controls, no sound (the track is
 * not even loaded), autoplay on a loop, and a still of the lockup for people who
 * ask for reduced motion.
 */
export function ShowcasePlayer({ ambient = false, className }: { ambient?: boolean; className?: string }) {
  const { resolvedTheme } = useTheme()
  const mode = resolvedTheme === "dark" ? "dark" : "light"
  const reduced = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  )
  // The theme is only known in the browser, so the film is drawn there only: a
  // server render in light would not match a dark client. Until then, a frame of
  // the same size holds the place so nothing below it moves.
  const mounted = useSyncExternalStore(subscribeToNothing, () => true, () => false)
  const frame = cn("overflow-hidden rounded-3xl border border-border", ambient && "pointer-events-none")
  const size = { width: "100%", aspectRatio: `${SHOWCASE_WIDTH} / ${SHOWCASE_HEIGHT}` }

  if (!mounted) {
    return (
      <div className={className}>
        <div className={cn(frame, "bg-background")} style={size} />
      </div>
    )
  }

  if (ambient) {
    return (
      <div role="img" aria-label="Lumen UI in motion: components, AI patterns and blocks" className={className}>
        <Player
          // A new player when the preference flips, so autoplay and the still frame apply.
          key={reduced ? "still" : "loop"}
          component={LumenShowcase}
          inputProps={{ mode, music: false }}
          durationInFrames={SHOWCASE_DURATION}
          fps={SHOWCASE_FPS}
          compositionWidth={SHOWCASE_WIDTH}
          compositionHeight={SHOWCASE_HEIGHT}
          controls={false}
          loop
          autoPlay={!reduced}
          initialFrame={reduced ? STILL_FRAME : 0}
          initiallyMuted
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          acknowledgeRemotionLicense
          className="pointer-events-none overflow-hidden rounded-3xl border border-border"
          style={{ width: "100%", aspectRatio: `${SHOWCASE_WIDTH} / ${SHOWCASE_HEIGHT}` }}
        />
      </div>
    )
  }

  return (
    <Player
      component={LumenShowcase}
      inputProps={{ mode }}
      durationInFrames={SHOWCASE_DURATION}
      fps={SHOWCASE_FPS}
      compositionWidth={SHOWCASE_WIDTH}
      compositionHeight={SHOWCASE_HEIGHT}
      controls
      loop
      autoPlay
      clickToPlay
      acknowledgeRemotionLicense
      className={cn("overflow-hidden rounded-3xl border border-border", className)}
      style={{ width: "100%", aspectRatio: `${SHOWCASE_WIDTH} / ${SHOWCASE_HEIGHT}` }}
    />
  )
}
