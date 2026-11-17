"use client"

import type { ReactNode } from "react"

import { FrameworkMark } from "@/components/blocks/lumen/FrameworkMarks"
import { StackMark } from "@/components/blocks/lumen/StackMarks"
import { Marquee } from "@/components/ui/Marquee"

const marks: { key: string; label: string; icon: ReactNode }[] = [
  { key: "base-ui", label: "Base UI 1.8", icon: <StackMark id="base-ui" className="size-7" /> },
  { key: "tailwind", label: "Tailwind CSS 4", icon: <StackMark id="tailwind" className="size-7" /> },
  { key: "react", label: "React 19", icon: <StackMark id="react" className="size-7" /> },
  { key: "next", label: "Next.js", icon: <FrameworkMark id="next" className="size-7" /> },
  { key: "vite", label: "Vite", icon: <FrameworkMark id="vite" className="size-7" /> },
  { key: "react-router", label: "React Router", icon: <FrameworkMark id="react-router" className="size-7" /> },
  { key: "astro", label: "Astro", icon: <FrameworkMark id="astro" className="size-7" /> },
  { key: "tanstack", label: "TanStack Start", icon: <FrameworkMark id="tanstack" className="size-7" /> },
]

/** The stack and the frameworks, looping under the hero. */
export function StackMarquee() {
  return (
    <section aria-label="Built with" className="w-full px-6 py-10">
      <Marquee gap="3.5rem" duration={40}>
        {marks.map((mark) => (
          <span key={mark.key} className="flex items-center gap-2.5 text-muted-foreground">
            {mark.icon}
            <span className="font-mono text-base font-medium tracking-tight whitespace-nowrap">{mark.label}</span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
