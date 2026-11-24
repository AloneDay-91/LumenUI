"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** A crop in the image's own pixels. */
type CropArea = { x: number; y: number; width: number; height: number }
type Box = { x: number; y: number; w: number; h: number }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/** The largest box of the ratio that fits, centred, at `fill` of the image. */
function initialBox(aspect: number | undefined, imageRatio: number, fill = 0.8): Box {
  if (!aspect) return { x: (1 - fill) / 2, y: (1 - fill) / 2, w: fill, h: fill }
  // Box sizes are fractions of the image: width fraction / height fraction = aspect / imageRatio.
  const r = aspect / imageRatio
  let w = fill
  let h = w / r
  if (h > fill) {
    h = fill
    w = h * r
  }
  return { x: (1 - w) / 2, y: (1 - h) / 2, w, h }
}

/**
 * Crops an image to an area and returns it as a Blob, at most `maxSize`
 * pixels on its longer side.
 */
async function cropImage(
  src: string,
  area: CropArea,
  { maxSize = 1024, type = "image/png", quality = 0.92 }: { maxSize?: number; type?: string; quality?: number } = {}
): Promise<Blob> {
  const image = new Image()
  image.crossOrigin = "anonymous"
  image.src = src
  await image.decode()
  const scale = Math.min(1, maxSize / Math.max(area.width, area.height))
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(area.width * scale)
  canvas.height = Math.round(area.height * scale)
  canvas.getContext("2d")?.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, canvas.width, canvas.height)
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Crop failed"))), type, quality)
  )
}

/**
 * An image with a crop box you drag and resize by its corners, at a fixed
 * ratio or free. The area outside is dimmed; `shape="round"` previews an
 * avatar. Arrows move the box, Shift with arrows resizes it. Pass the area
 * to `cropImage` to get the file.
 */
