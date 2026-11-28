"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import {
  NavigationMenuGroup,
  NavigationMenuLink,
  NavigationMenuPanel,
  useNavigationMenuVariant,
} from "@/components/ui/NavigationMenu";
import { MenuFigure } from "@/components/marketing/menu-figures";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  type NavMenu,
  type NavMenuCard,
  type NavMenuLink,
} from "@/lib/nav-menus";
import { LANDING_MAX_WIDTH } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MegaMenuPanel({
  menu,
  className,
  dense = false,
}: {
  menu: NavMenu;
  className?: string;
  /** Fit the panel in a narrow preview. The floating header menu does this on its own. */
  dense?: boolean;
}) {
  const variant = useNavigationMenuVariant();
  const compact = dense || variant === "panel";

  if (variant === "panel") {
    const links = [menu.featured, ...menu.sections].flatMap((group) => group.items);
    if (menu.more) links.push(menu.more);
    return (
      <ul className="grid w-[36rem] max-w-[calc(100vw-2rem)] grid-cols-2 gap-0.5 p-1">
        {links.map((item) => (
          <li key={item.href + item.label}>
            <PanelLink item={item} detail />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <NavigationMenuPanel
      className={cn(
        compact
          ? "min-h-0"
          : cn(
              LANDING_MAX_WIDTH,
              "md:grid-cols-[minmax(10rem,13rem)_minmax(0,1fr)] lg:grid-cols-[minmax(10rem,13rem)_minmax(0,1fr)_minmax(17rem,20rem)]",
            ),
        className,
      )}
    >
      <NavigationMenuGroup title={menu.featured.title} className={compact ? "gap-3" : undefined}>
        <div className="flex flex-col items-start gap-4">
          {menu.featured.items.map((item) => (
            <PanelLink key={item.href + item.label} item={item} featured={!compact} />
          ))}
        </div>
      </NavigationMenuGroup>
      <div className={cn("flex flex-col", compact ? "gap-6" : "gap-10")}>
        <div className="grid grid-cols-3 gap-x-8">
          {menu.sections.map((section) => (
            <NavigationMenuGroup
              key={section.title}
              title={section.title}
              className={compact ? "gap-3" : undefined}
            >
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
      {compact ? null : <PanelCard card={menu.card} />}
    </NavigationMenuPanel>
  );
}

/** The last column: copy over a line drawing, the same card as scandar.dev. */
function PanelCard({ card }: { card: NavMenuCard }) {
  return (
    <div className="relative hidden flex-col gap-3 self-stretch overflow-hidden rounded-md border border-border p-6 lg:flex">
      <div
        aria-hidden
        className="pointer-events-none -mx-2 h-24 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      >
        <div
          className={cn(
            "flex h-full items-start",
            card.figure === "compare" ? "justify-start" : "justify-center",
          )}
        >
          <MenuFigure
            name={card.figure}
            className={card.figure === "compare" ? "h-20 w-full max-w-xs" : "h-20 w-20"}
          />
        </div>
      </div>
      <p className="relative text-xs text-muted-foreground">{card.eyebrow}</p>
      <p className="relative font-heading text-lg leading-tight">{card.title}</p>
      <p className="relative text-sm leading-relaxed text-pretty text-muted-foreground">
        {card.description}
      </p>
      <NavigationMenuLink
        render={<Link href={card.href} />}
        className={cn(
          buttonVariants({ size: "lg" }),
          "relative self-start hover:text-primary-foreground focus-visible:text-primary-foreground",
        )}
      >
        {card.tag}
        <ArrowRight aria-hidden />
      </NavigationMenuLink>
    </div>
  );
}

function PanelLink({
  item,
  featured,
  detail,
}: {
  item: NavMenuLink;
  featured?: boolean;
  /** Title and description, the same row as the docs panel. */
  detail?: boolean;
}) {
  const external = item.target === "_blank" || item.href.startsWith("http");
  const label = detail ? (
    <>
      {item.label}
      {item.description ? (
        <span className="text-xs leading-snug text-muted-foreground">{item.description}</span>
      ) : null}
    </>
  ) : (
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
        variant={detail ? "item" : featured ? "featured" : "default"}
      >
        {label}
      </NavigationMenuLink>
    );
  }

  return (
    <NavigationMenuLink
      variant={detail ? "item" : featured ? "featured" : "default"}
      render={<Link href={item.href} />}
    >
      {label}
    </NavigationMenuLink>
  );
}
