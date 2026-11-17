import { HERO_BACKGROUND } from "@/lib/site"
import { cn } from "@/lib/utils"

/** The landing painting, filling a demo frame. Same photo as the footer. */
export function PaintBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-cover bg-center opacity-70 dark:opacity-40",
        className,
      )}
      style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
    />
  )
}
