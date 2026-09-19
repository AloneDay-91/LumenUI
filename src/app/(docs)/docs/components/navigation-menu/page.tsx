import Link from "next/link"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
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
    <ComponentDocs
      name="Navigation Menu"
      description="Full-width mega menu, the same as the marketing header. text-sm triggers, overlay panel flush under the bar."
      previewClassName="block w-full min-h-0 items-stretch justify-start overflow-visible p-0"
      preview={
        <NavigationMenu className="w-full rounded-[inherit]">
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
      }
      usage={`<NavigationMenu>
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
