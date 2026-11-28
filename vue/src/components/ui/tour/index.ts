export { default as Tour } from "./Tour.vue"

export type TourStep = {
  /** CSS selector of the element to point at. Without one, the card is centered. */
  target?: string
  title: string
  description?: string
}

export type TourLabels = {
  next?: string
  back?: string
  finish?: string
  skip?: string
  progress?: (step: number, total: number) => string
}
