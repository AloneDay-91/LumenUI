import { ChevronDownIcon } from "lucide-react"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { MegaMenuPanel } from "@/components/marketing/MegaMenuPanel"
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
} from "@/components/ui/NavigationMenu"
import { navMenus } from "@/lib/nav-menus"

const panels = [
  {
    title: "Overview",
    links: [
      {
        href: "/docs",
        title: "Introduction",
        description: "What Lumen is, and who it is for.",
      },
      {
        href: "/docs/installation",
        title: "Installation",
        description: "Add the components to a React app.",
      },
      {
        href: "/docs/components",
        title: "Components",
        description: "Buttons, menus, fields, and the rest.",
      },
    ],
  },
  {
    title: "Components",
    links: [
      {
        href: "/docs/components/button",
        title: "Button",
        description: "Actions, with variants and a loading state.",
      },
      {
        href: "/docs/components/dialog",
        title: "Dialog",
        description: "A modal for a short task.",
      },
      {
        href: "/docs/components/menu",
        title: "Menu",
        description: "A list of actions from a trigger.",
      },
    ],
  },
] as const

function PanelMenu() {
  return (
    <NavigationMenu variant="panel">
      <NavigationMenuList>
        {panels.map((panel) => (
          <NavigationMenuItem key={panel.title}>
            <NavigationMenuTrigger>
              {panel.title}
              <NavigationMenuIcon>
                <ChevronDownIcon className="size-3" />
              </NavigationMenuIcon>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-72 gap-0.5 p-1">
                {panel.links.map((link) => (
                  <li key={link.href}>
                    <NavigationMenuLink variant="item" href={link.href}>
                      {link.title}
                      <span className="text-xs leading-snug text-muted-foreground">
                        {link.description}
                      </span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuLink variant="pill" href="/docs/changelog">
            Changelog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuPortal>
        <NavigationMenuPositioner>
          <NavigationMenuPopup>
            <NavigationMenuArrow />
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  )
}

export default function NavigationMenuPage() {
  return (
    <ComponentDocs
      name="Navigation Menu"
      description="A wide panel under the bar, and a floating panel anchored to the trigger. The site header uses the floating panel."
      previewCardClassName="overflow-visible"
      previewClassName="block min-h-[32rem] w-full items-start justify-start overflow-visible p-6"
      preview={
        <NavigationMenu className="w-full">
          <NavigationMenuList>
            {navMenus.map((menu) => (
              <NavigationMenuItem key={menu.id} value={menu.id}>
                <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuPanel
                    menu={menu}
                    dense
                    className="min-h-0 grid-cols-1 gap-8 px-5 py-5 md:grid-cols-[11rem_minmax(0,1fr)] md:px-5 lg:grid-cols-[11rem_minmax(0,1fr)]"
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <NavigationMenuPortal>
            <NavigationMenuPositioner>
              <NavigationMenuPopup>
                <NavigationMenuViewport />
              </NavigationMenuPopup>
            </NavigationMenuPositioner>
          </NavigationMenuPortal>
        </NavigationMenu>
      }
      extraHeadings={[{ id: "panel", text: "Panel", level: 2 }]}
      extra={
        <section className="flex flex-col gap-4">
          <h2 id="panel">Panel</h2>
          <p>
            <code>variant=&quot;panel&quot;</code> opens a floating panel under
            the trigger. The viewport resizes as you move between triggers. A
            link without content stays in the list.
          </p>
          <Preview className="min-h-80 items-start justify-start overflow-visible">
            <PanelMenu />
          </Preview>
        </section>
      }
      usage={`<NavigationMenu variant="panel">
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        Overview
        <NavigationMenuIcon />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink variant="item" href="/docs">
          Introduction
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink variant="pill" href="/docs/changelog">
        Changelog
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuPortal>
    <NavigationMenuPositioner>
      <NavigationMenuPopup>
        <NavigationMenuArrow />
        <NavigationMenuViewport />
      </NavigationMenuPopup>
    </NavigationMenuPositioner>
  </NavigationMenuPortal>
</NavigationMenu>

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuPanel>
          <NavigationMenuGroup title="Most used">
            <NavigationMenuLink variant="featured" href="/docs/components/button">
              Button
            </NavigationMenuLink>
          </NavigationMenuGroup>
        </NavigationMenuPanel>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuPortal>
    <NavigationMenuPositioner>
      <NavigationMenuPopup>
        <NavigationMenuViewport />
      </NavigationMenuPopup>
    </NavigationMenuPositioner>
  </NavigationMenuPortal>
</NavigationMenu>`}
    />
  )
}
