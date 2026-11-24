"use client"

import * as React from "react"
import {
  BookOpenIcon,
  CheckSquareIcon,
  LanguagesIcon,
  RefreshCwIcon,
  SmilePlusIcon,
  SparklesIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { EmojiPicker } from "@/components/ui/EmojiPicker"
import { EventCalendar, type CalendarEvent } from "@/components/ui/EventCalendar"
import { Gauge } from "@/components/ui/Gauge"
import { Heatmap, type HeatmapValue } from "@/components/ui/Heatmap"
import { ImageCropper, cropImage, type CropArea } from "@/components/ui/ImageCropper"
import { Markdown } from "@/components/ui/Markdown"
import { MentionInput, type Mention } from "@/components/ui/MentionInput"
import { NumberTicker } from "@/components/ui/NumberTicker"
import { OnboardingChecklist } from "@/components/ui/OnboardingChecklist"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { SignaturePad } from "@/components/ui/SignaturePad"
import { Slider } from "@/components/ui/Slider"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"

/* Markdown ----------------------------------------------------------------- */

const reply = `## Release checklist

Here is what is left before **v1.4.0** ships. Two items need you; the rest is automated.

- [x] Changelog entry with a title
- [x] Registry rebuilt for the CLI
- [ ] Archive the 1.3 docs
- [ ] Merge the release PR

| Step | Owner | When |
| :--- | :---- | ---: |
| Release PR | release-please | on merge |
| Archive | you | after the tag |

> Merging the release PR publishes \`@aloneday/lumenui\` to npm, so check the version first.

\`\`\`bash
npx @aloneday/lumenui@latest add markdown
\`\`\`

See the [release guide](/docs/changelog) for the full flow.`

export function MarkdownDemo() {
  const [shown, setShown] = React.useState(reply.length)
  const streaming = shown < reply.length

  const stream = () => {
    setShown(0)
    let at = 0
    const timer = window.setInterval(() => {
      at = Math.min(reply.length, at + 6)
      setShown(at)
      if (at >= reply.length) window.clearInterval(timer)
    }, 24)
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Markdown variant="compact">{reply.slice(0, shown)}</Markdown>
      <Button variant="outline" size="sm" className="self-start" onClick={stream} disabled={streaming}>
        <RefreshCwIcon data-icon="inline-start" />
        {streaming ? "Streaming…" : "Replay as a stream"}
      </Button>
    </div>
  )
}

/* Mention Input -------------------------------------------------------------- */

const people = [
  { id: "u1", label: "Alex Martin", description: "Design" },
  { id: "u2", label: "Sam Lee", description: "Engineering" },
  { id: "u3", label: "Noa Petit", description: "Product" },
  { id: "u4", label: "Jules Moreau", description: "Support" },
].map((person) => ({
  ...person,
  icon: (
    <Avatar className="size-5">
      <AvatarFallback className="text-[9px]">
        {person.label
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  ),
}))

const commands = [
  { id: "summarize", label: "summarize", description: "Sum up the thread", icon: <SparklesIcon /> },
  { id: "translate", label: "translate", description: "Translate the last reply", icon: <LanguagesIcon /> },
  { id: "todo", label: "todo", description: "Turn it into tasks", icon: <CheckSquareIcon /> },
  { id: "docs", label: "docs", description: "Search the docs", icon: <BookOpenIcon /> },
]

export function MentionInputDemo() {
  const [mentions, setMentions] = React.useState<Mention[]>([])

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <MentionInput
        aria-label="Comment"
        placeholder="Type @ to mention someone, / for a command"
        triggers={[
          { char: "@", items: people, label: "People" },
          { char: "/", items: commands, label: "Commands" },
        ]}
        onValueChange={(_, next) => setMentions(next)}
      />
      <p className="m-0 min-h-4 font-mono text-[11px] text-muted-foreground">
        {mentions.length ? mentions.map((m) => `${m.trigger}${m.id}`).join(" · ") : "No mentions yet"}
      </p>
    </div>
  )
}

/* Event Calendar ------------------------------------------------------------- */

function at(dayOffset: number, hour: number, minute = 0) {
  const date = new Date()
  const monday = date.getDate() - ((date.getDay() + 6) % 7)
  return new Date(date.getFullYear(), date.getMonth(), monday + dayOffset, hour, minute)
}

function sampleEvents(): CalendarEvent[] {
  return [
    { id: "e1", title: "Design review", start: at(0, 10), end: at(0, 11), color: "indigo", description: "Room 2" },
    { id: "e2", title: "Standup", start: at(1, 9, 30), end: at(1, 9, 45), color: "gray" },
    { id: "e3", title: "Customer call", start: at(1, 14), end: at(1, 15), color: "jade", description: "Alex Martin" },
    { id: "e4", title: "Pairing", start: at(1, 14, 30), end: at(1, 16), color: "cyan" },
    { id: "e5", title: "Release 1.4", start: at(2, 0), end: at(2, 23, 59), allDay: true, color: "orange" },
    { id: "e6", title: "Lunch & learn", start: at(3, 12), end: at(3, 13, 30), color: "orange" },
    { id: "e7", title: "Incident review", start: at(4, 16), end: at(4, 17), color: "crimson" },
    { id: "e8", title: "Planning", start: at(7, 10), end: at(7, 12), color: "indigo" },
  ]
}

export function EventCalendarDemo() {
  const [events, setEvents] = React.useState(sampleEvents)
  const [picked, setPicked] = React.useState<string>("Click an event, or an empty slot to add one.")

  return (
    <div className="flex w-full flex-col gap-2">
      <EventCalendar
        events={events}
        onEventClick={(event) => setPicked(`Opened “${event.title}”.`)}
        onSlotClick={(start) => {
          const end = new Date(start.getTime() + 60 * 60_000)
          setEvents((list) => [...list, { id: `n${list.length}`, title: "New event", start, end, color: "jade" }])
          setPicked(`Added an event at ${start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}.`)
        }}
      />
      <p className="m-0 text-xs text-muted-foreground" aria-live="polite">
        {picked}
      </p>
    </div>
  )
}

/* Heatmap -------------------------------------------------------------------- */

function activity(): HeatmapValue[] {
  const out: HeatmapValue[] = []
  const today = new Date()
  // A seeded wave, so the year looks lived in and stays the same per day.
  for (let i = 0; i < 371; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
    const weekday = date.getDay()
    const seed = Math.sin(i * 12.9898) * 43758.5453
    const noise = seed - Math.floor(seed)
    const busy = weekday === 0 || weekday === 6 ? 0.25 : 1
    const value = noise > 0.35 ? Math.round(noise * 10 * busy) : 0
    out.push({ date, value })
  }
  return out
}

export function HeatmapDemo() {
  const [data] = React.useState(activity)
  return (
    <Heatmap
      data={data}
      className="max-w-3xl"
      labels={{ value: (value, date) => `${value} commits on ${date.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" })}` }}
    />
  )
}

/* Gauge ---------------------------------------------------------------------- */

export function GaugeDemo() {
  const [cpu, setCpu] = React.useState(64)
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6">
      <div className="flex flex-wrap items-end justify-center gap-6">
        <Gauge
          value={cpu}
          label="CPU"
          thresholds={[
            { from: 75, color: "orange" },
            { from: 90, color: "crimson" },
          ]}
        />
        <Gauge value={182} max={250} label="GB of 250" format={(v) => `${v}`} size={128} color="indigo" />
        <Gauge value={99.2} min={95} max={100} label="Uptime" format={(v) => `${v}%`} size={128} color="jade" />
      </div>
      <Slider
        aria-label="CPU load"
        value={cpu}
        onValueChange={(v) => setCpu(Array.isArray(v) ? v[0] : v)}
        className="max-w-60"
      />
    </div>
  )
}

