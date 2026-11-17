import { PAINTING } from "@/components/blocks/lumen/brand"
import { HeroCopy, HeroStack } from "@/components/blocks/lumen/hero-copy"

export function PaintingHero() {
  return (
    <section className="relative flex min-h-112 w-full flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center motion-safe:animate-[lumen-paint_900ms_ease-out_both] dark:opacity-40"
        style={{ backgroundImage: `url(${PAINTING})` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,black_0%,black_28%,transparent_62%)]"
      />
      <div className="relative flex flex-col items-center">
        <HeroCopy />
        <HeroStack />
      </div>
    </section>
  )
}
