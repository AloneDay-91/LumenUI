<script setup lang="ts">
import { ImageGallery, type GalleryImage } from "@/components/ui/image-gallery"

/** Paper-toned abstract compositions, drawn inline so the demo needs no image files. */
function art(hue: number, shape: "circle" | "arc" | "bars", label: string): string {
  const ink = `oklch(0.45 0.12 ${hue})`
  const wash = `oklch(0.93 0.04 ${hue})`
  const paper = "oklch(0.98 0.006 90)"
  const body =
    shape === "circle"
      ? `<circle cx="560" cy="360" r="220" fill="${ink}"/><circle cx="380" cy="470" r="120" fill="${wash}" opacity=".9"/>`
      : shape === "arc"
        ? `<path d="M120 640 A440 440 0 0 1 1000 640" fill="none" stroke="${ink}" stroke-width="90"/><rect x="460" y="160" width="200" height="200" rx="40" fill="${wash}"/>`
        : `<rect x="200" y="200" width="120" height="440" rx="60" fill="${ink}"/><rect x="380" y="300" width="120" height="340" rx="60" fill="${wash}"/><rect x="560" y="140" width="120" height="500" rx="60" fill="${ink}" opacity=".6"/>`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 800" role="img" aria-label="${label}"><rect width="1120" height="800" fill="${paper}"/><rect width="1120" height="800" fill="${wash}" opacity=".35"/>${body}</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const images: GalleryImage[] = [
  { src: art(277, "circle", "Indigo circles"), alt: "Two indigo circles on paper", caption: "Indigo, ink and wash" },
  { src: art(165, "arc", "Jade arc"), alt: "A jade arc over a soft square", caption: "Jade arc" },
  { src: art(38, "bars", "Orange bars"), alt: "Three orange pill bars", caption: "Orange bars" },
  { src: art(223, "arc", "Cyan arc"), alt: "A cyan arc over a soft square", caption: "Cyan arc" },
  { src: art(15, "circle", "Crimson circles"), alt: "Two crimson circles on paper", caption: "Crimson, ink and wash" },
  { src: art(90, "bars", "Paper bars"), alt: "Three warm grey pill bars", caption: "Paper bars" },
]
</script>

<template>
  <ImageGallery :images="images" class="w-full max-w-md" />
</template>
