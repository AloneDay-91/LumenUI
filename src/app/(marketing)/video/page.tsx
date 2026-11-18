import type { Metadata } from "next"

import { ShowcasePlayer } from "@/components/marketing/ShowcasePlayer"
import { LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Video",
  description: "A short film made with Remotion, drawn entirely with Lumen UI components and tokens.",
}

export default function VideoPage() {
  return (
    <main className={cn("mx-auto flex w-full flex-col gap-6 px-6 py-12 md:px-12", LANDING_MAX_WIDTH)}>
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-medium tracking-tight">Lumen UI, in motion</h1>
        <p className="max-w-[60ch] text-sm text-muted-foreground">
          Every frame of this video is a Lumen component rendered by Remotion: the same buttons,
          cards, inputs and tokens you install from the registry. Switch the site theme and the
          film follows.
        </p>
      </header>
      <ShowcasePlayer />
    </main>
  )
}
