import { PAINTING } from "@/components/blocks/lumen/brand"
import { HeroCopy, HeroStack } from "@/components/blocks/lumen/hero-copy"

export function BandHero() {
  return (
    <section className="flex w-full flex-col items-center px-6 pt-16 text-center">
      <HeroCopy />
      <div className="flex justify-center">
        <HeroStack />
      </div>
      <div
        aria-hidden
        className="mt-12 h-64 w-full bg-cover bg-center mask-[linear-gradient(to_bottom,transparent,black_18%,black_78%,transparent)] motion-safe:animate-[lumen-paint_900ms_ease-out_both] dark:opacity-40"
        style={{ backgroundImage: `url(${PAINTING})` }}
      />
    </section>
  )
}
