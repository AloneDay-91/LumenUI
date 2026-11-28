<script setup lang="ts">
import { computed, provide, ref, toRef, watch, type HTMLAttributes } from "vue"
import emblaCarouselVue from "embla-carousel-vue"
import Autoplay from "embla-carousel-autoplay"
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel"

import { cn } from "@/lib/utils"
import { CarouselContextKey, type CarouselApi, type CarouselOrientation } from "./context"

const props = withDefaults(
  defineProps<{
    orientation?: CarouselOrientation
    opts?: EmblaOptionsType
    plugins?: EmblaPluginType[]
    /** true for a 4 s delay, or a delay in milliseconds. Pauses on hover. */
    autoplay?: boolean | number
    class?: HTMLAttributes["class"]
  }>(),
  { orientation: "horizontal", autoplay: false },
)

const emit = defineEmits<{
  /** Fires once Embla is ready, with its API (React's setApi). */
  "init-api": [api: CarouselApi]
}>()

const delay = computed(() =>
  typeof props.autoplay === "number" ? props.autoplay : props.autoplay ? 4000 : undefined,
)

const autoplayPlugin = computed(() =>
  delay.value == null
    ? undefined
    : Autoplay({
        delay: delay.value,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      }),
)

const emblaPlugins = computed(() => {
  const list = props.plugins ? [...props.plugins] : []
  if (autoplayPlugin.value) list.push(autoplayPlugin.value)
  return list
})

const emblaOptions = computed<EmblaOptionsType>(() => ({
  ...(delay.value != null ? { loop: true } : {}),
  ...props.opts,
  axis: props.opts?.axis ?? (props.orientation === "vertical" ? "y" : "x"),
}))

const [carouselRef, api] = emblaCarouselVue(emblaOptions, emblaPlugins)

const canScrollPrev = ref(false)
const canScrollNext = ref(false)
const selectedIndex = ref(0)
const scrollSnaps = ref<number[]>([])

function sync(instance: CarouselApi) {
  canScrollPrev.value = instance.canScrollPrev()
  canScrollNext.value = instance.canScrollNext()
  selectedIndex.value = instance.selectedScrollSnap()
  const snaps = instance.scrollSnapList()
  // scrollSnapList() returns a new array each call: replace it only when the count changes.
  if (snaps.length !== scrollSnaps.value.length) scrollSnaps.value = snaps
}

watch(
  api,
  (instance, _previous, onCleanup) => {
    if (!instance) return
    const onChange = () => sync(instance)
    sync(instance)
    instance.on("reInit", onChange)
    instance.on("select", onChange)
    emit("init-api", instance)
    onCleanup(() => {
      instance.off("select", onChange)
      instance.off("reInit", onChange)
    })
  },
  { immediate: true },
)

function scrollPrev() {
  api.value?.scrollPrev()
}
function scrollNext() {
  api.value?.scrollNext()
}
function scrollTo(index: number) {
  api.value?.scrollTo(index)
}

provide(CarouselContextKey, {
  carouselRef,
  api,
  orientation: toRef(props, "orientation"),
  canScrollPrev,
  canScrollNext,
  selectedIndex,
  scrollSnaps,
  scrollPrev,
  scrollNext,
  scrollTo,
})

defineExpose({ api, scrollPrev, scrollNext, scrollTo })
</script>

<template>
  <div
    data-slot="carousel"
    :data-orientation="orientation"
    :class="cn('flex w-full min-w-0 flex-col gap-3', props.class)"
  >
    <slot
      :api="api"
      :selected-index="selectedIndex"
      :can-scroll-prev="canScrollPrev"
      :can-scroll-next="canScrollNext"
    />
  </div>
</template>
