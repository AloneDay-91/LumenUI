import { ArrowRightIcon } from "lucide-react"
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
} from "lumen-ui"

type Menu = {
  id: string
  title: string
  featured: { title: string; items: string[] }
  section: { title: string; items: string[] }
  more: string
}

const menus: Menu[] = [
  {
    id: "system",
    title: "System",
    featured: { title: "Get started", items: ["Introduction", "Installation", "From shadcn"] },
    section: { title: "Foundations", items: ["Tokens and type", "Accessibility", "Customize"] },
    more: "Read the changelog",
  },
  {
    id: "components",
    title: "Components",
    featured: { title: "Most used", items: ["Button", "Input", "Dialog", "Table"] },
    section: { title: "Overlays", items: ["Drawer", "Popover", "Tooltip", "Toast", "Menu"] },
    more: "All 67 components",
  },
  {
    id: "blocks",
    title: "Blocks",
    featured: { title: "Kits", items: ["All blocks", "Marketing", "Dashboard"] },
    section: { title: "Account", items: ["Sign in", "Sign up", "Settings"] },
    more: "Browse every block",
  },
]

function Panel({ menu }: { menu: Menu }) {
  return (
    <NavigationMenuPanel className="min-h-0 gap-8 px-6 pt-6 pb-8 md:px-6">
      <NavigationMenuGroup title={menu.featured.title}>
        <div className="flex flex-col items-start gap-3">
          {menu.featured.items.map((label) => (
            <NavigationMenuLink key={label} variant="featured" href="#">
              {label}
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuGroup>
      <div className="flex flex-col gap-6">
        <NavigationMenuGroup title={menu.section.title}>
          <ul className="flex flex-col items-start gap-2.5">
            {menu.section.items.map((label) => (
              <li key={label}>
                <NavigationMenuLink href="#">{label}</NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuGroup>
        <NavigationMenuLink variant="muted" className="self-start" href="#">
          {menu.more}
          <ArrowRightIcon className="size-3.5" aria-hidden />
        </NavigationMenuLink>
      </div>
    </NavigationMenuPanel>
  )
}

function Bar({ defaultValue, height }: { defaultValue?: string; height?: number }) {
  return (
    <div style={{ width: "100%", minHeight: height }}>
      <NavigationMenu className="w-full rounded-2xl ring-1 ring-foreground/5" defaultValue={defaultValue}>
        <div className="flex items-center px-6 py-5">
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.id} value={menu.id}>
                <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Panel menu={menu} />
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
    </div>
  )
}

export const Default = () => <Bar />

export const OpenPanel = () => <Bar defaultValue="components" height={400} />
