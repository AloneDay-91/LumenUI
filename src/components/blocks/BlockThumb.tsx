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
