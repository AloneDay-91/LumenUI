"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import {
  NavigationMenuGroup,
  NavigationMenuLink,
  NavigationMenuPanel,
} from "@/components/ui/NavigationMenu";
import { MenuCardArt } from "@/components/marketing/MenuCardArt";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  type NavMenu,
  type NavMenuCard,
  type NavMenuHue,
  type NavMenuLink,
} from "@/lib/nav-menus";
import { LANDING_MAX_WIDTH } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MegaMenuPanel({
  menu,
  className,
}: {
  menu: NavMenu;
  className?: string;
}) {
  return (
    <NavigationMenuPanel
      className={cn(
        LANDING_MAX_WIDTH,
        "md:grid-cols-[minmax(10rem,13rem)_minmax(0,1fr)] lg:grid-cols-[minmax(10rem,13rem)_minmax(0,1fr)_minmax(17rem,20rem)]",
        className,
      )}
    >
      <NavigationMenuGroup title={menu.featured.title}>
        <div className="flex flex-col items-start gap-4">
          {menu.featured.items.map((item) => (
            <PanelLink key={item.href + item.label} item={item} featured />
          ))}
        </div>
      </NavigationMenuGroup>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-3 gap-x-8">
          {menu.sections.map((section) => (
            <NavigationMenuGroup key={section.title} title={section.title}>
              <ul className="flex flex-col items-start gap-2.5">
                {section.items.map((item) => (
                  <li key={item.href + item.label}>
                    <PanelLink item={item} />
                  </li>
                ))}
              </ul>
            </NavigationMenuGroup>
          ))}
        </div>
        {menu.more ? (
          <NavigationMenuLink
            variant="muted"
            className="mt-auto self-start"
            render={<Link href={menu.more.href} />}
          >
            {menu.more.label}
            <ArrowRight className="size-3.5" aria-hidden />
          </NavigationMenuLink>
        ) : null}
      </div>
      <PanelCard card={menu.card} />
    </NavigationMenuPanel>
  );
}

/** Static class strings per hue, so Tailwind sees every utility. */
const hueText: Record<NavMenuHue, string> = {
  jade: "text-jade-ink",
  indigo: "text-indigo-ink",
  cyan: "text-cyan-ink",
  orange: "text-orange-ink",
};

/** Always the dark palette, like a printed ink card: `.dark` rescopes the tokens. */
function PanelCard({ card }: { card: NavMenuCard }) {
  return (
    <NavigationMenuLink
      render={<Link href={card.href} />}
      className="dark group/card relative isolate hidden min-h-64 w-full flex-col items-start justify-end gap-0 self-stretch overflow-hidden rounded-[min(var(--radius-4xl),24px)] bg-background p-6 text-foreground ring-1 ring-foreground/10 ring-inset hover:text-foreground focus-visible:text-foreground lg:flex"
    >
      {/* A soft wash of the hue under the pixels, gone before the copy. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,currentColor,transparent_65%)] opacity-25 transition-opacity duration-500 group-hover/card:opacity-35",
          hueText[card.hue],
        )}
      />
      <MenuCardArt
        seed={card.href}
        className={cn(
          "absolute inset-0 -z-10 size-full opacity-90 transition-opacity duration-500 group-hover/card:opacity-100",
          hueText[card.hue],
        )}
      />
      <span className="text-xs text-muted-foreground">{card.eyebrow}</span>
      <span className="mt-1 font-heading text-xl leading-tight font-medium tracking-tight">
        {card.title}
      </span>
      <span className="mt-2 max-w-56 text-sm leading-relaxed text-pretty text-muted-foreground">
        {card.description}
      </span>
      <span
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mt-5 ",
        )}
      >
        {card.tag}
        <ArrowRight
          data-icon="inline-end"
          className="transition-transform group-hover/card:translate-x-0.5"
          aria-hidden
        />
      </span>
    </NavigationMenuLink>
  );
}

function PanelLink({
  item,
  featured,
}: {
  item: NavMenuLink;
  featured?: boolean;
}) {
  const external = item.target === "_blank" || item.href.startsWith("http");
  const label = (
    <>
      {item.label}
      {featured && external ? (
        <ArrowUpRight className="size-5" aria-hidden />
      ) : null}
    </>
  );

  if (external) {
    return (
      <NavigationMenuLink
        href={item.href}
        target="_blank"
        rel="noreferrer"
        variant={featured ? "featured" : "default"}
      >
        {label}
      </NavigationMenuLink>
    );
  }

  return (
    <NavigationMenuLink
      variant={featured ? "featured" : "default"}
      render={<Link href={item.href} />}
    >
      {label}
    </NavigationMenuLink>
  );
}
