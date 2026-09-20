import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { MegaMenuPanel } from "@/components/marketing/MegaMenuPanel"
import {
  NavigationMenu,
  NavigationMenuContent,
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
                    <MegaMenuPanel menu={menu} className="max-w-none" />
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
