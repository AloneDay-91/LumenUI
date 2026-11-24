"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { ChevronsLeftRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Two layers stacked, with a handle that wipes between them: before on the
 * start side, after on the end. Drag anywhere, or focus the handle and use
 * the arrows, Home, and End.
 */
function ComparisonSlider({
  className,
  before,
  after,
  beforeLabel,
  afterLabel,
  value,
  defaultValue = 50,
  onValueChange,
  "aria-label": ariaLabel = "Comparison position",
}: {
  className?: string
  /** Shown on the start side of the handle: an img, a video, any node. */
  before: React.ReactNode
  /** Shown on the end side. Sets the size of the frame. */
  after: React.ReactNode
  beforeLabel?: React.ReactNode
  afterLabel?: React.ReactNode
  /** Controlled position, 0 to 100. */
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  "aria-label"?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const position = value ?? uncontrolled

  const label = (text: React.ReactNode, side: "start" | "end") =>
    text ? (
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-3 rounded-2xl bg-background/85 px-2 py-0.5 text-[11px] font-medium text-foreground ring-1 ring-foreground/5 backdrop-blur-sm",
          side === "start" ? "start-3" : "end-3"
        )}
      >
        {text}
      </span>
    ) : null

  return (
    <div
      data-slot="comparison-slider"
      className={cn(
        "relative isolate w-full overflow-hidden rounded-[min(var(--radius-4xl),24px)] bg-muted ring-1 ring-foreground/5 select-none dark:ring-foreground/10",
        "[&_img]:pointer-events-none [&_img]:block [&_img]:size-full [&_img]:object-cover [&_video]:block [&_video]:size-full [&_video]:object-cover",
        className
      )}
    >
      <div className="relative">
        {after}
        {label(afterLabel, "end")}
      </div>
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 calc(100% - ${position}%) 0 0)`,
        }}
      >
        {before}
        {label(beforeLabel, "start")}
      </div>

      <SliderPrimitive.Root
        value={position}
        min={0}
        max={100}
        step={1}
        onValueChange={(next) => {
          const v = Array.isArray(next) ? next[0] : next
          setUncontrolled(v)
          onValueChange?.(v)
        }}
        className="absolute inset-0 touch-none"
        // The clip runs left to right; keep the handle on the same axis in RTL.
        dir="ltr"
      >
        <SliderPrimitive.Control className="absolute inset-0 cursor-ew-resize">
          <SliderPrimitive.Track className="size-full">
            <SliderPrimitive.Thumb
              aria-label={ariaLabel}
              getAriaValueText={(_, v) => `${Math.round(v)}%`}
              className="group/handle flex h-full w-8 items-center justify-center outline-none"
            >
              <span aria-hidden className="absolute inset-y-0 w-0.5 bg-background shadow-[0_0_0_1px_color-mix(in_oklch,var(--foreground)_10%,transparent)]" />
              <span
                aria-hidden
                className="relative flex size-8 items-center justify-center rounded-full bg-background text-foreground ring-1 ring-foreground/10 transition-[scale] group-hover/handle:scale-105 group-focus-visible/handle:ring-3 group-focus-visible/handle:ring-ring/50"
              >
                <ChevronsLeftRightIcon className="size-4" />
              </span>
            </SliderPrimitive.Thumb>
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    </div>
  )
}

export { ComparisonSlider }
