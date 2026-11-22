"use client"

import { useEffect, useRef } from "react"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Switch } from "@/components/ui/Switch"

// "Pipo" mesh gradient: one radial blob per colour over a paper backdrop.
const BLOBS = [
  { rgb: "230, 176, 147", x: 68.1, y: 46.03, r: 41.1 }, // Apricot
  { rgb: "163, 206, 255", x: 25.17, y: 75.99, r: 44.6 }, // Sky blue
  { rgb: "250, 249, 239", x: 53.11, y: 12.71, r: 66.65 }, // Paper
].map((blob, i) => ({
  ...blob,
  // Static per-blob phases, hashed once from the seed: never animated.
  p: hash(i * 2 + 1) * Math.PI * 2,
  p2: hash(i * 2 + 2) * Math.PI * 2,
}))

const GRAIN = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.305'/></svg>")`

const SPEED = 0.86
const AMOUNT = 0.72

function hash(n: number) {
  const x = Math.sin(n * 12.9898 + 1) * 43758.5453
  return x - Math.floor(x)
}

function blob(rgb: string, x: number, y: number, r: number) {
  const stop = (alpha: number, at: number) => `rgba(${rgb}, ${alpha}) ${r * at}%`
  return `radial-gradient(circle at ${x}% ${y}%, ${stop(1, 0)}, ${stop(0.844, 0.25)}, ${stop(0.5, 0.5)}, ${stop(0.156, 0.75)}, ${stop(0, 1)})`
}

function background(t: number) {
  const ph = t * SPEED
  // Every offset is exactly 0 at ph = 0, so nothing snaps when motion starts.
  const layers = BLOBS.map(({ rgb, x, y, r, p, p2 }) =>
    blob(
      rgb,
      x + (Math.sin(ph * 0.55 + p) - Math.sin(p)) * 14 * AMOUNT,
      y + (Math.sin(ph * 0.43 + p2) - Math.sin(p2)) * 14 * AMOUNT,
      r
    )
  )
  return [GRAIN, ...layers].join(", ")
}

export function DocsWhatsNewVisual({ version }: { version: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let visible = true
    const start = performance.now()
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(el)

    const tick = (now: number) => {
      if (visible) el.style.backgroundImage = background((now - start) / 1000)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return (
    // Built like the landing hero: a backdrop with a real product frame set
    // into it, cut off by the bottom edge.
    <div
      aria-hidden
      inert
      className="relative mt-2 h-24 overflow-hidden rounded-md border border-border px-4 pt-4"
    >
      <div
        ref={ref}
        className="absolute inset-0 opacity-90 dark:opacity-50"
        style={{
          backgroundColor: "#FAF9EF",
          backgroundImage: background(0),
          backgroundSize: "120px 120px, auto, auto, auto",
          backgroundBlendMode: "overlay, normal, normal, normal",
        }}
      />
      {/* Drawn at real size, then scaled down as one piece so the labels and
          the components keep their true proportions. */}
      <div className="relative w-[133.333%] origin-top-left scale-75 transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
        <div className="flex flex-col gap-2.5 rounded-t-xl border border-b-0 border-border bg-background p-3 shadow-lg">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-medium text-foreground">Appearance</span>
            <Badge variant="secondary">v{version}</Badge>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] text-muted-foreground">Follow radius</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] text-muted-foreground">Theme</span>
            <Button size="xs" variant="secondary">Lumen</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
