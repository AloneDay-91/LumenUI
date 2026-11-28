/** A crop in the image's own pixels. */
export type CropArea = { x: number; y: number; width: number; height: number }
export type Box = { x: number; y: number; w: number; h: number }

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/** The largest box of the ratio that fits, centred, at `fill` of the image. */
export function initialBox(aspect: number | undefined, imageRatio: number, fill = 0.8): Box {
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
export async function cropImage(
  src: string,
  area: CropArea,
  { maxSize = 1024, type = "image/png", quality = 0.92 }: { maxSize?: number; type?: string; quality?: number } = {},
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
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Crop failed"))), type, quality),
  )
}
