import { HeroCopy, HeroStack } from "@/components/blocks/lumen/hero-copy"

export function LandingHero() {
  return (
    <section className="flex w-full flex-col items-center px-6 py-16 text-center">
      <HeroCopy />
      <div className="flex justify-center">
        <HeroStack />
      </div>
    </section>
  )
}
