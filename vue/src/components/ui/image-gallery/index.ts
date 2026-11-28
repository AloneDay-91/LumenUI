export { default as ImageGallery } from "./ImageGallery.vue"

export type GalleryImage = {
  src: string
  alt: string
  /** Smaller file for the grid. Defaults to `src`. */
  thumbnail?: string
  /** Plain-text caption; use the `caption` slot for rich content. */
  caption?: string
  width?: number
  height?: number
}
