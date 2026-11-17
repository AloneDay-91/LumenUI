"use client"

import { useEffect, useRef } from "react"

/** Distance between two dots of the word, in CSS pixels. */
const STEP = 5
/** Radius around the pointer where the dots get pushed and tinted. */
const RADIUS = 130
/** How hard the pointer pushes, how fast a dot springs back, how much speed it keeps. */
const PUSH = 0.6
const SPRING = 0.07
const DAMPING = 0.8
/** Opacity of a dot at rest. Dark dots on a light page need a little more. */
const REST = { dark: 0.16, light: 0.22 }
/** A pale blue on the dark theme, a deeper one that still shows on the light theme. */
const TINT_COLOR = { dark: "rgb(175, 205, 255)", light: "rgb(40, 100, 220)" }
const TINT = 0.4
const WORD = "Lumen UI"

type Dot = { ox: number; oy: number; x: number; y: number; vx: number; vy: number; p: number }

/**
 * "Lumen UI" set very large at the bottom of the footer, drawn in small faint dots.
 * The pointer pushes the dots near it away; they spring back once it leaves.
 * With reduced motion nothing moves. Decorative: hidden from assistive tech.
 */
export function FooterWordmark() {
  const box = useRef<HTMLDivElement>(null)
  const word = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = box.current
    const text = word.current
    const cv = canvas.current
    if (!host || !text || !cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let dots: Dot[] = []
    let width = 0
    let height = 0
    let raf = 0
    const pointer = { x: -9999, y: -9999, near: false }
    let presence = 0

    const sample = () => {
      const rect = host.getBoundingClientRect()
      width = Math.round(rect.width)
      height = Math.round(rect.height)
      const dpr = window.devicePixelRatio || 1
      cv.width = width * dpr
      cv.height = height * dpr
      cv.style.width = `${width}px`
      cv.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const style = getComputedStyle(text)
      const size = parseFloat(style.fontSize)
      const off = document.createElement("canvas")
      off.width = width
      off.height = height
      const o = off.getContext("2d", { willReadFrequently: true })
      if (!o) return
      o.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      if ("letterSpacing" in o) {
        ;(o as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = style.letterSpacing
      }
      o.textAlign = "center"
      o.textBaseline = "alphabetic"
      const m = o.measureText(WORD)
      const ascent = m.fontBoundingBoxAscent
      const descent = m.fontBoundingBoxDescent
      const baseline = (size - (ascent + descent)) / 2 + ascent
      const textRect = text.getBoundingClientRect()
      const center = textRect.left - rect.left + textRect.width / 2
      o.fillText(WORD, center, baseline)

      const pixels = o.getImageData(0, 0, width, height).data
      dots = []
      for (let y = STEP / 2; y < height; y += STEP) {
        for (let x = STEP / 2; x < width; x += STEP) {
          if (pixels[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] > 128) {
            dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0, p: Math.random() * Math.PI * 2 })
          }
        }
      }
    }

    const frame = () => {
      presence += ((pointer.near ? 1 : 0) - presence) * (reduce ? 1 : 0.12)
      ctx.clearRect(0, 0, width, height)
      const color = getComputedStyle(host).color
      const theme = document.documentElement.classList.contains("dark") ? "dark" : "light"

      const t = performance.now() / 1000
      let moving = false
      for (const d of dots) {
        const dx = d.ox - pointer.x
        const dy = d.oy - pointer.y
        const dist = Math.hypot(dx, dy)
        const k = Math.max(0, 1 - dist / RADIUS)
        const near = k * k * (3 - 2 * k) * presence
        if (!reduce) {
          if (near > 0 && dist > 0.01) {
            d.vx += (dx / dist) * near * PUSH
            d.vy += (dy / dist) * near * PUSH
          }
          d.vx = (d.vx + (d.ox - d.x) * SPRING) * DAMPING
          d.vy = (d.vy + (d.oy - d.y) * SPRING) * DAMPING
          d.x += d.vx
          d.y += d.vy
          if (Math.abs(d.vx) + Math.abs(d.vy) > 0.02 || Math.abs(d.x - d.ox) + Math.abs(d.y - d.oy) > 0.1) {
            moving = true
          }
        }
        const shimmer = reduce ? 0 : near * 0.8
        const x = d.x + Math.sin(t * 3 + d.p) * shimmer
        const y = d.y + Math.cos(t * 2.6 + d.p) * shimmer
        ctx.globalAlpha = REST[theme]
        ctx.fillStyle = color
        ctx.fillRect(x - 0.7, y - 0.7, 1.4, 1.4)
        if (near > 0.01) {
          ctx.globalAlpha = TINT * near
          ctx.fillStyle = TINT_COLOR[theme]
          ctx.fillRect(x - 0.7, y - 0.7, 1.4, 1.4)
        }
      }
      ctx.globalAlpha = 1

      raf = moving || presence > 0.01 || pointer.near ? requestAnimationFrame(frame) : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.near =
        pointer.y > -RADIUS &&
        pointer.y < r.height + RADIUS &&
        pointer.x > -RADIUS &&
        pointer.x < r.width + RADIUS
      kick()
    }
    const leave = () => {
      pointer.near = false
      kick()
    }

    let ready = false
    const build = () => {
      sample()
      ready = true
      text.style.color = "transparent"
      kick()
    }
    document.fonts.ready.then(build)
    const resize = new ResizeObserver(() => ready && build())
    resize.observe(host)
    const themed = new MutationObserver(() => ready && kick())
    themed.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] })
    document.addEventListener("pointermove", move, { passive: true })
    document.documentElement.addEventListener("pointerleave", leave)
    return () => {
      resize.disconnect()
      themed.disconnect()
      document.removeEventListener("pointermove", move)
      document.documentElement.removeEventListener("pointerleave", leave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="relative h-[0.9em] overflow-hidden text-center text-[clamp(3.25rem,13vw,11rem)] text-foreground"
    >
      <div
        ref={word}
        className="-translate-x-[0.045em] font-heading leading-none font-medium tracking-[-0.05em] whitespace-nowrap text-foreground/6 select-none"
      >
        {WORD}
      </div>
      <canvas ref={canvas} className="pointer-events-none absolute inset-0" />
    </div>
  )
}
