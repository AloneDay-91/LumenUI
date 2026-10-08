"use client"

import { CheckIcon, CopyIcon, Maximize2, Monitor, Smartphone, Tablet, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useCopy } from "@/lib/use-copy"

type Device = "mobile" | "tablet" | "desktop"

const devices: { id: Device; label: string; icon: typeof Smartphone }[] = [
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "desktop", label: "Desktop", icon: Monitor },
]

function frameWidth(device: Device) {
  switch (device) {
    case "mobile":
      return "390px"
    case "tablet":
      return "768px"
    case "desktop":
      return "100%"
    default: {
      const unreachable: never = device
      return unreachable
    }
  }
}

export function BlockView({
  id,
  kit,
  title,
  description,
  command,
  code,
}: {
  id: string
  kit: string
  title: string
  description: string
  command: string
  code: string
}) {
  const [view, setView] = useState<"preview" | "code">("preview")
  const [device, setDevice] = useState<Device>("desktop")
  const [fullscreen, setFullscreen] = useState(false)
  const [height, setHeight] = useState(640)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const { copied, copy } = useCopy()

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return
      if (event.source !== frameRef.current?.contentWindow) return
      const data = event.data as { type?: string; height?: number }
      if (data?.type !== "lumen-block-height" || typeof data.height !== "number") return
      setHeight(Math.max(160, Math.ceil(data.height)))
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  useEffect(() => {
    if (!fullscreen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [fullscreen])

  const desktopFill = fullscreen && device === "desktop"

  return (
    <article className="overflow-hidden rounded-[min(var(--radius-4xl),24px)] border border-border">
      <header className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{kit}</p>
          <h2 className="text-sm font-medium">{title}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {view === "preview" ? (
            <DeviceSwitch device={device} onChange={setDevice} />
          ) : null}
          <div className="flex gap-0.5 rounded-full bg-muted p-0.5">
            {(["preview", "code"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={cn(
                  "h-7 rounded-full px-3 text-xs font-medium capitalize",
                  view === item
                    ? "bg-background text-foreground ring-1 ring-foreground/5"
                    : "text-muted-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          {view === "preview" ? (
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Full screen"
              onClick={() => setFullscreen(true)}
            >
              <Maximize2 className="size-3.5" />
            </Button>
          ) : null}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="max-w-full font-mono"
            onClick={() => copy(command)}
          >
            <span className="min-w-0 truncate">{command}</span>
            {copied ? (
              <CheckIcon data-icon="inline-end" />
            ) : (
              <CopyIcon data-icon="inline-end" />
            )}
          </Button>
        </div>
      </header>

      {view === "preview" ? (
        <div
          className={cn(
            fullscreen
              ? "fixed inset-0 z-100 flex flex-col bg-background"
              : "overflow-x-auto bg-muted/40",
          )}
        >
          {fullscreen ? (
            <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border px-4">
              <p className="min-w-0 truncate text-sm font-medium">{title}</p>
              <div className="flex items-center gap-2">
                <DeviceSwitch device={device} onChange={setDevice} />
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label="Close full screen"
                  onClick={() => setFullscreen(false)}
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            </div>
          ) : null}
          <div
            className={cn(
              "flex justify-center",
              fullscreen && "min-h-0 flex-1 overflow-auto p-4 sm:p-6",
              desktopFill && "h-full w-full p-0",
            )}
          >
            <iframe
              ref={frameRef}
              title={title}
              src={`/block-preview/${id}`}
              className={cn(
                "block border-0 bg-background",
                device !== "desktop" && "ring-1 ring-border",
                desktopFill && "h-full w-full",
              )}
              style={
                desktopFill
                  ? undefined
                  : { width: frameWidth(device), height, maxWidth: device === "desktop" ? "100%" : undefined }
              }
            />
          </div>
        </div>
      ) : (
        <div className="bg-muted/40 p-4">
          <CodeBlock code={code} filename={`${title}.tsx`} />
        </div>
      )}

      <footer className="border-t border-border px-4 py-3">
        <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
      </footer>
    </article>
  )
}

function DeviceSwitch({
  device,
  onChange,
}: {
  device: Device
  onChange: (device: Device) => void
}) {
  return (
    <div className="flex gap-0.5 rounded-full bg-muted p-0.5">
      {devices.map((item) => {
        const Icon = item.icon
        const selected = device === item.id
        return (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            aria-pressed={selected}
            onClick={() => onChange(item.id)}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-full",
              selected
                ? "bg-background text-foreground ring-1 ring-foreground/5"
                : "text-muted-foreground",
            )}
          >
            <Icon className="size-3.5" />
          </button>
        )
      })}
    </div>
  )
}
