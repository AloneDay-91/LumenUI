import { HeroDocs } from "@/components/marketing/HeroDocs";
import { getHeroDoc } from "@/lib/hero-registry";
import { cn } from "@/lib/utils";

export function HeroProduct({ fade = true }: { fade?: boolean }) {
  const doc = getHeroDoc();

  return (
    <figure className={cn("relative", fade && "mx-auto max-w-5xl")}>
      <div
        aria-hidden
        inert
        className={cn(
          fade &&
            "max-h-96 overflow-hidden mask-[linear-gradient(to_bottom,black_66%,transparent)] motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 md:max-h-120",
        )}
      >
        <HeroDocs doc={doc} />
      </div>
      <figcaption className="sr-only">
        The Lumen UI documentation page for {doc.name}: the docs sidebar, the
        page intro, a live preview, the install command and the table of
        contents.
      </figcaption>
    </figure>
  );
}
