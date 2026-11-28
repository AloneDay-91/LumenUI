"use client";

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { AskLumen } from "@/components/docs/AskLumen";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MegaMenuPanel } from "@/components/marketing/MegaMenuPanel";
import { SiteLogo } from "@/components/marketing/SiteLogo";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/NavigationMenu";
import { navMenus } from "@/lib/nav-menus";
import { GITHUB_URL, LANDING_MAX_WIDTH } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MarketingNav() {
  const pathname = usePathname();
  const actionsRef = useRef<{ unmount: () => void } | null>(null);

  useEffect(() => {
    actionsRef.current?.unmount();
  }, [pathname]);

  return (
    <header className="relative z-50 hidden bg-background md:block">
      <NavigationMenu variant="panel" actionsRef={actionsRef}>
        <div
          className={cn(
            "relative z-10 mx-auto flex w-full items-center justify-between bg-background px-6 py-6 md:px-12",
            LANDING_MAX_WIDTH,
          )}
        >
          <div className="flex items-center gap-16">
            <SiteLogo />
            <NavigationMenuList>
              {navMenus.map((menu) => (
                <NavigationMenuItem key={menu.id} value={menu.id}>
                  <NavigationMenuTrigger>
                    {menu.title}
                    <NavigationMenuIcon>
                      <ChevronDownIcon className="size-3" />
                    </NavigationMenuIcon>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaMenuPanel menu={menu} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="/shaders" />}
                  variant="pill"
                >
                  Shaders
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="/customize" />}
                  variant="pill"
                >
                  Customize
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  variant="pill"
                >
                  GitHub
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </div>

          <div className="flex items-center gap-2">
            <AskLumen />
            <ThemeToggle />
            <Link href="/docs" className={cn(buttonVariants())}>
              Documentation
            </Link>
          </div>
        </div>

        <NavigationMenuPortal>
          <NavigationMenuPositioner>
            <NavigationMenuPopup>
              <NavigationMenuArrow />
              <NavigationMenuViewport />
            </NavigationMenuPopup>
          </NavigationMenuPositioner>
        </NavigationMenuPortal>
      </NavigationMenu>
    </header>
  );
}
