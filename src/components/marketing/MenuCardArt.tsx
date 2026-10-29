import { cn } from "@/lib/utils"

const COLUMNS = 56
const ROWS = 40
const CELL = 6

/**
 * Fine colored pixels that gather in the top-right corner of a mega menu card
 * and dissolve to nothing toward the copy. Color comes from `currentColor`.
 * Seeded from the card, so the server and the client draw the same thing.
 */
export function MenuCardArt({
  seed,
  className,
}: {
  seed: string
  className?: string
}) {
  const random = seeded(seed)
  const pixels: { x: number; y: number; size: number; opacity: number }[] = []
  const reach = Math.hypot(COLUMNS, ROWS)

  for (let column = 0; column < COLUMNS; column += 1) {
    for (let row = 0; row < ROWS; row += 1) {
      // 1 in the top-right corner, 0 a full diagonal away.
      const near = 1 - Math.hypot(COLUMNS - 1 - column, row) / reach
      const chance = near ** 2.6
      if (random() > chance) continue
      pixels.push({
        x: column * CELL + 1,
        y: row * CELL + 1,
        size: random() < near ** 2 ? 3 : 2,
        opacity: Math.round((0.25 + random() * 0.75 * near) * 100) / 100,
      })
    }
  }

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${COLUMNS * CELL} ${ROWS * CELL}`}
      preserveAspectRatio="xMaxYMin slice"
      className={cn(
        "fill-current mask-[radial-gradient(ellipse_at_top_right,black_10%,transparent_75%)]",
        className
      )}
    >
      {pixels.map((pixel) => (
        <rect
          key={`${pixel.x}:${pixel.y}`}
          x={pixel.x}
          y={pixel.y}
          width={pixel.size}
          height={pixel.size}
          opacity={pixel.opacity}
        />
      ))}
    </svg>
  )
}

/** mulberry32 seeded by a string hash. */
function seeded(seed: string) {
  let state = 0
  for (let index = 0; index < seed.length; index += 1) {
    state = (Math.imul(31, state) + seed.charCodeAt(index)) | 0
  }
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let next = Math.imul(state ^ (state >>> 15), 1 | state)
    next = (next + Math.imul(next ^ (next >>> 7), 61 | next)) ^ next
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}
