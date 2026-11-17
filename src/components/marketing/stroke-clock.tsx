"use client"

import { useEffect, type RefObject } from "react"

/** A stroke grows, then recedes. Same clock as the Scandar menu canvases. */
const CYCLE = 5.2
const HALF = CYCLE / 2
const SPAN = 0.8

type Ray = { i: number; n: number; x1: number; y1: number; x2: number; y2: number }

function easeOut(t: number) {
  return 1 - (1 - t) ** 3
}

function clamp01(t: number) {
  return Math.max(0, Math.min(1, t))
}

function hide(el: SVGElement) {
  el.setAttribute("opacity", "0")
}

function place(el: SVGElement, time: number, still: boolean) {
  const i = Number(el.dataset.i)
  const n = Number(el.dataset.n)
  if (still) {
    hide(el)
    return
  }
  const phase = (time / 1000) % CYCLE
  const growing = phase < HALF
  const local = growing ? phase : phase - HALF
  const stagger = n <= 1 ? 0 : (HALF - SPAN) / (n - 1)
  const progress = easeOut(clamp01((local - stagger * i) / SPAN))
  if ((growing && progress <= 0) || (!growing && progress >= 1)) {
    hide(el)
    return
  }
  const from = growing ? 0 : progress
  const to = growing ? progress : 1

  if (el.tagName.toLowerCase() === "path") {
    const len = to - from
    if (len < 0.02) {
      hide(el)
      return
    }
    el.setAttribute("stroke-dasharray", `${len} ${Math.max(0, 1 - len)}`)
    el.setAttribute("stroke-dashoffset", `${-from}`)
    el.setAttribute("opacity", "1")
    return
  }

  const x1 = Number(el.dataset.x1)
  const y1 = Number(el.dataset.y1)
  const x2 = Number(el.dataset.x2)
  const y2 = Number(el.dataset.y2)
  const ax = x1 + (x2 - x1) * from
  const ay = y1 + (y2 - y1) * from
  const bx = x1 + (x2 - x1) * to
  const by = y1 + (y2 - y1) * to
  if ((bx - ax) ** 2 + (by - ay) ** 2 < 0.25) {
    hide(el)
    return
  }
  el.setAttribute("x1", String(ax))
  el.setAttribute("y1", String(ay))
  el.setAttribute("x2", String(bx))
  el.setAttribute("y2", String(by))
  el.setAttribute("opacity", "1")
}

/** Paints every `[data-ray]` under `ref` while it is on screen. */
export function useStrokeClock<T extends Element>(ref: RefObject<T | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    let raf = 0
    let visible = true
    const frame = (now: number) => {
      root.querySelectorAll<SVGElement>("[data-ray]").forEach((el) => place(el, now, media.matches))
      if (!media.matches && visible && !document.hidden) raf = requestAnimationFrame(frame)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false
      if (visible) start()
      else cancelAnimationFrame(raf)
    })
    io.observe(root)
    media.addEventListener("change", start)
    document.addEventListener("visibilitychange", start)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      media.removeEventListener("change", start)
      document.removeEventListener("visibilitychange", start)
    }
  }, [ref])
}

export function StrokeLine({ i, n, x1, y1, x2, y2 }: Ray) {
  return (
    <line
      data-ray=""
      data-i={i}
      data-n={n}
      data-x1={x1}
      data-y1={y1}
      data-x2={x2}
      data-y2={y2}
      x1={x1}
      y1={y1}
      x2={x1}
      y2={y1}
      opacity={0}
      strokeWidth={2}
      className="stroke-foreground"
    />
  )
}

export function StrokePath({ i, n, d }: { i: number; n: number; d: string }) {
  return (
    <path
      data-ray=""
      data-i={i}
      data-n={n}
      d={d}
      pathLength={1}
      strokeDasharray="0 1"
      opacity={0}
      strokeWidth={2}
      className="stroke-foreground"
    />
  )
}
