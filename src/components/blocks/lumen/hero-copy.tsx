import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { StackMark } from "@/components/blocks/lumen/StackMarks"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

const stack = [
  { id: "base-ui", label: "Base UI 1.8" },
  { id: "tailwind", label: "Tailwind CSS 4" },
  { id: "react", label: "React 19" },
] as const

/** The sentence, the init command, and Browse components. Shared by the hero blocks. */
export function HeroCopy({ align = "center" }: { align?: "center" | "start" }) {
  const centered = align === "center"

  return (
    <>
      <h1
        className={cn(
          "max-w-2xl text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl",
          centered && "text-balance",
        )}
      >
        The code lives in your repo.
      </h1>
      <p
        className={cn(
          "mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground",
          centered && "text-pretty",
        )}
      >
        React components built on Base UI and Tailwind CSS 4. The CLI copies the source into your
        project, so every file is yours to edit.
      </p>
      <div
        className={cn(
          "mt-7 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row",
          centered ? "items-center" : "items-stretch sm:items-center",
        )}
      >
        <span className={cn(buttonVariants(), "font-mono")}>
          <span className="text-primary-foreground/60">$</span>
          npx @aloneday/lumenui@latest init
        </span>
        <Link href="/docs/components" className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}>
          Browse components
          <ArrowRightIcon data-icon="inline-end" />
        </Link>
      </div>
    </>
  )
}

/** Base UI, Tailwind, and React under the actions. */
export function HeroStack() {
  return (
    <ul
      aria-label="Built on"
      className="mt-6 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-xs text-muted-foreground"
    >
      {stack.map((item) => (
        <li key={item.id} className="inline-flex items-center gap-1.5">
          <StackMark id={item.id} />
          {item.label}
        </li>
      ))}
    </ul>
  )
}
