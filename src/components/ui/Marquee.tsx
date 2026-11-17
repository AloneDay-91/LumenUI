"use client"

import * as React from "react"
import { PauseIcon, PlayIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import "./marquee.css"

/**
 * Children scroll on a loop. Pauses on hover, stops under reduced motion,
 * fades at the edges. The second copy is hidden from assistive tech, and a
 * pause button keeps it compliant with WCAG 2.2.2 when it runs past 5 seconds.
 */
function Marquee({
  className,
  children,
  orientation = "horizontal",
  duration = 30,
  gap = "2rem",
  reverse = false,
  pauseOnHover = true,
  fade = true,
  showControl = true,
  labels = {},
  style,
  ...props
}: React.ComponentProps<"div"> & {
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
}) {
  const [paused, setPaused] = React.useState(false)
  const vertical = orientation === "vertical"

  const track = (hidden: boolean) => (
    <div
      data-slot="marquee-track"
      aria-hidden={hidden || undefined}
      // `inert` keeps links in the copy out of the tab order.
      inert={hidden || undefined}
      className={cn("flex shrink-0 items-center", vertical ? "flex-col" : "flex-row")}
      style={{ gap }}
    >
      {children}
    </div>
  )

  return (
    <div
      data-slot="marquee"
      // A name only counts on an element with a role.
      role={props["aria-label"] || props["aria-labelledby"] ? "group" : undefined}
      data-orientation={orientation}
      data-reverse={reverse ? "" : undefined}
      data-pause-on-hover={pauseOnHover ? "" : undefined}
      data-paused={paused ? "" : undefined}
      className={cn(
        "group/marquee relative flex overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        fade &&
          (vertical
            ? "mask-[linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
            : "mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"),
        className
      )}
      style={
        {
          gap,
          "--marquee-gap": gap,
          "--marquee-duration": `${duration}s`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {track(false)}
      {track(true)}
      {showControl ? (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? (labels.play ?? "Play") : (labels.pause ?? "Pause")}
          className="absolute end-1 bottom-1 flex size-6 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-0 ring-1 ring-foreground/10 backdrop-blur-sm transition-opacity outline-none group-hover/marquee:opacity-100 hover:text-foreground focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/30 motion-reduce:hidden"
        >
          {paused ? <PlayIcon className="size-3" /> : <PauseIcon className="size-3" />}
        </button>
      ) : null}
    </div>
  )
}

export { Marquee }
