"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Direction = "horizontal" | "vertical"

type PanelConfig = { minSize: number; maxSize: number }

type ResizableContextValue = {
  direction: Direction
  sizes: Record<string, number>
  configs: React.RefObject<Map<string, PanelConfig>>
  register: (id: string, defaultSize: number | undefined, config: PanelConfig) => void
  unregister: (id: string) => void
  resize: (beforeId: string, afterId: string, delta: number) => void
  groupRef: React.RefObject<HTMLDivElement | null>
}

const ResizableContext = React.createContext<ResizableContextValue | null>(null)

function useResizable() {
  const context = React.useContext(ResizableContext)
  if (!context) throw new Error("Resizable parts must sit inside ResizablePanelGroup.")
  return context
}

function ResizablePanelGroup({
  className,
  direction = "horizontal",
  onLayout,
  ...props
}: React.ComponentProps<"div"> & {
  direction?: Direction
  /** Called with each panel's size, in percent, after a resize. */
  onLayout?: (sizes: Record<string, number>) => void
}) {
  const [sizes, setSizes] = React.useState<Record<string, number>>({})
  const configs = React.useRef(new Map<string, PanelConfig>())
  const defaults = React.useRef(new Map<string, number | undefined>())
  const groupRef = React.useRef<HTMLDivElement>(null)
  // Pointer moves fire faster than renders; read the latest sizes, not a stale closure.
  const sizesRef = React.useRef(sizes)
  React.useLayoutEffect(() => {
    sizesRef.current = sizes
  }, [sizes])

  const register = React.useCallback(
    (id: string, defaultSize: number | undefined, config: PanelConfig) => {
      configs.current.set(id, config)
      defaults.current.set(id, defaultSize)
      // Panels without a default share whatever the others leave.
      setSizes(() => {
        const entries = Array.from(defaults.current.entries())
        const fixed = entries.reduce((sum, [, size]) => sum + (size ?? 0), 0)
        const free = entries.filter(([, size]) => size === undefined).length
        const share = free > 0 ? Math.max(0, 100 - fixed) / free : 0
        return Object.fromEntries(entries.map(([key, size]) => [key, size ?? share]))
      })
    },
    []
  )

  const unregister = React.useCallback((id: string) => {
    configs.current.delete(id)
    defaults.current.delete(id)
    setSizes((previous) => {
      const next = { ...previous }
      delete next[id]
      return next
    })
  }, [])

  const resize = React.useCallback(
    (beforeId: string, afterId: string, delta: number) => {
      const previous = sizesRef.current
      const before = previous[beforeId]
      const after = previous[afterId]
      if (before === undefined || after === undefined) return
      const a = configs.current.get(beforeId) ?? { minSize: 0, maxSize: 100 }
      const b = configs.current.get(afterId) ?? { minSize: 0, maxSize: 100 }
      const total = before + after
      const low = Math.max(a.minSize, total - b.maxSize)
      const high = Math.min(a.maxSize, total - b.minSize)
      const nextBefore = Math.min(high, Math.max(low, before + delta))
      if (nextBefore === before) return
      const next = { ...previous, [beforeId]: nextBefore, [afterId]: total - nextBefore }
      sizesRef.current = next
      setSizes(next)
      onLayout?.(next)
    },
    [onLayout]
  )

  const context = React.useMemo(
    () => ({ direction, sizes, configs, register, unregister, resize, groupRef }),
    [direction, sizes, register, unregister, resize]
  )

  return (
    <ResizableContext.Provider value={context}>
      <div
        ref={groupRef}
        data-slot="resizable-panel-group"
        data-direction={direction}
        className={cn(
          "flex size-full overflow-hidden",
          direction === "vertical" ? "flex-col" : "flex-row",
          className
        )}
        {...props}
      />
    </ResizableContext.Provider>
  )
}