function ImageCropper({
  className,
  src,
  alt,
  aspect,
  shape = "rect",
  onAreaChange,
  maxHeight = 360,
  labels = {},
}: {
  className?: string
  src: string
  alt: string
  /** Width over height, e.g. 1 for a square or 16 / 9. Free when unset. */
  aspect?: number
  /** `round` shows a circle, for avatars. Use with aspect 1. */
  shape?: "rect" | "round"
  /** The crop in the image's pixels, on every change. */
  onAreaChange?: (area: CropArea) => void
  /** Pixels. The image scales down to fit. */
  maxHeight?: number
  labels?: { box?: string; handle?: (corner: string) => string }
}) {
  const frameRef = React.useRef<HTMLDivElement>(null)
  const [natural, setNatural] = React.useState<{ width: number; height: number } | null>(null)
  const [box, setBox] = React.useState<Box | null>(null)

  const emit = React.useCallback(
    (next: Box) => {
      setBox(next)
      if (natural)
        onAreaChange?.({
          x: Math.round(next.x * natural.width),
          y: Math.round(next.y * natural.height),
          width: Math.round(next.w * natural.width),
          height: Math.round(next.h * natural.height),
        })
    },
    [natural, onAreaChange]
  )

  const imageRef = React.useRef<HTMLImageElement>(null)
  const start = React.useCallback(
    (img: HTMLImageElement) => {
      if (!img.naturalWidth) return
      const next = { width: img.naturalWidth, height: img.naturalHeight }
      setNatural(next)
      const first = initialBox(aspect, next.width / next.height)
      setBox(first)
      onAreaChange?.({
        x: Math.round(first.x * next.width),
        y: Math.round(first.y * next.height),
        width: Math.round(first.w * next.width),
        height: Math.round(first.h * next.height),
      })
    },
    [aspect, onAreaChange]
  )
  // A cached image can finish loading before React listens for onLoad.
  React.useEffect(() => {
    const img = imageRef.current
    if (img?.complete) start(img)
    // Only on mount and when the source changes; onLoad covers the rest.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  const imageRatio = natural ? natural.width / natural.height : 1
  const minW = 0.08
  const minH = 0.08

  const startDrag = (event: React.PointerEvent, corner: "move" | "nw" | "ne" | "sw" | "se") => {
    if (!box || !frameRef.current) return
    event.preventDefault()
    event.stopPropagation()
    const rect = frameRef.current.getBoundingClientRect()
    const origin = { x: event.clientX, y: event.clientY, box }
    const onMove = (move: PointerEvent) => {
      const dx = (move.clientX - origin.x) / rect.width
      const dy = (move.clientY - origin.y) / rect.height
      const b = origin.box
      if (corner === "move") {
        emit({ ...b, x: clamp(b.x + dx, 0, 1 - b.w), y: clamp(b.y + dy, 0, 1 - b.h) })
        return
      }
      const left = corner === "nw" || corner === "sw"
      const top = corner === "nw" || corner === "ne"
      // The opposite corner stays put.
      const anchorX = left ? b.x + b.w : b.x
      const anchorY = top ? b.y + b.h : b.y
      let w = clamp(left ? b.w - dx : b.w + dx, minW, left ? anchorX : 1 - anchorX)
      let h = clamp(top ? b.h - dy : b.h + dy, minH, top ? anchorY : 1 - anchorY)
      if (aspect) {
        const r = aspect / imageRatio
        // Follow the larger movement, then fit inside the room left.
        if (w / r > h) h = w / r
        else w = h * r
        const roomW = left ? anchorX : 1 - anchorX
        const roomH = top ? anchorY : 1 - anchorY
        if (w > roomW) {
          w = roomW
          h = w / r
        }
        if (h > roomH) {
          h = roomH
          w = h * r
        }
      }
      emit({ x: left ? anchorX - w : anchorX, y: top ? anchorY - h : anchorY, w, h })
    }
    const onUp = () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!box) return
    const step = event.altKey ? 0.002 : 0.02
    const dx = event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0
    const dy = event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0
    if (!dx && !dy) return
    event.preventDefault()
    if (event.shiftKey) {
      // Resize from the top-left corner, keeping the ratio.
      let w = clamp(box.w + (dx || dy), minW, 1 - box.x)
      let h = aspect ? w / (aspect / imageRatio) : clamp(box.h + dy, minH, 1 - box.y)
      if (aspect && box.y + h > 1) {
        h = 1 - box.y
        w = h * (aspect / imageRatio)
      }
      if (!aspect) w = clamp(box.w + dx, minW, 1 - box.x)
      emit({ ...box, w, h })
    } else {
      emit({ ...box, x: clamp(box.x + dx, 0, 1 - box.w), y: clamp(box.y + dy, 0, 1 - box.h) })
    }
  }

  const pct = (value: number) => `${value * 100}%`
  const corners = ["nw", "ne", "sw", "se"] as const

  return (
    <div
      data-slot="image-cropper"
      className={cn(
        "flex w-full items-center justify-center overflow-hidden rounded-[min(var(--radius-4xl),24px)] bg-muted p-3 ring-1 ring-foreground/5 select-none dark:ring-foreground/10",
        className
      )}
    >
      <div ref={frameRef} className="relative touch-none" style={{ maxHeight }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- crops any URL, not tied to next/image */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          ref={imageRef}
          onLoad={(event) => start(event.currentTarget)}
          className="block h-auto max-w-full"
          style={{ maxHeight }}
        />
        {box ? (
          <div
            role="slider"
            tabIndex={0}
            aria-label={labels.box ?? "Crop area"}
            aria-valuenow={Math.round(box.x * 100)}
            aria-valuetext={`Left ${Math.round(box.x * 100)}%, top ${Math.round(box.y * 100)}%, ${Math.round(box.w * 100)}% wide, ${Math.round(box.h * 100)}% high`}
            onKeyDown={onKeyDown}
            onPointerDown={(event) => startDrag(event, "move")}
            className={cn(
              "absolute cursor-move outline-none shadow-[0_0_0_9999px_rgb(0_0_0/0.55)] ring-2 ring-white focus-visible:ring-ring",
              shape === "round" && "rounded-full"
            )}
            style={{ left: pct(box.x), top: pct(box.y), width: pct(box.w), height: pct(box.h) }}
          >
            {/* Thirds, to frame the shot. */}
            <span aria-hidden className={cn("pointer-events-none absolute inset-0 opacity-40", shape === "round" && "hidden")}>
              <span className="absolute inset-y-0 left-1/3 w-px bg-white" />
              <span className="absolute inset-y-0 left-2/3 w-px bg-white" />
              <span className="absolute inset-x-0 top-1/3 h-px bg-white" />
              <span className="absolute inset-x-0 top-2/3 h-px bg-white" />
            </span>
            {corners.map((corner) => (
              <span
                key={corner}
                aria-hidden
                onPointerDown={(event) => startDrag(event, corner)}
                className={cn(
                  "absolute size-3.5 rounded-full border-2 border-white bg-black/40 shadow",
                  corner === "nw" && "-top-1.5 -left-1.5 cursor-nwse-resize",
                  corner === "ne" && "-top-1.5 -right-1.5 cursor-nesw-resize",
                  corner === "sw" && "-bottom-1.5 -left-1.5 cursor-nesw-resize",
                  corner === "se" && "-right-1.5 -bottom-1.5 cursor-nwse-resize"
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { ImageCropper, cropImage }
export type { CropArea }
