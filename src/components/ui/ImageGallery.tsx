"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { backdropClassName } from "@/components/ui/styles"
import { cn } from "@/lib/utils"

type GalleryImage = {
  src: string
  alt: string
  /** Smaller file for the grid. Defaults to `src`. */
  thumbnail?: string
  caption?: React.ReactNode
  width?: number
  height?: number
}

/**
 * A grid of thumbnails; each opens a lightbox with the full image, arrows,
 * and a counter. Left and Right move, Escape closes and returns focus.
 */
function ImageGallery({
  className,
  images,
  columns = 3,
  labels = {},
}: {
  className?: string
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  labels?: {
    open?: (image: GalleryImage) => string
    previous?: string
    next?: string
    close?: string
    counter?: (index: number, total: number) => string
  }
}) {
  const [index, setIndex] = React.useState<number | null>(null)
  const total = images.length
  const current = index === null ? null : images[index]

  const go = (delta: number) =>
    setIndex((previous) => (previous === null ? null : (previous + delta + total) % total))

  return (
    <>
      <ul
        data-slot="image-gallery"
        className={cn(
          "m-0 grid list-none gap-2 p-0",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-2 sm:grid-cols-3",
          columns === 4 && "grid-cols-2 sm:grid-cols-4",
          className
        )}
      >
        {images.map((image, i) => (
          <li key={`${image.src}-${i}`}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={labels.open?.(image) ?? `Open ${image.alt}`}
              className="group/thumb block aspect-square w-full overflow-hidden rounded-2xl bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- a portable component, not tied to next/image */}
              <img
                src={image.thumbnail ?? image.src}
                alt=""
                loading="lazy"
                className="size-full object-cover transition-transform duration-300 group-hover/thumb:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <DialogPrimitive.Root
        open={index !== null}
        onOpenChange={(open) => {
          if (!open) setIndex(null)
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className={cn(backdropClassName, "bg-black/80")} />
          <DialogPrimitive.Popup
            data-slot="image-gallery-lightbox"
            onKeyDown={(event) => {
              const rtl = getComputedStyle(event.currentTarget).direction === "rtl"
              if (event.key === "ArrowRight") go(rtl ? -1 : 1)
              else if (event.key === "ArrowLeft") go(rtl ? 1 : -1)
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-4 text-white outline-none transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 sm:p-10"
          >
            {current ? (
              <>
                <DialogPrimitive.Title className="sr-only">{current.alt}</DialogPrimitive.Title>
                <div className="flex min-h-0 w-full flex-1 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
                  <img
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    width={current.width}
                    height={current.height}
                    className="max-h-full max-w-full rounded-2xl object-contain"
                  />
                </div>
                <div className="flex w-full max-w-3xl items-center gap-3 text-xs">
                  <span className="font-mono text-white/70 tabular-nums" aria-live="polite">
                    {labels.counter?.(index! + 1, total) ?? `${index! + 1} / ${total}`}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-white/90">{current.caption}</span>
                  {total > 1 ? (
                    <span className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={labels.previous ?? "Previous image"}
                        onClick={() => go(-1)}
                        className="text-white hover:bg-white/15 hover:text-white"
                      >
                        <ChevronLeftIcon className="rtl:rotate-180" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={labels.next ?? "Next image"}
                        onClick={() => go(1)}
                        className="text-white hover:bg-white/15 hover:text-white"
                      >
                        <ChevronRightIcon className="rtl:rotate-180" />
                      </Button>
                    </span>
                  ) : null}
                </div>
                <DialogPrimitive.Close
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={labels.close ?? "Close"}
                      className="absolute end-3 top-3 text-white hover:bg-white/15 hover:text-white"
                    />
                  }
                >
                  <XIcon />
                </DialogPrimitive.Close>
              </>
            ) : null}
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  )
}

export { ImageGallery }
export type { GalleryImage }