/* Number Ticker -------------------------------------------------------------- */

export function NumberTickerDemo() {
  const [round, setRound] = React.useState(0)
  const revenue = [48250, 51980, 46720][round % 3]
  const users = [12480, 13105, 12890][round % 3]
  const rate = [0.048, 0.052, 0.045][round % 3]

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6">
      <dl className="m-0 grid w-full grid-cols-3 gap-4 text-center">
        <div>
          <dt className="text-xs text-muted-foreground">Revenue</dt>
          <dd className="m-0 text-2xl font-medium tracking-tight">
            <NumberTicker value={revenue} format={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Users</dt>
          <dd className="m-0 text-2xl font-medium tracking-tight">
            <NumberTicker value={users} delay={150} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Conversion</dt>
          <dd className="m-0 text-2xl font-medium tracking-tight">
            <NumberTicker value={rate} delay={300} format={{ style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }} />
          </dd>
        </div>
      </dl>
      <Button variant="outline" size="sm" onClick={() => setRound((r) => r + 1)}>
        <RefreshCwIcon data-icon="inline-start" />
        New figures
      </Button>
    </div>
  )
}

/* Signature Pad -------------------------------------------------------------- */

export function SignaturePadDemo() {
  const [png, setPng] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <SignaturePad onValueChange={(value) => setPng(value)} />
      <div className="flex h-14 items-center gap-3 rounded-2xl bg-muted/50 px-3 text-xs text-muted-foreground">
        {png ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- a data URL preview */}
            <img src={png} alt="Your signature" className="h-10 rounded-md bg-white px-2" />
            PNG ready to upload
          </>
        ) : (
          "The exported PNG shows here."
        )}
      </div>
    </div>
  )
}

