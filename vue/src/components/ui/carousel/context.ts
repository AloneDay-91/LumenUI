import { inject, type InjectionKey, type Ref } from "vue"
import type { EmblaCarouselType } from "embla-carousel"

export type CarouselApi = EmblaCarouselType
export type CarouselOrientation = "horizontal" | "vertical"

export type CarouselContextValue = {
  carouselRef: Ref<HTMLElement | undefined>
  api: Ref<CarouselApi | undefined>
  orientation: Ref<CarouselOrientation>
  canScrollPrev: Ref<boolean>
  canScrollNext: Ref<boolean>
  selectedIndex: Ref<number>
  scrollSnaps: Ref<number[]>
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
}

export const CarouselContextKey: InjectionKey<CarouselContextValue> = Symbol("Carousel")

export function useCarousel() {
  const context = inject(CarouselContextKey, null)
  if (!context) {
    throw new Error("useCarousel must be used within Carousel.")
  }
  return context
}
