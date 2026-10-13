import type { ReactNode } from "react"

import { Logo } from "@/components/Logo"
import type { BlockCategorySlug } from "@/lib/block-categories"
import { HERO_BACKGROUND } from "@/lib/site"

const line = "block rounded-full bg-border"
const surface = "rounded-xl bg-background ring-1 ring-border"
const field = "block h-3.5 rounded-lg bg-input/50"

function MiniCard({ children }: { children?: ReactNode }) {
  return (
    <div className={`flex flex-col gap-1.5 p-2.5 ${surface}`}>{children}</div>
  )
}

function Form({ children }: { children: ReactNode }) {
  return (
    <div className={`flex w-33 flex-col gap-1.75 p-3 ${surface}`}>
      {children}
      <span className="mt-0.75 block h-3.5 rounded-full bg-primary" />
    </div>
  )
}

function MiniSidebar({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col gap-1.5 p-2 ${surface} ${collapsed ? "w-7 items-center" : "w-16"}`}
    >
      <span className="block size-3 shrink-0 rounded-full bg-primary" />
      {[true, false, false, false].map((active, item) => (
        <span
          key={item}
          className={`block h-2 shrink-0 rounded-full ${active ? "bg-foreground/15" : "bg-border"} ${collapsed ? "w-2" : "w-full"}`}
        />
      ))}
    </div>
  )
}

function Bars({ heights }: { heights: number[] }) {
  return (
    <span className="flex h-12 items-end gap-1">
      {heights.map((height, item) => (
        <span
          key={item}
          className="block w-2.5 rounded-t-[3px] bg-foreground"
          style={{ height: `${height}%`, opacity: item % 2 ? 0.35 : 1 }}
        />
      ))}
    </span>
  )
}

/** Each block type as a few tokens: bars for text, pills for actions. */
const thumbs: Record<BlockCategorySlug, ReactNode> = {
  headers: (
    <div className={`flex h-9 w-full items-center gap-2.5 px-3 ${surface}`}>
      <Logo className="size-3" />
      <span className={`${line} h-1.25 w-6`} />
      <span className={`${line} h-1.25 w-6`} />
      <span className={`${line} h-1.25 w-6`} />
      <span className="ml-auto block h-3.5 w-8.5 rounded-full bg-primary" />
    </div>
  ),
  heroes: (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-55 mask-[linear-gradient(to_bottom,transparent,black_80%)] dark:opacity-30"
        style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
      />
      <div className="relative flex flex-col items-center gap-2">
        <span className="block h-2.25 w-30 rounded-full bg-foreground" />
        <span className="block h-1.25 w-20 rounded-full bg-muted-foreground/50" />
        <span className="mt-1 flex gap-1.5">
          <span className="block h-3.5 w-14 rounded-full bg-primary" />
          <span className="block h-3.5 w-11 rounded-full border border-border bg-background" />
        </span>
      </div>
    </>
  ),
  features: (
    <div className="grid w-full grid-cols-3 gap-2">
      {[0, 1, 2].map((item) => (
        <MiniCard key={item}>
          <span className="block size-2.5 rounded-full bg-foreground" />
          <span className={`${line} h-1.25`} />
          <span className={`${line} h-1.25 w-[70%]`} />
        </MiniCard>
      ))}
    </div>
  ),
  pricing: (
    <div className="grid w-full grid-cols-3 gap-2">
      {[false, true, false].map((featured, item) => (
        <div
          key={item}
          className={`flex flex-col gap-1.5 p-2.5 rounded-xl bg-background ring-1 ${featured ? "ring-foreground" : "ring-border"}`}
        >
          <span className={`${line} h-1.25 w-2/5`} />
          <span className="block h-2.25 w-3/5 rounded-full bg-foreground" />
          <span
            className={`mt-1 block h-3.5 rounded-full ${featured ? "bg-primary" : "border border-border"}`}
          />
        </div>
      ))}
    </div>
  ),
  cta: (
    <div
      className={`flex w-full items-center justify-between gap-3 p-4 ${surface}`}
    >
      <div className="flex flex-col gap-1.75">
        <span className="block h-2.25 w-21 rounded-full bg-foreground" />
        <span className={`${line} h-1.25 w-27.5`} />
      </div>
      <span className="block h-4.5 w-11 rounded-full bg-primary" />
    </div>
  ),
  footers: (
    <div className={`flex w-full flex-col gap-3 p-3.5 ${surface}`}>
      <div className="flex justify-between gap-3">
        <Logo className="size-3" />
        <span className="flex gap-3.5">
          {[0, 1].map((column) => (
            <span key={column} className="flex flex-col gap-1.25">
              <span className="block h-1.25 w-6.5 rounded-full bg-foreground" />
              <span className={`${line} h-1 w-5.5`} />
              <span className={`${line} h-1 w-6`} />
            </span>
          ))}
        </span>
      </div>
      <div className="flex justify-between border-t border-border pt-2.5">
        <span className={`${line} h-1.25 w-3.5`} />
        <span className={`${line} h-1.25 w-10`} />
      </div>
    </div>
  ),
  login: (
    <Form>
      <span className="block h-1.5 w-10 rounded-full bg-foreground" />
      <span className={field} />
      <span className={field} />
    </Form>
  ),
  "sign-up": (
    <Form>
      <span className="block h-1.5 w-13 rounded-full bg-foreground" />
      <span className={field} />
      <span className={field} />
      <span className={field} />
    </Form>
  ),
  contact: (
    <Form>
      <span className="block h-1.5 w-11 rounded-full bg-foreground" />
      <span className={field} />
      <span className="block h-8.5 rounded-lg bg-input/50" />
    </Form>
  ),
  sidebars: (
    <div className="flex h-28 w-full gap-2">
      <MiniSidebar />
      <MiniSidebar collapsed />
      <div className={`flex flex-1 flex-col gap-1.5 p-2.5 ${surface}`}>
        <span className={`${line} h-1.25 w-12`} />
        <span className="block flex-1 rounded-lg bg-muted" />
      </div>
    </div>
  ),
  "app-headers": (
    <div className="flex w-full flex-col gap-2">
      <div className={`flex h-9 w-full items-center gap-2 px-3 ${surface}`}>
        <span className="block size-2.5 rounded-sm bg-muted-foreground/40" />
        <span className={`${line} h-1.25 w-14`} />
        <span className="ml-auto block h-3.5 w-16 rounded-lg bg-input/50" />
        <span className="block size-3.5 rounded-full bg-primary" />
      </div>
      <div className="flex items-end justify-between px-1">
        <span className="flex flex-col gap-1.5">
          <span className="block h-2.25 w-20 rounded-full bg-foreground" />
          <span className={`${line} h-1.25 w-28`} />
        </span>
        <span className="block h-3.5 w-11 rounded-full bg-primary" />
      </div>
    </div>
  ),
  stats: (
    <div className="grid w-full grid-cols-3 gap-2">
      {[70, 45, 85].map((goal) => (
        <MiniCard key={goal}>
          <span className={`${line} h-1.25 w-3/5`} />
          <span className="block h-2.25 w-4/5 rounded-full bg-foreground" />
          <span className="block h-1.25 rounded-full bg-border">
            <span
              className="block h-full rounded-full bg-foreground"
              style={{ width: `${goal}%` }}
            />
          </span>
        </MiniCard>
      ))}
    </div>
  ),
  charts: (
    <div className={`flex w-full items-end justify-between gap-3 p-3.5 ${surface}`}>
      <Bars heights={[40, 70, 55, 90, 65, 80, 45]} />
      <span className="block size-12 shrink-0 rounded-full border-[7px] border-foreground border-r-foreground/35 border-b-foreground/20" />
    </div>
  ),
  tables: (
    <div className={`flex w-full flex-col p-2 ${surface}`}>
      {[0, 1, 2, 3].map((row) => (
        <span
          key={row}
          className={`flex items-center gap-2 px-1.5 py-1.5 ${row > 0 ? "border-t border-border" : ""}`}
        >
          <span className="block size-2 rounded-[3px] ring-1 ring-border" />
          <span className={`${line} h-1.25 w-8 ${row === 0 ? "" : "bg-foreground/60"}`} />
          <span className={`${line} h-1.25 w-12`} />
          <span className="ml-auto block h-2.5 w-7 rounded-full bg-muted" />
        </span>
      ))}
    </div>
  ),
  activity: (
    <div className={`flex w-40 flex-col gap-2.5 p-3 ${surface}`}>
      {[true, false, false].map((highlight, item) => (
        <span key={item} className="flex items-start gap-2">
          <span
            className={`mt-0.5 block size-1.5 shrink-0 rounded-full ${highlight ? "bg-foreground" : "bg-muted-foreground/40"}`}
          />
          <span className="flex flex-1 flex-col gap-1">
            <span className="block h-1.25 w-4/5 rounded-full bg-foreground/70" />
            <span className={`${line} h-1 w-3/5`} />
          </span>
        </span>
      ))}
    </div>
  ),
  "empty-states": (
    <div className={`flex w-40 flex-col items-center gap-1.75 p-3.5 ${surface}`}>
      <span className="block size-5 rounded-lg bg-muted ring-1 ring-border" />
      <span className="mt-0.5 block h-1.5 w-14 rounded-full bg-foreground" />
      <span className={`${line} h-1 w-20`} />
      <span className="mt-1 flex gap-1.5">
        <span className="block h-3.5 w-9 rounded-full border border-border bg-background" />
        <span className="block h-3.5 w-11 rounded-full bg-primary" />
      </span>
    </div>
  ),
  settings: (
    <div className="flex w-full gap-3">
      <span className="flex w-14 flex-col gap-1.5 pt-1">
        <span className="block h-1.5 w-10 rounded-full bg-foreground" />
        <span className={`${line} h-1 w-12`} />
      </span>
      <div className={`flex flex-1 flex-col gap-2 p-3 ${surface}`}>
        {[true, true, false].map((on, item) => (
          <span key={item} className="flex items-center justify-between gap-2">
            <span className={`${line} h-1.25 w-16`} />
            <span
              className={`flex h-2.5 w-4.5 rounded-full p-px ${on ? "justify-end bg-primary" : "bg-input"}`}
            >
              <span className="block size-2 rounded-full bg-background" />
            </span>
          </span>
        ))}
      </div>
    </div>
  ),
  pages: (
    <div className={`flex h-28 w-full gap-2 p-1.5 ${surface}`}>
      <span className="flex w-10 flex-col gap-1 rounded-lg bg-muted p-1.5">
        <span className="block size-2 rounded-full bg-primary" />
        <span className="block h-1 rounded-full bg-border" />
        <span className="block h-1 rounded-full bg-border" />
        <span className="block h-1 rounded-full bg-border" />
      </span>
      <span className="flex flex-1 flex-col gap-1.5 py-1">
        <span className="block h-1.5 w-12 rounded-full bg-foreground" />
        <span className="grid grid-cols-4 gap-1">
          {[0, 1, 2, 3].map((item) => (
            <span key={item} className="block h-4 rounded-md ring-1 ring-border" />
          ))}
        </span>
        <span className="flex flex-1 gap-1">
          <span className="block flex-[2] rounded-md ring-1 ring-border" />
          <span className="block flex-1 rounded-md ring-1 ring-border" />
        </span>
      </span>
    </div>
  ),
}

export function BlockThumb({ slug }: { slug: BlockCategorySlug }) {
  return (
    <div
      aria-hidden
      className="relative flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-muted px-4"
    >
      {thumbs[slug]}
    </div>
  )
}
