"use client"

import * as React from "react"
import { GitPullRequestIcon, MessageSquareIcon, RocketIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"
import { ImageGallery, type GalleryImage } from "@/components/ui/ImageGallery"
import { NotificationCenter, type NotificationItem } from "@/components/ui/NotificationCenter"
import { RelativeTime } from "@/components/ui/RelativeTime"
import { Tour, type TourStep } from "@/components/ui/Tour"
import { Video } from "@/components/ui/Video"

const minutes = (n: number) => Date.now() - n * 60_000

export function NotificationDemo() {
  const [items, setItems] = React.useState<NotificationItem[]>(() => [
    {
      id: "1",
      icon: <GitPullRequestIcon />,
      title: "Review requested on #214",
      description: "Ada asked you to review “Split Button keeps its radius”.",
      date: minutes(3),
    },
    {
      id: "2",
      icon: <MessageSquareIcon />,
      title: "New comment on Banner",
      description: "“The floating pill reads well in dark mode.”",
      date: minutes(48),
    },
    {
      id: "3",
      icon: <RocketIcon />,
      title: "v1.1.0 published",
      description: "The CLI is live on npm.",
      date: minutes(60 * 26),
      read: true,
    },
  ])

  return (
    <NotificationCenter
      notifications={items}
      onItemClick={(item) =>
        setItems((all) => all.map((n) => (n.id === item.id ? { ...n, read: true } : n)))
      }
      onMarkAllRead={() => setItems((all) => all.map((n) => ({ ...n, read: true })))}
    />
  )
}

export function RelativeTimeDemo() {
  const [now] = React.useState(() => Date.now())
  const dates = [
    ["Just now", now - 5_000],
    ["Minutes", now - 7 * 60_000],
    ["Hours", now - 5 * 3_600_000],
    ["Yesterday", now - 26 * 3_600_000],
    ["Weeks", now - 15 * 86_400_000],
    ["Future", now + 3 * 86_400_000],
  ] as const

  return (
    <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-xs">
      {dates.map(([label, date]) => (
        <React.Fragment key={label}>
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="m-0">
            <RelativeTime date={date} />
          </dd>
        </React.Fragment>
      ))}
    </dl>
  )
}

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

export function ImageGalleryDemo() {
  return <ImageGallery images={images} className="w-full max-w-md" />
}

const subscribeToNothing = () => () => {}

export function VideoDemo() {
  const { resolvedTheme } = useTheme()
  // Light until the theme is known, so server and client render the same file.
  const mounted = React.useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  )
  const name = mounted && resolvedTheme === "dark" ? "lumen-showcase-dark" : "lumen-showcase"

  return (
    <Video
      key={name}
      src={`/video/${name}.mp4`}
      poster={`/images/${name}-poster.jpg`}
      preload="metadata"
      className="max-w-xl"
    />
  )
}

const steps: TourStep[] = [
  {
    target: "[data-tour='search']",
    title: "Search everything",
    description: "Components, guides, and tokens. Press ⌘K from anywhere.",
  },
  {
    target: "[data-tour='create']",
    title: "Start a project",
    description: "Pick a template; you can change every token later in Customize.",
  },
  {
    target: "[data-tour='invite']",
    title: "Invite your team",
    description: "Teammates see the same tokens and the same components.",
  },
]

export function TourDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <div className="flex w-full items-center gap-2 rounded-2xl border border-border p-2">
        <Button data-tour="search" variant="secondary" size="sm" className="flex-1 justify-start text-muted-foreground">
          Search…
        </Button>
        <Button data-tour="create" size="sm">
          New project
        </Button>
        <Button data-tour="invite" variant="outline" size="sm">
          Invite
        </Button>
      </div>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Start the tour
      </Button>
      <Tour steps={steps} open={open} onOpenChange={setOpen} />
    </div>
  )
}
