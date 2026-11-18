"use client"

import { Easing, interpolate, spring, useVideoConfig } from "remotion"

import { LOGO_PATH } from "@/components/Logo"

import { CLAMP } from "./stage"

type Cell = { x: number; y: number; diagonal: number; spark: boolean }

/**
 * The Lumen symbol, split into the cells of its 9×9 grid.
 *
 * Read straight from the SVG path in Logo.tsx (even-odd fill, as the icon is
 * drawn), so the animated mark can never drift from the real one.
 */
function cellsOf(path: string): Cell[] {
  const polygons = path
    .split("Z")
    .filter((part) => part.trim())
    .map((part) => [...part.matchAll(/[ML](-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map((m) => [Number(m[1]), Number(m[2])]))
  const inside = (px: number, py: number) => {
    let hit = false
    for (const poly of polygons) {
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi = 0, yi = 0] = poly[i] ?? []
        const [xj = 0, yj = 0] = poly[j] ?? []
        if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit
      }
    }
    return hit
  }
  const filled = (x: number, y: number) => x >= 0 && y >= 0 && x < 9 && y < 9 && inside(x + 0.5, y + 0.5)
  const cells: Cell[] = []
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (!filled(x, y)) continue
      // The loose pixels of the top-right edge: no filled neighbour on any side.
      const spark = !filled(x - 1, y) && !filled(x + 1, y) && !filled(x, y - 1) && !filled(x, y + 1)
      // From the bottom-left corner of the solid body toward the scattered top-right edge.
      cells.push({ x, y, diagonal: x + (8 - y), spark })
    }
  }
  return cells
}

const CELLS = cellsOf(LOGO_PATH)

/**
 * The mark, animated cell by cell: it builds from its solid corner out to its
 * loose pixels, ripples once while it travels, and its loose pixels shimmer at rest.
 */
export function LogoMark({
  frame,
  buildAt = 0,
  waveAt,
  shimmerAt,
  className,
}: {
  frame: number
  /** Frame the cells start to build. */
  buildAt?: number
  /** Frame a diagonal ripple crosses the mark. */
  waveAt?: number
  /** Frame the loose pixels start to shimmer. */
  shimmerAt?: number
  className?: string
}) {
  const { fps } = useVideoConfig()

  return (
    <svg viewBox="0 0 9 9" fill="currentColor" shapeRendering="crispEdges" aria-hidden className={className}>
      {CELLS.map((cell) => {
        const build = spring({ frame: frame - buildAt - cell.diagonal * 0.9, fps, config: { damping: 14, stiffness: 180 } })
        const wave =
          waveAt === undefined
            ? 0
            : interpolate(frame - waveAt - cell.diagonal * 0.7, [0, 4, 9], [0, 1, 0], {
                ...CLAMP,
                easing: Easing.inOut(Easing.sin),
              })
        const shimmer =
          shimmerAt !== undefined && cell.spark
            ? interpolate((frame - shimmerAt - cell.diagonal * 2) % 24, [0, 6, 12], [0, 1, 0], CLAMP) *
              (frame >= shimmerAt + cell.diagonal * 2 ? 1 : 0)
            : 0
        return (
          <rect
            key={`${cell.x}:${cell.y}`}
            x={cell.x}
            y={cell.y}
            width={1}
            height={1}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              scale: Math.max(0, build) * (1 - 0.45 * wave),
              opacity: Math.min(1, Math.max(0, build)) * (1 - 0.6 * shimmer),
            }}
          />
        )
      })}
    </svg>
  )
}
