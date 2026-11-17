import { PAINTING } from "@/components/blocks/lumen/brand"
import { HeroCopy, HeroStack } from "@/components/blocks/lumen/hero-copy"

export function SplitHero() {
  return (
    <section className="grid w-full items-center gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)]">
      <div className="flex flex-col items-start text-left">
        <HeroCopy align="start" />
        <HeroStack />
      </div>
      <div
        aria-hidden
        className="min-h-80 rounded-[min(var(--radius-4xl),24px)] bg-cover bg-center dark:opacity-40"
        style={{ backgroundImage: `url(${PAINTING})` }}
      />
    </section>
  )
}