/* Image Cropper -------------------------------------------------------------- */

export function ImageCropperDemo() {
  const [ratio, setRatio] = React.useState("1")
  const [area, setArea] = React.useState<CropArea | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const aspect = ratio === "free" ? undefined : ratio === "16/9" ? 16 / 9 : 1

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <ToggleGroup
        aria-label="Ratio"
        value={[ratio]}
        onValueChange={(next) => {
          if (!next[0]) return
          setRatio(next[0] as string)
          setPreview(null)
        }}
        className="self-start"
      >
        <Toggle value="1">Avatar</Toggle>
        <Toggle value="16/9">16:9</Toggle>
        <Toggle value="free">Free</Toggle>
      </ToggleGroup>
      <ImageCropper
        key={ratio}
        src="/images/hero.jpg"
        alt="A painted landscape"
        aspect={aspect}
        shape={ratio === "1" ? "round" : "rect"}
        onAreaChange={setArea}
        maxHeight={300}
      />
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          disabled={!area}
          onClick={async () => {
            if (!area) return
            const blob = await cropImage("/images/hero.jpg", area, { maxSize: 256, type: "image/jpeg" })
            setPreview((old) => {
              if (old) URL.revokeObjectURL(old)
              return URL.createObjectURL(blob)
            })
          }}
        >
          Crop
        </Button>
        <span className="font-mono text-[11px] text-muted-foreground">
          {area ? `${area.width}×${area.height} at ${area.x},${area.y}` : "…"}
        </span>
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element -- an object URL preview
          <img
            src={preview}
            alt="Cropped result"
            className={ratio === "1" ? "ms-auto size-12 rounded-full" : "ms-auto h-12 rounded-lg"}
          />
        ) : null}
      </div>
    </div>
  )
}

/* Emoji Picker --------------------------------------------------------------- */

export function EmojiPickerDemo() {
  const [reactions, setReactions] = React.useState<Record<string, number>>({ "👍": 3, "🎉": 1 })
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="rounded-2xl bg-muted/50 p-3 text-xs">
        The 1.4 release notes are up. Thanks everyone for the reviews!
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {Object.entries(reactions).map(([emoji, count]) => (
          <button
            key={emoji}
            type="button"
            onClick={() => setReactions((r) => ({ ...r, [emoji]: r[emoji] + 1 }))}
            aria-label={`${emoji} ${count}`}
            className="inline-flex h-7 items-center gap-1 rounded-full border border-border px-2 text-xs tabular-nums hover:bg-muted"
          >
            <span className="text-sm leading-none">{emoji}</span>
            {count}
          </button>
        ))}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Add a reaction" />}>
            <SmilePlusIcon />
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <EmojiPicker
              autoFocus
              onSelect={(emoji) => {
                setReactions((r) => ({ ...r, [emoji]: (r[emoji] ?? 0) + 1 }))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

/* Onboarding Checklist ------------------------------------------------------- */

export function OnboardingChecklistDemo() {
  const [key, setKey] = React.useState(0)
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed)
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setDismissed(false)
          setKey((k) => k + 1)
        }}
      >
        Show the checklist again
      </Button>
    )

  return (
    <OnboardingChecklist
      key={key}
      className="max-w-sm"
      title="Set up your workspace"
      description="Five steps, about ten minutes."
      defaultCompleted={["account"]}
      onDismiss={() => setDismissed(true)}
      steps={[
        { id: "account", title: "Create your account" },
        {
          id: "project",
          title: "Create a project",
          description: "Projects hold your boards, docs, and settings.",
          action: <Button size="sm">New project</Button>,
        },
        {
          id: "invite",
          title: "Invite your team",
          description: "Teammates see the projects you share with them.",
          action: (
            <Button size="sm" variant="outline">
              Invite people
            </Button>
          ),
        },
        {
          id: "cli",
          title: "Install the CLI",
          description: "npx @aloneday/lumenui@latest init",
        },
        { id: "theme", title: "Pick a theme", description: "Open Customize to set colours, fonts, and radius." },
      ]}
    />
  )
}
