"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel"
import type { UseEmblaCarouselType } from "embla-carousel-react"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

type CarouselApi = NonNullable<UseEmblaCarouselType[1]>
type CarouselOrientation = "horizontal" | "vertical"

type CarouselContextValue = {
  carouselRef: UseEmblaCarouselType[0]
  api: CarouselApi | undefined
  orientation: CarouselOrientation
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedIndex: number
  scrollSnaps: number[]
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within Carousel.")
  }
  return context
}

function axisFor(orientation: CarouselOrientation) {
  switch (orientation) {
    case "horizontal":
      return "x" as const
    case "vertical":
      return "y" as const
    default: {
      const exhaustive: never = orientation
      return exhaustive
    }
  }
}

function Carousel({
  orientation = "horizontal",
  opts,
  plugins,
  autoplay = false,
  setApi,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: CarouselOrientation
  opts?: EmblaOptionsType
  plugins?: EmblaPluginType[]
  autoplay?: boolean | number
  setApi?: (api: CarouselApi) => void
}) {
  const delay = typeof autoplay === "number" ? autoplay : autoplay ? 4000 : undefined
  const autoplayPlugin = React.useMemo(
    () =>
      delay == null
        ? undefined
        : Autoplay({
            delay,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            rootNode: (emblaRoot) => emblaRoot.parentElement,
          }),
    [delay]
  )
  const emblaPlugins = React.useMemo(() => {
    const list = plugins ? [...plugins] : []
    if (autoplayPlugin) list.push(autoplayPlugin)
    return list
  }, [plugins, autoplayPlugin])
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...(delay != null ? { loop: true } : {}),
      ...opts,
      axis: opts?.axis ?? axisFor(orientation),
    },
    emblaPlugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  const onSelect = React.useCallback((emblaApi: CarouselApi) => {
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    setApi?.(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onSelect, setApi])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
        scrollPrev,
        scrollNext,
        scrollTo,
      }}
    >
      <div
        data-slot="carousel"
        data-orientation={orientation}
        className={cn("flex w-full min-w-0 flex-col gap-3", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      data-slot="carousel-content"
      className={cn("overflow-hidden", className)}
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-3" : "h-full -mt-3 flex-col"
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, children, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-3" : "pt-3",
        className
      )}
      {...props}
    >
      {/* Keeps a card ring or border inside the clipped viewport. */}
      <div className="h-full p-0.5">{children}</div>
    </div>
  )
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, canScrollPrev, scrollPrev } = useCarousel()
  const Icon = orientation === "horizontal" ? ChevronLeftIcon : ChevronUpIcon

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      data-slot="carousel-previous"
      aria-label="Previous slide"
      className={className}
      {...props}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
    >
      <Icon />
    </Button>
  )
}

function CarouselNext({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, canScrollNext, scrollNext } = useCarousel()
  const Icon = orientation === "horizontal" ? ChevronRightIcon : ChevronDownIcon

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      data-slot="carousel-next"
      aria-label="Next slide"
      className={className}
      {...props}
      disabled={!canScrollNext}
      onClick={scrollNext}
    >
      <Icon />
    </Button>
  )
}

function CarouselDots({ className, ...props }: React.ComponentProps<"div">) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel()

  return (
    <div
      data-slot="carousel-dots"
      role="tablist"
      aria-label="Slides"
      className={cn("flex items-center justify-center gap-1.5", className)}
      {...props}
    >
      {scrollSnaps.map((_, index) => {
        const selected = index === selectedIndex
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={selected}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full bg-foreground/20 transition-[width,background-color] outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
              selected ? "w-4 bg-foreground" : "w-1.5"
            )}
          />
        )
      })}
    </div>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
  type CarouselApi,
}