function ResizablePanel({
  className,
  id: idProp,
  defaultSize,
  minSize = 10,
  maxSize = 100,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  /** Initial size, in percent of the group. */
  defaultSize?: number
  minSize?: number
  maxSize?: number
}) {
  const generated = React.useId()
  const id = idProp ?? generated
  const { sizes, register, unregister } = useResizable()

  React.useLayoutEffect(() => {
    register(id, defaultSize, { minSize, maxSize })
    return () => unregister(id)
  }, [id, defaultSize, minSize, maxSize, register, unregister])

  const size = sizes[id]

  return (
    <div
      id={id}
      data-slot="resizable-panel"
      data-panel-id={id}
      style={{ flex: size === undefined ? "1 1 0%" : `${size} 1 0%`, ...style }}
      className={cn("min-h-0 min-w-0 overflow-hidden", className)}
      {...props}
    />
  )
}

function neighbour(handle: HTMLElement, side: "previous" | "next") {
  let node =
    side === "previous" ? handle.previousElementSibling : handle.nextElementSibling
  while (node && !(node as HTMLElement).dataset.panelId) {
    node = side === "previous" ? node.previousElementSibling : node.nextElementSibling
  }
  return (node as HTMLElement | null)?.dataset.panelId
}

function ResizableHandle({
  className,
  withHandle = false,
  "aria-label": ariaLabel = "Resize panels",
  ...props
}: React.ComponentProps<"div"> & { withHandle?: boolean }) {
  const { direction, sizes, configs, resize, groupRef } = useResizable()
  const ref = React.useRef<HTMLDivElement>(null)
  const [pair, setPair] = React.useState<[string, string] | null>(null)
  const [dragging, setDragging] = React.useState(false)

  React.useLayoutEffect(() => {
    if (!ref.current) return
    const before = neighbour(ref.current, "previous")
    const after = neighbour(ref.current, "next")
    setPair(before && after ? [before, after] : null)
  }, [sizes])

  const horizontal = direction === "horizontal"
  const value = pair ? sizes[pair[0]] : undefined
  const config = pair ? configs.current.get(pair[0]) : undefined

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!pair || !groupRef.current) return
    event.preventDefault()
    const rect = groupRef.current.getBoundingClientRect()
    const length = horizontal ? rect.width : rect.height
    const rtl = horizontal && getComputedStyle(groupRef.current).direction === "rtl"
    let last = horizontal ? event.clientX : event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)

    const move = (moveEvent: PointerEvent) => {
      const position = horizontal ? moveEvent.clientX : moveEvent.clientY
      const delta = ((position - last) / length) * 100 * (rtl ? -1 : 1)
      last = position
      resize(pair[0], pair[1], delta)
    }
    const up = () => {
      setDragging(false)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!pair) return
    const step = event.shiftKey ? 10 : 2
    const rtl = horizontal && getComputedStyle(event.currentTarget).direction === "rtl"
    const grow = horizontal ? (rtl ? "ArrowLeft" : "ArrowRight") : "ArrowDown"
    const shrink = horizontal ? (rtl ? "ArrowRight" : "ArrowLeft") : "ArrowUp"
    if (event.key === grow) resize(pair[0], pair[1], step)
    else if (event.key === shrink) resize(pair[0], pair[1], -step)
    else if (event.key === "Home") resize(pair[0], pair[1], -100)
    else if (event.key === "End") resize(pair[0], pair[1], 100)
    else return
    event.preventDefault()
  }

  return (
    <div
      ref={ref}
      role="separator"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-orientation={horizontal ? "vertical" : "horizontal"}
      aria-controls={pair?.[0]}
      aria-valuenow={value === undefined ? undefined : Math.round(value)}
      aria-valuemin={config?.minSize}
      aria-valuemax={config?.maxSize}
      data-slot="resizable-handle"
      data-dragging={dragging ? "" : undefined}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      className={cn(
        "relative flex shrink-0 touch-none items-center justify-center bg-border outline-none select-none",
        "after:absolute after:content-[''] focus-visible:bg-ring data-dragging:bg-ring",
        horizontal
          ? "w-px cursor-col-resize after:inset-y-0 after:-inset-x-1.5"
          : "h-px cursor-row-resize after:inset-x-0 after:-inset-y-1.5",
        className
      )}
      {...props}
    >
      {withHandle ? (
        <span
          aria-hidden
          className={cn(
            "z-10 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground",
            horizontal ? "h-6 w-3.5" : "h-3.5 w-6 [&_svg]:rotate-90"
          )}
        >
          <GripVerticalIcon className="size-2.5" />
        </span>
      ) : null}
    </div>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
