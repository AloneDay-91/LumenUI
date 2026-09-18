import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro, Preview } from "@/components/docs/Preview"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPanel,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/NavigationMenu"
import { navMenus } from "@/lib/nav-menus"

export default function NavigationMenuPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "navigation-menu", text: "NavigationMenu", level: 1 },
          { id: "usage", text: "Utilisation", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          title="NavigationMenu"
          description="Mega menu pleine largeur, le même que le header marketing. Triggers text-sm, panneau overlay collé sous la barre."
        />
        <Preview className="block w-full min-h-0 items-stretch justify-start overflow-visible p-0">
          <NavigationMenu className="rounded-[inherit]">
            <div className="flex items-center px-6 py-5">
              <NavigationMenuList>
                {navMenus.map((menu) => (
                  <NavigationMenuItem key={menu.id} value={menu.id}>
                    <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuPanel>
                        <NavigationMenuGroup title={menu.featured.title}>
                          <div className="flex flex-col items-start gap-4">
                            {menu.featured.items.map((item) => (
                              <NavigationMenuLink
                                key={item.href + item.label}
                                variant="featured"
                                render={<Link href={item.href} />}
                              >
                                {item.label}
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuGroup>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                          {menu.sections.map((section) => (
                            <NavigationMenuGroup
                              key={section.title}
                              title={section.title}
                            >
                              <ul className="flex flex-col items-start gap-3">
                                {section.items.map((item) => {
                                  const external = item.href.startsWith("http")
                                  return (
                                    <li key={item.href + item.label}>
                                      {external ? (
                                        <NavigationMenuLink
                                          href={item.href}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {item.label}
                                        </NavigationMenuLink>
                                      ) : (
                                        <NavigationMenuLink
                                          render={<Link href={item.href} />}
                                        >
                                          {item.label}
                                        </NavigationMenuLink>
                                      )}
                                    </li>
                                  )
                                })}
                              </ul>
                            </NavigationMenuGroup>
                          ))}
                        </div>
                      </NavigationMenuPanel>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </div>
            <NavigationMenuPortal>
              <NavigationMenuPositioner>
                <NavigationMenuPopup>
                  <NavigationMenuViewport />
                </NavigationMenuPopup>
              </NavigationMenuPositioner>
            </NavigationMenuPortal>
          </NavigationMenu>
        </Preview>
        <section className="space-y-4">
          <h2 id="usage">Utilisation</h2>
          <CodeBlock
            filename="components/ui/NavigationMenu.tsx"
            code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Composants</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuPanel>
          <NavigationMenuGroup title="Les plus utilisés">
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
        </section>
      </div>
    </>
  )
}
