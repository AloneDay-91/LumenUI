import { HeroPalette, type PaletteItem } from "@/components/marketing/HeroPalette";
import { HeroScreen } from "@/components/marketing/HeroScreen";
import { getHeroRows } from "@/lib/hero-registry";

export function HeroProduct({ items }: { items: PaletteItem[] }) {
  const rows = getHeroRows();

  return (
    <figure className="relative mx-auto max-w-5xl">
      <div
        aria-hidden
        inert
        className="max-h-96 overflow-hidden mask-[linear-gradient(to_bottom,black_66%,transparent)] motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 md:max-h-120"
      >
        <HeroScreen rows={rows} />
      </div>
      {/* Sibling of the clip box: never masked, never clipped. */}
      <HeroPalette items={items} />
      <figcaption className="sr-only">
        A Components screen from a project that uses Lumen UI: a table of copied
        files with their npm packages, and a command palette searching for
        Dialog. The palette is interactive: type a component name and press
        Enter to copy its add command.
      </figcaption>
    </figure>
  );
}
