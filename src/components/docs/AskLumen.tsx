"use client"

import { ArrowUp, MessageSquare, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import { Input } from "@/components/ui/Input"
import { Kbd } from "@/components/ui/Kbd"
import { Spinner } from "@/components/ui/Spinner"
import {
  answerAskLumen,
  categoryLabel,
  type AskLumenReply,
  type SiteSearchHit,
} from "@/lib/site-search"
import { cn } from "@/lib/utils"

type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "bot"; reply: AskLumenReply }
  | { id: string; role: "typing" }

let messageSeq = 0
function nextId() {
  messageSeq += 1
  return `ask-${messageSeq}`
}

const WELCOME: AskLumenReply = {
  text: "Hey — write like you’d ask a friend. “I need a sidebar for my dashboard” or “comment installer” both work. I’ll pull out the useful words and search with them.",
  hits: [],
  suggestions: [
    "How do I install this?",
    "A sidebar for my dashboard",
    "Button component",
    "Change the theme",
  ],
}

const THINKING_LINES = [
  "Looking that up…",
  "Pulling out the keywords…",
  "Digging through the site…",
  "One sec…",
]

const THINKING_MIN_MS = 640
const THINKING_MAX_MS = 1200

function thinkingDelay() {
  return (
    THINKING_MIN_MS +
    Math.floor(Math.random() * (THINKING_MAX_MS - THINKING_MIN_MS))
  )
}

export function AskLumen({
  className,
  showLabel = false,
}: {
  className?: string
  showLabel?: boolean
}) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: "welcome", role: "bot", reply: WELCOME },
  ])
  const listRef = React.useRef<HTMLDivElement>(null)
  const inputId = React.useId()
  const replyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "j") return
      if (!(event.metaKey || event.ctrlKey)) return
      event.preventDefault()
      setOpen((current) => !current)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  React.useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current)
    }
  }, [])

  React.useEffect(() => {
    if (!open || pending) return
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(inputId)?.focus()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [open, inputId, pending])

  React.useEffect(() => {
    const node = listRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [messages, open, pending])

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

  function ask(raw: string) {
    const query = raw.trim()
    if (!query || pending) return

    if (replyTimerRef.current) clearTimeout(replyTimerRef.current)

    const typingId = nextId()
    setPending(true)
    setInput("")
    setMessages((current) => [
      ...current,
      { id: nextId(), role: "user", text: query },
      { id: typingId, role: "typing" },
    ])

    const reply = answerAskLumen(query)
    replyTimerRef.current = setTimeout(() => {
      setMessages((current) => [
        ...current.filter((message) => message.id !== typingId),
        { id: nextId(), role: "bot", reply },
      ])
      setPending(false)
      replyTimerRef.current = null
    }, thinkingDelay())
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    ask(input)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
      <DrawerTrigger
        render={
          <Button
            variant="ghost"
            size={showLabel ? "sm" : "icon-sm"}
            className={cn(
              "text-muted-foreground hover:text-foreground",
              showLabel && "gap-1.5",
              className,
            )}
            aria-label="Ask Lumen"
          />
        }
      >
        <MessageSquare className="size-4" />
        {showLabel ? <span>Ask Lumen</span> : null}
      </DrawerTrigger>
      <DrawerPopup
        data-drawer-flush=""
        className="flex h-dvh flex-col rounded-none p-0 sm:rounded-l-[24px]"
        style={
          {
            "--drawer-width": "min(32rem, 100vw)",
          } as React.CSSProperties
        }
      >
        <DrawerContent className="flex h-full max-w-none flex-col">
          <DrawerHeader className="shrink-0 flex-row items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div className="min-w-0 space-y-1">
              <DrawerTitle>Ask Lumen</DrawerTitle>
              <DrawerDescription>
                Talk in full sentences — I search by keywords.{" "}
                <Kbd variant="default" size="sm" className="align-middle">
                  ⌘ J
                </Kbd>
              </DrawerDescription>
            </div>
            <DrawerClose
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 text-muted-foreground"
                  aria-label="Close"
                />
              }
            >
              <XIcon className="size-4" />
            </DrawerClose>
          </DrawerHeader>

          <div
            ref={listRef}
            className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-5"
          >
            {messages.map((message) => {
              if (message.role === "user") {
                return (
                  <div key={message.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground">
                      {message.text}
                    </p>
                  </div>
                )
              }

              if (message.role === "typing") {
                return <TypingBubble key={message.id} />
              }

              return (
                <BotBubble
                  key={message.id}
                  reply={message.reply}
                  onGo={go}
                  onSuggest={ask}
                  disabled={pending}
                />
              )
            })}
          </div>

          <form
            onSubmit={onSubmit}
            className="flex shrink-0 items-center gap-2 border-t border-border px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            <Input
              id={inputId}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={
                pending
                  ? "One moment…"
                  : "e.g. I need a sidebar for my dashboard…"
              }
              aria-label="Ask Lumen"
              className="h-9 flex-1 text-sm"
              autoComplete="off"
              disabled={pending}
            />
            <Button
              type="submit"
              size="icon-sm"
              disabled={pending || !input.trim()}
              aria-label="Send"
            >
              {pending ? <Spinner /> : <ArrowUp className="size-4" />}
            </Button>
          </form>
        </DrawerContent>
      </DrawerPopup>
    </Drawer>
  )
}

function TypingBubble() {
  const [line] = React.useState(
    () => THINKING_LINES[Math.floor(Math.random() * THINKING_LINES.length)]!,
  )

  return (
    <div className="flex items-end gap-2.5">
      <BotAvatar />
      <div
        className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-sm text-muted-foreground"
        aria-live="polite"
        aria-label="Searching"
      >
        <Spinner className="size-3.5" />
        <span>{line}</span>
      </div>
    </div>
  )
}

function BotBubble({
  reply,
  onGo,
  onSuggest,
  disabled,
}: {
  reply: AskLumenReply
  onGo: (href: string) => void
  onSuggest: (query: string) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-start gap-2.5">
      <BotAvatar className="mt-0.5" />
      <div className="flex min-w-0 max-w-[92%] flex-col gap-2.5">
        <div className="rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
          <p>{reply.text}</p>
          {reply.keywords && reply.keywords.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {reply.keywords.slice(0, 4).map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-background/70 px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {reply.hits.length ? (
          <ul className="flex flex-col gap-2">
            {reply.hits.map((hit) => (
              <li key={hit.id}>
                <HitCard hit={hit} onGo={onGo} disabled={disabled} />
              </li>
            ))}
          </ul>
        ) : null}
        {reply.suggestions?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {reply.suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                variant="outline"
                size="sm"
                className="h-7 rounded-full px-2.5 text-[11px]"
                disabled={disabled}
                onClick={() => onSuggest(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function BotAvatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-medium tracking-tight text-background",
        className,
      )}
    >
      L
    </span>
  )
}

function HitCard({
  hit,
  onGo,
  disabled,
}: {
  hit: SiteSearchHit
  onGo: (href: string) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onGo(hit.href)}
      className="flex w-full flex-col gap-1 rounded-2xl border border-border bg-background px-3.5 py-3 text-left transition-colors hover:bg-accent/60 disabled:pointer-events-none disabled:opacity-60"
    >
      <div className="flex items-center gap-2">
        <span className="min-w-0 truncate text-sm font-medium">{hit.title}</span>
        <Badge variant="outline" className="ml-auto shrink-0">
          {categoryLabel(hit.category)}
        </Badge>
      </div>
      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
        {hit.description}
      </p>
    </button>
  )
}
